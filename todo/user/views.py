from rest_framework import mixins, viewsets
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerTwoFields


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializer
        return UserModelSerializerTwoFields

