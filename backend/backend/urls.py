from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Authentication and registration endpoints
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='blacklist_token'),

    # For DRF's browsable API authentication views (like login/logout)
    path('api-auth/', include('rest_framework.urls')),

    # API URLs for note creation, listing, and deletion
    path('api/', include('api.urls')),
]
