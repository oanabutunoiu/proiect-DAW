const $ = require('jquery');
function getCookie(name) {
	  if (!document.cookie) {
	    return null;
	  }

	  const xsrfCookies = document.cookie.split(';')
	    .map(c => c.trim())
	    .filter(c => c.startsWith(name + '='));

	  if (xsrfCookies.length === 0) {
	    return null;
	  }
	  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
	}
var token = getCookie('XSRF-TOKEN');
class Util {
	
	
	constructor(){
		this.studentList = [];
		this.facultyList = [];
		this.itemStudent = {
			    name: '',
			    cnp: '',
			    registrationNo: '',
			    year: 0,
			    faculty: undefined
			  };
		this.itemFaculty = {
			name: ''	
		};
	}
	
	viewStudents(){
		document.getElementById('tableStudents').style.display ='initial';
		document.getElementById('myStudentButtons').style.display = 'initial';
		document.getElementById('tableFaculties').style.display ='none';
		document.getElementById('myFacultyButtons').style.display = 'none';
		document.getElementById('updateDeleteFacultiesForm').style.display = 'none';
		document.getElementById('createorupdate').innerHTML = '';
		var x = document.getElementsByName('student');
		var i;
		for (i = 0; i < x.length; i++) {
		
		    x[i].checked = false;

		} 
		x = document.getElementsByName('faculty');
		for (i = 0; i < x.length; i++) {
		
		    x[i].checked = false;

		} 
	}
	
	viewFaculties(){
		document.getElementById('tableStudents').style.display ='none';
		document.getElementById('myStudentButtons').style.display = 'none';
		document.getElementById('updateDeleteStudentsForm').style.display = 'none';
		document.getElementById('tableFaculties').style.display ='initial';
		document.getElementById('myFacultyButtons').style.display = 'initial';
		document.getElementById('createorupdate').innerHTML = '';
		var x = document.getElementsByName('student');
		var i;
		for (i = 0; i < x.length; i++) {
		
		    x[i].checked = false;

		} 
		x = document.getElementsByName('faculty');
		for (i = 0; i < x.length; i++) {
		
		    x[i].checked = false;

		} 
	}
	
	studentSelected(){
		
		window.util.itemStudent = window.util.studentList.find(element => element.id == $('input[name="student"]:checked').val());
		document.getElementById('myStudentButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='window.util.updateButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='window.util.deleteButtonPressed()' /> <br /><br />";
		
	}
	
	facultySelected(){
		
		window.util.itemFaculty = window.util.facultyList.find(element => element.id == $('input[name="faculty"]:checked').val());
		document.getElementById('myFacultyButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert faculty'  onClick='window.util.insertFacultyButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update faculty information'  onClick='window.util.updateFacultyButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete faculty' onClick='window.util.deleteFacultyButtonPressed()' /> <br /><br />";
		
	}
	
	insertButtonPressed(){
		
		var x = document.getElementsByName('student');
		var i;
		for (i = 0; i < x.length; i++) {
		
		    x[i].checked = false;

		} 
		this.itemStudent  = {
			    name: '',
			    cnp: '',
			    registrationNo: '',
			    year: 0,
			    faculty: undefined
			  }; 
		document.getElementById('myStudentButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' /> <br /><br />";
		document.getElementById('fname').value = '';
		document.getElementById('cnp').value = '';
		document.getElementById('regno').value = '';
		document.getElementById('year').value = '';
		document.getElementById('facultySelect').value = '';
		document.getElementById('updateDeleteStudentsForm').style.display = "initial";
		document.getElementById('createorupdate').innerHTML = 'Inserting a new student...';
	}


	updateButtonPressed(){
	
		document.getElementById('fname').value = window.util.itemStudent.name;
		document.getElementById('cnp').value = window.util.itemStudent.cnp;
		document.getElementById('regno').value = window.util.itemStudent.registrationNo;
		document.getElementById('year').value = window.util.itemStudent.year;
		document.getElementById('facultySelect').value = window.util.itemStudent.faculty.id;
		document.getElementById('updateDeleteStudentsForm').style.display = "initial";
		document.getElementById('createorupdate').innerHTML = 'Updating selected student...';
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteStudentsForm').style.display = "none";
			document.getElementById('myStudentButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' /> <br /><br />";
			window.util.remove(parseInt($('input[name="student"]:checked').val()));
			window.location.reload(true);
		}
		
		
	}
	
	remove(id) {
		
		var xhttp = new XMLHttpRequest();
		
		xhttp.open('DELETE', '/students/' + id, false);
		xhttp.setRequestHeader('Accept', 'application/json');
	    xhttp.setRequestHeader('Content-Type', 'application/json');
	    xhttp.setRequestHeader('Cache-Control', 'no-cache');
	    xhttp.setRequestHeader('X-XSRF-TOKEN', token);
	    
	    
	    xhttp.send();
	  }
	
	
	handleSubmit() {
		var xhttp = new XMLHttpRequest();
	    var myItem = window.util.itemStudent;
	    var xhttp = new XMLHttpRequest();
	    if (myItem.id === undefined)
	    	myItem = {
				    name: document.getElementById('fname').value,
				    cnp: document.getElementById('cnp').value,
				    registrationNo: document.getElementById('regno').value,
				    year: document.getElementById('year').value,
				    faculty: window.util.facultyList.find(element => element.id == $('#facultySelect').val())
				  };
	    else
	    	{
	    		myItem.name = document.getElementById('fname').value;
	    		myItem.cnp = document.getElementById('cnp').value;
	    		myItem.registrationNo = document.getElementById('regno').value;
	    		myItem.year = document.getElementById('year').value;
	    		myItem.faculty = window.util.facultyList.find(element => element.id == $('#facultySelect').val());
	    	}
	    
	    xhttp.open((myItem.id !== undefined) ? 'PATCH' : 'POST', (myItem.id === undefined) ? '/students' : '/students/' + myItem.id, false);
	    
	    xhttp.setRequestHeader('Accept', 'application/json');
	    xhttp.setRequestHeader('Content-Type', 'application/json');
	    xhttp.setRequestHeader('Cache-Control', 'no-cache');
	    xhttp.setRequestHeader('X-XSRF-TOKEN', token);
	    
	   
	    xhttp.send(JSON.stringify(myItem));
	    window.location.reload(true);
	    
	  }
	
	insertFacultyButtonPressed(){
		
		var x = document.getElementsByName('faculty');
		var i;
		for (i = 0; i < x.length; i++) {
		
		    x[i].checked = false;

		} 
		this.itemFaculty  = {
			    name: ''
			  };
		document.getElementById('myFacultyButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert faculty'  onClick='window.util.insertFacultyButtonPressed()' /> <br /><br />";
		document.getElementById('facname').value = '';
		document.getElementById('updateDeleteFacultiesForm').style.display = "initial";
		document.getElementById('createorupdate').innerHTML = 'Inserting a new faculty...';
		
	}


	updateFacultyButtonPressed(){
	
		document.getElementById('facname').value = window.util.itemFaculty.name;
		document.getElementById('updateDeleteFacultiesForm').style.display = "initial";
		document.getElementById('createorupdate').innerHTML = 'Updating selected faculty...';
	}

	deleteFacultyButtonPressed(){
		var c = confirm('Delete selected faculty?');
		if (c == true)	{
		
			document.getElementById('updateDeleteFacultiesForm').style.display = "none";
			document.getElementById('myFacultyButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert faculty'  onClick='window.util.insertFacultyButtonPressed()' /> <br /><br />";
			window.util.removeFaculty(parseInt($('input[name="faculty"]:checked').val()));
			window.location.reload(true);
		}
		
		
	}
	
	removeFaculty(id) {
		var xhttp = new XMLHttpRequest();
		
	    
	    xhttp.open('DELETE', '/faculties/' + id, false);
	    xhttp.setRequestHeader('Accept', 'application/json');
	    xhttp.setRequestHeader('Content-Type', 'application/json');
	    xhttp.setRequestHeader('Cache-Control', 'no-cache');
	    xhttp.setRequestHeader('X-XSRF-TOKEN', token);
	    xhttp.send();
	  }
	
	
	handleSubmitFaculty() {
		var xhttp = new XMLHttpRequest();
	    var myItem = window.util.itemFaculty;
	    if (myItem.id === undefined)
	    	myItem = {
				    name: document.getElementById('facname').value,
				  };
	    else
	    	{
	    		myItem.name = document.getElementById('facname').value;
	    	}
	    
	   
	    
	    xhttp.open((myItem.id !== undefined) ? 'PATCH' : 'POST', (myItem.id === undefined) ? '/faculties' : '/faculties/' + myItem.id, false);
	    xhttp.setRequestHeader('Accept', 'application/json');
	    xhttp.setRequestHeader('Content-Type', 'application/json');
	    xhttp.setRequestHeader('Cache-Control', 'no-cache');
	    xhttp.setRequestHeader('X-XSRF-TOKEN', token);
	    xhttp.send(JSON.stringify(myItem));
	    window.location.reload(true);

	    
	  }
}

const u = new Util();
module.exports = u;