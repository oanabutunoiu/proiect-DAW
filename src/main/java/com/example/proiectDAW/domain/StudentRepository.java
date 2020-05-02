package com.example.proiectDAW.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StudentRepository extends CrudRepository<Student, Long> {
	
	List<Student> findByName(@Param("name") String name);
	List<Student> findByCnp(@Param("cnp") String cnp);
	List<Student> findByRegistrationNo(@Param("registrationNo") String registrationNo);
	List<Student> findByYear(@Param("year") int year);
}
