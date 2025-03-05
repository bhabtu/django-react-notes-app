from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics  # Provides generic views to simplify creation
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

# View to handle registration
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Set of data this view will compare against
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Anyone (authenticated or not) can access register page
