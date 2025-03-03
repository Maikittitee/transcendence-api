from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import FriendRequest, Friendship
from .serializers import FriendRequestSerializer, FriendshipSerializer
from Account.models import User


class FriendRequestViewSet(viewsets.ModelViewSet):
    serializer_class = FriendRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FriendRequest.objects.filter(Q(to_user=self.request.user))

    def create(self, request):
        try:
            to_username = request.data.get("to_user")
            if not to_username:
                return Response(
                    {"detail": "to_user is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            to_user = User.objects.filter(username=to_username).first()
            print("to user is: ", to_user)
            if not to_user:
                return Response(
                    {"detail": "to_user is not existed"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if to_user:
                friend_request = FriendRequest.objects.create(
                    from_user=request.user, to_user_id=to_user.id
                )
                serializer = self.get_serializer(friend_request)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                {"detail": "to_user is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response({"detail": str(e)})

    @action(detail=True, methods=["post"])
    def accept(self, request, pk=None):
        friend_request = self.get_object()
        if (
            friend_request.to_user == request.user
            and friend_request.status == "pending"
        ):
            friend_request.status = "accepted"
            friend_request.save()

            # Create friendship entries for both users
            Friendship.objects.create(
                user=friend_request.from_user, friend=friend_request.to_user
            )
            Friendship.objects.create(
                user=friend_request.to_user, friend=friend_request.from_user
            )

            return Response({"status": "friend request accepted"})
        return Response(
            {"detail": "invalid request"}, status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        friend_request = self.get_object()
        if (
            friend_request.to_user == request.user
            and friend_request.status == "pending"
        ):
            friend_request.status = "rejected"
            friend_request.save()
            return Response({"status": "friend request rejected"})
        return Response(
            {"detail": "invalid request"}, status=status.HTTP_400_BAD_REQUEST
        )


class FriendshipViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Friendship.objects.filter(user=self.request.user)

    @action(detail=True, methods=["post"])
    def unfriend(self, request, pk=None):
        friendship = self.get_object()
        if friendship.user == request.user:
            # Remove both friendship entries
            Friendship.objects.filter(
                (Q(user=friendship.user) & Q(friend=friendship.friend))
                | (Q(user=friendship.friend) & Q(friend=friendship.user))
            ).delete()
            return Response({"status": "friend removed"})
        return Response(
            {"detail": "invalid request"}, status=status.HTTP_400_BAD_REQUEST
        )
