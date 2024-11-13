from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserSerializer
from .models import User
# Create your views here.


@api_view(['GET', 'POST'])
def get_post_users(request):
	if request.method == 'GET':
		# return (Response({"hello": "world"}))
		users = User.objects.all()
		print("user: ", users)
		serializer = UserSerializer(users, many=True)
		print("serializer data: ", serializer.data)
		return Response(serializer.data)

	if request.method == 'POST':
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
	user = get_object_or_404(User, id=id)
	if request.method == 'GET':
		serializer = UserSerializer(user)
		return Response(serializer.data)
	elif request.method == 'PUT':
		serializer = UserSerializer(user, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'DELETE':
		user.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	