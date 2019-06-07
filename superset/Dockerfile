FROM centos:centos7
RUN yum update -y && \
    yum install -y epel-release && \
    yum install -y python-setuptools gcc gcc-c++ libffi-devel python-devel python-pip python-wheel openssl-devel openldap-devel && \
    pip install --upgrade pip && \
    pip install virtualenv && \
    virtualenv venv && \
    . ./venv/bin/activate && \
    pip install --upgrade setuptools pip && \
    pip install \
      psycopg2-binary \
      click==6.7 \
      colorama==0.3.9 \
      pandas==0.20.3 \
      flask==0.12.2 \
      flask-sqlalchemy==2.1 \
      markdown==2.6.8 \
      python-dateutil==2.6.0 \
      sqlalchemy==1.1.9 \
      six==1.10.0 \
      superset==0.22.1 && \
    fabmanager create-admin --app superset --username admin --firstname admin --lastname user --email admin@fab.org --password admin && \
    superset db upgrade && \
    superset load_examples && \
    superset init

# Customize superset
RUN . ./venv/bin/activate && \
    pip install pymongo configparser jupyter && \
    mkdir /root/Superset_Dir

COPY la_integration/views/core.py /venv/lib/python2.7/site-packages/superset/views/core.py
COPY la_integration/templates/appbuilder/navbar.html /venv/lib/python2.7/site-packages/superset/templates/appbuilder/navbar.html
COPY la_integration/templates/superset/models.html /venv/lib/python2.7/site-packages/superset/templates/superset/
COPY la_integration/templates/superset/execute.html /venv/lib/python2.7/site-packages/superset/templates/superset/
COPY la_integration/templates/superset/source.html /venv/lib/python2.7/site-packages/superset/templates/superset/
COPY la_integration/views/settings.ini /venv/lib/python2.7/site-packages/superset/views/
COPY la_integration/Superset_Dir /root/Superset_Dir/

RUN . ./venv/bin/activate && \
    python -m compileall
