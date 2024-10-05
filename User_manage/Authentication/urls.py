from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("register", views.register),
    path("login", views.login),
	path("user", views.get_users),
    path("callback", views.oauth_callback, name="callback")
]