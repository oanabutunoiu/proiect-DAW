package com.example.proiectDAW.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
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
	
	@PostMapping(value = "/faculties", consumes = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public Faculty postFaculty(@RequestBody Faculty faculty) {
		return facultyRepository.save(faculty);
	}
	
	@PutMapping("/faculties/{id}")
	public Faculty putFaculty(@RequestBody Faculty faculty) {
		return facultyRepository.save(faculty);
	}

	@PatchMapping(path = "/faculties/{id}", consumes = "application/json")
	public Faculty patchFaculty(@PathVariable long id,
			@RequestBody Faculty patch) {
		Faculty faculty = facultyRepository.findById(id).get();
		if (patch.getName() != null) {
			faculty.setName(patch.getName());
		}
		return facultyRepository.save(faculty);
	}

	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	@DeleteMapping("faculties/{id}")
	public void deleteFaculty(@PathVariable long id) {
		try {
			facultyRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
		}
	}
}
