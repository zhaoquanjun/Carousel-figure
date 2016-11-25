var banner = document.getElementById("banner"),
    inner = document.getElementById("inner"),
    tips = document.getElementById("tips"),
    leftBtn = document.getElementById("leftBtn"),
    rightBtn = document.getElementById("rightBtn"),
    imgs = inner.getElementsByTagName("img"),
    lis = tips.getElementsByTagName("li");
var val = null;
(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', "img.txt", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            val = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
    var count = val.length + 1;
    var str = "";
    (function bindDate() {
        for (var i = 0; i < val.length; i++) {
            var cur = val[i];
            str += "<img src='' trueSrc='" + cur.img + "'>";
        }
        utils.setCss(inner, "width", count * 1000);
        str += "<img src='' trueSrc = '" + val[0].img + "'>";
        inner.innerHTML = str;

        str = "";
        for (var j = 0; j < val.length; j++) {
            if (j == 0) {
                str += '<li class="selected"></li>'
            } else {
                str += '<li></li>'
            }
        }
        tips.innerHTML = str;
    }());

    function imgDelay() {
        for (var i = 0; i < imgs.length; i++) {
            (function (i) {
                var curImg = imgs[i];
                if (curImg.isLoad) {
                    return;
                }
                var image = new Image;
                image.src = curImg.getAttribute("trueSrc");
                image.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    image = null;
                };
                curImg.isLoad = true;
            }(i));
        }
    }

    window.setTimeout(imgDelay, 500);

    var step = 0;
    console.log(step);
    function change() {
        if (step >= 4) {
            step = 0;
            utils.setCss(inner, "left", 0);
        }
        step++;
        console.log(step);
        myAnimate(inner, {left: -step * 1000}, 1000);
        focusPoint();
    }

    var timer = window.setInterval(change, 2000);

    function focusPoint() {
        for (var i = 0; i < lis.length; i++) {
            var cur = lis[i];
            var tempStep = step > lis.length - 1 ? 0 : step;
            tempStep === i ? cur.className = "selected" : cur.className = "";
        }
    }

    (function () {
        for(var i=0;i<lis.length;i++){
            var cur = lis[i];
            cur.index=i;
            cur.onmouseover= function () {
                step=this.index;
                myAnimate(inner,{left:-step*1000},1000);
                focusPoint();
            }
        }
    }());

    banner.onmouseover= function () {
        window.clearInterval(timer);
        leftBtn.style.display="block";
        rightBtn.style.display="block";
    };
    banner.onmouseout= function () {
        timer=window.setInterval(change,2000);
        leftBtn.style.display="none";
        rightBtn.style.display="none";
    };

    leftBtn.onclick= function () {
        if(step<=0){
            step=4;
            utils.setCss(inner,"left",-step*1000);
        }
        step--;
        myAnimate(inner,{left:-step*1000},1000);
    };
    rightBtn.onclick=change;

}());




