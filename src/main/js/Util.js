$ = require('jquery');

class Util{
	
	constructor(){
		this.selected = '0';
	}
	
	studentSelected(){
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student' />" + 
		" <br /><br /><br /> <input type='button' id='update' class='ok' value='Update student information' /> " +
		" <br /><br /><br /> <input type='button' id='delete' class='ok' value='Delete student' /> ";
		selected = $('input[name=student]:checked').val();
	}
		
}

const util = new Util();

module.exports = util;