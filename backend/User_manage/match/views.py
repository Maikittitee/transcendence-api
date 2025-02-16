from rest_framework import generics, permissions
from .models import Match
from .serializers import MatchSerializer
from .permissions import CanReadUpdateDeleteMatch  # Import the custom permission
from Account.models import User

class MatchListCreateView(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.AllowAny]  # Authenticated users can create

    def get_queryset(self):
        queryset = super().get_queryset()
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        return queryset

class MatchDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated, CanReadUpdateDeleteMatch]

# Check history of player
class MatchHistoryView(generics.ListAPIView):
    serializer_class = MatchSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensures only authenticated users can access

    def get_queryset(self):
        user = self.request.user

        # Ensure the user is authenticated
        if user.is_authenticated:
            all_matches = Match.objects.filter(player1=user) | Match.objects.filter(player2=user)
            print(all_matches) 
            return all_matches
        else:
            return Match.objects.none()
        