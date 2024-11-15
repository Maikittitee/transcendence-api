from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("register/", views.register),
	path("2fa/qr/", views.setup_mfa),
	path("2fa/enable/", views.enable_mfa_otp),
	# path("2fa/disable/", views.disable_mfa_otp),
	path("2fa/verify/", views.verify_mfa_otp),
    path("login/", views.login),
    path("callback/", views.oauth_callback, name="callback")
]