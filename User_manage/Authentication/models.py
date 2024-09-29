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
	profile_img = models.CharField(max_length=1000, default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
	
	def __str__(self):
		return ("{" + f"username: {self.username}, password: {self.password}" + "}")
	
	def to_dict(self):
		return {
			   "username": self.username,
			   "email": self.email,
			   "bio": self.bio,
			   "is_42_user": self.is_42,
			   "is_online": self.is_online,
			   "win": self.win,
			   "profile": self.profile_img
		}
	
	def login(self):
		payload = {
			'username': self.username,
			'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
			'iat': datetime.datetime.now(datetime.timezone.utc)
		}
		self.is_online = True;
		token = jwt.encode(payload, "secret", algorithm="HS256")
		return ({
			"massage": "Login Success",
			"jwt": token
		})