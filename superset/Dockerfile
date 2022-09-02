FROM centos:centos7

LABEL version="2.2.0"

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
    # TODO: Dependency issues exist. Use pip 19 to ignore them for now.
    pip install --upgrade setuptools==57.5.0 pip==19.3.1 && \
    pip install -r requirements.txt

ENV LANG en_US.utf-8
ENV PATH /venv/bin/:$PATH
ENV PYTHONPATH /root/.superset
COPY superset_config.py /root/.superset/

COPY wait-for-it.sh /wait-for-it.sh
COPY entrypoint.sh /entrypoint.sh
COPY init.sh /init.sh

RUN chmod +x /wait-for-it.sh /entrypoint.sh /init.sh

ENTRYPOINT ["/wait-for-it.sh", "-t", "0", "superset-db:5432", "--", "/entrypoint.sh"]
