package com.example.proiectDAW.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.proiectDAW.domain.*;

@RestController
public class StudentController {

	@Autowired
	private StudentRepository repository;
	
	@RequestMapping("/students")
	public Iterable<Student> getStudents() {
	// De implementat
	return null;
	}
}
