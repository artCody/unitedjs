$(function() {






$.ajax({
	method: 'GET',
	url: '/getStatus',
	success: function(res){
		$(".templates").find("div.active-temp").removeClass('active-temp');
		$(".templates").find("#" + res).addClass('active-temp')
	}
});


$.ajax({
	method: 'GET',
	url: '/getLang',
	success: function(res){
		$(".templates").find("div.active-lang").removeClass('active-lang');
		$(".templates").find("#" + res).addClass('active-lang')
	}
});




$('#security').on('submit', function(e){
	// e.preventDefault();

	$.ajax({
		method: 'POST',
		url: '/security/update',
		data: new FormData(this),
		contentType: false,
		processData:false,
		success: function(response){
			window.location = response.redirect;
		}
	});

	return false;
});

function alert(msg){
	$('#alert-msg').text(msg);
	$('#alert-msg').css({'background': '#15cd72'});
	setTimeout(function(){
		$('#alert-msg').text('');
		$('#alert-msg').css({'background': '#fff'});
	},1000);
}


$(".template").on('click',function(event){

	event.preventDefault();

	$(".templates").find("div.active-temp").removeClass('active-temp');

	$(this).addClass("active-temp");

	$.ajax({
		method: 'POST',
		url: '/change-template',
		data: {id: $(this).attr('id')},
		cache: false,
		success: function(response){
			alert(response.msg);
		}
	});

	return false;

});

$(".lang").on('click',function(event){

	event.preventDefault();

	$(".templates").find("div.active-lang").removeClass('active-lang');

	$(this).addClass("active-lang");

	$.ajax({
		method: 'POST',
		url: '/change-lang',
		data: {id: $(this).attr('id')},
		cache: false,
		success: function(response){
			window.location = response.redirect;
			alert("language changed");
		}
		
	});
	return false;
});


$(".tab-pannel li").on("click",function(){
	var $rel = $(this).attr('rel');
	$('#panels .panel').removeClass('active');

	$('.tab-pannel li').removeClass('tab-active');
	$(this).addClass('tab-active');

	$('#'+ $rel).addClass('active');

});


});