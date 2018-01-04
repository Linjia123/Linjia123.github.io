/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-23 14:23:17
 * @version $Id$
 */

var STAR = 1;
var STOP = 0;
var single;
var show=[];

//跨浏览器事件绑定
//字面量声明静态属性
var commond = {
	id:0,
	commond:''

}
function initsingle(xinxi){
     
      while(show.length>=23)
      {
      	show.shift();
      	
      }
      show.push(xinxi);
       single.innerHTML = show.join("");
       // console.log(show);
       // console.log(show.join(""));
         
}
//删除数组中指定的元素
Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
} 
//数组按所存对象的航道从小到大排列
function sortArray(array){
	var a = [];
	a = array.slice(0);
	if(a.length>=2){
	        var b = a[0];
	        console.log(b);
	       for(var i = 0;i<a.length;i++){
		  for(var j = 0;j<a.length;j++){
			if(a[j].way>a[i].way){
				b = a[j];
				a[j] = a[i];
				a[i] = b;	
			}
		}
	}
    }	
    return a;
}
//飞船飞行状态
function moveship(shipId,speed,way){
	var shipway = document.getElementById("playway"+way);
	var  ship = shipway.lastChild;
	console.log(ship);
	var x,y,t,w=0;
	var timer;
	timers = setInterval(function(){
		// if(shipId.destroy==true)
		// 	clearInterval(timers);
		// else{
		if(shipId.status == 1){
	                 t =w+speed;
                              w = (t);
                             ship.style.transform = "rotate("+t+"deg)";
                        }
                           if(shipId.status==0){
                           	ship.style.transform = "rotate( "+w+"deg)";
                           }  
                      // }             
	},200);
}
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
  function SpaceShip(way){
          	this.speed=10;
          	this.energy=100;
          	this.way = way;
          	this.destroy = false;
          	this.status = 0;//0就是停止，1就是启动
             }
             SpaceShip.prototype.fly=function(){
             		if(this.status == 0&&this.energy==100&&this.destroy==false)
             			{
             				this.status = 1;
             				 initsingle("<p>[消息]:轨道"+this.way+"的飞船起飞</p>");
             			}
             		
             	};
             SpaceShip.prototype.stop=function(){
             		if(this.status == 1&&this.destroy==false)
             			{
             				this.status = 0;
             				this.speed = 0;
             				initsingle("<p>[消息]:轨道"+this.way+"的飞船停机</p>");
             			}
             	};
             
             SpaceShip.prototype.addEnergy=function(num){
             		this.energy += num;
             		if(this.energy >= 100){
             			this.energy = 100;
             			
             		}
             	};
             SpaceShip.prototype.subtractEnergy=function(num){
             		this.energy -= num;
             		if(this.energy <= 0){
             			this.energy = 0;
             			this.stop();
             		}
             	};
             SpaceShip.prototype.destroys=function(){
                                  if(this.destroy == false)
                                 {
                           	this.destroy = true;
                                 }
                          };

             SpaceShip.prototype.acceptSingle=function(message){
             		if(message.id != this.way){
                                               return ;
             		}
             		else{
             			if(Math.random()*100<=30){
             				show.push("<p style='color:red'>飞船信号丢包</p>");
             			}
             		            else{
             		                    switch(message.commond){
             		                    	case 'fly':this.fly();break;
             		                    	case 'stop':this.stop();break;
             		                    	case 'destroy':this.destroys();break; 
             			         }      
             		            }
             		}
             	};
       
 var manager = {
         	shipList:[],
         	createShip:function(shipway){
         		var newSpaceShip = new SpaceShip(shipway); 
         		var shipId = this.shipList.push(newSpaceShip);
         		var parent = document.getElementById("playway"+shipway);
         		     parent.innerHTML += "<div><div class='ship'><span id='energy"+shipway+"' class='energy' style='height:100%'></span></div>";
         		      moveship(newSpaceShip,newSpaceShip.speed,shipway);
         	},
         	stopShip:function(shipway){
         		var timer;
         		var shipId = this.shipList;
         		var shipDiv = document.getElementById("playway"+shipway);
         		var shipenergy = (shipDiv.lastChild).getElementsByTagName("span")[0];
         		console.log(shipId.length); 
         		for(var j=0;j<shipId.length;j++){
         			console.log(shipId[j].way);
         			if(shipId[j].way == shipway){
         				shipId[j].acceptSingle(commond);
         				var st = shipId[j];
         				if(shipId[j].status==0){
         					// moveship(shipId[j],shipId[j].speed,shipway);
         				              timer = setInterval(function(){
                           	                                            var thiship = st;
         			                                           thiship.addEnergy(5);
         			                                           shipenergy.style.height = thiship.energy+"%";
                                                                                 console.log(shipenergy.style.height);
                                                                                 console.log(thiship.status);
                                                                                 if(thiship.energy==100)
                                                                                 	{  
                                                                                 	    clearInterval(timer);
                                                                                 	}
                                                                           },400); 
         				                
         				}

         			}
         		}
         		
                          
         	},
         	destroyShip:function(shipway){
         		 var shipId = this.shipList;
         		 var way= document.getElementById("playway"+shipway); 
                          for(var j = 0;j<shipId.length;j++){
                          	if(shipId[j]!=null&&shipId[j].way==shipway){
                          	shipId[j].acceptSingle(commond);
                          	if(shipId[j].destroy==true) 
                          	  way.removeChild(way.lastChild);
                          	  shipId.remove(j);
                          	}
                          }
                          console.log(shipId);
         	},
         	flyShip:function(shipway){
         		 console.log(shipway);         		 
         		 var shipId = this.shipList;
         		 var timer;
         		 var parent = document.getElementById("playway"+shipway);
         		 var shipenergy = (parent.lastChild).getElementsByTagName("span")[0];
         		for(var j=0;j<shipId.length;j++){
         			if(shipId[j].way == shipway){
         				shipId[j].acceptSingle(commond);
         				var st = shipId[j]; 
         				 console.log(shipId[j].status);
         				if(shipId[j].status == 1)
         				 {
         				 	// moveship(shipId[j],shipId[j].speed,shipway);
         					console.log(shipId[j].status);
         			                            timer = setInterval(function(){
         			                                            var thiship = st;
         			                                            thiship.subtractEnergy(5);
         			                                            shipenergy.style.height = thiship.energy+"%";
                                                                                  console.log(shipenergy.style.height);
                                                                                  console.log(thiship.status);
                                                                                  if(thiship.energy==0||thiship.status==0)
                                                                                  {clearInterval(timer);
                                                                                  manager.stopShip(shipway);}
                                                                                  },400);          
         				  }
         			
                                            
         			}
         		}
         		
         		
         		           
         	},
         	sendMessage:function(message){
                  if((Math.random()*100)<=30)
                     initsingle("<p style='color:red'>[指挥官]:发送指令丢包</p>");
                  else{
                         switch(message.commond){
                         	case 'fly': initsingle("<p>[指挥官]:"+ message.id+"号飞船起飞</p>"); manager.flyShip(message.id);break;
                         	case 'fly': initsingle("<p>[指挥官]:"+ message.id+"号飞船起飞</p>"); manager.flyShip(message.id);break;
             	case 'stop': initsingle("<p>[指挥官]:"+ message.id+"号飞船停止飞行</p>");manager.stopShip(message.id); break; 
             	case 'destroy':initsingle("<p>[指挥官]:"+ message.id+"号飞船销毁</p>");manager.destroyShip(message.id); break;       
             		}
                  }
         	}
  };
function function1(){   
         var contral = document.getElementById("contral");
         var spacelist;
         contral.onclick=function(event){
         	event = event||window.event;
         	var target = event.target;
         	switch(target.id)
         	{
         		case 'newone':
         		                         spacelist = sortArray(manager.shipList);
         		                         console.log(spacelist);
         		                       for(var i=0,wayId = 1;i< spacelist.length;i++)
         		                       	{
         		                       	  // console.log(spacelist[i].way);
                                                    if(wayId==spacelist[i].way)
                    	                           wayId +=1;
                    	                         }
         	                                  if(wayId<4&&wayId>0)
                                                {
         	                                      manager.createShip(wayId);
         	                                       console.log(spacelist);
         	                                       if(wayId>=3)
         	                                       	contral.innerHTML +="<br><label><strong>对三号飞船进行控制:</strong><button id='start3'>开始飞行</button><button id='stop3'>停止飞行</button><button id='destroy3'>销毁</button></label>";
                                                };break;
         		case 'start1': commond.id=1;commond.commond = 'fly';manager.sendMessage(commond);break;
         		case 'stop1': commond.id=1;commond.commond = 'stop'; manager.sendMessage(commond);break;
         	             case 'destroy1':commond.id=1;commond.commond = 'destroy'; manager.sendMessage(commond);break;
         	             case 'start2': commond.id=2;commond.commond = 'fly';manager.sendMessage(commond);break;
         		case 'stop2': commond.id=2;commond.commond = 'stop'; manager.sendMessage(commond);break;
         	             case 'destroy2':commond.id=2;commond.commond = 'destroy'; manager.sendMessage(commond);break;
         	             case 'start3': commond.id=3;commond.commond = 'fly';manager.sendMessage(commond);break;
         		case 'stop3': commond.id=3;commond.commond = 'stop'; manager.sendMessage(commond);break;
         	             case 'destroy3':commond.id=3;commond.commond = 'destroy'; manager.sendMessage(commond);contral.removeChild(contral.lastChild);break;
         	}
         }
         
         }

  window.onload=function(){
  	// function1();
  	single = document.getElementById("message");
  	
  	function1();
}
