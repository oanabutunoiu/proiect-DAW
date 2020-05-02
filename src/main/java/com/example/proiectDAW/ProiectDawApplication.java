package com.example.proiectDAW;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.proiectDAW.domain.*;

@SpringBootApplication
public class ProiectDawApplication {

	@Autowired
	private FacultyRepository facultyRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private UserAccountRepository userAccountRepository;

	public static void main(String[] args) {
		SpringApplication.run(ProiectDawApplication.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			// username: user password: user
			// username: admin password: admin
			
			
		};
	}

}
