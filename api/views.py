from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging

from . import models
from . import serializers

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    @action(detail=False, methods=['post'])
    def add(self, request):
        user = serializers.CreateUserSerializer(data=request.data)
        if(user.is_valid()):
            print(user.validated_data)
        return Response("hell")



    @action(detail=False)
    def recent_users(self, request):
        recent_users = models.User.objects.all().order_by('email')
        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)

class SocietyViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Society.objects.all()
    serializer_class = serializers.SocietySerializer

    @action(detail=True)
    def get_members(self, request,pk):
        society = self.get_object()
        members = society.member.all()
        serializer = serializers.UserSerializer(members, many=True)
        return Response(serializer.data)

class UserCreateView(CreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer