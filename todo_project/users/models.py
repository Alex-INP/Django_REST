from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class NormalUser(AbstractUser):
	email = models.EmailField(verbose_name="email", blank=True, unique=True)
