FROM centos:centos7

# Install dependencies
RUN yum update -y && \
    yum install -y \
      gcc \
      gcc-c++ \
      git \
      make \
      python-devel \
      which

# Install pip and setuptools
RUN yum install -y epel-release && \
    yum install -y python-pip && \
    pip install --upgrade pip && \
    pip install setuptools --upgrade

# Install PostgreSQL 9.6
RUN yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm && \
    yum install -y \
      postgresql96-contrib \
      postgresql96-devel \
      postgresql96-server

# Add path to commands
ENV PATH $PATH:/usr/pgsql-9.6/bin

# Install Multicorn
WORKDIR /usr/local/src
RUN git clone git://github.com/Kozea/Multicorn.git --depth 1 -b v1.4.0 && \
    cd Multicorn && \
    make && make install

# Install yam_fdw
WORKDIR /usr/local/src
RUN git clone https://github.com/asya999/yam_fdw.git && \
    cd yam_fdw && \
    python setup.py install

# Prepare init scripts
USER postgres
ENV PGDATA /var/lib/pgsql/9.6/data
COPY --chown=postgres:postgres \
  entrypoint.sh pg_hba.conf postgresql.conf setup.sql /init/
RUN chmod 755 /init/entrypoint.sh
EXPOSE 5432
ENTRYPOINT ["/init/entrypoint.sh"]
CMD ["postgres"]
