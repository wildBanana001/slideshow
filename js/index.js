// startMove(oDiv,);
// var oDivArr = document.getElementsByTagName('div');

// oDivArr[0].onmouseenter = function(){
// 	sstartMove(this,'width',400);
// 	console.log('11');
// }
// oDivArr[0].onmouseleave = function(){
// 	sstartMove(this,'width',100);
// }
// oDivArr[1].onmouseenter = function(){
// 	sstartMove(this,'height',400);
// }
// oDivArr[1].onmouseleave = function(){
// 	sstartMove(this,'height',100);
// }
// oDivArr[2].onmouseenter = function(){
// 	sstartMove(this,'opacity',50);
// }
// oDivArr[2].onmouseleave = function(){
// 	sstartMove(this,'opacity',100);
// }
// oDivArr[3].onmouseenter = function(){
// 	sstartMove(this,'borderWidth',50); 
// }
// oDivArr[3].onmouseleave = function(){
// 	sstartMove(this,'borderWidth',1);
// }

// function getStyle(dom,attr){
// 	if(window.getComputedStyle){
// 		return window.getComputedStyle(dom,false)[attr];
// 	}else{
// 		return dom.currentStyle[attr];
// 	}
// }

// function sstartMove(dom,attr,target){
// 	clearInterval(dom.timer);
// 	var iSpeed = 0,
// 		iCur;
// 	dom.timer = setInterval(function(){
// 		if(attr === 'opacity'){
// 			iCur = parseFloat(getStyle(dom,attr)) * 100;
// 		}else{
// 			iCur = parseInt(getStyle(dom,attr));
// 		}
// 		iSpeed = (target - iCur) /7;
// 		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
// 		if(iCur === target){
// 			clearInterval(dom.timer);
// 		}else{
// 			if(attr === 'opacity'){
// 				dom.style.opacity = (iCur + iSpeed) / 100;
// 			}else{
// 				dom.style[attr] = iCur + iSpeed + 'px';
// 			}
// 		}
// 	},30)
// }

// document.onkeydown = function(e){
// 	console.log(e.keyCode);
// 	switch(e.keyCode){
// 		case 37:
// 			startMove(oDiv, {left:oDiv.offsetLeft - 50,function(){
// 				console.log('left');
// 			}});
// 			break;
// 		case 38:
// 			startMove(oDiv, {top:oDiv.offsetTop - 50,function(){
// 				console.log('up');
// 			}});
// 			break;
// 		case 39:
// 			startMove(oDiv, {left:oDiv.offsetLeft + 50,function(){
// 				console.log('right');
// 			}});
// 			break;
// 		case 40:
// 			startMove(oDiv, {top:oDiv.offsetTop + 50,function(){
// 				console.log('down');
// 			}});
// 			break;
// 	}
// }

var oLiArr = document.getElementsByTagName('li'),
	oSP = document.getElementById('sp'),
	leftBtn = document.getElementsByTagName('div')[1],
	rightBtn = document.getElementsByTagName('div')[2],
	oIArr = document.getElementsByTagName('i'),
	delayTimer = null,
	len = oSP.children.length - 1,
	moveLen = oSP.children[0].offsetWidth,
	index = 0,
	locked = true;

	// console.log(oSP.children);

function controlMove(direction) {
	if(locked){
		locked = false;
		clearTimeout(delayTimer);
		if(!direction || direction === 'turnRight') {
			index++;
			if(oSP.offsetLeft === -len * moveLen) {
	 			oSP.style.left = '0px';
				// index = 0;
			}
			if(index === len) {
				index = 0;
			}
			changeIndex(index);
			startMove(oSP, {left: oSP.offsetLeft - moveLen}, function() {
				console.log(oSP.offsetLeft);
				delayTimer = setTimeout(controlMove, 1500);
				locked = true;
			});
		} else if(direction === 'turnLeft') {
			if(oSP.offsetLeft === 0) {
				oSP.style.left = -len * moveLen + 'px';
				index = len;	
			}
			
			// if(index === 0) {
			// 	index = len;
			// }
			index--;
			changeIndex(index);
			startMove(oSP, {left: oSP.offsetLeft + moveLen}, function() {
				delayTimer = setTimeout(controlMove, 1500);
				locked = true;
			});
		}	
	}
}

function bindEvent() {
	leftBtn.onclick = function(){
		controlMove('turnLeft');
	}
	rightBtn.onclick = function(){
		controlMove('turnRight');
	}
	for(var i = 0; i < len; i++) {
		(function(thisIndex) {
			oIArr[i].onclick = function() {
				index = thisIndex;
				changeIndex(index);
				locked = false;
				startMove(oSP, {left: -index * moveLen}, function() {
					delayTimer = setTimeout(controlMove, 1500);
					locked = true;
				})
			}
		})(i)
	}
}

function changeIndex(index) {
	for(var i = 0; i < len; i++){
		oIArr[i].className = '';
	}
	oIArr[index].className = 'active';
}

bindEvent();
delayTimer = setTimeout(controlMove, 1500);