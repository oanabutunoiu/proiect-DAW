package com.example.proiectDAW;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import static org.assertj.core.api.Assertions.assertThat;
import com.example.proiectDAW.domain.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class FacultyRepositoryTest {
	
	
	private Faculty faculty;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private FacultyRepository repository;
	
	@Test
	public void saveFaculty() {
		faculty = new Faculty("info");
		entityManager.persistAndFlush(faculty);
		assertThat(faculty.getId()).isNotNull();
	}
	
	@Test
	public void deleteFaculties() {
		
		repository.deleteAll();
		assertThat(repository.findAll()).isEmpty();
	}
}
