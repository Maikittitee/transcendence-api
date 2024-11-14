from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from decouple import config
import json, jwt, datetime, requests
from Account.models import User
from . import utils
import pyotp, qrcode, io
from .mfa import MFA
from Account.serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserLoginSerializer


@csrf_exempt
def index(request):
	return JsonResponse({"message":"you can use /register and /login"})

@api_view(["POST"])
def register(request):
	try:
		try: 
			data = json.loads(request.body)
		except json.JSONDecodeError:
			data = request.POST
		username = data["username"]
		password = data["password"]
		email = data["email"]
		
		User(
			username = username.lower(), 
			email=email, 
			password = password).save()
		return JsonResponse({"message":"Successful"})
	except Exception as e:
		return JsonResponse({"message": e})

@swagger_auto_schema(method="post",request_body=UserLoginSerializer, operation_description="Login a user and return JWT tokens")
@api_view(["post"])
def login(request):
	try:
		serializer = UserLoginSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		print("validate: ", serializer.validated_data)
		username = request.data["username"]
		password = request.data["password"]
		login_user = authenticate(username=username, password=password)
		if (not login_user):
			return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
		print("here1")
		if (login_user.is_42):
			return Response({"message": "42 User must login through intra42."} , status=status.HTTP_400_BAD_REQUEST)
		print("here2")
		if (login_user.mfa_enabled):
			otp_token = request.data.get('otp')
			if not otp_token:
				return Response({"detail": "2FA token required"}, status=400)

			mfa = MFA(login_user.mfa_secret)
			if not mfa.verify(otp_token):
				return Response({"detail": "Invalid 2FA token"}, status=400)
		refresh = RefreshToken.for_user(login_user)
		access_token = str(refresh.access_token)

		return Response({
			'refresh': str(refresh),
			'access': access_token
		})

	except Exception as e:
		print("hello exception")
		# return Response("ko");
		return Response({"detail": "Exception error"}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def oauth_callback(request):
	if (request.method == "GET"):
		qd = request.GET
		code = qd.get('code')
		if (not code):
			return JsonResponse({"massage":"Authorization code is invalid."})
		base_url = "https://api.intra.42.fr/oauth/token"
		base_params = {
			"grant_type": "authorization_code",
			"client_id": config("UID"),
			"client_secret": config("CLIENT_SECRET"),
			"code": code,
			"redirect_uri": config("REDIRECT_URI")
		}
		print("fetch to 42 with body: ", base_params)
		response = requests.post(base_url, json=base_params)
		results = response.json()
		results = dict(results)
		print(f"response from 42 token: {results}")
		user_data = utils.fetch_42user_data(results.get("access_token"))
		if (not user_data):
			return JsonResponse({"message": "fetch user error"})
		login_user = User.objects.filter(email=user_data["email"]).first()
		print(f"login user: {login_user}")
		if (not login_user):
			login_user = User(
					username = user_data["login"] + "@42", 
					email = user_data["email"], 
					is_42 = True,
					profile_img = user_data["image"]["link"]
				)
			login_user.save()
		return JsonResponse(login_user.login())
	return JsonResponse({"message":"method not allow"})

@api_view(["GET"])
@login_required
def setup_mfa(request):
	try: 
		user = get_object_or_404(User, username=request.user.username)
		serializer = UserSerializer(user)
		if not user.mfa_secret:
			user.mfa_secret = pyotp.random_base32()
			user.save()

		otp_uri = pyotp.totp.TOTP(user.mfa_secret).provisioning_uri(
			name = user.email,
			issuer_name="Transcendence 42"
		)
		return Response({
			"user": serializer.data,
			"otp_uri": otp_uri
		})
	except Exception as e:
		return Response({
			"massage": e
		}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@login_required
def verify_mfa_otp(request):
	user = get_object_or_404(User, username=request.username)
	try:
		otp = request.data["otp"]
	except Exception as e:
		return (Response ({"message": e}, status=status.HTTP_400_BAD_REQUEST))
	try:
		if not user.mfa_secret or not user.mfa_enabled:
			return Response({"massage": "no 2fa require with this users"}, status.HTTP_403_FORBIDDEN)
		mfa = MFA(user.mfa_secret)
		if (mfa.verify(otp)):
			return Response({"massage": "otp verify success"}, status.HTTP_202_ACCEPTED)
		return (Response({"massage": "otp verify failed"}, status=status.HTTP_401_UNAUTHORIZED))
	except Exception as e:
		return (Response({"massage": e}, 500))

@api_view(["POST"])
@login_required
def enable_mfa_otp(request):
	try:
		user = get_object_or_404(User, username=request.user.username)
		otp = request.data["otp"]
	except Exception as e:
		return (Response ({"message": e}, status=status.HTTP_400_BAD_REQUEST))
	try: 
		mfa = MFA(user.mfa_secret)
		if (mfa.verify(otp)):
			user.mfa_enabled = True
			user.save()
			return Response({"otp": "success"}, status.HTTP_202_ACCEPTED)
		return (Response({"otp": "failed"}, status=status.HTTP_401_UNAUTHORIZED))
	except Exception as e:
		return (Response({"massage": e}, 500))

