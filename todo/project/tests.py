from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, CoreAPIClient

from project.models import Project, ToDo
from project.views import ProjectModelViewSet
from user.models import User


class TestProjectViewSet(TestCase):
    def setUp(self):
        self.url = '/api/projects/'
        self.project = {'name': 'New project 3', 'repository': "https://github.com/"}
        self.new_data = {'name': 'New project 5', 'repository': 'https://habr.com'}
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')

    def test_get_list(self):
        factory = APIRequestFactory()  # — фабрика для создания запросов;
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_by_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project, format='json')

        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_project_detail(self):
        project = Project.objects.create(name='New project 4', repository='https://github.com/')
        client = APIClient()
        response = client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_project_by_guest(self):
        project = Project.objects.create(name='New project 4', repository='https://github.com/')
        client = APIClient()
        response = client.put(f'{self.url}{project.id}/, {self.new_data}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(name='New project 5', repository='https://github.com/')
        client = APIClient()
        admin = User.objects.create_superuser('admin1', 'admin@gmail.com', 'admin123488')
        client.force_authenticate(user=admin)
        response = client.put(f'{self.url}{project.id}/', {'name': 'New project 6', 'repository': 'https://habr.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'New project 6')
        self.assertEqual(project.repository, 'https://habr.com')
        client.logout()

    def tearDown(self):
        pass


class TestToDoViewSet(APITestCase):
    def setUp(self):
        self.url = '/api/todos/'
        self.new_data = {'name': 'New project 5', 'repository': 'https://habr.com'}
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')

    def test_get_todos_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_todo_by_admin(self):
        project = Project.objects.create(name='New project 5', repository='https://github.com/')
        todo = ToDo.objects.create(project=project, text='design project', )
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(f'/api/todos/{todo.id}/', {'text': 'sketch plan', 'project': todo.project.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'sketch plan')

    def test_mixer(self):
        project = mixer.blend(Project)
        todo = mixer.blend(ToDo)
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(f'{self.url}{todo.id}', {'text': 'sketch design', 'project': todo.project.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo.refresh_from_db()
        self.assertEqual(todo.text, 'sketch design')
        self.client.logout()

    def tearDown(self):
        pass


class TestProjectCoreApi(CoreAPIClient):

    def test_live_project_create(self):
        self.client = CoreAPIClient()
        self.schema = self.client.get('http://testserver/schema/')
        self.params = {'text': 'plan requirements', 'repository': 'https://habr.com'}
        self.client.action(self.schema, ['project', 'create'], self.params)
        self.data = self.client.action(self.schema, ['project', 'list'])
        assert (len(self.data) == 1)
        assert (self.data == [{'text': 'plan requirements', 'repository': 'https://habr.com'}])
