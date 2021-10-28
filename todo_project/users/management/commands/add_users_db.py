from django.core.management.base import BaseCommand

from users.models import NormalUser


def generate_users_data(num):
	user_data = []
	for i in range(num):
		user_data.append({"username": f"User-{i}",
						  "first_name": f"Name-{i}",
						  "last_name": f"LastName-{i}",
						  "email": f"someuser_{i}_email@mail.ru",
						  "password": "Q1wertyu"
						  })
	return user_data


class Command(BaseCommand):

	def handle(self, *args, **options):
		NormalUser.objects.all().delete()
		NormalUser.objects.create_superuser("SuperUser", password="1")
		print(f"--Superuser created--")
		for i in generate_users_data(7):
			NormalUser.objects.create_user(username=i["username"], first_name=i["first_name"], last_name=i["last_name"], email=i["email"], password=i["password"])
			print(f"--User {i['username']} created--")
