FROM openjdk:17-jdk-alpine
COPY target/api-0.0.1-SNAPSHOT.jar /app/java-app.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "java-app.jar"]