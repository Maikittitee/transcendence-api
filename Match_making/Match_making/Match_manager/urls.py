from django.urls import path , include  # add include

from . import views

urlpatterns = [
    path('', views.home, name='home'),
]