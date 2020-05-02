package com.example.proiectDAW.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;

import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler" })
public class Faculty {
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "faculty")
	private List<Student> students;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String name;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	public Faculty(String name) {
		super();
		this.name = name;
	}
	
	public Faculty() {
		
	}
	
	
	@Override
	public String toString() {
		return "Faculty [students=" + students + ", id=" + id + ", name=" + name + "]";
	}
	
	
	
	
}
