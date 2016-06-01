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
//元素事件
  for(var i = 0;i