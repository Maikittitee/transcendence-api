# from . import models
import requests
import json

def fetch_42user_data(token: str):
	if (not token):
		print("No Token")
		return
	url = 'https://api.intra.42.fr/v2/me'
	headers = {
		"accept": "application/json",
 		'Authorization': "Bearer 04ccce351e0cf53a4390358ae7dc66277572cfc4216c4a63021d6cca072c8298",
	}
	# print(f"token: {token}")
	response = requests.get(url, headers=headers)
	print(dict(response.json()))


fetch_42user_data("Dsd")
# def get_user(dict: json):
# 	# print(user)
