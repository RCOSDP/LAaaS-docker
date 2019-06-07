FROM centos:centos7
RUN yum update -y && \
    yum install -y epel-release && \
    rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm && \
    yum install -y yum-utils && \
    yum-config-manager --enable remi remi-php56 && \
    yum install -y \
      deltarpm \
      gcc-c++ \
      git \
      httpd \
      make \
      mongodb \
      mongodb-server \
      nodejs \
      npm \
      php \
      php-bcmath \
      php-cli \
      php-common \
      php-gd \
      php-mbstring \
      php-mcrypt \
      php-mysqlnd \
      php-pear \
      php-pecl-mongo \
      php-xml \
      wget

WORKDIR /usr/local/src
RUN npm install -g bower && \
    curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

WORKDIR /var/www
RUN wget https://github.com/LearningLocker/learninglocker/archive/v1.17.0.tar.gz && \
    tar -xvzf v1.17.0.tar.gz && rm -f v1.17.0.tar.gz && \
    mv learninglocker-1.17.0 learninglocker

WORKDIR /var/www/learninglocker
RUN composer install
COPY index.php ./public
COPY database.php ./app/config/
COPY httpd.conf /etc/httpd/conf/httpd.conf
COPY mongodb/setup.sh db_setup.sh
RUN chown -R apache.apache . && \
    php artisan key:generate

EXPOSE 27017
