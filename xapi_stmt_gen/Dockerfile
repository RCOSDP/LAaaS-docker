FROM centos:centos7

RUN yum update -y && \
    yum install -y epel-release && \ 
    yum install -y \
      gcc-c++ \
      make \
      nodejs \
      npm

WORKDIR /usr/local/src
RUN npm install \
      adl-xapiwrapper \
      fs \
      pg \
      sprintf-js \
      sync \
      system-sleep && \
    mkdir xapi_stmt_gen

WORKDIR /usr/local/src/xapi_stmt_gen
COPY xapi_stmt_gen .
RUN tar -zxvf node_modules.tar.gz && rm -f node_modules.tar.gz
