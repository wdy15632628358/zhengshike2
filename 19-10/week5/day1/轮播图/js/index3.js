let $box = $('#box'),
    $ul = $box.find('ul'),//$('#box .img_box ul')//$box.children('.img_box').children('ul)
    //children只能找到子元素 不获取后代
    $tipBox = $box.find('.tip_box'),
    $tips = $tipBox.children('.tip'),
    $leftBtn = $box.find('.left_btn'),
    $rightBtn = $box.find('.right_btn');
let n = 0, timer = null;//n是全局计算图片张数的


//获取数据
function getData() {
    $.ajax({
        type: 'get',
        url: './data.json',
        success: function (data) {
            //请求成功执行
            console.log(data)
            render(data)
            tipclick();//数据加载完成后再去给小圆点绑定事件
        },
        error: function () {
            //请求失败执行
        }
    })
}
getData()
// try {//出现报错黑体
//     console.log(555)
//     console.log(qqq)
// } catch (e) {
//     console.log(e)
// }
// console.log(666)
//渲染页面
function render(data) {
    let str = '';
    let tipStr = '';
    data.push(data[0]);
    data.forEach((item, index) => {
        str += `
        <li>
          <img src="${item.img}" alt="">
          <p class="desc">${item.desc}</p>
        </li> `;
        if (index == 0) {
            tipStr += ` <span class="tip current"></span>\n`
        } else if (index < data.length - 1) {
            tipStr += `<span class="tip"></span>\n`
        }
    })
    $ul.html(str);
    $ul.width(1000 * data.length);
    $tipBox.html(tipStr);
    $tips = $tipBox.children('.tip');//更新tip
}
//图片计数
function move() {
    n++;
    if (n > $tips.length) {
        //闪到第一张
        $ul.css('left', 0)//$ul.css({left:0})
        n = 1;
    }
    $ul.animate({ left: -1000 * n }, 300)
    autoFocus(n)//显示点
}
//图片移动,启动定时器
function autoMove() {
    timer = setInterval(() => {
        move()
    }, 1000);
}
autoMove();
//控制点跟着图片运动
function autoFocus(m) {
    if (n >= $tips.length) {
        m = 0;//m == $tips.length显示伪第一张
    }
    //m就是要有点的那个索引
    $tips.eq(m).addClass('current').siblings().removeClass('current');
}
$box.on('mouseenter', function () {
    clearInterval(timer)
})
$box.on('mouseleave', function () {
    autoMove();
})
$leftBtn.on('click', function () {
    n--;
    if (n < 0) {
        $ul.css({ left: -$tips.length * 1000 });//闪到最后一张
        n = $tips.length - 1;
    }
    $ul.animate({ left: -n * 1000 }, 300);
    autoFocus(n);
})
$rightBtn.on('click', function () {
    move();
})
//给小圆点绑定点击事件
function tipclick() {
    $tips.on('click', function () {
        let m = $(this).index();
        n = m;//n是控制全局张数索引的
        $ul.animate({ left: -1000 * m }, 300)
        autoFocus(m);//在执行一下 把索引m传入 控制点跟着图片运动
    })
}

$.fn.extend({
    //把JQ对象的方法放到了原型上，
    myFn: function () {
        console.log(666)
        console.log(this)
    },
    banner: function () {
    }
})
$.extend({
    //把对应的方法放到了JQ自身上，(JQ当做了普通对象)
    myFn: function () {
        console.log(666)
    }
})
console.log($box.myFn())
//



















