from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.db import models
import json, jwt, datetime

# Create your models here.

class User(AbstractUser):
	email = models.CharField(max_length=255, unique=True)
	is_42 = models.BooleanField(default=False)
		self.is_online = False
		return ({
			"massage": "Logout Success"
		})