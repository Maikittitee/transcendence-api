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
		fields = ['avatar_url', 'avatar']

	def update(self, instance, validated_data):
		if 'avatar' in validated_data:
			# Save the avatar file first
			instance.avatar = validated_data['avatar']
			instance.avatar.name = str(instance.id) + "_avatar." + instance.avatar.name.split('.')[-1]
			print("hi")
			# instance.avatar_url = 
			# Generate and save the avatar URL
			# instance.avatar_url = f"/media/{instance.avatar}"  # Adjust the path according to your MEDIA_URL
			instance.avatar_url = f"/media/upload/{instance.avatar}"  # Adjust the path according to your MEDIA_URL
			instance.save()
		return instance


class GetAvatarSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['avatar']

		def get_avatar_url(self, obj):
			request = self.context.get('request')
			photo_url = obj.fingerprint.url
			return (request.build_absolute_uri(photo_url))