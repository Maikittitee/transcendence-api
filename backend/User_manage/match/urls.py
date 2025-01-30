from django.urls import path
from .views import MatchListCreateView, MatchDetailView, MatchHistoryView

urlpatterns = [
    path('match/', MatchListCreateView.as_view(), name='match-list-create'),
    path('match-history/', MatchHistoryView.as_view(), name='match-history'),
    path('match/<int:pk>/', MatchDetailView.as_view(), name='match-detail'),
]
