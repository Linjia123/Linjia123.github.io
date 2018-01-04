(function() {
    var doc = document,
        docEl = document.documentElement,
        metaEl = doc.querySelector('meta[viewport]')

    // 如果没有viewport JS加上
    if(!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
        docEl.firstElementChild.appendChild(metaEl)
    }

    function freshRem() {
        var width = docEl.clientWidth,
            // rem = width/(paperWidth/100);
            rem = width/10;
    
        docEl.style.fontSize = rem + 'px';
    }
    freshRem();

    // 调试设备，自动切换rem不需要刷新页面
    window.addEventListener('resize', function () {
        freshRem();
    })
})()