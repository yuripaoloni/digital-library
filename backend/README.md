# Digital Library backend

The Digital Library backend was built with:

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Kotlin](https://kotlinlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting started

These are the steps to follow to configure the backend.

### Prerequisites

1. Java 11 is needed to compile the server
2. A PostgreSQL server is needed to run the server

### Installation

1. Clone the repository: `git clone https://github.com/FabrizioFornari/SPM2021-YMLA.git`
2. Move into the backend folder

### Run & Build

- To build the server use: `./gradlew build`

Before running the server, you must set the following Spring Boot Database environment variables to connect to your
PostgreSQL server:

```
SPRING_DATASOURCE_URL="jdbc:postgresql://hostname:port/dbname"
SPRING_DATASOURCE_USERNAME="username"
SPRING_DATASOURCE_PASSWORD="password"
```

- To run the server use: `./gradlew bootRun`

By default, the server is started on the 8080 port but if you want to change that you need to add the following line to
the `./src/main/resources/application.properties` file.

```shell script
server.port=your port
```

### Testing

The tests were written using the Spring Boot testing framework and H2 in-memory database to mock a real database.

- To execute the tests: `./gradlew clean test`

### Host

The server is hosted at: https://digital-library-2021.herokuapp.com 