
window.onload = function() {
    var options = document.getElementById('myevent');
    var btn = document.getElementById('OK');
    var mydata = ['<p>当前第一页</p><p>当前第一页</p><p>当前第一页</p>',
        '<p>当前第二页</p><p>当前第二页</p><p>当前第二页</p>',
        '<p>当前第三页</p><p>当前第三页</p><p>当前第三页</p>',
    ];

    var tab = new Tab();
    if (tab.createTab('J-tab', mydata)) { //初始化选项卡 id 和数据
        tab.show(); //默认事件为点击事件,不传或参数不是onclick或onmouseover都为onclick事件

        btn.onclick = function() {
            tab.show(options.value) //触发选项卡事件
            return false;
        }
    }
}

//Tab对象
var Tab = function() {
    this.id; //选项卡id
    this.index; //当前标签页
    this.event; //事件
    this.mods; //模块组件
    this.btn; //按钮控件
    this.data = []; //存放插入数据
}

Tab.prototype.createTab = function(myTab, mydata) {

    if (mydata instanceof Array && (typeof(myTab) == 'string')) {
        this.id = myTab;
        this.event = 'onclick'; //默认为点击事件
        var tab = document.getElementById(this.id);
        var btns = tab.getElementsByClassName('tab-btn'); //ul
        this.btn = btns[0];
        this.index = 1; //默认标签页
        this.data = mydata; //初始化数据data
        this.mods = tab.getElementsByClassName('tab-content')[0];
        return true;
    } else {
        alert("穿入参数不符");
        return null;
    }
}

Tab.prototype.show = function(event) {
    this.btn[this.event] = ''; //清空绑定动作
    var nowObj = this; //储存当前this的值
    var tab_item = this.btn.getElementsByTagName('li');
    var tab_class = tab_item.className;
    var contents = this.mods.getElementsByClassName('tab-mod'); //通过class获取对象
    var items = []; //存放所有li

    if (event && (event == 'onclick' || event == 'onmouseover')) {
        this.event = event;
    }

    for (var i = 0; i < tab_item.length; i++) { //将list转为Array
        items.push(tab_item[i]);
    }

    this.callback(contents[0], this.index);

    //点击事件
    this.btn[this.event] = function(event) {
        var target = event.target || event.srcElement;

        if (target.tagName == 'LI') {
            nowObj.index = items.indexOf(target) + 1; //获取当前模块

            for (var i = 0; i < items.length; i++) { //样式切换

                if (contents[i] && tab_item[i]) { //判断按钮和显示内容div存在
                    nowObj.callback(contents[i], nowObj.index); //执行回调函数
                    contents[i].className = contents[i].className.replace(new RegExp("(\\s|^)tab_visited(\\s|$)"), "");
                    tab_item[i].className = tab_item[i].className.replace(new RegExp("(\\s|^)tab_active(\\s|$)"), ""); //移除指定class

                    if (i == nowObj.index - 1) { //内容为当前页
                        contents[i].className += ' tab_visited'; //添加class
                        tab_item[i].className += ' tab_active';
                    }
                }
            }
        }
        return false;
    }
}

Tab.prototype.callback = function(tabMod, index) {

    if ((/^\+?[1-9][0-9]*$/.test(index))) {
        var item = index - 1;

        if (!tabMod) {
            return;
        }

        //是否缺失数据
        tabMod.innerHTML = (this.data[item]) ? this.data[item] : "<img src='./loading.gif'></img><p>查找不到数据</p>";
    } else {
        console.log("输入应该为正整数");
    }
}
