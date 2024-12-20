from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import FriendRequestViewSet, FriendshipViewSet

router = DefaultRouter()
router.register(r'friend-requests', FriendRequestViewSet, basename='friend-request')
router.register(r'friends', FriendshipViewSet, basename='friendship')

urlpatterns = [
    path('', include(router.urls)),
]
