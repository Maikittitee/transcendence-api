from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from decouple import config
import json, jwt, datetime, requests
from . import models
from . import utils

# Create your views here.

@csrf_exempt
def index(request):
	# return HttpResponse("Hello index")
	return JsonResponse({"massage":"you can use /register and /login"})

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
		return JsonResponse({"massage":"Successful"})
	except Exception as e:
		return JsonResponse({"massage": f"Failed: {e}"})

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
			return (JsonResponse({"massage": "incorrect username, password"}))
		payload = {
			'username': login_user.username,
			'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=60),
			'iat': datetime.datetime.now(datetime.UTC)
		}

		token = jwt.encode(payload, "secret", algorithm="HS256")
		return (JsonResponse({
			"massage": "Login Success",
			"jwt": token
			}))
	except Exception as e:
		return JsonResponse({"massage": e})

@csrf_exempt
def get_users(request):
	try: 

		encoded_token = request.headers.get("Authorization").split(' ')[1]
		identity = jwt.decode(encoded_token, "secret", algorithms=["HS256"])
		username = identity.get("username") 
		user = models.User.objects.filter(username=username).first()
		return JsonResponse(user.to_dict())
	except Exception as e:
		return JsonResponse({"massage": e})

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
		response = requests.post(base_url, json=base_params)
		results = response.json()
		results = dict(results)
		utils.fetch_42user_data(results.get("access_token"))
		return JsonResponse(results)
	return JsonResponse({"massage":"method not allow"})
