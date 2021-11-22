import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, CoreAPIClient
from mixer.backend.django import mixer
from django.contrib.auth.models import User

from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo
from users.models import NormalUser

class TestProjectModelViewSet(TestCase):

	def test_get_list(self):
		factory = APIRequestFactory()
		request = factory.get("/api/projects/")
		view = ProjectModelViewSet.as_view({"get": "list"})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_create_project_unauthorized(self):
		factory = APIRequestFactory()
		request = factory.post("/api/projects/", {"name": "Test_p", "link": "http://somelink.ru"}, format="json")
		view = ProjectModelViewSet.as_view({"post": "create"})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_create_todo_authorized(self):
		factory = APIRequestFactory()
		super_user = NormalUser.objects.create_superuser("SUser", "mymail@mail.ru", "Q1wertyu")
		proj = Project.objects.create(name="Test_p")
		request = factory.post("/api/todos/", {"user": super_user.pk, "project": proj.pk, "text": "txt"}, format="json")

		force_authenticate(request, super_user)

		view = ToDoModelViewSet.as_view({"post": "create"})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_proj_detail(self):
		proj = Project.objects.create(name="Test_p", link="http://linklink.ru")
		client = APIClient()
		response = client.get(f"/api/projects/{proj.pk}/")
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_user_put_unauthorized(self):
		super_user = NormalUser.objects.create_superuser("SUser", "mymail@mail.ru", "Q1wertyu")
		client = APIClient()
		response = client.put(f"/api/users/{super_user.pk}/", {"username": "name_2", "email": "anothermail@mail.ru"})
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_user_put_authorized(self):
		super_user = NormalUser.objects.create_superuser("SUser", "mymail@mail.ru", "Q1wertyu")

		client = APIClient()
		client.login(username="SUser", password="Q1wertyu")

		response = client.put(f"/api/users/{super_user.pk}/", {"username": "name_2", "email": "anothermail@mail.ru"})
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		updated_user = NormalUser.objects.get(pk=super_user.pk)
		self.assertEqual(updated_user.username, "name_2")
		self.assertEqual(updated_user.email, "anothermail@mail.ru")
		client.logout()


class TestUserCustomViewSet(APITestCase):

	def test_get_users(self):
		response = self.client.get("/api/users/")
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_user_put(self):
		super_user = NormalUser.objects.create_superuser("SUser", "mymail@mail.ru", "Q1wertyu")
		self.client.login(username="SUser", password="Q1wertyu")
		response = self.client.put(f"/api/users/{super_user.pk}/", {"username": "name_2", "email": "anothermail@mail.ru"})
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		updated_user = NormalUser.objects.get(pk=super_user.pk)
		self.assertEqual(updated_user.username, "name_2")
		self.assertEqual(updated_user.email, "anothermail@mail.ru")
		self.client.logout()

	def test_user_put_mixer(self):
		super_user = NormalUser.objects.create_superuser("SUser", "mymail@mail.ru", "Q1wertyu")
		mixed_user = mixer.blend(NormalUser)

		self.client.login(username="SUser", password="Q1wertyu")
		response = self.client.put(f"/api/users/{mixed_user.pk}/", {"username": "name_2", "email": "anothermail@mail.ru"})
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		updated_user = NormalUser.objects.get(pk=mixed_user.pk)
		self.assertEqual(updated_user.username, "name_2")
		self.assertEqual(updated_user.email, "anothermail@mail.ru")
		self.client.logout()

class TestCAC(TestCase):

	def test_get_users(self):
		# from requests.auth import HTTPBasicAuth

		super_user = NormalUser.objects.create_superuser("SUser", "mymail@mail.ru", "Q1wertyu")
		client = CoreAPIClient()
		resp = client.get("http://127.0.0.1:8000/api/users/")
		self.assertEqual(super_user.username, resp[0]['username'])





		# client.session.auth = HTTPBasicAuth("SUser", "Q1wertyu")
		# params = {"username": "N", "email": "somemail@mail.ru", "password": "Q1wertyu"}
		# data = client.get("http://127.0.0.1:8000/api/users/")
		# data = client.action(resp, ["users"])
		# print(f"{data=}")
