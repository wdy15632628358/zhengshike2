let banner = (function () {
    let idSelector = '';
    let $box = null,
        $ul = null,
        $lis = null,
        $tipBox = null,
        $tips = null,
        $leftBtn = null,
        $rightBtn = null;
    let n = 0, timer = null;
    function throttle(fn, wait) {
        let flag = true;
        return function(){
            if(!flag)return;
            flag = false;
            setTimeout(() => {
                flag = true;
                fn.apply(this,arguments)
            }, wait);
        }
    }
    function initEle() {
        $box = $(idSelector)
        $ul = $box.find('.img_box ul'),
            $lis = $box.find('.img_box ul li'),
            $tipBox = $box.find('.tip_box'),
            $tips = $tipBox.children('.tip')
        $leftBtn = $box.find('.left_btn'),
            $rightBtn = $box.find('.right_btn');
        $lis.eq(0).show().siblings().hide();
    }
    function getData() {
        $.ajax({
            url: './data2.json',
            success: function (data) {
                render(data);
                initEle();
                autoMove();
                eventBind();
            },
            error: function () {
                alert('失败')
            }
        })
    }
    function render(data) {
        let str = '';
        let tipStr = '';
        data.forEach((item, index) => {
            str +=
                `
             <li>
                 <img src="${item.img}" alt="">
                 <p class="desc">${item.desc}</p>
            </li>`;
            tipStr += (index == 0 ? `<span class="tip current"></span>` : `<span class="tip"></span>`)

        })
        $ul.html(str)
        $tipBox.html(tipStr)
    }
    function move() {
        n++;
        if (n > $lis.length - 1) {
            n = 0;
        }
        $lis.eq(n).show().css({ opacity: 0 }).animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
            $lis.eq(n).siblings().hide();
        })
        autoFocue();
    }
    function autoMove() {
        timer = setInterval(() => {
            move();
        }, 2000);
    }
    function autoFocue() {
        $tips.eq(n).addClass('current').siblings().removeClass('current');
    }
    function eventBind() {
        $box.on('mouseenter', function () {
            clearInterval(timer);
        })
        $box.on('mouseleave', function () {
            autoMove();
        })
        $leftBtn.on('click', function () {
            n--;
            if (n < 0) {
                n = $lis.length - 1;
            }

            n--;
            move();
        })
        $rightBtn.on('click', throttle(function () {
            move();
        }))
        $tips.on('click', throttle(function () {
            let index = $(this).index();
            n = index;

            n--;
            move();
        }))
    }
    return {
        init() {
            idSelector = '#' + this.attr('id');
            getData();
            // $box = $(idSelector);
            initEle();
        }
    }
})()
// banner.init('#box')
$.extend({
    qqq(){
        console.log(666)
    }
})
$.fn.extend({
    aaa(){
        console.log(999)
    },
    bannerInit:banner.init
})
$('#box').bannerInit();
