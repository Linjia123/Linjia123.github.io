/*
 * 功能： 日历组件
 * 时间： 2016-08-26
 * 作者： linjia
 */

(function($) {
    $.fn.extend({

        Sort: function(options) {
            options = $.extend({
                mainBox: $(this),
                index: 20,
                speed:100,
                color: ['#ffcc99', '#ccffff', '#ffcccc', '#ffff99', '#ccccff', '#ccffcc']
            }, options);

            var SortObj = function(mainBox, index, color,speed) {
                this.mainBox = mainBox;
                this.list = mainBox.find('li');
                this.btns = mainBox.find('input');
                this.msg = mainBox.find('#msg');
                this.width = $(this.list[0]).width();
                this.listData = [];
                this.timeData = [];
                this.color = color; //['#ffcc99', '#ccffff', '#ffcccc', '#ffff99', '#ccccff', '#ccffcc'];
                this.index = index; //20;
                this.mgLeft = 7;
                this.speed = speed;
                for (var i = 0; i < this.index; i++) {
                    this.listData[i] = parseInt(Math.random() * 550 + 10);
                }
                this.Init(this.listData);
                this.SelectType();
            }

            SortObj.prototype = {
                Init: function(arr) {
                    var left = 0,
                        color = '';
                    for (var i = 0; i < arr.length; i++) {
                        left = (this.mgLeft + this.width) * i;
                        switch (parseInt(arr[i] / 100)) {
                            case 0:
                                color = this.color[0];
                                break;
                            case 1:
                                color = this.color[1];
                                break;
                            case 2:
                                color = this.color[2];
                                break;
                            case 3:
                                color = this.color[3];
                                break;
                            case 4:
                                color = this.color[4];
                                break;
                            case 5:
                                color = this.color[5];
                                break;
                            default:
                                color = this.color[0];
                                break;
                        }
                        $(this.list[i]).css({
                            left: left + 'px',
                            height: arr[i] + 'px',
                            backgroundColor: color
                        });
                    }
                },

                Run: function(fsh, speed) {
                    var that = this;
                    var timer = setInterval(clock, speed);
                    var timeIndex = 0;

                    function clock() {
                        if (timeIndex >= (that.timeData).length) {
                            that.timeData = [];
                            timeIndex = 0;
                            that.msg.text('执行完毕');
                            clearInterval(timer);

                        } else {
                            that.msg.text('正在执行请耐心等待...');
                            that.Init(that.timeData[timeIndex]);
                            timeIndex++;

                        }
                    }

                },
                SelectType: function() {
                        var okBtn = this.mainBox.find('#Ok'),
                            resetBtn = this.mainBox.find('#reset'),
                            that = this;
                        okBtn.on('click', function() {
                            var type = $('input:radio[name="sortType"]:checked').val();
                            switch (type) {
                                case '快速排序':
                                   that.Run(that.quickSort(that.listData), that.speed);
                                    break;
                                case '插入排序':
                                   that.Run(that.insertSort(that.listData), that.speed);
                                    break;
                                case '冒泡排序':
                                   that.Run(that.bubbleSort(that.listData), that.speed);
                                    break;
                                case '选择排序':
                                   that.Run(that.selectSort(that.listData), that.speed);
                                    break;
                                case '希尔排序':
                                   that.Run(that.shellSort(that.listData), that.speed);
                                    break;

                            }

                        })

                        resetBtn.on('click', function() {
                            that.Init(that.listData);
                        })

                    },
                    //选择排序
                selectSort: function(arry) {
                    var arr = [].concat(arry);
                    console.log(arr === this.listData);
                    var len = (arr).length,
                        i, j, k, tmp;
                    for (i = 0; i < len; i++) {
                        k = i;
                        for (j = i + 1; j < len; j++) {
                            if (arr[j] < arr[k]) k = j;
                        }
                        if (k != i) {
                            tmp = arr[k];
                            arr[k] = arr[i];
                            arr[i] = tmp;
                            this.timeData.push(arr.slice(0, this.index));
                        }

                    }
                },

                //冒泡排序
                bubbleSort: function(arry) {
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
                },
                //插入排序
                insertSort: function(arry) {
                    var arr = [].concat(arry);
                    var len = (arr).length,
                        i, j, tmp;
                    for (i = 1; i < len; i++) {
                        tmp = arr[i];
                        j = i - 1;
                        while (j >= 0 && tmp < arr[j]) {
                            arr[j + 1] = arr[j];
                            j--;
                        }
                        arr[j + 1] = tmp;
                        this.timeData.push(arr.slice(0, this.index));
                    }
                },
                //希尔排序
                shellSort: function(arry) {
                    var arr = [].concat(arry);
                    var len = (arr).length,
                        gap = parseInt(len / 2),
                        i, j, tmp;
                    while (gap > 0) {

                        for (i = gap; i < len; i++) {
                            tmp = arr[i];
                            j = i - gap;
                            while (j >= 0 && tmp < arr[j]) {
                                arr[j + gap] = arr[j];
                                j = j - gap;
                                this.timeData.push(arr.slice(0, this.index));
                            }
                            arr[j + gap] = tmp;
                        }
                        gap = parseInt(gap / 2);
                    }
                },

                //快速排序
                quickSort: function(arry) {
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
                }
            }


            return this.each(function() {
                var calendar = new SortObj(options.mainBox, options.index, options.color,options.speed);
            });

        }
    });
    var cell = ({
                  
                  color:['#81c2d6','#8192d6','#d9b3e6','#dcf7a1','#83fcd8','#f2b6b6'],
                  speed:25
                       });

    var sort = $('#sort').Sort(cell);
}(jQuery));
