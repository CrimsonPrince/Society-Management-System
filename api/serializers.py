from rest_framework import serializers
from . import models




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id','email', 'username', "members")

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta: 
        models = models.User
        fields = ('email', 'username')


class SocietySerializer(serializers.ModelSerializer):
    membership = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = models.Society
        fields = ('id','email', 'name', 'membership')
