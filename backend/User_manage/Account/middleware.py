from django.utils import timezone
from datetime import timedelta
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model

class UserActivityMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response
		self.jwt_authenticator = JWTAuthentication()

	def __call__(self, request):
		print("hello, middleware")
		
		# Try to authenticate with JWT
		auth_header = request.headers.get('Authorization', '')
		if auth_header.startswith('Bearer '):
			try:
				# Authenticate using JWT
				validated_token = self.jwt_authenticator.get_validated_token(auth_header.split(' ')[1])
				user = self.jwt_authenticator.get_user(validated_token)
				
				if user:
					print("Hello, middleware authenticated:", user)
					current_time = timezone.now()
					user.last_activity = current_time
					user.is_online = True
					user.save()

					# Update other users' status
			except Exception as e:
				print("Authentication error:", e)
		User = get_user_model()
		current_time = timezone.now()
		some_user = User.objects.filter(
			last_activity__lt=current_time - timedelta(minutes=1),
			is_online=True
		).update(is_online=False)
		response = self.get_response(request)
		return response