//        获取选择器元素
function getEle(selector) {
    var cn = document.querySelectorAll(selector);
    return cn;
}

//       获取包含attr=value 的selector元素 => $("a[target='_blank']");
function getAttrSele(selector, attr, value) {
    var tags = [];
    var ele = document.querySelectorAll(selector);
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].getAttribute(attr) === value) {
            tags[tags.length] = ele[i];
        }
    }
    return tags;
}
function getNotAttrSele(selector, attr, value) {
    var tags = [];
    var ele = document.querySelectorAll(selector);
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].getAttribute(attr) !== value) {
            tags[tags.length] = ele[i];
        }
    }
    return tags;
}

// $(":button")	选取所有 type="button" 的 <input> 元素 和 <button> 元素
function getBtn() {
    var ele=[],
        input = document.getElementsByTagName("input"),
        btn = document.getElementsByTagName("button");
    
}


// 多个对象监听同一个事件
function clickListen(eleArr,clickType,fun) {
    for(var key in eleArr){
        document.querySelector(eleArr[key]).addEventListener(clickType,fun);
    }
}
clickListen(['.left','.right'],'click',clickEvent);
function clickEvent(){}