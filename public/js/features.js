$(function() {


	var array = [];

	$('#addCard').on('click', function(){
		var cardId = Date.now();
		$('.preview').prepend("<div class='card' data-card="+ (cardId) + "><span class='cardDel'><i class='fas fa-times-circle'></i></span><label class='view-upload'><input type='file' name='img' class='login_input img' accept='image/*' id='img'></label><input type='text' placeholder='Headline' name='headline" + cardId + "' class='headline'><div contentEditable='true' class='area'>Area</div></div>");
		var card = {id: cardId};
		array.push(card);

	});

	var array2 = [];

	function refresh(){
		var cards = $('.preview > .card');
		var cardLength = cards.length;
		for(var j = 0; j < cardLength; j++){

			array2[j] = {
				id: cards[j].attributes[1].value,
				headline: cards[j].children[2].value,
				text: cards[j].children[3].innerText,
				img: (function(){
					if(cards[j].children[1].children[0].files.length){
						return {
							name: cards[j].children[1].children[0].files[0].name,
							status: true
						};
					} else {
						return {
							name: null,
							status: false
						}
					}
				})()
			};
		}
	}


	var files  = [];
		

	$('#saveCard').on('click', function(){
		refresh();
		var obj = {};
		$('.params :input').each(function(){
			obj[this.name] = this.value
		});
		var tempData = new FormData($('#create-form')[0]);

		tempData.append('arr', JSON.stringify(array2));
		tempData.append('params', JSON.stringify(obj));
		$.ajax({
			method: 'POST',
			url: '/features/create',
			data: tempData,
			contentType: false,
			processData:false,
			success: function(response){
				window.location = response.redirect;
				$("#create-form").trigger('reset');
			}
		});
	});


	$(document).on('click',".cardDel",function(){
		refresh()

		for(var i = 0; i < array2.length; i++){
			if(array2[i].id == $(this).parent().attr('data-card')) {
				array2.splice(i,1);
				$(this).parent().remove();
			}
		}
	});


	$(document).on('change','.img', function(){
		var input = $(this)[0];
		var tempCard = $(this).parent();
		if(input.files && input.files[0]){
			if(input.files[0].type.match('image.*')) {
				var reader = new FileReader();
				reader.onload = function(e){
					tempCard.css('backgroundImage', 'url('+ e.target.result +')');
					// $('#preview-img').attr('src', e.target.result);
				}
				reader.readAsDataURL(input.files[0]);

			}
		}
	});

if($('#display').val() == "on"){
	$('#switch').click();
}

$('#switch').change(function(){
	if($('#status').text() == "off"){
		$('#display').val('on');
		$('#status').text("on");
	} else {
		$('#display').val('off');
		$('#status').text("off");
	}
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