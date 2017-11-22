/*
 * 功能： 日历组件
 * 时间： 2016-08-26
 * 作者： linjia
 */

(function ($) {
    $.fn.extend({

        calendar: function (options) {
            options = $.extend({
                id: $(this).id,
                zIndex: "auto",
                to:true,
                setTime: "",
                minTime: "",
                maxTime: "",
                num:null
            }, options);

            var CalendarObj = function (mycalendar, to, startime, mintime,maxTime, num, zIndex) {
                this.calend = mycalendar;

                this.input = $(this.calend.find("input").get(0)); //输入框
                this.input.attr("readonly", "readonly");
                this.Init(); //生成日历
                this.to = to; //是否选区间 
                this.initNum = num - 1; //区间长度(开始往后天数[不包括开始])
                this.table.css("z-index", zIndex);
                var now = new Date();
                var timestamp = now.valueOf(); //时间戳
                this.table.attr('id', 'calendar' + timestamp);
                this.input.attr('data-id', 'calendar' + timestamp);

                this.startDay = [now.getFullYear(), now.getMonth() + 1, now.getDate()]; //存放起始年月日
                this.today =[];
                this.endDay = []; //存放终止时间年月日
                this.maxDay = maxTime.split('-');

                this.clickSum = 1; //点击总次数
                this.hasClick = 0; //已经点击次数
                //this.input.attr('data-start-time',this.setDayText(this.startDay[0], this.startDay[1], this.startDay[2]));

                if (startime) {
                    this.startDay = startime.split('-');
                }
                // this.input.val(this.setDayText(this.startDay[0], this.startDay[1], this.startDay[2]));

                if (this.to == true) {
                    // this.input.attr('data-end-time', this.input.attr('data-start-time'));
                    // if(endtime){
                    //    this.input.attr('data-end-time',endtime);
                    //    this.endDay = this.input.attr('data-end-time').split('-');
                    // }
                    // this.input.val(this.input.attr('data-start-time')+
                    //   '至' + this.input.attr('data-end-time'));
                    this.clickSum = 2;
                }

                if (mintime) {
                    this.today = mintime.split('-');
                }

                this.nowMT = $(this.table.find("table").get(0)); //当前月份表
                this.nowY = $(this.table.find("span").get(0)); //信息：当前年
                this.nowM = $(this.table.find("span").get(1)); //信息栏：当前月

                this.nextMT = $(this.table.find("table").get(1)); //下个月
                this.nextY = $(this.table.find("span").get(2));
                this.nextM = $(this.table.find("span").get(3));

                this.nowTd = this.nowMT.find("tbody td");
                this.nextTd = this.nextMT.find("tbody td");

                this.beforeBtn = $(this.table.find("i").get(0));
                this.afterBtn = $(this.table.find("i").get(1));


                this.ShowNow();
                // this.setPosition(this);
                this.Run();


            }


            CalendarObj.prototype.Init = function () { //动态生成日历
                $Table = $('<div class="calendar"><div><p class="now-msg"><i class="iconfont icon-left"></i><span></span>年<span></span>月</p><table class="first"><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div><div><p class="next-msg"><span></span>年<span></span>月<i class="iconfont icon-right"></i></p><table class="last"><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div>');
                $("body").append($Table);
                this.table = $Table;
                this.table.hide();
            }

            CalendarObj.prototype.Run = function () {
                var that = this;
                var $dom = $(document);

                $dom.on('click', function (event) {
                    event = event || window.event;
                    var Target = event.target || event.srcElement;
                    if (!$(Target).is(that.input) && !$(Target).parents().is(that.table)) {
                        that.table.hide();
                    }
                })


                that.input.on('focus', function () {
                    that.table.show();
                    that.setPosition(that);
                });

                that.beforeBtn.on('mouseup', function () { //往前选月份
                    that.ChangeMn($(this));
                });
                that.afterBtn.on('mouseup', function () { //往后选月份
                    that.ChangeMn($(this));
                });
                //点击选择日期
                that.selectDay(that.nowMT);
                that.selectDay(that.nextMT);


            }
            CalendarObj.prototype.setPosition = function (that) { //设置日历位置
                 var win = $(window),
                    dom = $(document),
                    timer = setInterval(function () {
                        if(that.table.is(":hidden")){
                            clearInterval(timer);
                        }
                        else{
                        var winH = win.height(),
                            winW = win.width(),
                            domST = dom.scrollTop(),
                            domSL = dom.scrollLeft();
                        Top = that.calend.offset().top + that.calend.height(),
                            Left = that.calend.offset().left,
                            tableW = that.table.width(),
                            tableH = that.table.height(),
                            tableTop = Top + 4,
                            tableLeft = Left;
                        if (winH + domST - Top < tableH) {
                            tableTop = that.calend.offset().top - tableH;
                        }
                        if (winW - Left < tableW) {
                            tableLeft = Left - (tableW - that.calend.width());
                            // console.log(tableW - that.calend.width());
                        }
                        that.table.css({
                            top: tableTop + 'px',
                            left: tableLeft + 'px',
                        });
                    }
                    }, 25);
            }

            CalendarObj.prototype.setDayText = function (Year, Month, Day) { //统一输入框文字样式
                var dayString = '';
                if (parseInt(Month / 10) <= 0) {
                    Month = '0' + Month;
                }
                if (parseInt(Day / 10) <= 0) {
                    Day = '0' + Day;
                }
                dayString = Year + '-' + Month + '-' + Day;
                return dayString;
            }


            //点击选择日期
            CalendarObj.prototype.selectDay = function (MTable) {
                var that = this,
                    Td = MTable.find("td"),
                    startDate = [],
                    endData;
                for (var i = 0; i < Td.length; i++) {
                    $(Td[i]).on('click ', function () {

                        if (!$(this).hasClass('select')) {
                            return false;
                        }
                        that.hasClick++;

                        if (that.hasClick == 1) {
                            startData = that.getDay($(this));
                            that.startDay = that.setDayText(startData[0], startData[1], startData[2]).split('-');
                        }

                        if (that.hasClick == 2) {
                            endData = that.getDay($(this));;
                            that.endDay = that.setDayText(endData[0], endData[1], endData[2]).split('-');
                        }
                        //显示
                        that.setDayClass();

                        if (that.hasClick >= that.clickSum) {
                            that.hasClick = 0;

                            if (that.to) {
                                that.input.attr('data-start-time', that.startDay.join('-'));
                                that.input.attr('data-end-time', that.endDay.join('-'));
                                that.input.val(that.startDay.join('-') + "至" + that.endDay.join('-'));
                            } else {
                                that.input.val(that.startDay.join('-'));
                                that.input.attr('data-start-time', that.startDay.join('-'));
                            }
                            that.table.hide();
                        }
                    })
                }
            }

            //点击切换月份
            CalendarObj.prototype.ChangeMn = function (obj) {
                var that = this,
                    NewMn = parseInt(that.nowM.text(), 10),
                    newYear = parseInt(that.nowY.text(), 10);
                if (obj.is(this.afterBtn)) {
                    NewMn++;
                } else {
                    NewMn--;
                }
                if (NewMn < 1) {
                    NewMn = 12;
                    newYear -= 1;
                } else if (NewMn > 12) {
                    NewMn = 1;
                    newYear += 1;
                }
                that.nowM.text(NewMn);
                that.ShowNow(newYear, NewMn);
            }

            //填充年月
            CalendarObj.prototype.ShowNow = function (yr, mn) {
                var that = this,
                    now = new Date(),
                    nowy = yr || now.getFullYear(),
                    nowm = mn - 1 || now.getMonth(),
                    dd = now.getDate(),
                    nowMn = mn || now.getMonth() + 1,
                    nexty = nowy,
                    nextm = nowm + 1,
                    nextMn = nowMn + 1;
                //填充 年 和 月
                that.nowY.text(nowy);
                that.nowM.text(nowMn);

                if (nextMn >= 13) {
                    nexty += 1;
                    nextMn = 1;
                }
                that.nextY.text(nexty);
                that.nextM.text(nextMn);
                //填充日期
                that.ShowAllDay(nowy, nowMn - 1, dd, that.nowTd);
                that.ShowAllDay(nexty, nextMn - 1, dd, that.nextTd);
            }

            //填充当月所有日期
            CalendarObj.prototype.ShowAllDay = function (Yr, Mn, Dd, Td) {
                var that = this,
                    arr31 = [1, 3, 5, 7, 8, 10, 12],
                    is31 = true,
                    newDd = new Date(); //根据传入的数值生成新的日期
                newDd.setFullYear(Yr, Mn, Dd);
                var year = newDd.getFullYear(),
                    month = newDd.getMonth(),
                    dd = newDd.getDate();

                var firstD = new Date();
                firstD.setFullYear(year, month, 1);
                var firstDay = firstD.getDay();

                var str31 = arr31.join(","),
                    regExp = eval("/" + (month + 1) + ",|," + (month + 1) + ",|," + (month + 1) + "/g"),
                    dayLen = 31;
                //判断每个月有多少天
                if (str31.search(regExp) == -1) {
                    dayLen = 30;
                }
                if ((Mn + 1) == 2) { //判断二月
                    dayLen = 28;
                    if ((Yr % 4 == 0 && Yr % 100 != 0) || Yr % 400 == 0) {
                        dayLen = 29;
                    }
                }
                //清空日期
                for (var i = 0; i < that.nowTd.length; i++) {
                    $(Td[i]).html('');
                    $(Td[i]).removeClass("active");
                }

                for (var j = 0; j < dayLen; j++) {
                    $(Td[j + firstDay]).text(j + 1);
                }
                that.setDayClass();
            }

            CalendarObj.prototype.setDayClass = function () { //管理表格样式
                var that = this,
                    Td = that.table.find('tbody td'),
                    day = [],
                    dayData = 0,
                    todayData = that.dayToNum(that.today[0], that.today[1], that.today[2]),
                    startday = that.dayToNum(that.startDay[0], that.startDay[1], that.startDay[2]),
                    endday = that.dayToNum(that.endDay[0], that.endDay[1], that.endDay[2]);
                    if(this.maxDay){
                      var maxdayData = that.dayToNum(that.maxDay[0], that.maxDay[1], that.maxDay[2]);
                    }

                Td.each(function () {
                    $(this).removeClass('active');
                    $(this).removeClass('select');
                    $(this).removeClass('pass');
                    day = that.getDay($(this));
                    dayData = that.dayToNum(day[0], day[1], day[2]);
                    if (dayData >= todayData) {
                        $(this).addClass('select');
                    }

                    if (dayData == startday) {
                        $(this).addClass('active');
                        if (startday < todayData) {
                            $(this).removeClass('active');
                            $(this).addClass('pass');
                        }
                    }

                    if (endday && dayData == endday && that.hasClick != 1) {
                        $(this).addClass('active');
                    }

                    if (that.to == true && that.hasClick == 1) {
                        $(this).removeClass('select');

                        if (dayData >= startday && that.isInDiff(startday, dayData)) {
                            $(this).addClass('select');
                        }
                    }

                    if(maxdayData&&dayData > maxdayData){
                           $(this).removeClass('select');
                    }
                });
            }

            CalendarObj.prototype.dayToNum = function (Year, Month, Day) { //转换日期为数字(20160821)
                Year = parseInt(Year);
                Month = parseInt(Month);
                Day = parseInt(Day);

                if (parseInt(Month / 10) <= 0) {
                    Month = '0' + Month;
                }

                if (!Day) {
                    return 0;
                } else {

                    if (parseInt(Day / 10) <= 0) {
                        return parseInt(Year + '' + Month + '0' + Day);
                    } else return parseInt(Year + '' + Month + Day + '');
                }
            }

            CalendarObj.prototype.getDay = function (td) { //获取指定日期[2016,08,21]
                var Td = this.table.find('tbody td');
                var dayData = [];

                for (var i = 0; i < Td.length; i++) {

                    if ($(Td[i]).is(td)) {

                        if (i <= ((Td.length / 2) - 1)) {
                            dayData = [this.nowY.text(), this.nowM.text(), $(Td[i]).text()];
                        } else {
                            dayData = [this.nextY.text(), this.nextM.text(), td.text()];
                        }
                    }

                }
                return dayData;
            }
            CalendarObj.prototype.isInDiff = function (startDate, endDate) { //判断时间间隔天数是否符合要求
                var startDate = startDate + '',
                    endDate = endDate + '',
                    startY = startDate.substr(0, 4), //获取年月日(20160908)
                    startM = startDate.substr(4, 2),
                    startD = startDate.substr(6, 2),
                    endY = endDate.substr(0, 4),
                    endM = endDate.substr(4, 2),
                    endD = endDate.substr(6, 2);
                date1 = new Date(startY, startM - 1, startD);
                date2 = new Date(endY, endM - 1, endD);
                if (this.initNum>0&&date2.getTime() - date1.getTime() > this.initNum * 24 * 60 * 60 * 1000) {
                    return false;
                }
                return true;
            }

            return this.each(function () {
                var calendar = new CalendarObj($(this), options.to, options.setTime, options.minTime, options.maxTime,options.num, options.zIndex);
            });

        }
    });
  // var cell = ({
  //                   id : $(this).id,
  //                   zIndex :2000000,
  //                   to : true, 
  //                   setTime:"2016-08-27",
  //                   minTime:"2016-08-29",
  //                   maxTime:"2016-09-20",
  //                   num:3
  //                  });
  //           $('.calendar-input').calendar(cell);
              $('.calendar-input').calendar();
}(jQuery));

