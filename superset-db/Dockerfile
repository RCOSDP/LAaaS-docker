FROM postgres:12-bullseye

LABEL version="3.0.0"

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
      git \
      postgresql-12-python3-multicorn \
      python3-setuptools

# Install yam_fdw
WORKDIR /usr/local/src
RUN git clone https://github.com/udzuki/yam_fdw.git && \
    cd yam_fdw && \
    python3 setup.py install
