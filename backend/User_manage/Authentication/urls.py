from django.urls import path
from . import views
from djoser import views as djoser_views
from rest_framework_simplejwt import views as simplejwt_views

urlpatterns = [

    path("", views.index),
    path("login/", views.login),
	path("users/", djoser_views.UserViewSet.as_view({'get': 'list'})),
	path("users/me/", djoser_views.UserViewSet.as_view({'get': 'me'})),
	path("profile/", views.ProfileConfigView.as_view()),
	path("profile/upload/", views.UploadAvatarView.as_view()),
	path("profile/avatar/", views.GetAvatarView.as_view()),

	path("register/", views.RegisterView.as_view()),
    path('token/refresh/', simplejwt_views.TokenRefreshView.as_view(), name='token_refresh'),

	# MFA
	path("2fa/qr/", views.setup_mfa),
	path("2fa/enable/", views.enable_mfa_otp),
	path("2fa/disable/", views.disable_mfa_otp),
	path("2fa/verify/", views.verify_mfa_otp),

	# Callback
    path("callback/", views.OauthView.as_view()),
	path("oauth_url/", views.GetOAuthUrlView.as_view())
]