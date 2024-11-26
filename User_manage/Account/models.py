from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.db import models
import json, jwt, datetime

# Create your models here.

class User(AbstractUser):
	email = models.CharField(max_length=255, unique=True)
	is_42 = models.BooleanField(default=False)
	mfa_enabled  = models.BooleanField(default=False)
	mfa_secret = models.CharField(max_length=16, blank=True, null=True)

	avatar = models.FileField(upload_to="upload/", null=True, blank=True)
	bio = models.CharField(default="Hello Everyone, Nice to meet you guy!", max_length=1000)
	win = models.IntegerField(default=0)
	loss = models.IntegerField(default=0)
	draw = models.IntegerField(default=0)
	total_match = models.IntegerField(default=0)

