FROM amazoncorretto:21

COPY build/libs/aircraft-flight-plan-*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
