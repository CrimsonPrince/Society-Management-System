from rest_framework import serializers
from . import models




class SocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Society
        fields = ('id', 'email', 'name', 'description', 'category', 'member')

class CreateSocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Society
        fields = ('email', 'name', 'description', 'category')

class CreateUserSerializer(serializers.ModelSerializer):

    age = serializers.CharField(source='profile.age')
    class Meta: 
        model = models.User
        fields = ('email', 'username', 'first_name', 'last_name', 'age', 'password')
        
class UserSerializer(serializers.ModelSerializer):

    age = serializers.CharField(source='profile.age')
    all_society = SocietySerializer(source='profile.members', many=True)

    class Meta:
        model = models.User
        fields = ('id','email', 'username', 'first_name', 'last_name', 'age', 'all_society')