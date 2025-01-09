# core/middleware.py
from django.utils import timezone
from datetime import timedelta

class UserActivityMiddleware:
	LAST_ACTIVITY_KEY = 'last_activity'
	OFFLINE_THRESHOLD = timedelta(minutes=5)  # Consider user offline after 5 minutes of inactivity

	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		print("hello")
		if request.user.is_authenticated:
			# Update last activity time
			current_time = timezone.now()
			request.user.update_last_activity()

			# Check other users' status
			self.update_user_statuses()

		response = self.get_response(request)
		return response

	def update_user_statuses(self):
		from .models import User # Import here to avoid circular import
		threshold_time = timezone.now() - self.OFFLINE_THRESHOLD
		User.objects.filter(
			last_activity__lt=threshold_time,
			is_online=True
		).update(is_online=False)