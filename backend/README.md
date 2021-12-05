# Digital Library backend

This repo contains digital library backend.

## Prerequisites
In order to run the server you need to have a Java compiler installed (java 11+).

## Run
```shell script
./gradlew bootRun # Compiles and runs the server
```

## Port configuration
By default the server is started on the **8080** port.

In order to change that you need to add the following line to the `./src/main/resources/application.properties` file.
```shell script
server.port=your port
```

## Host
The server is hosted at: https://digital-library-2021.herokuapp.com