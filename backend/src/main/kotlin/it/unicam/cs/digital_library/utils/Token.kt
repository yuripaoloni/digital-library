package it.unicam.cs.digital_library.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import java.util.*

object Token {
    fun createToken(subject: String, secret: String, expirationInMillis: Long): String {
        return JWT.create()
            .withSubject(subject)
            .withExpiresAt(Date(System.currentTimeMillis() + expirationInMillis))
            .sign(Algorithm.HMAC512(secret))
    }

    fun getToken(token: String, secret: String): DecodedJWT? {
        return kotlin.runCatching {
            JWT.require(Algorithm.HMAC512(secret))
                .build()
                .verify(token)
        }.getOrNull()
    }
}