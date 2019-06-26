$(function(){


	$(document).on('click',".tbody-email tr",function(){

		if($(this).hasClass('active-email')){
			$(this).removeClass('active-email');
		} else {
			$(this).addClass('active-email');
		}
		
	});
	

	$(document).on('click',".delete",function(event){
		event.stopPropagation();
		$.ajax({
			method: 'DELETE',
			url: '/delete-follower',
			data: {id: $(this).parent().parent().find(".id")[0].innerHTML},
			success: function(response){
				
				// alert(response.msg);
			}
		});

		$(this).parent().parent().remove();
	});


	$(document).on('click',".tbody-email tr",function(event){
		event.stopPropagation();
		$.ajax({
			method: 'PUT',
			url: '/change-follower',
			data: {id: $(this).find(".id")[0].innerHTML},
			success: function(response){
				
				// alert(response.msg);
			}
		});

		
	});

	let tbodyEmail = $('.tbody-email');
	let tbodyPhone = $('.tbody-phone');
	let socket = io('http://'+location.hostname);
	let array;

	socket.on('update followers', function(msg){

		function active(arg){
			if(arg) {
				return "class='active-email'";
			} else {
				return '';
			}
		}
		array = msg.followers;
		tbodyEmail.html('');

		array.forEach(function(item){
			if(item.email){
				tbodyEmail.append('<tr '+ active(item.status)+ '>\
				<td class="id">' + item._id + '</td>\
				<td>' + item.name + '</td>\
				<td><a href="mailto:'+ item.email +'">'+ item.email +'</a></td>\
				<td><span class="delete">delete</span></td>\
			</tr>')
			}
		})
		

		tbodyPhone.html('');
		array.forEach(function(item){
			if(item.phone){
				tbodyPhone.append('<tr '+ active(item.status)+ '>\
				<td class="id">' + item._id + '</td>\
				<td>' + item.name + '</td>\
				<td><a href="tel:'+ item.phone +'">'+ item.phone +'</a></td>\
				<td><span class="delete">delete</span></td>\
			</tr>')
			}

		})

		

		
		
		
	})
	
	$(".tab-pannel li").on("click",function(){
		var $rel = $(this).attr('rel');
		$('#panels .panel').removeClass('active');

		$('.tab-pannel li').removeClass('tab-active');
		$(this).addClass('tab-active');

		$('#'+ $rel).addClass('active');

	});

	$('#textarea').keyup(function(){
		var input = $(this).val();
		$('#previewText').text(input);
	});


	$("#sendEmail").on('click',function(event){
		console.log('work');
		event.preventDefault();
		let formData = {
			title: $('#title').val(),
			emailpass: $('#emailpass').val(),
			textarea: $('#textarea').val()
		}
		$.ajax({
			method: 'POST',
			url: '/email',
			data: formData,
			success: function(response){
				window.location = response.redirect;
			}
		});

	});


});