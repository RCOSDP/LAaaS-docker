#!/usr/bin/env python
import sys

import requests


def main(username, password):
    s = requests.Session()
    r = s.post(
        'http://localhost:8088/api/v1/security/login',
        json={
            'username': username,
            'password': password,
            'provider': 'db',
        }
    )
    headers = {
        'Authorization': f'Bearer {r.json()["access_token"]}'
    }
    r = s.get(
        'http://localhost:8088/api/v1/security/csrf_token',
        headers=headers
    )
    headers['X-CSRFToken'] = r.json()['result']
    r = s.post(
        'http://localhost:8088/api/v1/database/',
        headers=headers,
        json={
           'database_name': 'Learning Locker',
           'sqlalchemy_uri': 'postgresql://postgres@superset-db:5432/learninglocker'
        }
    )
    print(r.json())
    r = s.post(
        'http://localhost:8088/api/v1/database/',
        headers=headers,
        json={
           'database_name': 'OpenLRW',
           'sqlalchemy_uri': 'postgresql://postgres@superset-db:5432/openlrw'
        }
    )
    print(r.json())
    r = s.post(
        'http://localhost:8088/api/v1/database/',
        headers=headers,
        json={
           'database_name': 'Jupyter',
           'sqlalchemy_uri': 'postgresql://postgres@superset-db:5432/jupyter'
        }
    )
    print(r.json())

if __name__ == '__main__':
    args = sys.argv
    if len(args) == 3:
        main(args[1], args[2])
    else:
        print('usage: create-data-sources.py <username> <password>')
        sys.exit(2)
