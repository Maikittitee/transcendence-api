from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    #queue routes
    path('ws/matchmaking/', PongConsumer.as_asgi()),
    
    # Tournament routes
    # path('ws/tournament/create/', TournamentConsumer.as_asgi()),
    # path('ws/tournament/<str:tournament_id>/', TournamentConsumer.as_asgi()),
    
    # # Game routes
    # path('ws/game/create/', GameConsumer.as_asgi()),
    # path('ws/game/<str:game_id>/', GameConsumer.as_asgi()),
    
    # # Spectator routes
    # path('ws/spectate/<str:game_id>/', SpectatorConsumer.as_asgi()),
]