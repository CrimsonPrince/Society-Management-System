from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers

class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class SocietyViewSet(viewsets.ModelViewSet):
    queryset = models.Society.objects.all()
    serializer_class = serializers.SocietySerializer