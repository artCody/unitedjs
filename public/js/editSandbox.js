$(function() {


var editor = document.querySelector('.editor');
	// editor.contentEditable = true;


var colorBox = $('.color-box');

var colorPalette = ['173F5F','20639B','3CAEA3','F6D55C','ED553B'];


for (var i = 0; i < colorPalette.length; i++) {
	colorBox.append('<a href="#" data-command="forecolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
}

$('.toolbar a').on('click', function(e){
	var command = $(this).data('command');


	if(command == 'forecolor'){
		document.execCommand($(this).data('command'), false, $(this).data('value'));
	} else if(command == 'fontSize'){
		$('.dropdown-menu').css('display', 'none');
		document.execCommand($(this).data('command'), false, $(this).data('value'));
	} else {
		document.execCommand(command, false, null);
	}

});

$('#fontSize').on('mouseover', function(){
	$('.dropdown-menu').css('display', 'block');

});

$('#fontSize').on('mouseleave', function(){
	$('.dropdown-menu').css('display', 'none');
});


$('#img').on('click', function(){
	selected = saveSelection();
});


var imageStore = [];

function getStoreImages(name, img){
	imageStore.push(img);
}


var imgSaveName = [];


$(document).on('change','#img', function(){

	selected = saveSelection();
	var input = $(this)[0];
	var imgName = $(this)[0].files[0].name;
	var newImgName = Date.now() + imgName.substring(imgName.lastIndexOf('.'));

	imgSaveName.push(newImgName);
	
	getStoreImages(newImgName, input.files[0]);

	if(input.files && input.files[0]){
		if(input.files[0].type.match('image.*')) {
			var reader = new FileReader();
			reader.onload = function(e){

				e.preventDefault();
				document.querySelector('.editor').focus();

				document.execCommand('insertHTML',false, "<img data-img='"+ newImgName +"'src='"+e.target.result+"'>");
			}
			reader.readAsDataURL(input.files[0]);

		}
	}

});

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}


var btn     = $('#openWindow'),
	wrapper = $('.wrapper'),
	url     = document.querySelector('#urlLink'),
	insert  = $('#btn-link'),
	selected,
	title;


btn.on('click',(e)=> {
	e.preventDefault();
	selected = saveSelection();

	$('.wrapper').css('display','block');
	$('.window-create-link').css('display','flex');
	url.value = 'http://';
	title = sel;
});



wrapper.on('click', (e)=> {
	e.preventDefault();
	$('.window-create-link').css('display','none');
	$('.wrapper').css('display','none');
});




insert.on('click',(e)=> {

	restoreSelection(selected);
	$('.window-create-link').css('display','none');
	$('.wrapper').css('display','none');

	document.querySelector('.editor').focus();

	document.execCommand('insertHTML',false, "<a class='linkinside' target='_blank' href='"+url.value+"'>"+title+"</a>");


	$('.linkinside').each((i,item)=>{
		$(item).attr('contenteditable','false');
	})
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


function alert(msg){
	$('#alert-msg').text(msg);
	$('#alert-msg').css({'background': '#15cd72'});
	setTimeout(function(){
		$('#alert-msg').text('');
		$('#alert-msg').css({'background': '#fff'});
	},1000);
}

function checkImagesInArea(){
	var tempData = new FormData($('#create-form')[0]);
	var imagesName = [];
	var imageArray = [];
	var arr = $('#area').find('img');
	for(let i = 0; i < arr.length; i++){
		if(arr[i].hasAttribute('data-img')){
			imagesName.push($(arr[i]).attr('data-img'));
			imageArray.push(arr[i]);
			$(arr[i]).attr('src', '/uploads/' + $(arr[i]).attr('data-img'));
		}
	}

	for(var a = 0; a < imageStore.length; a++){

		// for(var b = 0; b < imageArray.length; b++){
		// 	if($(imageArray[b]).attr('data-img') == imageStore[a].name){

			tempData.append(imageStore[a].name, imageStore[a], imgSaveName[a]);
		// 	}
		// }

	}

	var area = $('#area').html();
	console.log(area);
	tempData.append('inSection', area);
	tempData.append('images', JSON.stringify(imagesName));

	return tempData;

}

$("#saveCard").on('click',function(event){

	// event.preventDefault();


	$( "#type" ).prop( "disabled", false );


	$.ajax({
		method: 'PUT',
		url: '/update/sandbox',
		data: checkImagesInArea(),
		contentType: false,
		processData:false,
		success: function(response){
			alert(response.msg);
			location.reload();

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

