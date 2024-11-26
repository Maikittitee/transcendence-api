from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
# from Authentication.decorator import login_required
from Account.models import User
from .serializers import AvatarUploadSerializer
from .models import UserProfile

class UploadAvatarView(APIView):
	serializer_class = AvatarUploadSerializer

	def post(self, request):
		# profile = UserProfile.objects.first()
		serializer = self.serializer_class(data = request.data)
		if (serializer.is_valid()):
			serializer.save()
			return Response(serializer.data)
		return Response({"msg": "error"}, 400)


# @api_view(["GET"])
# @login_required
# def view_profile(request):
# 	try:
# 		user = User.objects.get(username = request.username)
# 	except User.DoesNotExist:
# 		return Response({"message": "User is not exist"}, status=status.HTTP_404_NOT_FOUND)
	
# 	try:
# 		otp = request.body["otp"]
# 	except Exception as e:
# 		return (Response ({"message": e}, status=status.HTTP_400_BAD_REQUEST))
# 	serializer = UserSerializer(user)
# 	return Response(serializer.data)


# @api_view(["PUT"])
# def edit_profile(request):
# 	pass

# Create your views here.
