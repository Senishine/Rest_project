from random import random, randint

from django.core.management.base import BaseCommand
from project.models import Project, ToDo
from user.models import User

male_names = ['ivan', 'petr', 'vasya', 'andrey', 'michail', 'maxim', 'grigory', 'tom', 'bob', 'tim']
# female_names = ['oksana', 'ekaterina', 'elizaveta', 'anastasia', 'ksenia', 'marina', 'svetlana']
female_names = ['megan', 'diana', 'elena', 'stasya', 'veronika', 'irina', 'angelina']
male_surnames = ['petrov', 'ivanov', 'sidorov', 'andreev', 'kirillov', 'orlov', 'morozov']
female_surnames = ['petrova', 'ivanova', 'sidorova', 'andreeva', 'kirillova', 'orlova', 'morozova']


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('--admins', type=int, help='super users count')
        parser.add_argument('--users', type=int, help='users count')

    def handle(self, *args, **options):
        for i in range(0, options['admins']):
            generate_user(True)
        for i in range(0, options['users']):
            generate_user(False)


def generate_user(is_super: bool) -> User:
    names = male_names
    surnames = male_surnames
    # if random() > 0.5:
    #     names = female_names
    #     surnames = female_surnames
    # for nam in female_names:
    # for surnam in female_surnames:
            # name = names.pop(randint(0, len(names) - 1))
            # names.append(name + '1')
            # surname = surnames[randint(0, len(surnames) - 1)]

        # user = User.objects.create_user(
        #     username=name,
        #     first_name=name,
        #     last_name=surname,
        #     email=name + '@gmaill.com'
        # )
        # user.set_password(name + '123')
    # user1=User.objects.create_user(username='diana',first_name='diana',last_name='ivanova',email='diana' + '@gmaill.com')
    # user1.set_password('diana' + '123')
    # user2=User.objects.create_user(username='elena',first_name='elena',last_name='sidorova',email='elena' + '@gmaill.com')
    # user2.set_password('elena' + '123')
    # user3=User.objects.create_user(username='stasya',first_name='stasya',last_name='stieva',email='stasya' + '@gmaill.com')
    # user3.set_password('stasya' + '123')
    # user4=User.objects.create_user(username='veronika',first_name='veronika',last_name='verbova',email='veronika' + '@gmaill.com')
    # user4.set_password('veronika' + '123')
    # user5=User.objects.create_user(username='irina',first_name='irina',last_name='iri',email='irina' + '@gmaill.com')
    # user5.set_password('irina' + '123')
    # User.objects.create_superuser(
    #     username='xana',
    #     first_name='xana',
    #     last_name='',
    #     email='super@gmail.com'
    # )
    user=User.objects.create_user(username='lida',first_name='lida',last_name='bystrova',email='lida' + '@gmaill.com')
    user.set_password('lida' + '123')
    # project = {
    #     'name': 'Create product',
    #     'users': User.objects.get(id=50),
    #     'repository': 'github.com'
    # }
    # Project.objects.create(project)
    # ToDo.objects.create(project=project, text='create plan', creator=User.objects.get(id=72))
    return user
