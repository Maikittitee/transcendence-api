from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("register/", views.register),
	path("2fa/setup/", views.setup_mfa),
	path("2fa/verify/<str:otp>/", views.verify_mfa_otp),
    path("login/", views.login),
    path("callback/", views.oauth_callback, name="callback")
]