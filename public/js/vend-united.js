$(function(){
	$('#subscribe').on('submit', function(event){
		event.preventDefault();
		
		function validateEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}
		

		
		const formData = {
			name: $('#name').val(),
			email: $('#email').val(),
		}

		if(formData.name != '' && formData.email != '' && validateEmail(formData.email)){
			$.ajax({
				method: 'POST',
				url: '/subscribe',
				data: formData,
				success: function(response){
					alert(response.msg);
				}
			});
			$("#subscribe").trigger('reset');
		}

	});
});