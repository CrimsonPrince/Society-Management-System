from rest_framework import serializers
from . import models




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id','email', 'username', 'first_name', 'last_name', 'age', 'members')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = models.User
        fields = ('email', 'username', 'first_name', 'last_name', 'age', 'password')

class SocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Society
        fields = ('id', 'email', 'name', 'description', 'category')

class CreateSocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Society
        fields = ('email', 'name', 'description', 'category')
