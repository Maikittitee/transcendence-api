from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator

class Match(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    # Players
    player1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='matches_as_player1'
    )
    player2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='matches_as_player2'
    )

    # Scores
    player1_score = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    player2_score = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )

    # Match status and winner
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    winner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='matches_won',
        null=True,
        blank=True
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    # Optional: Game configuration
    max_score = models.PositiveIntegerField(default=11)  # Points needed to win
    game_duration = models.DurationField(null=True, blank=True)  # Actual duration

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Matches'

    def __str__(self):
        return f"{self.player1.username} vs {self.player2.username} - {self.status}"

    @property
    def is_complete(self):
        return self.status == 'COMPLETED'

    @property
    def current_score(self):
        return f"{self.player1_score} - {self.player2_score}"

    def determine_winner(self):
        """Determines and sets the winner based on scores"""
        if self.player1_score >= self.max_score and self.player1_score > self.player2_score:
            self.winner = self.player1
        elif self.player2_score >= self.max_score and self.player2_score > self.player1_score:
            self.winner = self.player2
        return self.winner
