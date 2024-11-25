from rest_framework import serializers
from .models import UserProfile

class AvatarUploadSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ['avatar']

class CreateProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ["bio"]