from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics  # Provides generic views to simplify creation
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, NoteSerializer
from .models import Note


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Defines the data to compare against
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # No authentication required for registration


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Only accessible by authenticated users

    # Allows users to both view their notes (GET) and create new notes (POST)
    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
    
    # Associates the created note with the authenticated user
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)