package vadmark.afp.config

import org.flywaydb.core.Flyway
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class FlywayConfig {
    @Bean
    fun flyway(): Flyway {
        return Flyway.configure()
            .dataSource("jdbc:postgresql://localhost:5432/afp", "postgres", "root")
            .schemas("afp_schema")
            .cleanDisabled(false)
            .load()
    }

    @Bean
    fun flywayInitializer(flyway: Flyway): CommandLineRunner {
        return CommandLineRunner {
            flyway.clean()
            flyway.migrate()
        }
    }
}
