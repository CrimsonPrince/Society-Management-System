from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    age = models.CharField(4)
    society = models.ManyToManyField('Society')

    def __str__(self):
        return self.email

class Society():
    name = models.CharField(255)
    email = models.EmailField(255)
    creation_date = models.DateField()
    description = models.CharField()
    category = models.CharField(255)
    members = models.ManyToManyField('User')