const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');


class StudentList extends React.Component{
	render() {
		const students = this.props.students.map(student =>
			<Student key={student._links.self.href} student={student} />
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

class Student extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.student.cnp}</td>
				<td>{this.props.student.name}</td>
				<td>{this.props.student.registrationNo}</td>
				<td>{this.props.student.faculty}</td>
				<td>{this.props.student.year}</td>
			</tr>
		)
	}
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {students: []};
	}

	componentDidMount() { 
		client({method: 'GET', path: '/api/students'}).done(response => {
			this.setState({students: response.entity._embedded.students});
		});
	}

	render() {
		return (
			<StudentList students={this.state.students} />
		)
	}
}

ReactDOM.render(
		<App />,
		document.getElementById('react')
	)