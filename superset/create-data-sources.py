#!/usr/bin/env python
import os
import sys

import requests


def main():
    admin_user = os.getenv('ADMIN_USERNAME', 'admin')
    admin_pass = os.getenv('ADMIN_PASSWORD', 'admin')
    s = requests.Session()
    r = s.post(
        'http://localhost:8088/api/v1/security/login',
        json={
            'username': admin_user,
            'password': admin_pass,
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
        'http://localhost:8088/api/v1/database',
        headers=headers,
        json={
           'database_name': 'Learning Locker',
           'sqlalchemy_uri': 'postgresql://postgres@superset-db:5432/learninglocker'
        }
    )
    print(r.json())
    learninglocker_id = r.json()['id'] if 'id' in r.json() else None
    r = s.post(
        'http://localhost:8088/api/v1/database',
        headers=headers,
        json={
           'database_name': 'OpenLRW',
           'sqlalchemy_uri': 'postgresql://postgres@superset-db:5432/openlrw'
        }
    )
    print(r.json())
    openlrw_id = r.json()['id'] if 'id' in r.json() else None
    r = s.post(
        'http://localhost:8088/api/v1/database',
        headers=headers,
        json={
           'database_name': 'Jupyter',
           'sqlalchemy_uri': 'postgresql://postgres@superset-db:5432/jupyter'
        }
    )
    print(r.json())
    if learninglocker_id:
        r = s.post(
            'http://localhost:8088/api/v1/dataset',
            headers=headers,
            json={
                'database': learninglocker_id,
                'schema': 'public',
                'table_name': 'xapi_statements'
            }
        )
        print(r.json())
    if openlrw_id:
        r = s.post(
            'http://localhost:8088/api/v1/dataset',
            headers=headers,
            json={
                'database': openlrw_id,
                'schema': 'public',
                'table_name': 'caliper_statements'
            }
        )
        print(r.json())

if __name__ == '__main__':
    main()
