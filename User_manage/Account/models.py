from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import EmailValidator
from django.utils import timezone
from django.contrib.auth.validators import UnicodeUsernameValidator
# Create your models here.

class User(AbstractUser):
	username_validator = UnicodeUsernameValidator()
	username = models.CharField(
		_("username"),
		max_length=150,
		unique=True,
		null=True,
		help_text=_(
			"Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
		),
		validators=[username_validator],
		error_messages={
			"unique": _("A user with that username already exists."),
		},
	)
	password = models.CharField(
		max_length=128,
		null=True,  # Allow null for OAuth users
		blank=True  # Allow blank in forms
	)
	
	mfa_enabled  = models.BooleanField(
		default=False
	)
	mfa_secret = models.CharField(
		max_length=16, 
		blank=True, 
		null=True
	)

	# provider
	provider_id = models.CharField(
		max_length=255,
		unique=True,
		null=True,
		blank=True,
		db_index=True,
		help_text=_("Unique identifier from the OAuth provider")
	)

	access_token = models.TextField(
		null=True,
		blank=True,
		help_text=_("OAuth2.0 access token")
	)
	
	refresh_token = models.TextField(
		null=True,
		blank=True,
		help_text=_("OAuth2.0 refresh token")
	)

	token_expires_at = models.DateTimeField(
		null=True,
		blank=True,
		help_text=_("Timestamp when the access token expires")
	)
	
	# Override email field to make it unique and required
	email = models.EmailField(
		_("email address"),
		unique=True,
		validators=[EmailValidator()],
		error_messages={
			"unique": _("A user with that email already exists."),
		},
	)
	
	# Additional user information
	is_oauth_user = models.BooleanField(
		default=False,
		help_text=_("Designates whether this user was created through OAuth")
	)

	avatar_url = models.URLField(
		max_length=1024,
		null=True,
		blank=True,
		help_text=_("URL of the user's avatar from OAuth provider")
	)

	display_name = models.CharField(
        max_length=25,
        unique=True,
        null=True,  # Allow null initially
        blank=True
	)
	
	# profile
	avatar = models.FileField(upload_to="upload/", null=True, blank=True)
	avatar_url = models.URLField(null=True)
	bio = models.CharField(default="Hello Everyone, Nice to meet you guy!", max_length=1000)
	win = models.IntegerField(default=0)
	loss = models.IntegerField(default=0)
	draw = models.IntegerField(default=0)
	total_match = models.IntegerField(default=0)

	last_activity = models.DateTimeField(default=timezone.now)
	is_online = models.BooleanField(default=False)

	def update_last_activity(self):
		self.last_activity = timezone.now()
		self.is_online = True
		self.save(update_fields=['last_activity', 'is_online'])

	@property
	def is_token_expired(self) -> bool:
		"""Check if the OAuth access token is expired"""
		if not self.token_expires_at:
			return True
		return self.token_expires_at <= timezone.now()

	def update_oauth_tokens(self, access_token: str, refresh_token: str, expires_in: int):
		"""Update OAuth tokens and expiration time"""
		self.access_token = access_token
		self.refresh_token = refresh_token
		self.token_expires_at = timezone.now() + timezone.timedelta(seconds=expires_in)
		self.save(update_fields=['access_token', 'refresh_token', 'token_expires_at', 'updated_at'])

	def get_provider_data(self) -> dict:
		"""Get OAuth provider-related data"""
		return {
			'provider_id': self.provider_id,
			'provider_name': self.provider_name,
			'access_token': self.access_token,
			'token_expires_at': self.token_expires_at,
		}
