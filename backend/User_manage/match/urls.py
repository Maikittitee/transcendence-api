from django.urls import path
from .views import MatchListCreateView, MatchDetailView

urlpatterns = [
    path('match/', MatchListCreateView.as_view(), name='match-list-create'),
    path('match/<int:pk>/', MatchDetailView.as_view(), name='match-detail'),
]
