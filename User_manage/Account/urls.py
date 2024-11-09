from django.urls import path
from . import views

urlpatterns = [
	path("users", views.get_post_users, name="get_post_users"),
	path("users/<int:id>", views.user_detail, name="user_detail"),
]