 var SortObj = function() {
     this.list = $('li');
     this.btns = $('input');
     this.width = $(this.list[0]).width();
     this.listData = [];
     this.timeData = [];
     this.color = ['#ffcc99','#ccffff','#ffcccc','#ffff99','#ccccff','#ccffcc'];
     this.index = 20;
     this.mgLeft = 7;
     for (var i = 0; i < this.index; i++) {
         this.listData[i] = parseInt(Math.random() * 550 + 10);
     }
     this.Init(this.listData);
     // this.Run(this.quickSort(this.listData),100);
 }

 SortObj.prototype.Init = function(arr) {
 	var left = 0,
 	    color = '';
     for (var i = 0; i < arr.length; i++) {
         left = (this.mgLeft + this.width) * i;
         switch(parseInt(arr[i]/100)){
         	case 0: color = this.color[0];break;
         	case 1: color = this.color[1];break;
         	case 2: color = this.color[2];break;
         	case 3: color = this.color[3];break;
         	case 4: color = this.color[4];break;
         	case 5: color = this.color[5];break;
         	default: color = this.color[0];break;
         }
         $(this.list[i]).css({
             left: left + 'px',
             height: arr[i] + 'px',
             backgroundColor: color
         });
     }
 }

 SortObj.prototype.Run = function(fsh,speed) {
         var that = this;
         var timer = setInterval(clock, speed);
         var timeIndex = 0;
         function clock() {
             if (timeIndex >= (that.timeData).length) {
                 that.timeData = [];
                 console.log(timeIndex);
                 timeIndex = 0;
                 clearInterval(timer);

             } else {
                 that.Init(that.timeData[timeIndex]);
                 timeIndex++;

             }
         }

     }
//选择排序
SortObj.prototype.selectSort = function(arry){
	var arr = [].concat(arry);
	    console.log(arr===this.listData);
    var len = (arr).length,
        i, j, k, tmp;
    for(i=0; i<len; i++){
        k = i;
        for(j=i+1; j<len; j++){
            if(arr[j] < arr[k]) k = j;
        }
        if(k!=i){
            tmp = arr[k];
            arr[k] = arr[i];
            arr[i] = tmp; 
            this.timeData.push(arr.slice(0, this.index));
        }

    }
    console.log(this.listData);
};
     
//冒泡排序
 SortObj.prototype.bubbleSort = function(arry) {
 	 var arr = [].concat(arry);
     var len = (arr).length,
         i, j, tmp;
     console.log((arr).length);
     for (i = 0; i < len; i++) {
         for (j = len - 1; j > i; j--) {
             if (arr[j] < arr[j - 1]) {
                 tmp = arr[j - 1];
                 arr[j - 1] = arr[j];
                 arr[j] = tmp;
                 this.timeData.push(arr.slice(0, this.index));
             }
         }
     }
 }
 //插入排序
 SortObj.prototype.insertSort = function(arry){
 	var arr = [].concat(arry);
 	var len = (arr).length,
        i, j, tmp;
    for(i=1; i<len; i++){
        tmp = arr[i];
        j = i - 1;
        while(j>=0 && tmp < arr[j]){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = tmp;
        this.timeData.push(arr.slice(0, this.index));
    }
 }
 //希尔排序
 SortObj.prototype.shellSort = function(arry){
 	var arr = [].concat(arry);
    var len = (arr).length, gap = parseInt(len/2), 
        i, j, tmp;
    while(gap > 0){

        for(i=gap; i<len; i++){
            tmp = arr[i];
            j = i - gap;
            while(j>=0 && tmp < arr[j]){
                arr[j+gap] = arr[j];
                j = j - gap;
                this.timeData.push(arr.slice(0, this.index));
            }
            arr[j + gap] = tmp;
        }
        gap = parseInt(gap/2);
    }
};

//快速排序
 SortObj.prototype.quickSort = function(arry){
 	var arr = [].concat(arry);
    var i = 0;
    var that = this;
    var j = arr.length - 1;
    var Sort = function(i, j) {
        // 结束条件
        if (i == j) {
            return
        };
        var key = arr[i];
        var stepi = i; // 记录开始位置
        var stepj = j; // 记录结束位置
        while (j > i) {
            //向前查找
            if (arr[j] >= key) {
                j--;
                 that.timeData.push(arr.slice(0, that.index));
            } else {
                arr[i] = arr[j];
                //向后查找
                while (j > ++i) {
                    if (arr[i] > key) {
                        arr[j] = arr[i];
                         that.timeData.push(arr.slice(0, that.index));
                        break;
                    }
                     that.timeData.push(arr.slice(0, that.index));
                }
            }
        }

        if (stepi == i) {
            Sort(++i, stepj);
            return;
        }
        // 最后一个空位留给 key
        arr[i] = key;
        // 递归
        Sort(stepi, i);
        Sort(j, stepj);
    }

    Sort(i, j);
};

 var sort = new SortObj();
 var okBtn = $('#Ok');
 var resetBtn = $('#reset');
 okBtn.on('click',function(){
 	var type = $('input:radio[name="sortType"]:checked').val();
 	switch(type){
 		case '快速排序': sort.Run(sort.quickSort(sort.listData),100);break;
 		case '插入排序': sort.Run(sort.insertSort(sort.listData),100);break;
 		case '冒泡排序': sort.Run(sort.bubbleSort(sort.listData),100);break;
 		case '选择排序': sort.Run(sort.selectSort(sort.listData),100);break;
 		case '希尔排序': sort.Run(sort.shellSort(sort.listData),100);break;

 	}
 	console.log(type);

 })
 resetBtn.on('click',function(){
        sort.Init(sort.listData);
        console.log(sort.listData);
 })

