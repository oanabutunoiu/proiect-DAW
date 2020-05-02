'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class Student extends React.Component{
	render() {
		return (
			<tr>
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
			<Student student={student} />
		);
		return (
			<table>
				<tbody>
					<tr>
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
			</div>
		)
	}
}

ReactDOM.render(
		<App />,
		document.getElementById('react')
	)