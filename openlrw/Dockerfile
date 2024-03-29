FROM alpine/git AS src

LABEL version="2.3.0"

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

FROM maven:3-jdk-8 AS builder

# Create app folder for sources
RUN mkdir -p /build
WORKDIR /build
COPY --from=src /app/OpenLRW/pom.xml /build

# Download all required dependencies into one layer
RUN mvn -B dependency:resolve dependency:resolve-plugins

# Copy source code
COPY --from=src /app/OpenLRW/src /build/src

# Build application
RUN mvn package

FROM openjdk:8-slim-buster as runtime
EXPOSE 9966

ENV APP_HOME /app

RUN apt-get update && apt-get -y upgrade
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
