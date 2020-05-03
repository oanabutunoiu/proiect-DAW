$ = require('jquery');

class Util {
	
	constructor(){
		this.studentList = [];
	}
	
	studentSelected(){
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='window.util.updateButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='window.util.deleteButtonPressed()' /> <br /><br />";
		this.selected = $('input[name="student"]:checked').val();
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
	
		document.getElementById('fname').value = this.studentList[selected].name;
		document.getElementById('cnp').value = this.studentList[selected].cnp;
		document.getElementById('regno').value = this.studentList[selected].registrationNo;
		document.getElementById('year').value = this.studentList[selected].year;
		document.getElementById('facultySelect').value = this.studentList[selected].faculty.name;
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteForm').style.visibility = "hidden";
			document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick={util.insertButtonPressed} /> <br /><br />";
		}
		$('input[name="student"]').prop('checked', false);
		delete this.selected;
		
	}
}

const util = new Util();
module.exports = util;