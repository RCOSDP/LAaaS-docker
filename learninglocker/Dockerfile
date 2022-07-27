# Consult http://docs.learninglocker.net/guides-custom-installation/
FROM centos:centos7

LABEL version="2.0.1"

SHELL ["/bin/bash", "-c"]
RUN yum update -y && \
    yum -y install curl git python make automake gcc gcc-c++ kernel-devel xorg-x11-server-Xvfb git-core

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash && \
    source ~/.bashrc && \
    nvm install 8.15.1 && \
    npm install -g yarn && \
    npm install -g pm2@4 && \
    pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:compress true

# Install and build the Learning Locker UI, API, and Worker
WORKDIR /usr/local/src
RUN git clone https://github.com/LearningLocker/learninglocker.git --depth 1 -b v5.2.6

WORKDIR /usr/local/src/learninglocker
COPY .env.learninglocker .env

RUN source ~/.bashrc && \
    yarn install && \
    yarn build-all

# Install xAPI service
WORKDIR /usr/local/src
RUN git clone https://github.com/LearningLocker/xapi-service.git --depth 1 -b v2.9.11

WORKDIR /usr/local/src/xapi-service
COPY .env.xapi-service .env
RUN source ~/.bashrc && \
    yarn install --ignore-engines && \
    yarn build
