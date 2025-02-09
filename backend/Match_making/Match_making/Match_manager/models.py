from django.db import models

# Create your models here.

class GameSession(models.Model):
    game_id = models.UUIDField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='waiting') #waiting active finish
    max_players = models.IntegerField(default=2)

    # Change 'players' to use related_name to avoid conflict
    players = models.ManyToManyField(
        'PlayerSession',
        related_name='participated_games',  # Add this
        blank=True
    )

class PlayerSession(models.Model):
    user_name = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    online_status = models.BooleanField(default=False)
    current_status = models.CharField(max_length=20, default='idle')
    channels_name = models.CharField(max_length=255, default="")
    # Add related_name to avoid conflict
    current_game = models.ForeignKey(
        GameSession,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='current_players'  # Add this
    )

    class Meta:
        db_table = 'player_sessions'

    def __str__(self):
        return f"{self.user_name} ({self.current_status})"
    

# class Queue(models.Model):
#     queue_id = models.CharField(max_length=100)
#     queue_name = models.CharField(max_length=100)
#     queue_status = models.CharField(max_length=100)
#     queue_players = models.ManyToManyField(PlayerSession)

#     def __str__(self):
#         return self.queue_name