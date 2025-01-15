from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from decouple import config
import json, jwt, datetime, requests
from Account.models import User
from Account.serializers import UserCreateSerializer, UserSerializer
from . import utils
import pyotp, qrcode, io
from .mfa import MFA
from Account.serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserLoginSerializer, VerifyOtpSerializer, ProfileConfigSerializer, AvatarUploadSerializer, GetAvatarSerializer
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser

def index(request):
	return JsonResponse({"message":"you can use /register and /login"})

class ProfileConfigView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = ProfileConfigSerializer

	# @login_required
	def put(self, request):
		try: 
			user = request.user
			print("put user: ", user)
			print("request data: ", request.data)
			serializer = self.serializer_class(instance=user, data=request.data, partial=True)
			print("Is valid:", serializer.is_valid())  # debug is_valid
			print("Validation errors:", serializer.errors)  # debug errors
			if (serializer.is_valid()):
				serializer.save()
				return Response(serializer.data)
			return Response(serializer.errors, status=400)
		except Exception as e:
			return (Response({"detail": e}, 500))


class RegisterView(APIView):
	permission_classes = [AllowAny]
	serializer_class = UserCreateSerializer

	@swagger_auto_schema(request_body=UserCreateSerializer)
	def post(self, request, *args, **kwargs):
		serializer = self.serializer_class(data=request.data)
		print("hello, register")
		if serializer.is_valid():
			print("register data is valid")
			try:
				print("saving")
				user = serializer.save()
				# print("data: ", serializer.data)
				print("saved")
				return Response(
					UserSerializer(user).data,
					status=status.HTTP_201_CREATED)
				
			except Exception as e:
				return Response({
					"error": str(e)
				}, status=status.HTTP_400_BAD_REQUEST)
		print("not valid")
		return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
	

@csrf_exempt
@swagger_auto_schema(method="post",request_body=UserLoginSerializer, operation_description="Login a user and return acces and refresh tokens")
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
		if (login_user.is_oauth_user):
			return Response({"detail": "42 User must login through intra."} , status=status.HTTP_400_BAD_REQUEST)
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
		print("exception error: ", e)
		# return Response("ko");
		return Response({"detail": "Exception error"}, status=status.HTTP_400_BAD_REQUEST)

class OauthView(APIView):
	permission_classes = [AllowAny]
	# authentication_classes  = []
	def post(self, request):
		print("hiiiii")
		code = request.data.get('code')
		print(f"code: {code}")
		if not code:
			return Response(
				{'detail': 'Authorization code not provided'}, 
				status=status.HTTP_400_BAD_REQUEST
		)
		data={
					'client_id': settings.OAUTH2_SETTINGS['CLIENT_ID'],
					'client_secret': settings.OAUTH2_SETTINGS['CLIENT_SECRET'],
					'code': code,
					'grant_type': 'authorization_code',
					'redirect_uri': settings.OAUTH2_SETTINGS['REDIRECT_URI']
				}
		print("send data: ", data)
		# Exchange authorization code for access token
		token_response = requests.post(
			settings.OAUTH2_SETTINGS['TOKEN_URL'],
			data=data
		)
		print("token: ", token_response.json())
		if token_response.status_code != 200:
			return Response(
				{'detail': 'Failed to obtain access token'},
				status=status.HTTP_400_BAD_REQUEST
			)

		tokens = token_response.json()
		access_token = tokens.get('access_token')
		refresh_token = tokens.get('refresh_token')

		user_response = requests.get(
			settings.OAUTH2_SETTINGS['USER_INFO_URL'],
			headers={'Authorization': f'Bearer {access_token}'}
   		)
		# print(user_response.json())

		if (user_response.status_code != 200):
			return Response({'detail': 'Failed to get use info'}, status=status.HTTP_400_BAD_REQUEST)

		user_info = user_response.json()
		provider_id = user_info.get('id')  # Adjust based on provider's response
		username = user_info.get("login") + "@42"  # Adjust based on provider's response
		email = user_info.get("email")
		first_name = user_info.get("first_name")
		last_name = user_info.get("last_name")
		avatar_url = user_info.get("image").get("link")
		# Create or update user
		print("eiei1")
		user, created = User.objects.update_or_create(
			provider_id=provider_id,
			is_oauth_user = True,
			defaults={
				'username': username,
				'access_token': access_token,
				'refresh_token': refresh_token,
				'email': email,
				"first_name": first_name,
				"last_name": last_name,
				"avatar_url": avatar_url
			}
		)
		print("eiei2")
		# Generate JWT tokens
		refresh = RefreshToken.for_user(user)
		
		return Response({
			# 'user': UserSerializer(user).data,
			'tokens': {
				'refresh': str(refresh),
				'access': str(refresh.access_token),
			}
		})

@csrf_exempt
@swagger_auto_schema(method="GET", operation_description="Get OTP URI of Two Factor Authentication")
@api_view(["GET"])
def setup_mfa(request):
	try: 
		print("hello")
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
			"detail": e
		}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method="POST", request_body=VerifyOtpSerializer, operation_description="Verify OTP")
@api_view(["POST"])
@login_required
def verify_mfa_otp(request):
	user = get_object_or_404(User, username=request.user.username)
	try:
		otp = request.data["otp"]
	except Exception as e:
		return (Response ({"detail": e}, status=status.HTTP_400_BAD_REQUEST))
	try:
		if not user.mfa_secret or not user.mfa_enabled:
			return Response({"detail": "no 2fa require with this users"}, status.HTTP_403_FORBIDDEN)
		mfa = MFA(user.mfa_secret)
		if (mfa.verify(otp)):
			return Response({"detail": "otp verify success"}, status.HTTP_202_ACCEPTED)
		return (Response({"detail": "otp verify failed"}, status=status.HTTP_401_UNAUTHORIZED))
	except Exception as e:
		return (Response({"detail": e}, 500))

@swagger_auto_schema(method="POST", request_body=VerifyOtpSerializer, operation_description="enable Two Factor Authentication")
@api_view(["POST"])
@login_required
def enable_mfa_otp(request):
	try:
		user = get_object_or_404(User, username=request.user.username)
		otp = request.data["otp"]
	except Exception as e:
		return (Response ({"detail": e}, status=status.HTTP_400_BAD_REQUEST))
	try: 
		mfa = MFA(user.mfa_secret)
		if (mfa.verify(otp)):
			user.mfa_enabled = True
			user.save()
			return Response({"otp": "success"}, status.HTTP_202_ACCEPTED)
		return (Response({"otp": "failed"}, status=status.HTTP_401_UNAUTHORIZED))
	except Exception as e:
		return (Response({"detail": e}, 500))


@swagger_auto_schema(method="POST", request_body=VerifyOtpSerializer, operation_description="disable Two Factor Authentication")
@api_view(["POST"])
@login_required
def disable_mfa_otp(request):
	try:
		user = get_object_or_404(User, username=request.user.username)
		otp = request.data["otp"]
	except Exception as e:
		return (Response ({"detail": e}, status=status.HTTP_400_BAD_REQUEST))
	try: 
		mfa = MFA(user.mfa_secret)
		if (mfa.verify(otp)):
			user.mfa_enabled = False
			user.save()
			return Response({"otp": "success"}, status.HTTP_202_ACCEPTED)
		return (Response({"otp": "failed"}, status=status.HTTP_401_UNAUTHORIZED))
	except Exception as e:
		return (Response({"detail": e}, 500))



class UploadAvatarView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = AvatarUploadSerializer
	parser_classes = (MultiPartParser, FormParser)  # Add support for file uploads

	def put(self, request):
		user = request.user
		serializer = self.serializer_class(
			instance=user,
			data=request.data,
			partial=True
		)
		print("hi put")
		if serializer.is_valid():
			try:
				user = serializer.save()
				# print("user avatar: ", user.avatar)
				# print("user avatar.url: ", user.avatar.url)
				# print("user avatar_url: ", user.avatar_url)
				return Response({
					'avatar': user.avatar.url if user.avatar else None,
					'avatar_url': user.avatar_url
				})
			except Exception as e:
				return Response(
					{'detail': f'Error uploading avatar: {str(e)}'},
					status=400
				)
		return Response(serializer.errors, status=400)

	def get(self, request):
		user = request.user
		return Response({
			# 'avatar': user.avatar.url if user.avatar else None,
			'avatar_url': user.avatar_url
		})
class GetAvatarView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = GetAvatarSerializer

	def get(self, request):
		if request.user.avatar:
			try:
				return FileResponse(open(request.user.avatar.path, 'rb'))
			except (FileNotFoundError, ValueError):
				return Response(status=404)
		return Response(status=404)

class GetOAuthUrlView(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		return Response({
			'oauth_url': settings.OAUTH2_SETTINGS['OAUTH_URL']
		})