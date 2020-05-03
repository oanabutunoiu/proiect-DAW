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
	
		document.getElementById('fname').value = this.studentList[$('input[name="student"]:checked').val()].name;
		document.getElementById('cnp').value = this.studentList[$('input[name="student"]:checked').val()].cnp;
		document.getElementById('regno').value = this.studentList[$('input[name="student"]:checked').val()].registrationNo;
		document.getElementById('year').value = this.studentList[$('input[name="student"]:checked').val()].year;
		document.getElementById('facultySelect').value = this.studentList[$('input[name="student"]:checked').val()].faculty.name;
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteForm').style.visibility = "hidden";
			document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick={util.insertButtonPressed} /> <br /><br />";
		}
		$('input[name="student"]').prop('checked', false);
		this.selected = '0';
		
	}
}

const util = new Util();
module.exports = util;