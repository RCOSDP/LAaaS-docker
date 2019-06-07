FROM centos:centos7
WORKDIR /usr/local/src
COPY setup.sql .
RUN yum update -y && \
    yum install -y epel-release && \
    yum install -y https://download.postgresql.org/pub/repos/yum/9.4/redhat/rhel-7-x86_64/pgdg-centos94-9.4-3.noarch.rpm && \
    yum install -y postgresql94 postgresql94-server postgresql94-contrib postgresql94-devel.x86_64 && \
    yum install -y pgxnclient python-devel python-pip python-psycopg2 && \
    python -m pip install pymongo==3.1.1 && \
    yum install -y make gcc gcc-c++ which git && \
    export PATH=/usr/pgsql-9.4/bin:$PATH && \
    pgxn install multicorn && \
    pip install --upgrade pip && \
    pip install setuptools --upgrade && \
    git clone https://github.com/asya999/yam_fdw.git
WORKDIR /usr/local/src/yam_fdw
RUN python setup.py install
USER postgres
RUN /usr/pgsql-9.4/bin/initdb -D /var/lib/pgsql/9.4/data
COPY postgresql.conf /var/lib/pgsql/9.4/data/
COPY pg_hba.conf /var/lib/pgsql/9.4/data/
USER root
RUN chown postgres:postgres /var/lib/pgsql/9.4/data/postgresql.conf /var/lib/pgsql/9.4/data/pg_hba.conf
USER postgres
RUN  /usr/pgsql-9.4/bin/pg_ctl -D /var/lib/pgsql/9.4/data -l /var/lib/pgsql/9.4/data/log start && \
     sleep 5 && \
     psql -f /usr/local/src/setup.sql
