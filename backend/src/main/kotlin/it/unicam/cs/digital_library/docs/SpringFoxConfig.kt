package it.unicam.cs.digital_library.docs

import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.ApiInfo
import springfox.documentation.service.ApiKey
import springfox.documentation.service.SecurityScheme
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import java.util.function.Predicate

@PropertySource("classpath:swagger.properties")
@Configuration
class SpringFoxConfig {
    @Bean
    fun api(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .paths(Predicate.not(PathSelectors.regex("/error.*")))
            .build()
            .useDefaultResponseMessages(false)
            .securitySchemes(securitySchemes())
    }

    @Bean
    fun apiInfo(): ApiInfo {
        return ApiInfoBuilder()
            .title("Digital Library APIs")
            .build()
    }

    @Bean
    fun securitySchemes(): List<SecurityScheme>? {
        return listOf(ApiKey(JWTConstants.TOKEN_PREFIX, JWTConstants.HEADER_STRING, "header"))
    }
}