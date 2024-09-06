from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from Authentication.models import User
import json
import requests

from decouple import config

# Create your views here.

@csrf_exempt
def index(request):
	# return HttpResponse("Hello index")
	return JsonResponse({"hello":"world"})

@csrf_exempt
def register(request):
	try:
		try: 
			data = json.loads(request.body)
		except json.JSONDecodeError:
			data = request.POST
		username = data["username"]
		password = data["password"]

		new_user = User(username = username.lower(), password = password)
		new_user.save() # save into DB
		print(f"DB {User.objects.all()}")	
		return JsonResponse({"massage":"Successful"})
	except Exception as e:
		return JsonResponse({"massage": f"Failed: {e}"})

@csrf_exempt
def login(request):
	return HttpResponse("Hello, You can login in this view")

def get_users(request):
	pass

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
