package com.example.proiectDAW.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;
import com.example.proiectDAW.domain.*;

@RestController
public class StudentController {

	@Autowired
	private StudentRepository studentRepository;
	
	public StudentController(StudentRepository studentRepository)
	{
		this.studentRepository = studentRepository;
	}
	
	@GetMapping("/students")
	public List<Student> findAll() {
		List<Student> students = new ArrayList<>();
		studentRepository.findAll().forEach(i -> students.add(i));

		return students;
	}
	
	@GetMapping("/students/{id}")

	public Student findStudentById(@PathVariable long id) {
		return !studentRepository.findById(id).isPresent()
				? studentRepository.findById(id).get()
				: null;
	}
	
	@GetMapping("/studentsbycnp/{cnp}")

	public Student findStudentByCnp(@PathVariable String cnp) {
		return !studentRepository.findByCnp(cnp).isEmpty()
				? studentRepository.findByCnp(cnp).get(0)
				: null;
	}
	
	@PostMapping(value = "/students", consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Student postStudent(@RequestBody Student student) {
		return studentRepository.save(student);
	}
	
	@PutMapping("/students/{id}")
	public Student putStudent(@RequestBody Student student) {
		return studentRepository.save(student);
	}

	@PatchMapping(path = "/students/{id}", consumes = "application/json")
	public Student patchStudent(@PathVariable long id,
			@RequestBody Student patch) {
		Student student = studentRepository.findById(id).get();
		if (patch.getName() != null) {
			student.setName(patch.getName());
		}
		if (patch.getCnp() != null) {
			student.setCnp(patch.getCnp());
		}
		if (patch.getName() != null) {
			student.setName(patch.getName());
		}
		if (patch.getRegistrationNo() != null) {
			student.setRegistrationNo(patch.getRegistrationNo());
		}
		if (patch.getYear() != 0) {
			student.setYear(patch.getYear());
		}
		return studentRepository.save(student);
	}

	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	@DeleteMapping("students/{id}")
	public void deleteStudent(@PathVariable long id) {
		try {
			studentRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
		}
	}
}
