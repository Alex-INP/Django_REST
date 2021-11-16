from django.contrib import admin

from .models import NormalUser

from django.contrib.auth.admin import UserAdmin

# @admin.register(NormalUser)
# class User_Admin(admin.ModelAdmin):
#
# 	fields = ("username", "first_name", "groups")
	# readonly_fields = ("groups",)



admin.site.register(NormalUser)