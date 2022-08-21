from rest_framework import mixins, viewsets

from .models import User
from .serializers import UserModelSerializer


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
