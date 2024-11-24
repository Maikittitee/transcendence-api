from django.urls import path
from . import views

urlpatterns = [
	path("upload-file/", views.UploadAvatarView.as_view())
	#  path("me/", views.view_profile),
	#  path("edit/" ,views.edit_profile)
]
