from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import json
import requests
from decouple import config

# Create your views here.

users = {
	
}

@csrf_exempt
def index(request):
	# return HttpResponse("Hello index")
	return JsonResponse({"hello":"world"})

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

@csrf_exempt
def oauth_callback(request):
	if (request.method == "GET"):
		qd = request.GET
		code = qd.get('code')
		if (not code):
			return HttpResponseNotFound("Unauthorization")
		print(f"Authorize_code: {code}")
		base_url = "https://api.intra.42.fr/oauth/token"
		base_params = {
			"grant_type": "authorization_code",
			"client_id": config("UID"),
			"client_secret": config("CLIENT_SECRET"),
			"code": code,
			"redirect_uri": "http://localhost:9000" + reverse("callback") 
		}
		print(base_params["client_id"])
		print(base_params["client_secret"])
		response = requests.post(base_url, params=base_params)
		results = response.json()
		results = dict(results)
		results["msg"] = "Authorization Success!"
		return JsonResponse(results)
	if (request.method == "POST"):
		qd = request.POST
		print(qd)
		return HttpResponse("Authentication Success!")
	return HttpResponseNotAllowed("Authentication Failed")
