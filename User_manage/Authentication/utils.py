# from . import models
import requests
import json


def is_user():
	pass

def create_user():
	pass



def fetch_42user_data(token: str):
	if (not token):
		print("No Token")
		return
	url = 'https://api.intra.42.fr/v2/me'
	print(f"token: {token}")
	headers = {
		"accept": "application/json",
 		# 'Authorization': "Bearer dfcec24be3e42193e7f17b0593f825ea9058c5c136450403e9532feb60df6ee0",
 		'Authorization': f"Bearer {token}",
	}
	response = requests.get(url, headers=headers)
	data = response.json()
	try:
		return ({"message": data['error']})
	except:
		return (response.json())


