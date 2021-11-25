from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectModelSerializer_version2
from .filters import TodoTimeFilter

class ProjectLimitOffsetPagination(LimitOffsetPagination):
	default_limit = 10

class ToDoLimitOffsetPagination(LimitOffsetPagination):
	default_limit = 20


class ProjectModelViewSet(ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = ProjectModelSerializer
	# pagination_class = ProjectLimitOffsetPagination
	# permission_classes = [AllowAny]

	def get_queryset(self):
		name = self.request.query_params.get("name")
		projects = Project.objects.all()
		if name:
			projects = Project.objects.filter(name__contains=name)
		return projects

	def get_serializer_class(self):
		if self.request.version == "v2.0":
			return ProjectModelSerializer_version2
		return ProjectModelSerializer

	# def get_queryset(self):
	# 	name = self.kwargs["name"]
	# 	return Project.objects.filter(name__contains=name)


class ToDoModelViewSet(ModelViewSet):
	queryset = ToDo.objects.all()
	serializer_class = ToDoModelSerializer
	# pagination_class = ToDoLimitOffsetPagination
	filterset_class = TodoTimeFilter

	def get_queryset(self):
		project_name = self.request.query_params.get("project")
		todos = ToDo.objects.all()
		if project_name:
			todos = ToDo.objects.filter(project__name__contains=project_name)
		return todos

	def destroy(self, request, *args, **kwargs):
		todo = ToDo.objects.get(pk=self.kwargs.get("pk"))
		todo.is_open = False
		todo.save()
		return Response(status=status.HTTP_204_NO_CONTENT)



