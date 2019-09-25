from rest_framework import serializers
from . import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ('id','email', 'username')


class SocietySerializer(serializers.HyperlinkedModelSerializer):
    members = UserSerializer(many=True)
    class Meta:
        model = models.Society
        fields = ('id','email', 'name', 'members')