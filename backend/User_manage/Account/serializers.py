from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User
from rest_framework.exceptions import ValidationError

class UserCreateSerializer(BaseUserCreateSerializer):
	confirm_password = serializers.CharField()
	
	class Meta(BaseUserCreateSerializer.Meta):
		model = User
		fields = ['id', 'username', 'email', 'password', 'confirm_password']
		extra_kwargs = {
			'password': {'write_only': True},
			'email': {'required': True},
			'username': {'required': True}
		}

	def validate(self, attrs):
			password = attrs.get('password')
			confirm_password = attrs.get('confirm_password')
			
			if not password or not confirm_password:
				raise ValidationError({"password": "Both password fields are required."})

			if password != confirm_password:
				raise ValidationError({"password": "Password fields didn't match."})

			# Remove confirm_password from attrs
			attrs.pop('confirm_password', None)
			
			try:
				validated_data = super().validate(attrs)
				return validated_data
			except ValidationError as e:
				print("Validation error:", str(e))  # Debug print
				raise e
		
	def create(self, validated_data):
		try:
			user = super().create(validated_data)
			return user
		except Exception as e:
			print("Creation error:", str(e))  # Debug print
			raise ValidationError("Unable to create account. Please check your input.")



class UserSerializer(BaseUserSerializer):
	class Meta(BaseUserSerializer.Meta):
		model = User
		fields = ["id", "username", "email", "first_name", "last_name", "provider_id", "mfa_enabled", "access_token", "refresh_token", "avatar_url", "bio", "win", "loss", "draw", "total_match"]
		ref_name = "CustomUserSerializer"