FROM openjdk:17-jdk-alpine
WORKDIR /public-chat-room/server
COPY . .
RUN ./mvnw dependency:go-offline
CMD ["./mvnw", "spring-boot:run"]
