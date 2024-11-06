from django.db import models

# Create your models here.
from django.db import models
import json, jwt, datetime

# Create your models here.

class User(models.Model):
	username = models.CharField(max_length=255, unique=True)
	email = models.CharField(max_length=255, unique=True)
	password = models.CharField(max_length=255, default="")
	bio = models.CharField(max_length=1000, default=""); 
	is_42 = models.BooleanField(default=False)
	is_online = models.BooleanField(default=False)
	win = models.IntegerField(default=0)
	
	def __str__(self):
		return ("{" + f"username: {self.username}, password: {self.password}" + "}")
	
	def to_dict(self):
		return {
			   "username": self.username,
			   "email": self.email,
			   "is_42_user": self.is_42
		}
	
	def login(self):
		payload = {
			'username': self.username,
			'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
			'iat': datetime.datetime.now(datetime.timezone.utc)
		}
		token = jwt.encode(payload, "secret", algorithm="HS256")
		return ({
			"massage": "Login Success",
			"jwt": token
		})