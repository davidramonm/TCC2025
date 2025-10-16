FROM eclipse-temurin:21
ARG JAR_FILE=EstablishmentsService-0.0.1-SNAPSHOT.jar
RUN mkdir /opt/app
COPY ${JAR_FILE} /opt/app/app.jar
ENTRYPOINT ["java","-jar","/opt/app/app.jar"]