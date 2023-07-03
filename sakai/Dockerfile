FROM maven:3.6.0-jdk-8 as build

# Download and install Apache Tomcat
RUN mkdir -p /opt/tomcat
RUN wget --no-check-certificate https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.72/bin/apache-tomcat-8.5.72.tar.gz -O /opt/tomcat/tomcat.tar.gz
RUN tar -C /opt/tomcat -xf /opt/tomcat/tomcat.tar.gz --strip-components 1

# Configure Tomcat
# See https://confluence.sakaiproject.org/display/BOOT/Install+Tomcat+8
ENV CATALINA_HOME /opt/tomcat
COPY context.xml /opt/tomcat/conf/

# Build Sakai with settings.xml that forces maven to use HTTPS
# Skip tests to speed up the container build
RUN git clone --depth 1 --branch 12.6 https://github.com/sakaiproject/sakai.git
WORKDIR sakai
COPY settings.xml /usr/share/maven/ref/
RUN mvn -s /usr/share/maven/ref/settings.xml install sakai:deploy -Dmaven.test.skip=true -DskipTests -Dmaven.tomcat.home=/opt/tomcat

# Install SakaiXAPI-Provider
RUN git clone --depth 1 --branch 12.x https://github.com/Apereo-Learning-Analytics-Initiative/SakaiXAPI-Provider.git
WORKDIR SakaiXAPI-Provider
COPY patches patches
# Change version to 12.6
RUN echo "deb http://archive.debian.org/debian/ stretch main" > /etc/apt/sources.list && \
    echo "deb http://archive.debian.org/debian-security stretch/updates main" >> /etc/apt/sources.list && \
    apt-get update -y && \
    apt-get install -y patch
RUN patch -u pom.xml < ./patches/SakaiXAPI-Provider/pom.xml.patch
RUN patch -u impl/pom.xml < ./patches/SakaiXAPI-Provider/impl/pom.xml.patch
RUN patch -u pack/pom.xml < ./patches/SakaiXAPI-Provider/pack/pom.xml.patch
RUN mvn -s /usr/share/maven/ref/settings.xml clean install sakai:deploy -Dmaven.tomcat.home=/opt/tomcat

FROM openjdk:8

LABEL version="1.0.0"

# Copy Sakai configuration
COPY sakai.properties /opt/tomcat/sakai/

# Install MySQL connector
RUN wget http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.36.tar.gz
RUN tar -zxvf mysql-connector-java-5.1.36.tar.gz
RUN mkdir /opt/tomcat/lib
RUN mv mysql-connector-java-5.1.36/mysql-connector-java-5.1.36-bin.jar /opt/tomcat/lib/mysql-connector-java-5.1.36-bin.jar

# Copy Sakai and Tomcat
COPY --from=build /opt/tomcat /opt/tomcat

# Run Sakai
EXPOSE 8080
WORKDIR /opt/tomcat/bin
CMD ./startup.sh && tail -f ../logs/catalina.out
