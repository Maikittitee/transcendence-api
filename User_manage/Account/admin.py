from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserAdmin(UserAdmin):
	# Add your custom fields to the existing fieldsets
	fieldsets = UserAdmin.fieldsets + (
	    ('Custom Fields', {'fields': ('mfa_enabled', 'avatar', 'avatar_url', 'provider_id', 
	                                'bio', 'win', 'loss', 'draw', 'total_match')}),
	)
	
	# If you want to show these fields in the "add user" form
	add_fieldsets = UserAdmin.add_fieldsets + (
	    ('Custom Fields', {'fields': ('mfa_enabled', 'mfa_secret', 'avatar', 
	                                'bio', 'win', 'loss', 'draw', 'total_match')}),
	)
	
	# Add custom fields to the list display
	list_display = UserAdmin.list_display + ('mfa_enabled', 'win', 'loss', 'draw')

# Unregister the default UserAdmin and register your custom one
# admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)