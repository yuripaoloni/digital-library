package it.unicam.cs.digital_library.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.thymeleaf.spring5.SpringTemplateEngine
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver
import org.thymeleaf.templateresolver.ITemplateResolver

@Configuration
class TemplateEngineConfig {
    @Bean
    fun templateEngine(): SpringTemplateEngine {
        val templateEngine = SpringTemplateEngine()
        templateEngine.addTemplateResolver(templateResolver())
        return templateEngine
    }

    private fun templateResolver(): ITemplateResolver {
        val resolver = ClassLoaderTemplateResolver()
        resolver.prefix = "templates/"
        resolver.suffix = ".html"
        resolver.setTemplateMode("HTML5")
        resolver.order = 1
        resolver.isCacheable = true
        return resolver
    }
}