var itime = 2000;
var index = 0;
var lastIndex = 0;
var turnCon = $('.main .turn .con');
var turndown = $('.main .turndown');
var d = true;
var list = $('.main .turn .list ul li');
var f = true;
var itimer

function init(){
	$('.main .turn .arrow').on('click' , 'div' , arrowC);
	$('.main .turn .list ul').on('click' , 'li' , listC);
	autoc();
}
function arrowC(e){
	if (f) {
		f = false;
		clearTimeout(itimer);
		change(e.target.className);
	}
}
function listC(e){
	if (f) {
		f = false;
		clearTimeout(itimer);
		change( $(e.target).index() );
	}
}
function autoc(){
	itimer = setTimeout(function(){
		f = false;
		change('R')
	} , itime);
}
function changeIndex(pra){
	if ( $.type(pra) == 'number' && pra != index ) {
		lastIndex = index;
		index = pra;
		return 0;
	}else if (pra == 'R') {
		lastIndex = index;
		index++;
	}else if (pra == 'L') {
		lastIndex = index;
		index--;
	}
	if (index >= turnCon.length) {
		index -= turnCon.length;
	}else if (index < 0) {
		index += turnCon.length;
	}
}
function change(pra){
	turnCon.eq(lastIndex).removeClass('leave');
	$('.main .turn .list ul .active').removeClass('active');
	changeIndex(pra);
	if (d) {
		d = false;
		turndown.removeClass('turndown');
	}
	turnCon.eq(lastIndex).removeClass('arrive').addClass('leave');
	turnCon.eq(index).addClass('arrive');
	var timer = setInterval(function(){
		if ( turnCon.eq(index).css('opacity') == 1 ) {
			f = true;
			clearInterval(timer);
			autoc();
		}
	} ,20);
	list.eq(index).addClass('active');
}

init();