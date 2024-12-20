from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FriendRequest, Friendship

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ('id', 'from_user', 'to_user', 'status', 'created_at')

class FriendshipSerializer(serializers.ModelSerializer):
    friend = UserSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ('id', 'friend', 'created_at')