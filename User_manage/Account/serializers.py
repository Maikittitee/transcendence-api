from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User


class UserCreateSerializer(BaseUserCreateSerializer):
    confirm_password = serializers.CharField()
    
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password']

    def validate(self, attrs):
        confirm_password = attrs.pop("confirm_password")
        attrs = super().validate(attrs)
        if attrs['password'] != confirm_password:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        return attrs
    
	
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ["id", "username", "email", "is_42", "mfa_enabled", "avatar", "bio", "win", "loss", "draw", "total_match"]