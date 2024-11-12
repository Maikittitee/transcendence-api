from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from decouple import config
import json, jwt, datetime, requests
from core.models import User
from . import utils
from .decorator import login_required
import pyotp, qrcode, io
from .mfa import MFA


@csrf_exempt
def index(request):
	return JsonResponse({"message":"you can use /register and /login"})

@api_view(["POST"])
def register(request):
	try:
		print("hello register")
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
		return JsonResponse({"message": f"Failed: {e}"})

@csrf_exempt
def login(request):
	try:
		try: 
			data = json.loads(request.body)
		except json.JSONDecodeError:
			data = request.POST
		username = data["username"]
		password = data["password"]

		login_user = User.objects.filter(username=username).first()
		if (not login_user or login_user.password != password):
			return (JsonResponse({"message": "incorrect username, password"}))
		if (login_user.is_42):
			return JsonResponse({"message": "42 User must login by 42 Authentication"})	
		return (JsonResponse(login_user.login()))
	except Exception as e:
		return JsonResponse({"message": e})

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



@api_view(["POST"])
@login_required
def verify_mfa_otp(request):
	try:
		user = User.objects.get(username = request.username)
	except Exception as e:
		return Response({"message": e}, status=status.HTTP_404_NOT_FOUND)
	print(f"user: {user}")
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
		user = User.objects.get(username = request.username)
	except User.DoesNotExist:
		return Response({"message": "User is not exist"}, status=status.HTTP_404_NOT_FOUND)
	
	try:
		try: 
			data = json.loads(request.body)
		except json.JSONDecodeError:
			data = request.POST
		otp = data["otp"]
	except Exception as e:
		return (Response ({"message": e}, status=status.HTTP_400_BAD_REQUEST))

	try: 
		mfa = MFA(user.mfa_secret)
		if (mfa.verify(otp)):
			user.mfa_enabled = True
			user.save()
			return Response({"massage": "otp verify success"}, status.HTTP_202_ACCEPTED)
		return (Response({"massage": "otp verify failed"}, status=status.HTTP_401_UNAUTHORIZED))
	except Exception as e:
		return (Response({"massage": e}, 500))

@api_view(["GET"])
@login_required
def setup_mfa(request):
	user = User.objects.get(username = request.username)
	if not user.mfa_secret:
		user.mfa_secret = pyotp.random_base32()
		user.save()

	otp_uri = pyotp.totp.TOTP(user.mfa_secret).provisioning_uri(
		name = user.email,
		issuer_name="PONG 42"
	)

	qr = qrcode.make(otp_uri)

	filename = f"{user.email.replace('@', '_').replace('.', '_')}.png"

    # Save the QR code as a PNG image file
	qr.save(filename)

# Print the QR code to the console

	return JsonResponse({"user": request.username,
					   "qr": otp_uri})
