from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Society(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    creation_date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=1000)
    category = models.CharField(max_length=255)
    facebook = models.CharField(max_length=1000)
    instagram = models.CharField(max_length=1000)
    logo = models.CharField(max_length=1024)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.CharField(max_length=4)
    members = models.ManyToManyField('Society', related_name='member')

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
