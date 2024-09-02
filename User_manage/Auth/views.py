from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
def register(request):
    return HttpResponse("Hello, You're in register View")
def login(request):
    return HttpResponse("Hello, You can login in this view")
