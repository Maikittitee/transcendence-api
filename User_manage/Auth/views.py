from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

users = {
	
}

def index(request):
	return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
def register(request):
	if (request.method == "POST"):
		name = request.POST.get("username")
		password = request.POST.get("password")
		if (name in users.keys()):
			return HttpResponse("This username is already exist, please try another")
		users[name] = password
		print(json.dumps(users))
		return HttpResponse(f"Thank you for register, {name}.")
	return HttpResponse("the method is not allow")

@csrf_exempt
def login(request):
	return HttpResponse("Hello, You can login in this view")

def oauth_callback(request):
	if (request.method == "GET"):
		qd = request.GET
		print(qd)
		return HttpResponse("Authentication Success!")
	return HttpResponse("Authentication Failed")
