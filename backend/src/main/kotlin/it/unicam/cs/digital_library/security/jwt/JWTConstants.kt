package it.unicam.cs.digital_library.security.jwt

object JWTConstants {
    const val SECRET = "DIGITAL_LIBRARY"
    const val SECRET_1 = "DIGITAL_LIBRARY_PASSWORD_RECOVERY"
    const val EXPIRATION_TIME: Long = 3600000 // 1 hour
    const val TOKEN_PREFIX = "Bearer "
    const val HEADER_STRING = "Authorization"
    const val SIGN_UP_URL = "/signup"
    const val LOGIN_URL = "/login"
}