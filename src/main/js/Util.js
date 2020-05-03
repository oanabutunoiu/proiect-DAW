const $ = require('jquery');
const client = require('./client');

class Util {
	
	
	constructor(){
		this.studentList = [];
		this.item = {
			    name: '',
			    cnp: '',
			    registrationNo: '',
			    year: 0,
			    faculty: undefined
			  };
	}
	
	studentSelected(){
		
		window.util.item = window.util.studentList.find(element => element.id == $('input[name="student"]:checked').val());
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
	
		document.getElementById('fname').value = window.util.item.name;
		document.getElementById('cnp').value = window.util.item.cnp;
		document.getElementById('regno').value = window.util.item.registrationNo;
		document.getElementById('year').value = window.util.item.year;
		document.getElementById('facultySelect').value = window.util.item.faculty.id;
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteForm').style.visibility = "hidden";
			document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' /> <br /><br />";
			window.util.remove(parseInt($('input[name="student"]:checked').val()));
		}
		$('input[name="student"]').prop('checked', false);
		
	}
	
	remove(id) {
	    fetch('/students/' + id, {
	      method: 'DELETE',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      withCredentials: true
	    }).then(() => {
	      let updatedStudents= [window.util.studentList].filter(i => i.id !== id);
	      window.util.studentList = updatedStudents;
	    });
	  }
	
	
	handleSubmit() {
	    const myItem = window.util.item;
	    
	    client({method: (typeof myItem.id !== undefined) ? 'PUT' : 'POST',
	  	      body: JSON.stringify(myItem),
	  	      path: '/students',
	  	      withCredentials: true
	  	    }).then(response => {
			//window.util.studentList.push(myItem);
		});
	    
	  }
}

const u = new Util();
module.exports = u;