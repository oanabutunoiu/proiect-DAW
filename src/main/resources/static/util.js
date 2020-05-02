var selected;

function studentSelected(){
		document.getElementById('myButtons').innerHTML = "<input type='button' id='insert' class='ok' value='Insert student' />" + 
		" <br /> <input type='button' id='update' class='ok' value='Update student information' /> " +
		" <br /> <input type='button' id='delete' class='ok' value='Delete student' /> ";
		selected = $('input[name=student]:checked').val();
}