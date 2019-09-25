from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    age = models.CharField(max_length=4)
    society = models.ManyToManyField('Society')

    def __str__(self):
        return self.email

class Society(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    creation_date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=1000)
    category = models.CharField(max_length=255)
    members = models.ManyToManyField('User', related_name="membership")

    def __str__(self):
        return self.name

