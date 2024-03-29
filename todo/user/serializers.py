from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']


class UserModelSerializerTwoFields(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'is_staff', 'is_superuser']
