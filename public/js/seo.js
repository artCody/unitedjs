$(function(){

	function alert(msg){
		$('#alert-msg').text(msg);
		$('#alert-msg').css({'background': '#15cd72'});
		setTimeout(function(){
			$('#alert-msg').text('');
			$('#alert-msg').css({'background': '#fff'});
		},1000);
	}
	




function showKeywords(){
	let keywords = $('.keywords .keyword').map(function(){
		return $(this).text();
	}).get();

	return keywords;
}




$('.keywords').on('click', function(event){
	$('#newKeyword').focus();
})


$('.keywords').on('click', 'span',function(event){
	event.preventDefault();
	$(this).remove()
	showKeywords()
})




function checkKeywords(keyword){
	let keywords = showKeywords();
	return keywords.some(function(element){
		return element.toLowerCase() == keyword.toLowerCase();
	})
}


showKeywords();

$('#addKeyword').on('click', function(event){
	event.preventDefault();
	let keyword = $('#newKeyword').val().trim();

	if(keyword != '' && !checkKeywords(keyword)){
		$('.keywords').append("<span class='keyword'>" + keyword + '</span>');
		$('#newKeyword').val('');
		showKeywords()
	}

})


	
	$("#saveCard").on('click',function(event){
		
		event.preventDefault();
		const formData = {
			title: $('#title').val(),
			keywords: showKeywords(),
			description: $('#textarea').val()
		}
		$.ajax({
			method: 'POST',
			url: '/edit-seo',
			data: formData,
			success: function(response){
				// console.log(response.msg);
				alert(response.msg);
			}
		});
	});

});