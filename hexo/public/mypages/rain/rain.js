(function($){
   
   $.fn.mony = function(options){
   	var $flake = $('<div class="mony" />').html('$'),
   	       domH = $(document).height(),
   	       domW = $(document).width(),
   	       defaults = {
   	       	minSize : 10,
   	       	maxSiza : 20,
   	       	newOn: 1000,
   	       	flakeColor: "#FFAA33"
   	       },
   	       options = $.extend({},defaults,options);
   	       var interval = setInterval(function(){
   	       	var startPositionLeft = Math.random()*domW - 100,
   	       	      startOpacity = 0.5 + Math.random(),
   	       	      sizeFlake = options.minSize + Math.random()*options.maxSize,
   	       	      endPositionTop = domH - 200,
   	       	      endPositionLeft = startPositionLeft - 500 + Math.random()*500,
   	       	      durationFall = domH *10 + Math.random() *5000;
   	       	      $flake.clone().appendTo('body').css({
   	       	      	left : startPositionLeft,
   	       	      	opacity : startOpacity,
   	       	      	width : sizeFlake,
   	       	      	color: options.flakeColor 
   	       	      }).animate({
   	       	      	top : endPositionTop,
   	       	      	left : endPositionLeft,
   	       	      	opacity : 0.2
   	       	      },durationFall,'linear',function(){
   	       	      	$(this).remove()
   	       	      });
   	       },options.newOn);
   };

   $(function(){
	$.fn.mony({
		minSize:5,//最小尺寸
		maxSize:50,//最大尺寸
		newOn:300 //密集度
	});
});

})(jQuery);

// $(function(){
// 	$.fn.snow({
// 		minSize:5,//最小尺寸
// 		maxSize:50,//最大尺寸
// 		newOn:300 //密集度
// 	});
// });