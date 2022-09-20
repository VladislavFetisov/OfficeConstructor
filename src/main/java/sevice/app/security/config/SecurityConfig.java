package sevice.app.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import sevice.app.security.handlers.AuthFailureHandler;
import sevice.app.security.handlers.AuthSuccessHandler;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .and()
                .formLogin()
                .successHandler(new AuthSuccessHandler())
                .failureHandler(new AuthFailureHandler())
                .loginPage("/login").permitAll();
        http.csrf().disable();
        return http.build();
    }



}
