package com.example.proiectDAW;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
import com.example.proiectDAW.web.*;

@SpringBootTest
class ProiectDawApplicationTests {

	@Autowired
	private StudentController studentController;
	
	@Autowired
	private FacultyController facultyController;
	
	@Test
	void contextLoads() {
		assertThat(studentController).isNotNull();
		assertThat(facultyController).isNotNull();
	}

}
