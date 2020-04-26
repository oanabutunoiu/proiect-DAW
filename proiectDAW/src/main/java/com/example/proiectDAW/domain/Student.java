package com.example.proiectDAW.domain;

import javax.persistence.*;

@Entity
public class Student {
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "faculty")
	private Faculty faculty;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String cnp;
	private String name;
	private String registrationNo;
	private int year;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCnp() {
		return cnp;
	}
	public void setCnp(String cnp) {
		this.cnp = cnp;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRegistrationNo() {
		return registrationNo;
	}
	public void setRegistrationNo(String registrationNo) {
		this.registrationNo = registrationNo;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	
	
	public Faculty getFaculty() {
		return faculty;
	}
	public void setFaculty(Faculty faculty) {
		this.faculty = faculty;
	}
	public Student(String cnp, String name, String registrationNo, int year) {
		super();
		this.cnp = cnp;
		this.name = name;
		this.registrationNo = registrationNo;
		this.year = year;
	}
	@Override
	public String toString() {
		return "Student [faculty=" + faculty + ", id=" + id + ", cnp=" + cnp + ", name=" + name + ", registrationNo="
				+ registrationNo + ", year=" + year + "]";
	}
	
	
	
}
