from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        field = ['id', 'username', 'email', 'password']

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        field = "__all__"