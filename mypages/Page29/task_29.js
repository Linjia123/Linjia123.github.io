/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-31 15:13:15
 * @version $Id$
 */


window.onload = function (){
var input = document.getElementsByTagName("input");
var txt = document.getElementById("tip");
var submit = document.getElementById("sub");
var Gn='#00CED1';
var Re='#CD5C5C';
var Gr='#D3D3D3';
var Bl='#00BFFF';
var judgemsg={
         'nam':false,
         'psw':false,
         'cfm':false,
         'email':false,
         'phone':false

} ;        
//获焦信息处理显示
function fcs_marks(elem){	
   var msg;
   switch(elem.id){
   	case 'nam': msg = "必填，长度为4~16个字符";break;
   	case 'psw': msg = "必填，长度为4~16个字符,包含字母和数字";break;
   	case 'cfm': msg = "必填，需与密码输入一致";break;
   	case 'email': msg= "填写正确的邮箱格式";break;
   	case 'phone': msg="填写正确的手机号码";break;
   }
   	var p = elem.nextSibling.nextSibling;
   	p.innerHTML = msg; 
          	elem.style.border = '1px solid '+Bl;
          	p.style.color = Bl;
}
//失焦信息处理显示
function blur_marks(elem){
   var msg=[];
   switch(elem.id){
   	case 'nam': msg[0] = "名称不能为空";msg[1]="";break;
   	case 'psw': msg[0] = "密码不可用";msg[1] = "密码可用";break;
   	case 'cfm': msg[0] = "密码输入不一致";msg[1] = "密码输入一致";break;
   	case 'email': msg[0] = "邮箱格式错误";msg[1]="邮箱格式正确";break;
   	case 'phone': msg[0] ="手机格式错误";msg[1] = "手机格式正确";break;
   	
   };
   var p = elem.nextSibling.nextSibling;
          if(!judge(elem)){
          	p.innerHTML = msg[0]; 
          	elem.style.border = '1px solid '+Re;
          	p.style.color = Re;
          	judgemsg[elem.id] = false;
          } 
          	else {
          		p.innerHTML = msg[1]; 
          		p.style.color = Gn;
          		elem.style.border = '1px solid '+Gn;
          		judgemsg[elem.id] = true;
          	}
	
}
//判断是否符合要求
function judge(elem){
var  result = false;
var value = elem.value;
console.log(value);
switch(elem.id){
            case 'nam': 
            result = /^[a-zA-Z0-9_]{4,16}/.test(value.replace(/[\u0391-\uffe5]/g,"nn"));break;
   	case 'psw':
   	result = /^\S{4,16}$/.test(value);break;
   	case 'cfm': result = document.getElementById("psw").value==value;break;
   	case 'email':result = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value) ;break;
   	case 'phone': result = /^[1][0-9]{10}$/.test(value);break;
   };
   return result;
}
	for(var i = 0;i