from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Match
from .serializers import MatchSerializer

# Create and List Matches
class MatchListCreateView(generics.ListCreateAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        status_param = self.request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        return queryset

# Retrieve, Update, and Delete a Match
class MatchDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

# Check history of player
class MatchHistoryView(generics.ListAPIView):
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated]  # Ensures only authenticated users can access

    def get_queryset(self):
        user = self.request.user

        # Ensure the user is authenticated
        if user.is_authenticated:
            # Fetch matches where the user is either player1 or player2
            return Match.objects.filter(player1=user) | Match.objects.filter(player2=user)
        else:
            # Return an empty queryset if user is not authenticated
            return Match.objects.none()
        