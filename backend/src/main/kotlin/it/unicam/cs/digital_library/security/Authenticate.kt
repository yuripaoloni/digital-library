package it.unicam.cs.digital_library.security

import org.springframework.security.access.annotation.Secured

@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FUNCTION)
@Secured("ROLE_USER")
annotation class Authenticate