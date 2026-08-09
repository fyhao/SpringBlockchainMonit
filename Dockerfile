FROM eclipse-temurin:17-jdk-jammy AS build

ARG NODE_VERSION=18.20.8
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates xz-utils \
    && curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
COPY BlockchainMonit/ ./
RUN chmod +x gradlew && ./gradlew --no-daemon clean bootJar

FROM eclipse-temurin:17-jre-jammy
RUN useradd --system --uid 10001 spring
WORKDIR /app
COPY --from=build /workspace/build/libs/BlockchainMonit-0.1.0.jar app.jar
USER spring
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "exec java ${JAVA_OPTS:-} -jar app.jar --server.port=${PORT:-8080}"]
