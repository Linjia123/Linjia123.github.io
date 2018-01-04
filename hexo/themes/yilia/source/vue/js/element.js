/**父组件**/
var element = new Vue({
    el: '#element',
    data: {
        loadingShow: false,
        toast: {
            msg: '',
            show: false,
        },
        popUpWindow: {
            show: false,
            title: '请输入名称',
            holder: '请输入文案',
            text: '',
        },
        calendar: {
            show: false,
            selectDay: {
                date: MY_getCurrentDate(),//默认当前日期
                num: '',
                status: true,
            }
        },
        Bottomwindow:{
        	show:false,
        	content:'',
        },
        name: '',
    },
    components: {
        'my-loading': Loading,
        'my-toast': Toast,
        'my-popwindow': popUpWindow,
        'my-calendar': Calendar,
        'my-bottomwindow':Bottomwindow,
    },
    mounted: function() {
        this.$nextTick(function() {
        })
    },
    methods: {
        /**显示toast**/
        showToast: function(msg) {
            var that = this;
            if (msg != that.toast.msg) {
                that.toast.msg = msg;
            }
            that.toast.show = true;
            setTimeout(function() {
                that.toast.show = false;
            }, 2000);

        },
        /**显示loading**/
        showLoading: function() {
            var that = this;
            that.loadingShow = true;
            setTimeout(function() {
                that.loadingShow = false;
            }, 2000);
        },
        /**显示弹窗**/
        showPopUpWindow: function() {
            this.popUpWindow.text = this.name;
            this.popUpWindow.show = true;
        },
        /**获取弹窗返回值**/
        getTestText: function(data) {
            if (data.type == "cancal") {
                this.popUpWindow.show = false;
            }
            if (data.type == "confirm") {
                if (data.msg == '') {
                    this.showToast("输入不能为空");
                } else {
                    this.name = data.msg;
                    this.popUpWindow.show = false;
                }
            }
        },
        /**显示日历**/
        showCalendar: function() {
            this.calendar.show = true;
        },
    },
})