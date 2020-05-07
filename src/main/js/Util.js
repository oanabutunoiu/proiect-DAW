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
	}
	
	viewFaculties(){
		document.getElementById('tableStudents').style.display ='none';
		document.getElementById('myStudentButtons').style.display = 'none';
		document.getElementById('updateDeleteStudentsForm').style.display = 'none';
		document.getElementById('tableFaculties').style.display ='initial';
		document.getElementById('myFacultyButtons').style.display = 'initial';
	}
	
	studentSelected(){
		
		window.util.item = window.util.studentList.find(element => element.id == $('input[name="student"]:checked').val());
		document.getElementById('myStudentButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='window.util.updateButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='window.util.deleteButtonPressed()' /> <br /><br />";
		
	}
	
	facultySelected(){
		
		window.util.item = window.util.studentList.find(element => element.id == $('input[name="faculty"]:checked').val());
		document.getElementById('myFacultyButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertFacultyButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='window.util.updateFacultyButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='window.util.deleteFacultyButtonPressed()' /> <br /><br />";
		
	}
	
	insertButtonPressed(){
		
		document.getElementById('fname').value = '';
		document.getElementById('cnp').value = '';
		document.getElementById('regno').value = '';
		document.getElementById('year').value = '';
		document.getElementById('facultySelect').value = '';
		document.getElementById('updateDeleteStudentsForm').style.display = "initial";
	}


	updateButtonPressed(){
	
		document.getElementById('fname').value = window.util.item.name;
		document.getElementById('cnp').value = window.util.item.cnp;
		document.getElementById('regno').value = window.util.item.registrationNo;
		document.getElementById('year').value = window.util.item.year;
		document.getElementById('facultySelect').value = window.util.item.faculty.id;
		document.getElementById('updateDeleteStudentsForm').style.display = "initial";
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteStudentsForm').style.display = "none";
			document.getElementById('myStudentButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' /> <br /><br />";
			window.util.remove(parseInt($('input[name="student"]:checked').val()));
		}
		window.location.reload(true);
		
	}
	
	remove(id) {
	    fetch('/students/' + id, {
	      method: 'DELETE',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'Cache-Control': 'no-cache',
	        'X-XSRF-TOKEN' : token
	      }
	    }).then();
	  }
	
	
	handleSubmit() {
	    var myItem = window.util.item;
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
	    
	    fetch((myItem.id === undefined) ? '/students' : '/students/' + myItem.id, {method: (myItem.id !== undefined) ? 'PATCH' : 'POST',
	  	      body: JSON.stringify(myItem),
	  	      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json',
		        'Cache-Control': 'no-cache',
		        'X-XSRF-TOKEN' : token
		      }
	  	    }).then(() => {window.location.reload(false)});
	    
	  }
	
	insertFacultyButtonPressed(){
		
		document.getElementById('facname').value = '';
		document.getElementById('updateDeleteFacultiesForm').style.display = "initial";
	}


	updateFacultyButtonPressed(){
	
		document.getElementById('facname').value = window.util.item.name;
		document.getElementById('updateDeleteFacultiesForm').style.display = "initial";
	}

	deleteFacultyButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteFacultiesForm').style.display = "none";
			document.getElementById('myFacultyButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert faculty'  onClick='window.util.insertFacultyButtonPressed()' /> <br /><br />";
			window.util.removeFaculty(parseInt($('input[name="faculty"]:checked').val()));
		}
		window.location.reload(false);
		
	}
	
	removeFaculty(id) {
	    fetch('/faculties/' + id, {
	      method: 'DELETE',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	        'Cache-Control': 'no-cache',
	        'X-XSRF-TOKEN' : token
	      }

	    }).then();
	  }
	
	
	handleSubmitFaculty() {
	    var myItem = window.util.item;
	    if (myItem.id === undefined)
	    	myItem = {
				    name: document.getElementById('facname').value,
				  };
	    else
	    	{
	    		myItem.name = document.getElementById('facname').value;
	    	}
	    
	    fetch((myItem.id === undefined) ? '/faculties' : '/faculties/' + myItem.id, {method: (myItem.id !== undefined) ? 'PATCH' : 'POST',
	  	      body: JSON.stringify(myItem),
	  	      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json',
		        'Cache-Control': 'no-cache',
		        'X-XSRF-TOKEN' : token
		      }
	  	    }).then(() => {window.location.reload(true)});
	    
	  }
}

const u = new Util();
module.exports = u;