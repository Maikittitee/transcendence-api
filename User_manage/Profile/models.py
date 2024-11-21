from django.db import models
from Account.models import User
# Create your models here.

class UserProfile(models.Model):
	# user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	avatar = models.FileField(upload_to="upload/", null=True, blank=True)
	upload_at = models.DateField(null=True, blank=True)
	# win = models.IntegerField()
	# loss = models.IntegerField()
	# total_match = models.IntegerField()

	# def __str__(self):
	# 	return f"{self.user.username}'s Profile"
