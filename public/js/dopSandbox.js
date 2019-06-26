


var editor = document.querySelector('.editor');
// editor.contentEditable = true;

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

	var selected,
	url = document.querySelector('#urlLink'),
	btnLink = document.querySelector('#btn-link'),
	openWindow = document.querySelector('#openWindow'),
	wrapper = document.querySelector('.wrapper'),
	windowCreateLink = document.querySelector('.window-create-link');

// 	// $('#openWindow').on('click',function(){
	
// 	// $('.wrapper').css('display','block');
// 	// $('.window-create-link').css('display','flex');
// });



	// wrapper.onclick = function(e){
	// 	wrapper.style.display = "none";
	// }


// $('.wrapper').on('click', ()=> {
// 	$('.window-create-link').css('display','none');
// 	$('.wrapper').css('display','none');
// });




// $('.btn-link').on('click',function(e) {
// 	// e.preventDefault();
// 	$('.window-create-link').css('display','none');
// 	$('.wrapper').css('display','none');
// });




openWindow.onclick = function(e){

	e.preventDefault();
	selected = saveSelection();
	wrapper.style.display = "block";
	windowCreateLink.style.display = "flex";

	url.value = '';
}

btnLink.onclick = function(e){
	e.preventDefault();

	restoreSelection(selected);

	document.querySelector('.editor').focus();
	var link = "<a contentEditable='false' href='"+url.value+"'>"+sel+"</a><span>";
	
	document.execCommand('insertHTML',false, link);
	wrapper.style.display = "none";
	windowCreateLink.style.display = "none";
}

