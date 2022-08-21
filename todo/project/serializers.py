from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Project, ToDo


class ProjectSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(HyperlinkedModelSerializer):
    # user = serializers.StringRelatedField(many=True)
    # project = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'


