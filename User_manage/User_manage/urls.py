
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path, include
from django.contrib import admin

# Schema view configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Your API",
        default_version='v1',
        description="API documentation",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourdomain.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("account/", include("Account.urls")),
	path("auth/", include("djoser.urls")),
	path('auth/', include('djoser.urls.jwt')),
    # path("auth/", include("Authentication.urls")),
	path("profile/", include("Profile.urls")),
	path('docs/', schema_view.with_ui('swagger', cache_timeout=0),
         name='swagger-docs'),
]
