from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

"""
Process Overview:
Input: The API receives JSON data (e.g., username, password).
Validation & Serialization: UserSerializer validates and converts JSON into a Python dict.
Database Interaction: `create` method creates a new User instance with the validated data.
Response: Serializer converts the Python User object back into JSON for the API response.

Why:
Django's ORM maps Python objects to database operations, allowing developers to interact 
    with the database using Python code instead of raw SQL. The serializer in DRF converts 
    complex data types, like Django model instances, into JSON data (and vice versa) to 
    allow communication between the backend (Python) and frontend (JavaScript/JSON).

""" 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Uses Django's built-in User model
        fields = ['id', 'username', 'password']  # Fields to serialize for input/output
        extra_kwargs = {'password': {'write_only': True}}  # Ensures password isn't returned by API

    def create(self, validated_data):
        # Hashes password and creates the user with validated data
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}  # Auto-set from logged-in user