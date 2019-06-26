$(function() {

$('#img').change(function(){
	var input = $(this)[0];
	if(input.files && input.files[0]){
		if(input.files[0].type.match('image.*')) {
			var reader = new FileReader();
			reader.onload = function(e){
				$('#view-upload').css('backgroundImage', 'url('+ e.target.result +')');
				$('#previewBack').css('backgroundImage', 'url('+ e.target.result +')');
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
		$('#display').val('on');
		$('#status').text("on");
	} else {
		$('#display').val('off');
		$('#status').text("off");
	}
});

if($('#display').val() == "on"){
	$('#switch').click();
}

$("#create-form").on('submit',function(event){

	event.preventDefault();

	$( "#type" ).prop( "disabled", false );

	$.ajax({
		method: 'PUT',
		url: '/update',
		data: new FormData(this),
		contentType: false,
		processData:false,
		success: function(res){
			$("#create-form").trigger('reset');
		}
	});
	$( "#type" ).prop( "disabled", true );
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