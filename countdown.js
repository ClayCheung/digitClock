var RADIUS = 8 ;
var WINDOW_WIDTH =1024 ;
var WINDOW_HEIGHT = 768 ;
var MARGIN_LEFT = 30 ;
var MARGIN_TOP = 60 ;
var YEAR = 2017 ;
var MONTH = 1 ;
MONTH-=1;
var DAY = 1 ;
var HOUR = 0 ;
var MINUTE = 0;
var SECOND = 0 ;


const  endTime= new Date(YEAR,MONTH,DAY,HOUR,MINUTE,SECOND);   	//设置终止时间
var curShowTimeSeconds = 0 ;									//距离终止时间的秒数

var balls=[]; 													//定义存放小球的数组，每个元素为小球的类
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
																/*定义存放颜色的数组*/



window.onload=function(){
 	WINDOW_WIDTH = document.body.clientWidth					/*						*/
    WINDOW_HEIGHT = document.body.clientHeight					/*						*/
																/* 						*/
    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);					/*		屏幕自适应		*/
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 155)-1 			/*						*/
																/* 						*/
    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);					/* 						*/

    var canvas = document.getElementById('con');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getCurShowTimeSeconds();					//调用getCurShowTimeSeconds()函数，来计算距离终止时间的秒数
/***********************************************************************************************************************/
	setInterval(
			function(){
				render(context);								//每50毫秒，绘图一次（绘图会叠加，需要清屏），
				update();										//更新一次
			}
			,
			50
		);
/***********************************************************************************************************************/	
}

function render(cxt){										//清屏，绘制时钟，绘制彩色动态小球
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var day=parseInt(curShowTimeSeconds/3600/24);
	var hour=parseInt((curShowTimeSeconds-24*3600*day)/3600);
	var minutes=parseInt((curShowTimeSeconds-24*3600*day-3600*hour)/60);
	var seconds=curShowTimeSeconds%60;

/***************************************************绘制时钟*************************************************************/
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(day/10),cxt);
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(day%10),cxt);

	renderDigit( MARGIN_LEFT + 32*(RADIUS+1),MARGIN_TOP,11,cxt);

	renderDigit( MARGIN_LEFT + 52*(RADIUS+1),MARGIN_TOP,parseInt(hour/10),cxt);
	renderDigit( MARGIN_LEFT + 67*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt);

	renderDigit( MARGIN_LEFT + 82*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit( MARGIN_LEFT + 91*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 106*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) ,cxt);

    renderDigit( MARGIN_LEFT + 121*(RADIUS+1) , MARGIN_TOP , 10 , cxt);

    renderDigit( MARGIN_LEFT + 130*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 145*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

/***********************************************绘制彩色动态小球**********************************************************/
    renderBalls(cxt);
/***********************************************************************************************************************/
}
function update(){
	var nextShowTimeSeconds=getCurShowTimeSeconds();					
	// if(nextShowTimeSeconds!=curShowTimeSeconds){
	// 	curShowTimeSeconds=nextShowTimeSeconds;
	// }
	var nextday=parseInt(nextShowTimeSeconds/3600/24);
	var nexthour=parseInt((nextShowTimeSeconds-24*3600*nextday)/3600);
	var nextminutes=parseInt((nextShowTimeSeconds-24*3600*nextday-3600*nexthour)/60);
	var nextseconds=nextShowTimeSeconds%60;

	var curday=parseInt(curShowTimeSeconds/3600/24);
	var curhour=parseInt((curShowTimeSeconds-24*3600*curday)/3600);
	var curminutes=parseInt((curShowTimeSeconds-24*3600*curday-3600*curhour)/60);
	var curseconds=curShowTimeSeconds%60;



	if(nextseconds!=curseconds){												//如果时间变化了
		if(parseInt(curday/10)!=parseInt(nextday/10)){
			addBalls(MARGIN_LEFT+0*(RADIUS+1),MARGIN_TOP,parseInt(curday/10));
		}
		if(parseInt(curday%10)!=parseInt(nextday%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curday%10));
		}

		if(parseInt(curhour/10)!=parseInt(nexthour/10)){						//且变化的是hour的十位
			addBalls(MARGIN_LEFT+52,MARGIN_TOP,parseInt(curhour/10));			//在hour的十位，开始增加绘制彩色小球
		}
		if(parseInt(curhour%10)!=parseInt(nexthour%10)){
			addBalls(MARGIN_LEFT+67*(RADIUS+1),MARGIN_TOP,parseInt(curhour%10));
		}

		if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
			addBalls(MARGIN_LEFT+91*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
			addBalls(MARGIN_LEFT+106*(RADIUS+1),MARGIN_TOP,parseInt(curminutes%10));
		}

		if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){
			addBalls(MARGIN_LEFT+130*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
		}
		if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
			addBalls(MARGIN_LEFT+145*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
		}


		curShowTimeSeconds=nextShowTimeSeconds;								//刷新：距离终止时间的秒数
	}


	updateBalls();												//更新彩色小球，用来达成运动效果

	console.log(balls.length);									//日志显示小球数组中小球的个数
}

function updateBalls(){											//更新彩色小球，用来达成运动效果

	for (var i = 0; i < balls.length; i++) {					/*						*/
		balls[i].vy += balls[i].g;								/*   	小球的运动		*/
		balls[i].x += balls[i].vx;								/*						*/
		balls[i].y += balls[i].vy;								/*						*/

		if(balls[i].y >= WINDOW_HEIGHT - RADIUS){				/*						*/
			balls[i].y = WINDOW_HEIGHT - RADIUS ;				/*		触底碰撞检测		*/
			balls[i].vy = - balls[i].vy*0.65;					/*						*/
		}

		if(balls[i].x >=WINDOW_WIDTH - RADIUS){					/*						*/
			balls[i].x =WINDOW_WIDTH - RADIUS;					/*	   右边框碰撞检测		*/
			balls[i].vx = -balls[i].vx;							/*						*/
		}
	}

	var cnt=0;
	for (var i = 0; i < balls.length; i++) {							/*						*/
		if((balls[i].x+RADIUS)>0&&(balls[i].x-RADIUS)<WINDOW_WIDTH){	/*						*/
			balls[cnt++]=balls[i];										/* 在屏幕内的小球加入计数 */
		}
	}
	while(balls.length>cnt){											/*	当彩色小球数组中的个数>在屏幕内的彩色小球的个数	 */
		balls.pop();													/*		    则从彩色小球数组中删除一个小球			*/
	}										  
}

function addBalls(x,y,num){										//增加一个数字上的彩色小球，并设置速度、加速度、颜色
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1){
				var aBall = {
					x: x+2*j*(RADIUS+1)+(RADIUS+1),
					y: y+2*i*(RADIUS+1)+(RADIUS+1),
					g:1+Math.random(),
					vx:Math.pow(-1,Math.ceil(1000*Math.random()))*10,
					vy:-7+Math.random(),
					color:colors[Math.floor(Math.random()*colors.length)]
				}

				balls.push(aBall);							//将小球加入小球数组
			}
		}
	}
}

function getCurShowTimeSeconds(){							//返回：距离终止时间的秒数
	var currentTime = new Date();						//当前的时间
	var ret = endTime.getTime()- currentTime.getTime();	//终止的时间：距离1970年1月1日的毫秒数 - 当前的时间：距离1970年1月1日的毫秒数
	ret = Math.round(ret/1000);							//距离终止时间的秒数
	return ret >= 0 ? ret : 0 ;							//如果大于0就返回本身，小于0就返回0
}





function renderBalls(cxt) {						//绘制彩色动态小球
    for (var i = 0; i < balls.length; i++) {
    	cxt.fillStyle=balls[i].color;

    	cxt.beginPath();
    	cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
    	cxt.closePath();

    	cxt.fill();
    }
}

function renderDigit(x,y,num,cxt){				//绘制时钟
	if(num==11){
		cxt.fillStyle="red";
	}
	else if(num==10){
		cxt.fillStyle="green";
	}
	else{
		cxt.fillStyle="blue";
	}



	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),y+(RADIUS+1)+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}


	

}
