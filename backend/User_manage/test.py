from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Match

class MatchHistoryViewTestCase(APITestCase):

    def setUp(self):
        # Create two test users
        self.user1 = User.objects.create_user(username="player1", password="password123")
        self.user2 = User.objects.create_user(username="player2", password="password123")
        self.user3 = User.objects.create_user(username="player3", password="password123")  # Unrelated user

        # Create matches
        self.match1 = Match.objects.create(
            player1=self.user1, player2=self.user2, player1_score=5, player2_score=10, status="COMPLETED"
        )
        self.match2 = Match.objects.create(
            player1=self.user1, player2=self.user3, player1_score=7, player2_score=3, status="COMPLETED"
        )

        # URL for match history
        self.url = "/matches/match-history/"

    def test_unauthenticated_user(self):
        # Test access without authentication
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_user_match_history(self):
        # Authenticate as user1
        self.client.login(username="player1", password="password123")

        # Get match history
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Validate the response data
        self.assertEqual(len(response.data), 2)  # User1 is part of 2 matches
        self.assertEqual(response.data[0]["player1_name"], "player1")
        self.assertEqual(response.data[0]["player2_name"], "player2")

    def test_authenticated_user_with_no_matches(self):
        # Authenticate as user2
        self.client.login(username="player3", password="password123")

        # Get match history
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # User3 is not part of any match
