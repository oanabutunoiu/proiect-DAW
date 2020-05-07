package com.example.proiectDAW;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProiectDawApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ProiectDawApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ProiectDawApplication.class);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			// username: user password: user
			// username: admin password: admin

		};
	}

}
