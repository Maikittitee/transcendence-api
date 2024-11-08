from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..Authentication.decorator import login_required
from ..Account.models import User
from ..Account.serializer import UserSerializer

@api_view(["GET"])
@login_required
def view_profile(request):
	try:
		user = User.objects.get(username = request.username)
	except User.DoesNotExist:
		return Response({"message": "User is not exist"}, status=status.HTTP_404_NOT_FOUND)
	
	try:
		otp = request.body["otp"]
	except Exception as e:
		return (Response ({"message": e}, status=status.HTTP_400_BAD_REQUEST))
	serializer = UserSerializer(user)
	return Response(serializer.data)


@api_view(["PUT"])
def edit_profile(request):
	pass

# Create your views here.
