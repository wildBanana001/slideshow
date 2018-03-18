//定义一系列变量
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

//控制移动，参数为方向，默认向右
function controlMove(direction) {
	if(locked){
		locked = false;
		clearTimeout(delayTimer);
		if(!direction || direction === 'turnRight') {
			index++;
			if(oSP.offsetLeft === -len * moveLen) {
	 			oSP.style.left = '0px';
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
			
			index--;
			changeIndex(index);
			startMove(oSP, {left: oSP.offsetLeft + moveLen}, function() {
				delayTimer = setTimeout(controlMove, 1500);
				locked = true;
			});
		}	
	}
}

//监听事件
function bindEvent() {
	leftBtn.onclick = function(){
		controlMove('turnLeft');
	}
	rightBtn.onclick = function(){
		controlMove('turnRight');
	}
	//轮播图下的小原点
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