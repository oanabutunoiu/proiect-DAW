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
				<StudentList students={this.state.students} />
				<br /> <br />
				<div id = "myButtons">
				 	<input type="button" id="insert" class="ok" value="Insert student"  onClick={window.util.insertButtonPressed} />
				 	<br />
				 	<br />
				</div>
				<form id = "updateDeleteForm" method ="post" onSubmit = {window.util.handleSubmit}>
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
	