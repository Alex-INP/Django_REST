from rest_framework.serializers import  ModelSerializer

from .models import NormalUser

class UserModelSerializer(ModelSerializer):

	class Meta:
		model = NormalUser
		fields = ["username", "first_name", "last_name", "email"]
