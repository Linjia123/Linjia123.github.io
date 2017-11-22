/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-27 09:50:36
 * @version $Id$
 */
//内存块
var innerObj = function(){
	this.name;
	this.start;//起始地址
	this.end;//结束地址1
	this.status;//是否空闲 true:空闲 false:占用
	this.color;

}
innerObj.prototype.init= function(name,start,end,status){
	this.name = name;
	this.start =start;
	this.end =end;
	this.status =status;
	if(this.status == true)
	    this.color = '#428bca';
	else
	     this.color = '#474747';
}
innerObj.prototype.die = function(){//空闲分区释放
             if(this.status == false)
             {
             	this.status = true;
             	this.color = '#428bca';
             	this.name = 'free';
             	sur.num += this.end-this.start;

             }	
}
innerObj.prototype.change = function(item){//空闲内存块合并
	var inner = innerQ[item];
	var k=-1;
	if(inner.status== true&&this.status== true)//如果是连续空闲区
	{
		if(inner.end==this.start||inner.start == this.end)
		{
                            if(inner.end==this.start)
		  this.start = inner.start;
	               if(inner.start == this.end)
		  this.end=inner.end;
		  k=item;
		}
	}	
	return k;
}

//开辟空间
innerObj.prototype.insert = function(name,size){//往空闲区插入新的作业
	if(this.status==true&&(this.end - this.start)>=size)
	{
		var newinner = new innerObj();
		newinner.init(name,this.start,this.start+size,false);
		sur.num = sur.num - size;
		this.start = this.start+size;
		innerQ .push(newinner);//分配内存块
		return true;
	}
	return false;
}

