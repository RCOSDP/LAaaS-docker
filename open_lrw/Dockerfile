FROM alpine/git AS src

LABEL version="2.2.0"

WORKDIR /app
RUN git clone -b develop https://github.com/udzuki/OpenLRW.git
WORKDIR OpenLRW
RUN git checkout 07d409d8b0803e0a29ab26014fb1676a4f446461
WORKDIR /app
RUN git clone -b develop https://github.com/udzuki/lai-event.git
WORKDIR lai-event
RUN git checkout 8b421d446a74cc186086d4a71a68481f65ae2452
WORKDIR /app/OpenLRW
RUN cp -r ../lai-event/src/main/java/org/apereo/openlrw/ src/main/java/org/apereo/openlrw/

### BUILD image
# Modified from https://blog.pavelsklenar.com/spring-boot-run-and-build-in-docker/

# Run this as docker-compose up
FROM maven:3-jdk-8 AS builder
#Copy Custom Maven settings
#COPY settings.xml /root/.m2/
# create app folder for sources
RUN mkdir -p /build
WORKDIR /build
COPY --from=src /app/OpenLRW/pom.xml /build

# IMS Global Caliper (since it's not yet released)
#COPY ../repo/org/imsglobal /root/.m2/repository/org/imsglobal
# Download all required dependencies into one layer
RUN mvn -B dependency:resolve dependency:resolve-plugins
#RUN mvn dependency:resolve-plugins

# Copy source code
COPY --from=src /app/OpenLRW/src /build/src

# Build application
RUN mvn package

FROM openjdk:8-slim as runtime
EXPOSE 9966

ENV APP_HOME /app

# Create base app folder
RUN mkdir $APP_HOME
# Create folder to save configuration files
RUN mkdir $APP_HOME/config
# Create folder with application logs
RUN mkdir $APP_HOME/log

VOLUME $APP_HOME/log
VOLUME $APP_HOME/config

WORKDIR $APP_HOME
# Copy executable jar file from the builder image
COPY --from=builder /build/target/*.jar app.jar

COPY docker-start.sh $APP_HOME/docker-start.sh

CMD ["$APP_HOME/docker-start.sh"]
