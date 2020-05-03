$ = require('jquery');
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
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' />" + 
		"       <input type='button' id='update' class='ok' value='Update student information'  onClick='window.util.updateButtonPressed()' /> " +
		"       <input type='button' id='delete' class='ok' value='Delete student' onClick='window.util.deleteButtonPressed()' /> <br /><br />";
		this.item = this.studentList.find(element => element.id == $('input[name="student"]:checked').val());
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
	
		document.getElementById('fname').value = this.item.name;
		document.getElementById('cnp').value = this.item.cnp;
		document.getElementById('regno').value = this.item.registrationNo;
		document.getElementById('year').value = this.item.year;
		document.getElementById('facultySelect').value = this.item.faculty.id;
		document.getElementById('updateDeleteForm').style.visibility = "visible";
	}

	deleteButtonPressed(){
		var c = confirm('Delete selected student?');
		if (c == true)	{
		
			document.getElementById('updateDeleteForm').style.visibility = "hidden";
			document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student'  onClick='window.util.insertButtonPressed()' /> <br /><br />";
			this.remove(parseInt($('input[name="student"]:checked').val()));
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
	      let updatedStudents= [this.studentList].filter(i => i.id !== id);
	      this.studentList = updatedStudents;
	    });
	  }
	
	
	handleSubmit() {
	    const myItem = this.item;
	    
	    client({method: (myItem.id !== undefined) ? 'PUT' : 'POST',
	  	      body: JSON.stringify(myItem),
	  	      path: '/students',
	  	      withCredentials: true
	  	    }).then(response => {
			this.studentList.push(myItem);
		});
	    
	  }
}

const util = new Util();
module.exports = util;