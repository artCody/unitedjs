$(function() {

	var filterUsername = /^([a-zA-Z0-9_\-])+$/;
	var filterPassword = /^[a-zA-Z0-9!%&@#$\^*?_~+]+$/;

	var message = $("#message");

	$("#login").on("submit", function(event){
		// event.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();

		function showError(error){
			$('.error').remove();
			message.append("<p class='error'>"+ error +"</p>");
			$("#message p").fadeIn(1000);
		};

		if(username == ''){
			showError('Please enter your username');
		} else if (password == ''){
			showError('Please enter your password');
		} else if(!filterUsername.test(username)){
			showError('invalid username')
		} else if(!filterPassword.test(password)){
			showError('invalid password');
		} else {
			$.ajax({
				// method: 'POST',
				// url: '/login',
				// data: {username, password},
				// success: function(res){
				// 	// // if(res.link){
				// 	// // 	window.location.href =  '/'+ res.link;
				// 	// // } else {
				// 	// // 	showError('invalid username or password');
				// 	// // }


				// }
			});
			console.log("success!");
		}
	})
});
