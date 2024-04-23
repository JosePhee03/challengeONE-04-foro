
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
# Descarga las dependencias del proyecto (esto se puede cachear si el archivo pom.xml no cambia)
RUN mvn dependency:go-offline
COPY src src
# Compila la aplicación
RUN mvn package -DskipTests

# Utiliza una imagen más liviana de Java para la ejecución de la aplicación
FROM openjdk:17-jdk-alpine
WORKDIR /app
# Copia el archivo JAR generado en la etapa de construcción anterior
COPY --from=build /app/target/*.jar /app/java-app.jar
# Define el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "java-app.jar"]
EXPOSE 8080