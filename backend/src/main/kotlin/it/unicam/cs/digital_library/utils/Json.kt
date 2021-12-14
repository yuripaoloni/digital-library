package it.unicam.cs.digital_library.utils

import com.fasterxml.jackson.module.kotlin.KotlinFeature
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue

fun Any.toJson(): String {
    return try {
        jacksonObjectMapper().registerModule(
            KotlinModule.Builder().configure(KotlinFeature.NullIsSameAsDefault, true).build()
        ).writerWithDefaultPrettyPrinter().writeValueAsString(this)
    } catch (e: Exception) {
        ""
    }
}


inline fun <reified T> String.fromJson(): T? {
    return try {
        jacksonObjectMapper().apply {
            registerModule(
                KotlinModule.Builder().configure(KotlinFeature.NullIsSameAsDefault, true).build()
            )
        }.readValue<T>(this)
    } catch (e: Exception) {
        null
    }
}