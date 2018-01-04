/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-24 16:19:16
 * @version $Id$
 */
window.onload = os;
var way;//系统CPU数
var time;
var clock;//系统时钟
var lastTime;//计算时间间隔
var deletTime;
var input_well;//输入井
var internal;//内存情况表
var innerblock;//内存条
var innerQ = [];//内存队列;
var surplus;
var sur;//内存余量
var station;//磁带机
var sta;//磁带机余量
var pgtype;//进程调度的方式
var pg;//进程调度算法
var jbtype;//作业调度的方式
var jb;//作业调度算法
var inputQue = [];//创建输入井队列；
var radyQue = [];//就绪队列
var acplish;//完成的作业表
var acpQ = [];//完成的队
var del = [];//删除的块
var avetime;//平均周转时间
var settime;//用户设置时间
var userForm;//用户设置面板
var jnNum;//用户添加作业名称
var anNum;//用户添加作业到达时间
var rtNum;//用户添加运行时间
var niNum;//用户添加占用内存大小
var nsNum;//用户添加磁带机使用数量
var STATU;//时间停止
function os(){
     init();
      loop();
}

function init(){
             way = 1;//系统CPU数
             time = document.getElementById("time");//时钟
             settime = document.getElementById("setTime");
             userForm = document.getElementById("Userset");
             jnNum = document.getElementById("JN");
             anNum = document.getElementById("AN");
             rtNum = document.getElementById("RT");
             niNum = document.getElementById("NI");
             nsNum = document.getElementById("NS");
             input_well = document.getElementById("input_well");
             pgtype = document.getElementsByName("pgtype");
             jbtype = document.getElementsByName("jbtype");
             internal = document.getElementById("internal");//内存作业表
             acplish = document.getElementById("acplish");
             surplus = document.getElementById("surplus");
             station = document.getElementById("station");
             innerblock = document.getElementById("inter_block");//内存块
             avetime = document.getElementById("avetime");//平均周转时间
             STATU = 0;
             station.innerHTML= "4台";
             sur = new surObj();
             sur.init();
             sta = new staObj();
             sta.init();
             deletTime = 0;
             lastTime =  Date.now();
             clock = new clock();
             clock.init();
             time.innerHTML = clock.time;
             inputQue = [{name:'JOB1',arrive:'10:00',work:25,nedcpu:15,nedsta:2,sur:25},
	                      {name:'JOB2',arrive:'10:20',work:30,nedcpu:60,nedsta:1,sur:30},
	                      {name:'JOB3',arrive:'10:30',work:10,nedcpu:50,nedsta:3,sur:10},
	                      {name:'JOB4',arrive:'10:35',work:20,nedcpu:10,nedsta:2,sur:20},
	                      {name:'JOB5',arrive:'10:40',work:15,nedcpu:30,nedsta:2,sur:15}];
             var zhucun = new innerObj();
             zhucun.init('free',0,sur.num,true);
             innerQ .push(zhucun);
             userForm.addEventListener("click",Onclick,false);
      
}

function loop(){
             window.requestAnimFrame(loop);
             var now =  Date.now();
             if(STATU==0) 
                  {
                        deletTime=0;
                  }
              if(STATU==1)
             {
                     deletTime = now - lastTime;
               }
             lastTime = now;
             clock.run();
             time.innerHTML = clock.time;
             set_inputWell ();
             mng_radyQue();
             set_Internal ();
             mng_innerQ();
             sur.show();
             sta.show();
             mng_acpQ();
             delete_block();
             jb = check_radio(jbtype);
             pg = check_radio(pgtype);
            aveTime();
     
}

function Onclick(e){
       e.preventDefault();//消除默认事件
       var element = e.target;
       console.log(e.target.id);
       switch(element.id){
            case "add": addJob();break;
            case "stop": STATU=0;break;
            case "start": STATU=1;break;
            case "reset": setTime();break;
            case "clean": inputQue=[];acpQ=[];break;

       }
       return false;
}

function addJob(){
         var jn = jnNum.value;//用户添加作业名称
         var an = anNum.value;//用户添加作业到达时间
         var rt = rtNum.value;//用户添加运行时间
         var ni =  niNum.value;//用户添加占用内存大小
         var ns = nsNum.value;//磁带机数
         console.log(jn);
         console.log(an);
         console.log(rt);
         console.log(ni);
         console.log(ns);
         if(jn&&an&&rt&&ni&&ns)
         {
             console.log(ns);
            var newjob = new jobObj();
             newjob.init(jn,an,rt,ni,ns);
             console.log(newjob);
             inputQue.push(newjob);

         }
}

function setTime(){
      var strtime=settime.value.split(":");
       
      clock.hour = strtime[0];
      clock.min = strtime[1];
}