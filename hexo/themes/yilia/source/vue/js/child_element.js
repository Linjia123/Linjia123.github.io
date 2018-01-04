/**注册子组件**/

/**loading组件**/
var Loading = {
    props: ['show'],
    template: '<div class="dialog" v-show="show">' +
        '<div class="overlay"></div>' +
        '<div class="dialogwrap">' +
        '<div class="dialogbody">' +
        '<div class="spinner">' +
        '<div class="bounce1"></div>' +
        '<div class="bounce2"></div>' +
        '<div class="bounce3"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
}

/**toast组件**/
var Toast = {
    props: ['show', 'msg'],
    template: '<div class="toast-box" v-show="show">{{msg}}</div>',
}

/**弹窗组件**/
var popUpWindow = {
    props: ['item'],
    data() {
        return {
            returnItem: {
                type: '',
                msg: '',
            }, //返回父组件数据
            childMsg: '',
            cleanBtnIndex: 0
        }
    },
    template: '<div class="dialog" v-show="item.show">' +
        '<div class="overlay"></div>' +
        '<div class="dialogwrap">' +
        '<div class="dialogbody">' +
        '<div class="dialog-ask">' +
        '<div class="dialog-msg">' +
        '<div class="dialog-title">{{item.title}}</div>' +
        '</div>' +
        '<div class="dialog-content">' +
        '<input type="text" :placeholder="item.holder" v-model="item.text" @focus="cleanBtnIndex = 1" @blur="hideCleanBtn()">' +
        '<span class="input-clean" @click = "cleanInput()" v-show="cleanBtnIndex == 1"></span>' +
        '</div>' +
        '<div class="dialog-btn confirm" @click="confirm">确定</div>' +
        '<div class="dialog-btn cancal" @click="cancal">取消</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        hideCleanBtn: function() {
            var that = this;
            setTimeout(function() {
                that.cleanBtnIndex = 0;
            }, 500);
        },
        cleanInput: function() {
            var that = this;
            that.item.text = '';
        },
        confirm: function() {
            this.returnItem.type = "confirm";
            this.returnItem.msg = this.item.text;
            this.$emit("updatefromchild", this.returnItem);
        },
        cancal: function() {
            this.returnItem.type = "cancal";
            this.returnItem.msg = this.item.text;
            this.$emit("updatefromchild", this.returnItem);
        }
    }
}

/**日历组件**/
var Calendar = {
    props: ['fromfather'],
    data() {
        return {
            calendar: { year: '', month: '', day: [] },
            currentDate: '08',
        }
    },
    template: '<div class="dialog" v-show="fromfather.show">' +
        '<div class="overlay"></div>' +
        '<div class="dialogwrap">' +
        '<div class="dialogbody">' +
        '<div class="dialog-ask">' +
        '<div class="dialog-content">' +
        '<div class="calendar">' +
        '<div class="title"><span @click="lastMonth">《</span> {{calendar.year}}-{{calendar.month}} <span @click="nextMonth">》</span></div>' +
        '<ul class="weekday">' +
        '<li>日</li>' +
        '<li>一</li>' +
        '<li>二</li>' +
        '<li>三</li>' +
        '<li>四</li>' +
        '<li>五</li>' +
        '<li>六</li>' +
        '</ul>' +
        '<ul>' +
        '<li v-for="item in calendar.day " :date="item.date" @click="checkDay(item)" v-bind:class="{active: item.active}">' +
        '{{item.num}}' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        /**创建日历**/
        createCalendar: function() {
            this.calendar = { year: '', month: '', day: [] };
            var dayObj = MY_getDayObj(this.fromfather.selectDay.date);
            this.createYear(dayObj.year, dayObj.month);;
        },
        /**创建年份**/
        createYear: function(y, m) {
            var year = y ? y : MY_getCurrentYear();
            this.createMonth(year, m);
        },
        /**创建月份**/
        createMonth: function(y, m) {
            var month = m ? m : MY_getCurrentMonth();
            this.createDay(y, month);
        },
        /**创建天**/
        createDay: function(y, m) {
            var newDay = {};
            var fistWeekDay = MY_getLastDay(y, m); //月第一天周几
            var dayNumber = MY_getDayNumber(y, m); //月份的天数

            this.calendar.year = y;
            this.calendar.month = MY_addZero(m);

            /**月第一天之前的<li></li>置空**/
            for (var i = 0; i < fistWeekDay; i++) {
                newDay = {
                    date: '',
                    num: '',
                    active: false,
                }
                this.calendar.day.push(newDay);
            }
            /**设置日期状态**/
            for (var i = 1; i <= dayNumber; i++) {
                newDay = {
                    date: y + '-' + MY_addZero(m) + '-' + MY_addZero(i),
                    num: i,
                    active: false,
                }
                /**选中日期设置选中状态**/
                if (this.fromfather.selectDay.date && MY_DateDiff(newDay.date, this.fromfather.selectDay.date) == 0) {
                    newDay.active = true;
                }
                this.calendar.day.push(newDay);
            }
        },
        /**选择下一个月份**/
        nextMonth: function() {
            var year = this.calendar.year;
            var nextMonth = parseInt(this.calendar.month) + 1;
            if (nextMonth > 12) {
                year++;
                nextMonth = 1;
            }
            this.calendar.day = [];
            this.createDay(year, nextMonth);
        },
        /**选择上一个月份**/
        lastMonth: function() {
            var year = this.calendar.year;
            var nextMonth = parseInt(this.calendar.month) - 1;
            if (nextMonth < 1) {
                year--;
                nextMonth = 12;
            }
            this.calendar.day = [];
            this.createDay(year, nextMonth);
        },
        /**选中日期**/
        checkDay: function(item) {
            if (!item.date) return;
            var that = this;
            that.calendar.day.map(function(each) {
                each.active = false;
            });
            item.active = true;
            that.fromfather.selectDay = item;
            setTimeout(function() {
                that.fromfather.show = false;
            }, 200);
        }
    },
    watch: {　　　　
        "fromfather.show": {
            handler: function(val, oldval) {
                if (val) {
                    this.createCalendar();
                }
            },
            deep: true //对象内部的属性监听，也叫深度监听
        }
    },
}

/**底部弹窗**/
var Bottomwindow = {
    props: ['item'],
    data() {
        return {
            hideWindow: false
        }
    },
    template: '<div class="dialog" v-show="item.show" :class={fadeInUp:item.show,fadeOutDown:hideWindow}>' +
        '<div class="overlay"></div>' +
        '<div class="dialogwrap">' +
        '<div class="dialogbody">' +
        '<div class="dialog-ask">' +
        '<div class="dialog-msg">' +
        '<div class="dialog-title">{{item.title}}</div>' +
        '</div>' +
        '<div class="dialog-content" v-html="item.content"> ' +

        '</div>' +
        '<div class="dialog-btn confirm" @click="confirm">确定</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    methods: {
        confirm: function() {
            var that = this;
            this.hideWindow = true;
            setTimeout(function() {
                that.item.show = false;
                that.hideWindow = false;
            }, 500);
        }
    }
}