import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo.settings')
django.setup()

import requests
from requests.auth import HTTPBasicAuth

auth = HTTPBasicAuth(username='xana', password=123)
response = requests.get('http://127.0.0.1:8000/api/projects/', auth=auth)
print(response.status_code)
print(response.json())

data = {'username': 'xana', 'password': 123}
resp2 = requests.post('http://127.0.0.1:8000/api-token-auth/', data=data)
token = resp2.json().get('token')
print(token)
print(resp2.json())
response_projects = requests.post('http://127.0.0.1:8000/api/todos/', headers={'Authorization': f'Token {token}'})
print(response_projects.json())

#  Authorizatoin by JWT
print('*' * 50)

url = 'http://127.0.0.1:8000/api/token/'
resp = requests.post(url, data=data)
result = resp.json()
access = result['access']
print(f'Access token is {access}')
refresh = result['refresh']
print(f'Refresh token is {refresh}')
headers = {'Authorization': f'Bearer {access}'}
response = requests.get('http://127.0.0.1:8000/api/projects/', headers=headers)

# Refresh token
response2 = requests.post(url, headers=headers, data=data)
print(response2.status_code)
print(response2.text)


