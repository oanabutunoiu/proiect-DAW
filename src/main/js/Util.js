$ = require('jquery');


class Util{
	
	constructor(){
		this.selected = '0';
	}
	
	studentSelected(){
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick={util.insertButtonPressed} />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick={this.updateButtonPressed} /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick={this.deleteButtonPressed} /> <br /><br />";
		selected = $('input[name=student]:checked').val();
	}
	
	insertButtonPressed(){
		
		document.getElementById('fname').value = '';
		document.getElementById('cnp').value = '';
		document.getElementById('regno').value = '';
		document.getElementById('year').value = '';
		document.getElementById('facultySelect').value = '';
		document.getElementById('updateDeleteForm').style.visibility = visible;
	}
		
}

const util = new Util();

module.exports = util;