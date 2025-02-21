from django.utils import timezone
from datetime import timedelta
from .models import User
class UserActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            # Update user's last activity time
            current_time = timezone.now()
            request.user.last_activity = current_time
            request.user.is_online = True
            request.user.save()

            # Set offline users who haven't been active for 5 minutes
            User.objects.filter(
                last_activity__lt=current_time - timedelta(minutes=5),
                is_online=True
            ).update(is_online=False)

        response = self.get_response(request)
        return response