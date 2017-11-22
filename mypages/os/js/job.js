/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-24 17:07:58
 * @version $Id$
 */
var jobObj  = function(){
	this.name ;//作业名
	this.arrive ;//到达时间
	this.start ;//开始执行时间
	this.work;//运行时间
	this.nedcpu ;//需要内存kb
	this.nedsta ;//需要磁带机数
	this.sur;//剩余时间
}
jobObj.prototype.init = function(name,arrive,work,nedcpu,nedsta){
	this.name = name;
	this.arrive = arrive;
	this.start = 0;//还未执行为0
	this.work = work;
	this.nedcpu = nedcpu;
	this.nedsta = nedsta;
	this.sur = this.work;
}

