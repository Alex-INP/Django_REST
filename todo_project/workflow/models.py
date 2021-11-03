from django.db import models

from users.models import NormalUser

class Project(models.Model):
	name = models.CharField(max_length=64)
	link = models.URLField(blank=True)
	users = models.ManyToManyField(NormalUser)

	def __str__(self):
		return self.name

class ToDo(models.Model):
	user = models.ForeignKey(NormalUser, null=True, on_delete=models.SET_NULL)
	project = models.ForeignKey(Project, on_delete=models.CASCADE)
	text = models.TextField(max_length=400)
	is_open = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
