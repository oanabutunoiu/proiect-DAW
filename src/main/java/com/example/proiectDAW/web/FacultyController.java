package com.example.proiectDAW.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.proiectDAW.domain.*;

@RestController
public class FacultyController {
	@Autowired
	private FacultyRepository facultyRepository;
	
	public FacultyController(FacultyRepository facultyRepository)
	{
		this.facultyRepository = facultyRepository;
	}
	
	@GetMapping("/faculties")
	public List<Faculty> findAll() {
		List<Faculty> faculties = new ArrayList<>();
		facultyRepository.findAll().forEach(i -> faculties.add(i));

		return faculties;
	}
	
	@GetMapping("/faculties/{id}")

	public Faculty findFacultyById(@PathVariable long id) {
		return !facultyRepository.findById(id).isPresent()
				? facultyRepository.findById(id).get()
				: null;
	}
}
