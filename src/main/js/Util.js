$ = require('jquery');

class Util {
	
	constructor(){
		this.studentList = [];
	}
	
	studentSelected(){
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='window.util.updateButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='window.util.deleteButtonPressed()' /> <br /><br />";
	}
	
	insertButtonPressed(){
		
		document.getElementById('fname').value = '';
		document.getElementById('cnp').value = '';
		document.getElementById('regno').value = '';
		document.getElementById('year').value = '';
		document.getElementById('facultySelect').value = '';
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}


	updateButtonPressed(){
	
		var currentStudent = studentList.find(element => element.id == $('input[name="student"]:checked').val());
		document.getElementById('fname').value = currentStudent.name;
		document.getElementById('cnp').value = currentStudent.cnp;
		document.getElementById('regno').value = currentStudent.registrationNo;
		document.getElementById('year').value = currentStudent.year;
		document.getElementById('facultySelect').value = currentStudent.faculty.name;
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteForm').style.visibility = "hidden";
			document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' /> <br /><br />";
		}
		$('input[name="student"]').prop('checked', false);
		this.selected = '0';
		
	}
}

const util = new Util();
module.exports = util;