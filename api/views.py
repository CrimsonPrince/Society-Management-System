from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging

from . import models
from . import serializers

logger = logging.getLogger(__name__)

class UserListView(ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class UserDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class UserCreateView(CreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.CreateUserSerializer

class SocietyListView(ListAPIView):
    queryset = models.Society.objects.all()
    serializer_class = serializers.SocietySerializer

class SocietyDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.Society.objects.all()
    serializer_class = serializers.SocietySerializer

    @action(detail=True)    
    def get_members(self, request,pk):
        society = self.get_object()
        members = society.member.all()
        serializer = serializers.UserSerializer(members, many=True)
        return Response(serializer.data)

class SocietyCreateView(CreateAPIView):
    queryset = models.Society.objects.all()
    serializer_class = serializers.SocietySerializer