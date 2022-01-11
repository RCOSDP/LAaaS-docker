FROM centos:centos7

LABEL version="2.3.1"

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
RUN curl https://bootstrap.pypa.io/pip/2.7/get-pip.py -o get-pip.py && \
    python get-pip.py

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
RUN git clone https://github.com/Kozea/Multicorn.git --depth 1 -b v1.4.0 && \
    cd Multicorn && \
    make && make install

# Install yam_fdw
WORKDIR /usr/local/src
RUN git clone https://github.com/udzuki/yam_fdw.git && \
    cd yam_fdw && \
    python setup.py install

# Prepare init scripts
USER postgres
ENV PGDATA /var/lib/pgsql/9.6/data
COPY --chown=postgres:postgres \
  entrypoint.sh pg_hba.conf postgresql.conf setup.sh /init/
RUN chmod 755 /init/entrypoint.sh /init/setup.sh
EXPOSE 5432
ENTRYPOINT ["/init/entrypoint.sh"]
CMD ["postgres"]
