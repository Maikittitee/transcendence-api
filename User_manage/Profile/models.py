from django.db import models
from Account.models import User
# Create your models here.

class UserProfile(models.Model):

	user = models.OneToOneField(
		User, 
		on_delete=models.CASCADE, 
		related_name="profile",
		null=True
	)
	avatar = models.FileField(upload_to="upload/", null=True, blank=True)
	bio = models.CharField(default="Hello Everyone, Nice to meet you guy!", max_length=1000)
	win = models.IntegerField(default=0)
	loss = models.IntegerField(default=0)
	draw = models.IntegerField(default=0)
	total_match = models.IntegerField(default=0)

	def __str__(self):
		return f"{self.user.username}'s Profile"
