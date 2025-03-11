package com.licenta.student_academic_data.Config;

import com.licenta.login.Config.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfigStudent {

    @Autowired
    private final JwtFilter jwtFilter;

    public SecurityConfigStudent(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }


    @Bean(name = "studentSecurityConfig")
    public SecurityFilterChain studentSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configure(http))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//        http.csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(auth -> auth
//                        .anyRequest().permitAll()
//                )
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
