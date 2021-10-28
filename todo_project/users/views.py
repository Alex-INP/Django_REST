from rest_framework.viewsets import ModelViewSet

from .models import NormalUser
from .serializers import UserModelSerializer

class UserModelViewSet(ModelViewSet):
	queryset = NormalUser.objects.all()
	serializer_class = UserModelSerializer

