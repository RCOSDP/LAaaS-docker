FROM centos:centos7

RUN yum update -y && \
    yum install -y https://repo.ius.io/ius-release-el7.rpm && \
    yum install -y \
        cyrus-sasl-devel \
        gcc \
        gcc-c++ \
        git \
        libffi-devel \
        openldap-devel \
        openssl-devel \
        python-devel \
        python-pip \
        python-wheel \
        python36u \
        python36u-devel \
        python36u-libs \
        python36u-pip && \
    python3.6 -m venv venv

COPY requirements.txt .
RUN . venv/bin/activate && \
    pip install setuptools pip && \
    pip install -r requirements.txt && \
    export LANG=en_US.utf-8 && \
    fabmanager create-admin --app superset --username admin --firstname admin --lastname user --email admin@fab.org --password admin && \
    superset db upgrade && \
    superset load_examples && \
    superset init
