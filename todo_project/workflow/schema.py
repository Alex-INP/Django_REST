import graphene
from graphene_django import DjangoObjectType

from users.models import NormalUser
from .models import Project,  ToDo

class NormalUserType(DjangoObjectType):
	class Meta:
		model = NormalUser
		fields = "__all__"


class ProjectType(DjangoObjectType):
	class Meta:
		model = Project
		fields = "__all__"


class ToDoType(DjangoObjectType):
	class Meta:
		model = ToDo
		fields = "__all__"


class Query(graphene.ObjectType):
	all_users = graphene.List(NormalUserType)
	all_todos = graphene.List(ToDoType)
	all_projects = graphene.List(ProjectType)

	project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
	project_by_user_name = graphene.List(ProjectType, username=graphene.String(required=False))
	users_by_project = graphene.List(NormalUserType, id=graphene.Int(required=True))

	def resolve_all_users(root, info):
		return NormalUser.objects.all()

	def resolve_all_todos(root, info):
		return ToDo.objects.all()

	def resolve_all_projects(root, info):
		return Project.objects.all()

	def resolve_project_by_id(root, info, id):
		try:
			return Project.objects.get(pk=id)
		except:
			return None

	def resolve_project_by_user_name(root, info, username=None):
		if username is not None:
			return Project.objects.filter(users__username=username)
		return Project.objects.all()

	def resolve_users_by_project(root, info, id=None):
		if id is not None:
			project_users = Project.objects.get(pk=id).users.all()
			users_data = [NormalUser.objects.get(pk=user.id) for user in project_users]
			return users_data
		return NormalUser.objects.all()


class TodoUpdateMutation(graphene.Mutation):
	class Arguments:
		id = graphene.ID()
		text = graphene.String(required=True)

	todo = graphene.Field(ToDoType)

	@classmethod
	def mutate(cls, root, info, id, text):
		todo = ToDo.objects.get(pk=id)
		todo.text = text
		todo.save()
		return TodoUpdateMutation(todo=todo)


class TodoCreateMutation(graphene.Mutation):
	class Arguments:
		user_id = graphene.Int(required=True)
		project_id = graphene.Int(required=True)
		text = graphene.String(required=True)

	todo = graphene.Field(ToDoType)

	@classmethod
	def mutate(cls, root, info, user_id, project_id, text):
		user = NormalUser.objects.get(pk=user_id)
		project = Project.objects.get(pk=project_id)
		todo = ToDo.objects.create(user=user, project=project, text=text)
		todo.save()
		return TodoCreateMutation(todo=todo)


class TodoDeleteMutation(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	todo = graphene.Field(ToDoType)

	@classmethod
	def mutate(cls, root, info, id):
		todo = ToDo.objects.get(pk=id).delete()
		return TodoDeleteMutation(todo=todo)

class Mutation(graphene.ObjectType):
	update_todo_text = TodoUpdateMutation.Field()
	create_todo = TodoCreateMutation.Field()
	delete_todo = TodoDeleteMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)