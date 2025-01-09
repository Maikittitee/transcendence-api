# from drf_yasg.views import get_schema_view
from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
   authentication_classes=()
)


# Define the security scheme for Bearer Authentication

urlpatterns = [
	# docs
	path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
	path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   	path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

	# service 
    path("auth/", include("Authentication.urls")),
    path("admin/", admin.site.urls),
    path("account/", include("Account.urls")),
	path('friends/', include('Friend.urls')),
	# path("profile/", include("Profile.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
