from rest_framework import serializers
from Account.models import User
from Account.serializers import UserCreateSerializer

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField(max_length=255)
	password = serializers.CharField(write_only=True)
	otp = serializers.CharField(max_length=6, required=False)
	

class VerifyOtpSerializer(serializers.Serializer):
	otp = serializers.CharField(max_length=6)

class ProfileConfigSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['bio']

class AvatarUploadSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['avatar']