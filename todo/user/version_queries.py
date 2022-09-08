import requests

response = requests.get('http://127.0.0.1:8000/api/user/')
print(response.json())

# [{'username': 'xana', 'isStaff': True, 'isSuperuser': True},
# {'username': 'lada', 'isStaff': False, 'isSuperuser': False},
# {'username': 'rita', 'isStaff': False, 'isSuperuser': False},
# {'username': 'bob', 'isStaff': False, 'isSuperuser': False},
# {'username': 'user1', 'isStaff': False, 'isSuperuser': False}]

response = requests.get('http://127.0.0.1:8000/api/user/', headers={'Accept': 'application/json; version=2.0'})
print(response.json())

# [{'username': 'xana', 'firstName': '', 'lastName': '', 'email': 'hgj@mail.com'},
# {'username': 'lada', 'firstName': 'lada', 'lastName': '', 'email': 'lada@mail.com'},
# {'username': 'rita', 'firstName': '', 'lastName': '', 'email': 'rita123@gmail.com'},
# {'username': 'bob', 'firstName': 'tom', 'lastName': 'Петрова', 'email': 'bob@gmail.com'},
# {'username': 'user1', 'firstName': '', 'lastName': '', 'email': 'user@foo.com'}]
