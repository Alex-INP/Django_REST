"""todo_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.views import UserCustomViewSet
from workflow.views import ProjectModelViewSet, ToDoModelViewSet
from rest_framework.permissions import AllowAny

router = DefaultRouter()
# router = SimpleRouter()
router.register("users", UserCustomViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todos", ToDoModelViewSet)

# filter_router = DefaultRouter()
# filter_router.register("project_filter", ProjectModelViewSet)

schema = get_schema_view(
   openapi.Info(
      title="ToDo",
      default_version='v1.0',
      description="Documentation",
      contact=openapi.Contact(email="somemail@mail.ru"),
      license=openapi.License(name="License"),
   ),
   public=True,
   permission_classes=[AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('swagger/', schema.with_ui('swagger')),
    path('swagger<str:format>/', schema.without_ui()),
    path('redoc/', schema.with_ui('redoc')),

    # path('api/<str:version>/projects/', ProjectModelViewSet.as_view({"get": "list"})),
    # path('api/projects/v1', include('workflow.urls', namespace='v1.0')),
    # path('api/projects/v2', include('workflow.urls', namespace='v2.0')),


    # path('filter/', include(filter_router.urls))
    # path('api/projects/kwargs/<str:name>/', ProjectModelViewSet.as_view())
]
