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