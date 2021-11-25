from rest_framework.serializers import ModelSerializer

from .models import Project, ToDo
from users.serializers import UserModelSerializer

class ProjectModelSerializer_version2(ModelSerializer):
	# users = UserModelSerializer(many=True)

	class Meta:
		model = Project
		fields = ("name", "link")


class ProjectModelSerializer(ModelSerializer):
	# users = UserModelSerializer(many=True)

	class Meta:
		model = Project
		fields = "__all__"

class ToDoModelSerializer(ModelSerializer):
	# project = ProjectModelSerializer().fields.get("name")
	# user = UserModelSerializer().fields.get("first_name", "last_name")

	class Meta:
		model = ToDo
		fields = "__all__"