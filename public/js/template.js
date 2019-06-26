$(function () {
$('#img').change(function(){
	var input = $(this)[0];
	if(input.files && input.files[0]){
		if(input.files[0].type.match('image.*')) {
			var reader = new FileReader();
			reader.onload = function(e){
				$('#view-upload').css('backgroundImage', 'url('+ e.target.result +')');
				$('#preview-img').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
});



$('.file').change(function(e){
    var fileName = e.target.files[0].name;
    $('.file-name').text(e.target.files[0].name)
});



if($('#overlay').val() == 'true'){
	$('#switch').click();
	$('#status').text("on")
	$('.overlay-settings').show();
	$('.header-overlay').show();
}

$('#switch').change(function(){
	if($('#status').text() == "off"){
		$('#overlay').val(true);
		
		$('#status').text("on");
		$('.overlay-settings').show();
		$('.header-overlay').show();
	

	} else {
		$('#overlay').val(false);
		$('#status').text("off");
		$('.header-overlay').hide();
		$('.overlay-settings').hide();
		changeColor();
		
	}
});


$(".delete-image").on('click',function(event){
	
	event.preventDefault();


	$(this).siblings(".file-upload").find('label').css('background-image', '');
	// $('#view-upload')

	// $(this).siblings(".file-upload").find('label').find('input')[0].value = "";
	var $clearInput = $(this).siblings(".file-upload").find('label').find('input')[0];
	$.ajax({
		method: 'DELETE',
		url: '/template/delete-image',
		data: {img: $(this).data('img')},
		success: function(response){
			// $clearInput.val('');
			console.log(response.msg);
			alert(response.msg);
		}
	});
});




function changeColor() {
	let firstColor = $('#firstColor').val();
	let secondColor = $('#secondColor').val();
	let rangeColorFirst = $('#rangeColorFirst').val();
	let rangeColorSecond = $('#rangeColorSecond').val();
	let rangeRadius = $('#rangeRadius').val();
	let rangeOpacity = $('#rangeOpacity').val();
	$('.header-overlay').css({background: 'linear-gradient('+ rangeRadius +'deg, '+ firstColor + ' ' +rangeColorFirst+ '%, '+ secondColor +' '+rangeColorSecond+'%)', opacity: rangeOpacity})
}

changeColor();

$('.overlay-color').change(function(){
	changeColor();
})

$('#back').change(function(){
	var input = $(this)[0];
	if(input.files && input.files[0]){
		if(input.files[0].type.match('image.*')) {
			var reader = new FileReader();
			reader.onload = function(e){
				$('#view-upload-back').css('backgroundImage', 'url('+ e.target.result +')');
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
});

function alert(msg){
	$('#alert-msg').text(msg);
	$('#alert-msg').css({'background': '#15cd72'});
	setTimeout(function(){
		$('#alert-msg').text('');
		$('#alert-msg').css({'background': '#fff'});
	},1000);
}


$("#saveCard").on('click',function(event){

	event.preventDefault();
	// console.log(new FormData(this));
	$.ajax({
		method: 'PUT',
		url: '/edit-template',
		data: new FormData(document.querySelector("#create-form")),
		cache: false,
		contentType: false,
		processData:false,
		success: function(response){
			console.log(response.msg);
			alert(response.msg);
			$('input[type="file"]')[0].value = "";
		}
	});
});



$("select").each(function(){ $(this).find('option[value="'+$(this).attr("value")+'"]').prop('selected', true); });


});