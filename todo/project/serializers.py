from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from user.models import User
from .models import Project, ToDo


class ProjectUserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username']


class ProjectSerializer(ModelSerializer):
    users = ProjectUserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(HyperlinkedModelSerializer):
    # user = serializers.StringRelatedField(many=True)
    # project = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
