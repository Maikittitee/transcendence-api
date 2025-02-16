from rest_framework import serializers
from .models import Match
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'display_name', 'avatar_url']
    

class MatchSerializer(serializers.ModelSerializer):
    player1 = UserSerializer(read_only=True)  # Nested serializer for player1
    player2 = UserSerializer(read_only=True)  # Nested serializer for player2
    winner = UserSerializer(read_only=True)   # Nested serializer for winner

    class Meta:
        model = Match
        fields = [
            'id', 
            'player1', 
            'player2',
            'player1_score',
            'player2_score',
            'status',
            'winner',
            'created_at',
            'started_at',
            'completed_at',
            'max_score',
            'game_duration'
        ]
        
    def create(self, validated_data):
        # For creating matches, we need to handle player IDs
        player1_id = self.context['request'].data.get('player1')
        player2_id = self.context['request'].data.get('player2')
        
        User = get_user_model()
        player1 = User.objects.get(id=player1_id)
        player2 = User.objects.get(id=player2_id)
        
        match = Match.objects.create(
            player1=player1,
            player2=player2,
            **validated_data
        )
        return match