from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from .models import NormalUser
from .serializers import UserModelSerializer

class UserCustomViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
	queryset = NormalUser.objects.all()
	serializer_class = UserModelSerializer

