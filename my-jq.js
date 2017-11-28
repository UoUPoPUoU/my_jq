// 加载函数
function addLoadEvent(func) {
    var oldonLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// 等高
function setHeight(ele1, ele2) {
    var x1 = ele1.height();
    var x2 = ele2.height();
    if (x1 > x2) {
        ele2.style.height = x1 + "px";
    } else {
        ele1.style.height = x2 + "px";
    }
}

//        获取选择器元素
function getId(selector) {
    var ele = document.querySelector(selector);
    return ele;
}

function getClass(selector) {
    var ele = document.querySelectorAll(selector);
    return ele;
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
    var ele = [],
        input = document.getElementsByTagName("input"),
        btn = document.getElementsByTagName("button");
}


// 多个对象监听同一个事件
function evenListen(eleArr, clickType, fun) {
    for (var key in eleArr) {
        document.querySelector(eleArr[key]).addEventListener(clickType, fun);
    }
}

/*
clickListen(['.left', '.right'], 'click', clickEvent);

function clickEvent() {
}*/


/*项目常用*/

//头部按钮切换形状
function BtnChange(ele, className) {
    var btn = getClass(ele)[0];
    btn.onclick = function () {
        if (!btn.classList.contains(className)) {
            btn.classList.add(className);
        } else {
            btn.classList.remove(className);
        }
    }
}

//选项卡切换
function tabChange(dotele, dotSonTag, dotbg, tabele, tabSonTag) {
    var tabUl = getClass(dotele)[0],
        tabLi = tabUl.getElementsByTagName(dotSonTag),
        dotBg = getClass(dotbg)[0],
        page = getClass(tabele)[0].getElementsByTagName(tabSonTag),
        move,
        num = 0;
    move = setInterval(play, 1200);

    // 滑动块
    function play() {
        if (num > page.length - 1) {
            num = 0;
        }
        var w = tabLi[num].offsetWidth;
        var t = tabLi[num].offsetTop;
        var l = tabLi[num].offsetLeft;
        dotBg.style.width = w + "px";
        if (screen.width > 992) {
            dotBg.style.top = t + "px";
        }
        if (screen.width < 992) {
            dotBg.style.left = l + "px";
        }
        // 添加类名并显示对应区域
        for (var j = 0; j < page.length; j++) {
            page[j].style.display = "none";
            tabLi[j].classList.remove("tab-act");
        }
        page[num].style.display = "block";
        tabLi[num].classList.add("tab-act");
        num++;
    }

    // 为每个按钮添加移出移入事件
    for (var k = 0; k < page.length; k++) {
        tabLi[k].index = k;
        tabLi[k].onmouseover = function () {
            clearInterval(move);
            var w = this.offsetWidth;
            var t = this.offsetTop;
            var l = this.offsetLeft;
            dotBg.style.width = w + "px";
            if (screen.width > 992) {
                dotBg.style.top = t + "px";
            }
            if (screen.width < 992) {
                dotBg.style.left = l + "px";
            }

            for (var j = 0; j < page.length; j++) {
                page[j].style.display = "none";
                tabLi[j].classList.remove("tab-act");
            }
            page[this.index].style.display = "block";
            tabLi[this.index].classList.add("tab-act");
            num = this.index;
        }
    }

    tabUl.onmouseout = function () {
        move = setInterval(play, 1000);
    };


}

// 轮播图


/*carousel(".picBox",".pic","a",".change","a","onclick");
carousel({
        "picbox":".picBox",
        "picSon":".pic",
        "picSonSon":"a",
        "dot":".change",
        "dotSon":"a",
        "fun":"onclick",
        "className":className,
        "prev1":"#prev",
        "next1":"#next"
    });*/

function carousel(obj) {
//        获取元素
    var picBox = getClass(obj.picbox)[0],
        pic = getClass(obj.picSon)[0],
        picA = pic.getElementsByTagName(obj.picSonSon),
        dots = getClass(obj.dot)[0].getElementsByTagName(obj.dotSon),
        prev = getId(obj.prev1),
        next = getId(obj.next1);
    var num = 0,
        move,
        i,
        pbw = picBox.offsetWidth;
    // play();

    // 循环
    function play() {
        if (move) clearTimeout(move);
        pic.style.left = 100 * -num + "%";
        for (var j = 0; j < dots.length; j++) {
            dots[j].classList.remove(obj.className);
        }

        dots[num].classList.add(obj.className);
        num++;
        move = setTimeout(play, 2000);
        if (num > dots.length - 1) {
            num = 0;
        }
    }



// 添加dot事件
    for (i = 0; i < dots.length; i++) {
        dots[i].index = i;
        dots[i].addEventListener(obj.evenType, clickDot);
        dots[i].onmouseout = function () {
            // play();
        }
    }

    // 定轮播图宽度
    for (i = 0; i < picA.length; i++) {
        picA[i].style.width = pbw + "px";
    }

    // 点击dot事件
    function clickDot() {
        clearTimeout(move);
        pic.style.left = 100 * -this.index + "%";
        num = this.index;
        for (var j = 0; j < dots.length; j++) {
            dots[j].classList.remove(obj.className);
        }
        this.classList.add(obj.className);
    }

    // 上一张点击事件
    prev.onclick=function () {
        /*clearTimeout(move);
        console.log(num+" 最上面");
        if(num===0){
            num = picA.length;
            pic.style.left = 100 * -(num-1) + "%";
        }else {
            console.log(-(num-1)+" else里面");
            pic.style.left = 100 * -(num-1) + "%";

        }
        console.log(num+" 下面");
        num--;*/

       /* if(num<picA.length) num++;*/
if(num>0) num--;
play();


        console.log(num+" 上面");

    };
    next.onclick=function () {
        /*clearTimeout(move);
        console.log(num);
        if(num===picA.length){
            num=0;
            pic.style.left = 100 * -num + "%";
        }else {
            pic.style.left = 100 * -(num+1) + "%";

        }
        num++;
        console.log(num);*/
        console.log(num+" 下面");
        /*if(num<picA.length){
            num++;
            console.log(num+" shang面");
        } else if(num===picA.length){
            console.log(num+" 下面");

            num=0;
            pic.style.left = 100 * -num + "%";
        }
        play();*/
    };


}



