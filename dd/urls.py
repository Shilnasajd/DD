from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Schema config
schema_view = get_schema_view(
   openapi.Info(
      title="Booking API",
      default_version='v1',
      description="API to manage and view time slots",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

# Root home view for testing
def home(request):
    return JsonResponse({"message": "Welcome to the Booking API!"})

# Root API versioning info
def api_root(request):
    return JsonResponse({"message": "Booking API v1"})

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API routes
    path('api/v1/', include('booking.urls')),  # Versioned API path (optional)
    path('api/', api_root),  # Root for API version info (optional)

    # Swagger and Redoc URLs for API documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # Simple home page route for testing (root)
    path('', home),  # Return message at root URL
]
