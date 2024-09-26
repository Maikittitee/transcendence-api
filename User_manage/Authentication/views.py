from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from decouple import config
import json, jwt, datetime, requests
from . import models
from . import utils

@csrf_exempt
def index(request):
	# return HttpResponse("Hello index")
	return JsonResponse({"message":"you can use /register and /login"})

@csrf_exempt
def register(request):
	try:
		try: 
			data = json.loads(request.body)
		except json.JSONDecodeError:
			data = request.POST
		username = data["username"]
		password = data["password"]
		
		new_user = models.User(username = username.lower(), password = password)
		new_user.save() # save into DB
		print(f"DB {models.User.objects.all()}")
		return JsonResponse({"message":"Successful"})
	except Exception as e:
		return JsonResponse({"message": f"Failed: {e}"})

@csrf_exempt
def login(request):
	try:
		try: 
			data = json.loads(request.body)
		except json.JSONDecodeError:
			data = request.POST
		username = data["username"]
		password = data["password"]

		login_user = models.User.objects.filter(username=username).first()
		if (not login_user or login_user.password != password):
			return (JsonResponse({"message": "incorrect username, password"}))
		if (login_user.is_42):
			return JsonResponse({"message": "42 User must login by 42 Authentication"})	
		return (JsonResponse(login_user.login()))
	except Exception as e:
		return JsonResponse({"message": e})

@csrf_exempt
def get_user(request):
	try: 

		encoded_token = request.headers.get("Authorization").split(' ')[1]
		identity = jwt.decode(encoded_token, "secret", algorithms=["HS256"])
		username = identity.get("username") 
		user = models.User.objects.filter(username=username).first()
		return JsonResponse(user.to_dict())
	except Exception as e:
		return JsonResponse({"message": e})

@csrf_exempt
def oauth_callback(request):
	if (request.method == "GET"):
		qd = request.GET
		code = qd.get('code')
		if (not code):
			return JsonResponse({"massage":"Authorization code is invalid."})
		base_url = "https://api.intra.42.fr/oauth/token"
		base_params = {
			"grant_type": "authorization_code",
			"client_id": config("UID"),
			"client_secret": config("CLIENT_SECRET"),
			"code": code,
			"redirect_uri": config("REDIRECT_URI")
		}
		print(base_params)
		response = requests.post(base_url, json=base_params)
		results = response.json()
		results = dict(results)
		print(f"response: {results}")
		user_data = utils.fetch_42user_data(results.get("access_token"))
		if (not user_data):
			return JsonResponse({"message": "fetch user error"})
		login_user = models.User.objects.filter(email=user_data["email"]).first()
		print(f"login user: {login_user}")
		if (not login_user):
			login_user = models.User(
					username = user_data["login"] + "@42", 
					email = user_data["email"], 
					is_42 = True,
				)
			login_user.save()
		return JsonResponse(login_user.login())
	return JsonResponse({"message":"method not allow"})
