var utils = {
    getCss(ele, attr) {//获取ele的attr属性
        var str = getComputedStyle(ele)[attr];
        if (/width|height|top|margin|padding|left/.test(attr)) {
            return psrseFloat(str);
        }
        return str;
    },

    setCss(ele, attr, val) {
        if (/width|height|top|margin|padding|left/.test(attr)) {
            ele.style[attr] = parseFloat(val) + 'px';
        } else {
            ele.style[attr] = val;
        }
    },

    winH() {
        //获取当前屏幕的高度
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        //获取当前屏幕的宽度
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        return {
            w,
            h
        }
    }, 

    offset(ele) {
        // 求出 ele到 body的偏移量
        let l = ele.offsetLeft,
            t = ele.offsetTop;
        let temp = ele.offsetParent;
        while (temp) {
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {
            l,
            t
        }
    }

}