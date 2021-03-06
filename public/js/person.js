$(function() {

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
$('#title').keyup(function(){
	var input = $(this).val();
	$('#previewTitle').text(input);
});

$('#extra').keyup(function(){
	var input = $(this).val();
	$('#previewExtra').text(input);
});

$('#textarea').keyup(function(){
	var input = $(this).val();
	$('#previewText').text(input);
});

$('#switch').change(function(){

	if($('#status').text() == "off"){
		$('#status').text("on");
	} else {
		$('#status').text("off");
	}
});

$("#create-form").on('submit',function(event){

	event.preventDefault();

	$( "#type" ).prop( "disabled", false );

	$.ajax({
		method: 'POST',
		url: '/person/create',
		data: new FormData(this),
		contentType: false,
		processData:false,
		success: function(response){
			window.location = response.redirect;
			$("#create-form").trigger('reset');
		}
	});
	$( "#type" ).prop( "disabled", true );
});

var sizeSection = $('.display-size').val();

function getSectionSize() {
	sizeSection = $('.display-size').val();
	if(sizeSection == 1200){
		$('.large-line').addClass('on-line');
	} else if(sizeSection == 992) {
		$('.medium-line').addClass('on-line');
	} else if(sizeSection == 690) {
		$('.small-line').addClass('on-line');
	}
}

getSectionSize();


var sizeFlag = false;

$(".size-line > div").hover(function(){
	$(".size-line > div").removeClass('on-line');
	$(this).addClass('on-line');
});

$(".size-line > div").mouseleave(function(){
	$(".size-line > div").removeClass('on-line');
	if(sizeFlag) {
		$(this).addClass('on-line');
		sizeFlag = false;
	} else {
		console.log(sizeFlag);
		getSectionSize();
	}
});


$(".size-line > div").on("click", function(){
	sizeFlag = true;
	$(".size-line > div").removeClass('on-line');
	if($(this).attr('class') == 'large-line') {
		$('.display-size').val(1200);
	} else if($(this).attr('class') == 'medium-line') {
		$('.display-size').val(992);
	} else if($(this).attr('class') == 'small-line'){
		$('.display-size').val(690);
	}
	$(this).addClass('on-line');
});

	(function quantityProducts() {
	var $quantityArrowMinus = $(".quantity-arrow-up");
	var $quantityArrowPlus = $(".quantity-arrow-down");
	var $quantityNum = $(".quantity-num");

	$quantityArrowMinus.click(quantityMinus);
	$quantityArrowPlus.click(quantityPlus);

	    function quantityMinus() {
	      if ($quantityNum.val() > 1) {
	        $quantityNum.val(+$quantityNum.val() - 1);
	      }
	      console.log($quantityNum.val());
	    }

	    function quantityPlus() {
	      if ($quantityNum.val() == 10) {
	        $quantityNum.val(0);
	      }
	      $quantityNum.val(+$quantityNum.val() + 1);
	      console.log($quantityNum.val());
	    }
	  }
	  )();

});