from django_filters import rest_framework as filters
from .models import ToDo

class TodoTimeFilter(filters.FilterSet):
	from_time = filters.DateTimeFilter(field_name="created_at", lookup_expr="gt")
	to_time = filters.DateTimeFilter(field_name="created_at", lookup_expr="lt")

	class Meta:
		model = ToDo
		fields = ["created_at"]