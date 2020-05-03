'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const util = require('./Util');
$ = require('jquery');

class Student extends React.Component{
	render() {
		return (
			<tr class="row">
				<td><input type="radio" name="student" onClick={util.studentSelected} value={this.props.student.id} /></td>
				<td>{this.props.student.cnp}</td>
				<td>{this.props.student.name}</td>
				<td>{this.props.student.registrationNo}</td>
				<td>{this.props.student.faculty.name}</td>
				<td>{this.props.student.year}</td>
			</tr>
		)
	}
}


class StudentList extends React.Component{
	render() {
		const students = this.props.students.map(student =>
			<Student key={student.id} student={student} />
		);
		return (
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>CNP</th>
						<th>Full Name</th>
						<th>Registration No.</th>
						<th>Faculty</th>
						<th>Year</th>
					</tr>
					{students}
				</tbody>
			</table>
		)
	}
}

class Faculty extends React.Component{
	render() {
		return (
			<option value = {this.props.faculty.id}>{this.props.faculty.name}</option>
		)
	}
}


class FacultyList extends React.Component{
	render() {
		const faculties = this.props.faculties.map(faculty =>
			<Faculty key={faculty.id} faculty={faculty} />
		);
		return (
			<select id = "facultySelect" name = "facultySelect">
					{faculties}
			</select>
		)
	}
}



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {students: [], faculties: []};
	}

	componentDidMount() { 
		
		client({method: 'GET', path: '/faculties'}).then(response => {
			this.setState({faculties: response.entity});
		});
		
		client({method: 'GET', path: '/students'}).then(response => {
			this.setState({students: response.entity});
		});
		
		
	}
	

	render() {
		return (
			<div>
				<StudentList students={this.state.students} />
				<br /> <br />
				<div id = "myButtons">
				 	<input type="button" id="insert" class="ok" value="Insert student"  onClick={util.insertButtonPressed} />
				</div>
				<div id = "updateDeleteForm" display="none">
				<form>
					<label for="fname">Full name:  </label> 
					<input type="text" id="fname" name="fname" />><br />
					<label for="cnp">CNP:  </label><br />
					<input type="text" id="cnp" name="cnp" /><br />
					<label for="regno">Registration Number:  </label>
					<input type="text" id="regno" name="regno" /><br />
					<label for="facultySelect">Faculty:  </label>
					<FacultyList faculties ={this.state.faculties} /> <br />
					<label for="year">Year: </label>
					<select id="year" name = "year">
					  <option value="1">1</option>
					  <option value="2">2</option>
					  <option value="3">3</option>
					</select> <br />
					<br />
					<input type="submit" class="ok" value="Submit" />
				</form>
				</div>
			</div>
		)
	}
	
	updateButtonPressed(){
		
		document.getElementById('fname').value = "{this.state.students[util.selected].name}";
		document.getElementById('cnp').value = "{this.state.students[util.selected].cnp}";
		document.getElementById('regno').value = "{this.state.students[util.selected].registrationNo}";
		document.getElementById('year').value = "{this.state.students[util.selected].year}";
		document.getElementById('facultySelect').value = "{this.state.students[util.selected].faculty.name}";
		document.getElementById('updateDeleteForm').display = initial;
	}
	
	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true){
			document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick={util.insertButtonPressed} />";
		}
			
	}
}


ReactDOM.render(
		<App />,
		document.getElementById('react')
	)
	