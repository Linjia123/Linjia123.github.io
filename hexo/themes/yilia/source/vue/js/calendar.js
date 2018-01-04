/*date对象转字符串 小于10则加0 如05*/
MY_addZero = function(n) {
    n = parseInt(Number(n));
    if (n < 10) n = 0 + '' + n;
    return n;
}
// 获取两日期之间的天数
MY_DateDiff = function(sDate1, sDate2) { //sDate1和sDate2是yyyy-MM-dd格式
    var aDate, oDate1, oDate2, iDays;

    aDate = sDate1.split("-").join("/");

    oDate1 = new Date(aDate); //转换为yyyy-MM-dd格式

    aDate = sDate2.split("-").join("/");

    oDate2 = new Date(aDate);

    iDays = parseInt(Math.abs(oDate1.getTime() - oDate2.getTime()) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

    if (oDate1 <= oDate2) {
        return iDays; //返回相差天数 
    } else {
        return -iDays;
    }

}
/*返回当前日期的yyyy-mm-dd格式*/
MY_getCurrentDate = function() {
    var _date = new Date();
    return _date.getFullYear() + '-' + MY_addZero(_date.getMonth() + 1) + '-' + MY_addZero(_date.getDate());
}

//获取当前年份
MY_getCurrentYear = function() {
    var _date = new Date();
    return _date.getFullYear();
}
//获取当前月
MY_getCurrentMonth = function() {
    var _date = new Date();
    return _date.getMonth() + 1;
}
/*转换日期格式如：2015-3-3 to 2015-03-03*/
MY_convertToZero = function(date) {
    var _date = date.split('-');
    return _date[0] + '-' + MY_addZero(_date[1]) + '-' + MY_addZero(_date[2]);
}

/*date对象转字符串  返回yyyy-mm-dd*/
MY_timeToYMD = function(time) {
    if (!time) var time = new Date();
    var year = time.getFullYear(),
        month = this.addZero(time.getMonth() + 1),
        day = this.addZero(time.getDate())
    str = year + '-' + month + '-' + day;
    return str;
}

/*获取某年某月份第一天周几*/
MY_getLastDay = function(y, m) {
    var weekDay = new Date(y, m - 1, 1).getDay(); //第一天周几
    return weekDay;
}

/*获取某年某月的天数*/
MY_getDayNumber = function(y, m) {
    var days = new Date(y, m, 0).getDate();
    return days;
}

/**yyyy-mm-dd格式返回{year:yyyy,month:mm,day:dd}**/
MY_getDayObj = function(str) {
    var _date = str.split('-');
    var obj = { year: _date[0], month: _date[1], day: _date[2] };
    return obj;
}