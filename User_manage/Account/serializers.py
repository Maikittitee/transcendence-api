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
        # First run the parent's validation
        print("attrs0", attrs)
        confirm_password = attrs.pop("confirm_password")
        attrs = super().validate(attrs)
        print("attrs1", attrs)  
        # Add your custom validation
        if attrs['password'] != confirm_password:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        print("attrs", attrs) 
        return attrs
    
	
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        field = "__all__"