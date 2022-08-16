from django_filters import rest_framework as filters
from .models import ToDo


class TodoFilter(filters.FilterSet):
    # start_date = filters.DateTimeFilter(field_name="created_at", lookup_expr='gte', input_formats=['%Y-%m-%dT%H:%M'])
    # finish_date = filters.DateTimeFilter(field_name="created_at", lookup_expr='lte', input_formats=['%Y-%m-%dT%H:%M'])
    created_at = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'created_at']