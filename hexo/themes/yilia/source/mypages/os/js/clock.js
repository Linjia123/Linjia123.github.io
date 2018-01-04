/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-24 16:35:35
 * @version $Id$
 */
//资源显示 时间，剩余内存，剩余磁带机
var clock = function(){
	this.hour;//小时
	this.time;
             this.min;//分钟
             this.delet;//时间间隔
}
clock.prototype.init=function(){
	this.hour = 9;
	this.min = 55;
	this.delet = 0;
	this.time = "9:55";
}
clock.prototype.run = function()
{
	this.delet +=deletTime;
	  if(this.delet>=1000)
             {	this.min++;
                     if(this.min>=60)
                     {
                          this.hour++;
                          if(this.hour >= 24)
                          	this.hour = 0;
                          this.min=0;
                     }
                     mng_rady();
                     this.delet = 0;
              }
               if(this.min<=9)
                this.time = this.hour+":0"+this.min;
               else
               {
                  this.time = this.hour+":"+this.min;
               }
       
}
	
clock.prototype.comp = function(time){//判断事件长短 比当前事件早的为0 与当前事件相等或大的为1
         var time =parseInt(time.replace(":",''));
         var now =parseInt(this.time.replace(":",''));
         if(now<time) return 0;
         else return 1; 
}

//关于时间的操作
//将时间准变为统一的分钟计算
clock.prototype.all_min = function(time){
	var time =parseInt(time.replace(":",''));
	var hour = time/100;//小时
	var min = time%100;//分钟
	var dismin = hour*60+min;
	return min;
}
//时间的加发运算
clock.prototype.add_time = function(T1,min){
	if(T1)
	{
	  var time1 =parseInt(T1.replace(":",''));
	  var hour1 = Math.floor(time1/100);//小时
	  var min1 = time1%100;//分钟
	  min1 = min1+min;
	  hour1 += Math.floor(min1/60);
	  min1 = min1%60;
	  return hour+":"+min1;
	}

}
//时间的减法运算
clock.prototype.sub_time = function(T1,T2){
	if(T1&&T2)
	{
	var time1 =parseInt(T1.replace(":",''));
	var time2 =parseInt(T2.replace(":",''));
	var hour1 =Math.floor(time1/100);//小时
	var min1 = time1%100;//分钟
	var hour2 = Math.floor(time2/100);//小时
	var min2 = time2%100;//分钟	
	return (hour2-hour1)*60+min2-min1;
	}	
           return;
}
var surObj = function(){
        this.num;
}
surObj.prototype.init = function(){
	this.num = 100;
}
surObj.prototype.show = function(){
           surplus.innerHTML =this.num+"KB";
}

var staObj = function(){
        this.num;
}
staObj.prototype.init = function(){
	this.num = 4;
}
staObj.prototype.show = function(){
           station.innerHTML =this.num+"台";
}

//计算平均周转时间
function aveTime(){
	var time=0;
	var a = 0;
	for(var i = 0;i<acpQ.length;i++){
                     time += clock.sub_time(acpQ[i].arrive,acpQ[i].end);
	}
	if(acpQ.length>=1)
	a = parseFloat(time/acpQ.length).toFixed(1);

	avetime.innerHTML =a+"分钟";
}