package it.unicam.cs.digital_library

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication


@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class DigitalLibraryApplication

fun main(args: Array<String>) {
	runApplication<DigitalLibraryApplication>(*args)
}
