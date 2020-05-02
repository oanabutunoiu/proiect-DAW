function studentSelected(){
	if ($('input[name=student]:checked').val() != null)
		document.getElementById('myButtons').innerHTML = document.getElementById('myButtons').innerHTML + 
		" <br /> <input type='button' id='update' class='ok' value='Update student information' /> " +
		" <br /> <input type='button' id='delete' class='ok' value='Delete student' /> ";
}