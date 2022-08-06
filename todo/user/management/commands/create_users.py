from random import random, randint

from django.core.management.base import BaseCommand

from user.models import User

male_names = ['ivan', 'petr', 'vasya', 'andrey', 'michail', 'maxim', 'grigory', 'tom', 'bob', 'tim']
female_names = ['oksana', 'ekaterina', 'elizaveta', 'anastasia', 'ksenia']
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
    if random() > 0.5:
        names = female_names
        surnames = female_surnames

    name = names.pop(randint(0, len(names) - 1))
    names.append(name + '1')
    surname = surnames[randint(0, len(surnames) - 1)]

    if is_super:
        user = User.objects.create_superuser(
            username=name,
            first_name=name,
            last_name=surname,
            email=name + '@gmail.com'
        )
    else:
        user = User.objects.create_user(
            username=name,
            first_name=name,
            last_name=surname,
            email=name + '@gmail.com'
        )
    user.set_password(name + '123')
    return user
