FROM rockylinux:9.0

LABEL version="3.0.0"

RUN dnf update -y && \
    dnf install -y \
        cyrus-sasl-devel \
        gcc \
        gcc-c++ \
        libffi-devel \
        openldap-devel \
        openssl-devel \
        python3-devel \
        python3-pip && \
    pip install --upgrade pip && \
    python3 -m venv venv

RUN . venv/bin/activate && \
    pip install --upgrade setuptools pip && \
    pip install \
        apache-superset==2.0.0 \
        # See: https://github.com/apache/superset/issues/20942
        Flask==2.1.3 \
        Jinja2==3.0.1 \
        Werkzeug==2.0.3 \
        WTForms==2.3.3 \
        psycopg2-binary

ENV LANG en_US.utf-8
ENV PATH /venv/bin:$PATH
ENV PYTHONPATH /root/.superset
ENV FLASK_APP superset
COPY superset_config.py /root/.superset/

COPY wait-for-it.sh /wait-for-it.sh
COPY entrypoint.sh /entrypoint.sh
COPY init.sh /init.sh

RUN chmod +x /wait-for-it.sh /entrypoint.sh /init.sh

ENTRYPOINT ["/wait-for-it.sh", "-t", "0", "superset-db:5432", "--", "/entrypoint.sh"]
