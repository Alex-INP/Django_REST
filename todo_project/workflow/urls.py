from django.urls import path
from .views import ProjectModelViewSet

app_name = 'workflow'

urlpatterns = [
    path('', ProjectModelViewSet.as_view({"get": "list"})),
	]