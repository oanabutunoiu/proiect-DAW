const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
window.util = require('./Util');
const $ = require('jquery');

class Student extends React.Component{
	
	
	render() {
		return (
			<tr class="row">
				<td><input type="radio" name="student" onClick={window.util.studentSelected} value={this.props.student.id} /></td>
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

class FacultyRow extends React.Component{
	render() {
		return (
				<tr class="row">
					<td><input type="radio" name="faculty" onClick={window.util.facultySelected} value={this.props.faculty.id} /></td>
					<td>{this.props.faculty.name}</td>
				</tr>
		)
	}
}


class FacultyList extends React.Component{
	render() {
		const faculties = this.props.faculties.map(faculty =>
			<Faculty key={faculty.id} faculty={faculty} />
		);
		return (
			<select id = "facultySelect" name = "facultySelect" required>
					{faculties}
			</select>
		)
	}
}

class FacultyTable extends React.Component{
	render() {
		const faculties = this.props.faculties.map(faculty =>
			<FacultyRow key={faculty.id} faculty={faculty} />
		);
		return (
				<table>
				<tbody>
					<tr>
						<th></th>
						<th>Faculty Name</th>
					</tr>
					{faculties}
				</tbody>
			</table>
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
		
		window.util.studentList = this.state.students;
		window.util.facultyList = this.state.faculties;
		
		return (
			<div>
				<div id = "viewButtons">
					<input type="button" id="viewStudents" class="ok" value="View students"  onClick={window.util.viewStudents} />       <input type="button" id="viewFaculties" class="ok" value="View faculties"  onClick={window.util.viewFaculties} />
					<br />
					<br />
				</div>
				<div id = "tableFaculties">
					<FacultyTable faculties={this.state.faculties} />
				</div>
				<div id = "tableStudents">
					<StudentList students={this.state.students} />
				</div>
				<br /> <br />
				<div id = "myStudentButtons">
				 	<input type="button" id="insert" class="ok" value="Insert student"  onClick={window.util.insertButtonPressed} />
				 	<br />
				 	<br />
				</div>
				<div id = "myFacultyButtons">
			 		<input type="button" id="insert" class="ok" value="Insert faculty"  onClick={window.util.insertFacultyButtonPressed} />
			 		<br />
			 		<br />
			 	</div>
				<form id = "updateDeleteFacultiesForm" method ="get" onSubmit = {window.util.handleSubmitFaculty}>
					<label for="facname">Faculty name:  </label> 
					<input type="text" id="facname" name="facname" required /><br />
					
					<input type="submit" class="ok" value="Submit" />
					<br />
					<br />
				</form>
				<form id = "updateDeleteStudentsForm" method ="get" onSubmit = {window.util.handleSubmit}>
				<label for="fname">Full name:  </label> 
				<input type="text" id="fname" name="fname" required /><br />
				<label for="cnp">CNP:  </label>
				<input type="text" id="cnp" name="cnp" required /><br />
				<label for="regno">Registration Number:  </label>
				<input type="text" id="regno" name="regno" required /><br />
				<label for="facultySelect">Faculty:  </label>
				<FacultyList faculties ={this.state.faculties} /> <br />
				<label for="year">Year: </label>
				<select id="year" name = "year" required>
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				</select> <br />
				<br />
				<input type="submit" class="ok" value="Submit" />
				<br />
				<br />
			</form>
			</div>
		)
	}
	
}

ReactDOM.render(
		<App />,
		document.getElementById('react')
	)
	