FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE
COPY build/libs/BlockchainMonit-0.1.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]