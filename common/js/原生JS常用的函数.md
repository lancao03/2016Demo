### 创建于20160829
js添加事件
    function addEvent(element, event, callbackFunction) {
        if (element.addEventListener) {
            element.addEventListener(event, callbackFunction, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, callbackFunction);
        }
    }
    
判断是不是ie
var isIE = navigator.userAgent.indexOf("MSIE") > -1;

