from django.db import models
from django.contrib.auth.models import User

# ORM allows defining models in Python, which it then converts to database schema.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()  # No max length
    created_at = models.DateTimeField(auto_now_add=True)  # Auto-populated on creation

    # One-to-many: a user can have many notes. Deleting user deletes their notes.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title