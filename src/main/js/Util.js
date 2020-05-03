var selected = '0';
	
function studentSelected(){
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='insertButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='updateButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='deleteButtonPressed' /> <br /><br />";
		selected = $('input[name=student]:checked').val();
	}
	
function insertButtonPressed(){
		
		document.getElementById('fname').value = '';
		document.getElementById('cnp').value = '';
		document.getElementById('regno').value = '';
		document.getElementById('year').value = '';
		document.getElementById('facultySelect').value = '';
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}


function updateButtonPressed(){
	
	document.getElementById('fname').value = students[selected].name;
	document.getElementById('cnp').value = students[selected].cnp;
	document.getElementById('regno').value = students[selected].registrationNo;
	document.getElementById('year').value = students[selected].year;
	document.getElementById('facultySelect').value = students[selected].faculty.name;
	document.getElementById('updateDeleteForm').style.visibility = "visible";
}

function deleteButtonPressed(){
	var c = confirm('Delete selected student?');
	if (c == true){
		
		document.getElementById('updateDeleteForm').style.visibility = "hidden";
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='insertButtonPressed()' />";
	}
		
}