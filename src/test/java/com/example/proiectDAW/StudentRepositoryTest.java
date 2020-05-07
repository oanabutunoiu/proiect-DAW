package com.example.proiectDAW;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.example.proiectDAW.domain.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class StudentRepositoryTest {
	
	private Student student;

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private StudentRepository repository;

	@Test
	public void saveStudent() {
		student = new Student("1234567890987", "Abcdefg Hijkl", "2345", 1);
		entityManager.persistAndFlush(student);
		assertThat(student.getId()).isNotNull();
	}

	@Test
	public void deleteStudents() {

		repository.deleteAll();
		assertThat(repository.findAll()).isEmpty();
	}
}
