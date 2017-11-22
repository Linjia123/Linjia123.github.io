/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-20 19:32:45
 * @version $Id$
 */

// var aqiSourceDate = {
// 	"北京":{
// 		"2016-01-01":10,
// 		"2016-01-02":10,
// 		"2016-01-03":10,
// 		"2016-01-04":10
// 	}
// };
function getDateStr(dat){
	var y = dat.getFullYear();
	var m = dat.getMonth()+1;
	var d = dat.getDate();
	 m = m < 10 ? '0' + m: m;
	 d = d < 10 ? '0' + d : d;
	return y+'-'+m+'-'+d;
}
function randomBuildDate(seed){
	var returnDate = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	for(var i = 1;i<92;i++){//3个月92天
	     datStr = getDateStr(dat);
	     returnDate[datStr] = Math.ceil(Math.random()*seed);//向上取整
	     dat.setDate(dat.getDate()+1);//天数加1	
	}
	return returnDate;
}

var aqiSourceDate = {
	"北京":randomBuildDate(500),
	"上海":randomBuildDate(300),
	"广州":randomBuildDate(200),
	"深圳":randomBuildDate(100),
	"成都":randomBuildDate(300),
	"西安":randomBuildDate(500),
	"福州":randomBuildDate(100),
	"厦门":randomBuildDate(100),
	"沈阳":randomBuildDate(500)
};
//用于渲染图表的数据
var charData ={};
//记录当前页面的表单选项
var pageState = {
	nowSelectCity:"",//选的城市
	nowGraTime:"day"//选的时间段
}
//跨浏览器事件绑定
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
//s属性个数
function renderLength(node){
	var i = 0;
	for(var j in node){
		i++;
	}
	return i;
}
//渲染图表
function renderChart(){
	var wrap = document.getElementById("aqi-chart-wrap");
	var char = charData;
	var wrapWidth = parseInt(getComputedStyle(wrap,false).width);
	var num = renderLength(char);
	var left =20;
	var lineheight;
	var color=["#00ced1","#8fbc8f","#bdb76b","#b8860b"];
	var width = parseInt(wrapWidth/(2*num));
	var background;
	// console.log(width);
	wrap.innerHTML="";
	for(var i in char){
                  
                   var newChild = document.createElement("div");
                   if(num>90)
                       lineheight = char[i];
                   if(num<20&&num>10)
                      lineheight = parseInt(parseInt(char[i])/7);
                  if(num<=10)
                       lineheight = parseInt(parseInt(char[i])/30);
                   if(lineheight>300)
                   	background=color[3];
                   if(lineheight>200&&lineheight<=300)
                   	background=color[2];
                   if(lineheight>100&&lineheight<=200)
                   	background=color[1];
                   if(lineheight>0&&lineheight<=100)
                   	background=color[0];
                   newChild.style.height = lineheight+'px';
                   // console.log(charData[i].value);
                   // console.log(charData[i]+'px');
                   newChild.style.width = width+'px';
                   newChild.style.left = left+'px';
                   newChild.style.backgroundColor = background;
                   newChild.innerHTML = "<span>"+i+"</br>"+char[i]+"</span>";
                   wrap.appendChild(newChild); 
                   console.log(left);
                   left=left+2*width;
                   	
	}
             
}
//日、周、月的raduo事件点击的处理函数
function graTimeChange(target){
	//确定是否选项发生了变化
	var value = pageState.nowGraTime;
	// console.log(value);
	// console.log(target);
		if(value!=target){
		   console.log("发生改变");
		   pageState.nowGraTime = target;
		   // console.log(pageState.nowGraTime);
		   	}
	//设置对应的数据
	//调用图表渲染函数
	initAqiChartData();
	 renderChart();
}
//select 所选城市发生变化时的处理函数
function citySelectChage(){
	//确定是否选项发生了变化
	var value = this.value;
	//设置对应数据
	if(value!=pageState.nowSelectCity)
	{
		pageState.nowSelectCity = value;
		 initAqiChartData();
		 //调用图表渲染函数
		 renderChart();
	}
	
	
}
//初始化日、月、周的radio事件，当点击时，调用函数graTimeChange
function initGraTimeForm(){
   var grade = document.getElementById("grade");
   console.log(grade);
   addEventHandler(grade,"click",function(e){
   	var e = e||event;
   	var target = e.srcElement||e.target;
   	// alert(target.tagName);   	
   	if(target.tagName == "INPUT"){
   		graTimeChange(target.value);
   		
   	}
   })
}
//初始化城市Select下拉选项框中的选项
function initCitySelector(){
	//读取aqiSourceDate中的城市，然后设置id为city-select的下拉列表中的选项
	var i;
	var innercity="";
	var cityselect = document.getElementById("city-select");
	for(i in aqiSourceDate)
	{
                  innercity = innercity+ "<option>"+i+"</option>";
	}
	cityselect.innerHTML += innercity;
	console.log(cityselect.innerHTML);
	//给select设置事件，当选项发生时调用函数citySelectChange
           addEventHandler(cityselect,"change",citySelectChage);
}
//初始化图表需要的数据格式
function initAqiChartData(){
	var city = pageState.nowSelectCity;
	var time = pageState.nowGraTime;
	var aqidata = aqiSourceDate;
	var datStr = '';
	var mydata;
	var data = new Date("2016-01-01");
	      datStr = data.getDay(data);
	      console.log(datStr);
	      // console.log(aqidata)
	//将原始的源数据处理成图表需要的数据格式	
	for(var i in aqidata)
	{
		if(i == city)
			mydata = aqidata[i];
		
	}
	console.log(mydata);
	switch(time){
		case "day":;break;
		case "week":
		                {   
		                	var weeknum = [];
		                	var j=0;
		                	var k=0;
		                	var n=1;
		                    for(var i in mydata)
	                               {
	                               	   var da = new Date(i);
	                               	   var we = da.getDay(da);
	                               	   // console.log(mydata[i]);
	                               	   console.log(j);
	                               	   k+=parseInt(mydata[i]);
		                            weeknum[j] = k;
		                            if(we>=6)
		                            	{   j++; k=0;}
	                              }
	                              mydata={};
	                              for(i=0;i<weeknum.length;i++){
                                                    mydata["第"+n+"周"]=weeknum[i];
                                                    n++;
	                              }
	                              console.log(mydata);
		             };break;
		case "month":
		                       {   
		                	var monthnum = [0,0,0];
		                	 j=0;
		                	 n=1;
		                    for(var i in mydata)
	                               {
	                               	   var yh = new Date(i);
	                               	   var mo = yh.getMonth(da);
	                               	   // console.log(mydata[i]);
	                               	   // console.log(j);
	                               	   // console.log(mo);
	                               	   if(mo==0)
		                            monthnum[0] +=parseInt(mydata[i]);
		                            if(mo==1)
		                            monthnum[1] +=parseInt(mydata[i]);
		                           if(mo==2)
		                            monthnum[2] +=parseInt(mydata[i]);
	                              }
	                              mydata={};
	                              for(i=0;i<monthnum.length;i++){
                                                    mydata[n+"月"]=monthnum[i];
                                                    n++;
	                              }
	                              console.log(mydata);
		             };break;
	}
            //处理好的数据存到chartData中
            charData = mydata;
            console.log(charData);
}
//初始化函数 
function init(){
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
	
}

window.onload= function(){
	init();
}