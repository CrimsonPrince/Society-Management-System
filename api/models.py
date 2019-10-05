from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Society(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    creation_date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=1000)
    category = models.CharField(max_length=255)
    logo = models.CharField(max_length=1024)

    def __str__(self):
        return self.name

class User(AbstractUser):
    age = models.CharField(max_length=4)
    members = models.ManyToManyField('Society', related_name='member')

    def __str__(self):
        return self.email
