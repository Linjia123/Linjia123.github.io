/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-24 17:22:33
 * @version $Id$
 */
//队列操作

//输入井操作
function set_inputWell(){
	       if(jb=='SJF')
              inputQue.sort(compare("work"));//短作业优先
              if(jb=='FCFS')
             inputQue.sort(compare("arrive")); //先来先服务
	 input_well.innerHTML = "<tr><th>作业名称</th><th>到达时间</th><th>运行时间(分钟)</th><th>内存需要</th><th>磁带机数</th></tr>";
	for(var i =0;i<inputQue.length;i++){	
                     input_well.innerHTML += "<tr><td>"+inputQue[i].name+"</td><td>"+inputQue[i].arrive+"</td><td>"+inputQue[i].work+"</td><td>"+inputQue[i].nedcpu+"</td><td>"+inputQue[i].nedsta+"</td></tr>";    
	}

}
//运行结束表显示
function mng_acpQ(){
	acplish.innerHTML = "<tr><th>作业名称</th><th>结束时间</th><th>到达时间</th><th>内存需要</th><th>开始运行时间</th><th>进入内存时间</th><th>状态</th></tr>";
	acpQ.sort(compare("end"));
	for(var i =0;i<acpQ.length;i++){
	 acplish.innerHTML += "<tr><td>"+acpQ[i].name+"</td><td>"+acpQ[i].end+"</td><td>"+acpQ[i].arrive+"</td><td>"+acpQ[i].nedcpu+"</td><td>"+acpQ[i].run+"</td><td>"+acpQ[i].intertime+"</td><td>"+acpQ[i].statu+"</td></tr>";    
	}

 }

//显示内存块队列
 function mng_innerQ(){
 	 innerblock.innerHTML='';
 	for(var i =0;i<innerQ.length;i++){
 		var length = innerQ[i].end-innerQ[i].start;
 		var start = innerQ[i].start;
 		var color = innerQ[i].color;
 		 innerblock.innerHTML+="<span style='width:"+length+"%;background-color:"+color+";left:"+start+"%;'></span>";
 	}

 }
//释放内存
function rls_innerQ(name)
{
	for(var i =0;i<innerQ.length;i++){
 		if(innerQ[i].name&&innerQ[i].name==name){
 			innerQ[i].die();	
 			for(var j =0;j<innerQ.length;j++)
 			 {
 			 	if(innerQ[j]!=0&&innerQ[i].change(j)!=-1&&innerQ[i]!=innerQ[j])
 			             innerQ[j]=0;
 			           
 			 }
 			 break;
 		}
 	}
}

function delete_block(){    //删除多余内存块
	
                       for(var i=0;i< innerQ.length;i++)
                       {
                       	if( innerQ[i]==0)
		innerQ.remove(i);
	          }
	
}

//就绪队列
function mng_radyQue(){
	 
	for(var i =0;i<inputQue.length;i++)//作业进入就绪队列
	{            //判断事件并且开辟空间
		if(clock.comp(inputQue[i].arrive)==1&& (radyQue.indexOf(inputQue[i]))<0)//到达就加到就绪队列
		{
		    for(var j =0;j<innerQ.length;j++)
		    {
		    
                                  if(inputQue[i]&&innerQ[j].insert(inputQue[i].name,inputQue[i].nedcpu)==true) 
                                  {  
                                      inputQue[i].intertime = clock.time;//到达内存时间
		                        inputQue[i].statu = "就绪";
		                        radyQue.push(inputQue[i]); 
                                     inputQue.remove(i);//移除输入队列
                                 }
		      }
		 }   
	}
	 // 就绪队列排队
       if(pg=='SPF')
       radyQue.sort(compare("sur"));//短进程优先
       if(pg=='FCFS')
       radyQue.sort(compare("intertime"));//先来先服务

	for(i = 0;i<radyQue.length;i++)//作业执行()
	{
                 if(i==0&&way>=1&&radyQue[i].nedsta<=sta.num)
                 {
                    radyQue[i].statu="正在执行";
                    sta.num -= radyQue[i].nedsta;
                    if(!radyQue[i].run)
                    radyQue[i].run = clock.time;//开始执行时间
                    way--;
                 }
                 if(i!=0&&radyQue[i].statu=="正在执行"&&radyQue[i].sur>=1)
                 {
                    radyQue[i].statu="就绪";
                    way++;
                    sta.num += radyQue[i].nedsta;
                    console.log(radyQue[i].sur);
                 }
                 // if(way>=1&& radyQue[i].statu=="就绪"&&radyQue[i].nedsta<=sta.num)
                 // {
                 	
                 // 	 sta.num -= radyQue[i].nedsta;
                 // 	 radyQue[i].statu = "正在执行";
                 //    if(radyQue[i].run)
                 // 	 radyQue[i].run = clock.time;//开始执行时间
                 // 	 way--; 
                 // 	 //进程完成移除
                 // }
                 if(radyQue[i].statu=="正在执行")
                 {
                    // if(clock.sub_time(radyQue[i].run,clock.time)>=radyQue[i].work)
                      if(radyQue[i].sur<=0)
                         {	 
                            radyQue[i].statu = "完成";
                    	  radyQue[i].end = clock.time;
                    	  rls_innerQ(radyQue[i].name);
                    	   sta.num += radyQue[i].nedsta;
                    	  acpQ.push(radyQue[i]);
                    	  radyQue.remove(i);
                    	  way++;

                    	}
                 }
                 
	}
           
}
//内存显示操作
function set_Internal (){
	internal.innerHTML = "<tr><th>作业名称</th><th>到达时间</th><th>运行时间(分钟)</th><th>剩余时间(分钟)</th><th>内存需要</th><th>磁带机数</th><th>进入内存时间</th><th>状态</th></tr>";
	for(var i =0;i<radyQue.length;i++){
	
                         internal.innerHTML += "<tr><td>"+radyQue[i].name+"</td><td>"+radyQue[i].arrive+"</td><td>"+radyQue[i].work+"</td><td>"+radyQue[i].sur+"</td><td>"+radyQue[i].nedcpu+"</td><td>"+radyQue[i].nedsta+"</td><td>"+radyQue[i].intertime+"</td><td>"+radyQue[i].statu+"</td></tr>";    
	}

}
function  mng_rady(){
  for(var i=0;i<radyQue.length;i++){
    if(radyQue[i].statu=="正在执行")
      radyQue[i].sur--;
  }
}

//数组按照对象属性排列
function compare(propertyName) { 
    return function (object1, object2) { 
        var value1 = object1[propertyName]; 
        var value2 = object2[propertyName]; 

           if(value1==String&&value2==String)
        {
             value1 = parseInt(value1.replace(":",'')); 
             value2 = parseInt(value2.replace(":",''));

         }
        if (value2 < value1) { 
            return 1; 
        } 
        else if (value2 > value1) { 
            return -1; 
        } 
        else { 
            return 0; 
        } 
    } 
} 

function check_radio(radio){
	for(var i=0;i<radio.length;i++){
                if(radio[i].checked){ 
                     return radio[i].value;
	}
            
}
}