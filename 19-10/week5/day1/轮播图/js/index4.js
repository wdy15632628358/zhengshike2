let $ul = $('#box .img_box ul'),
    $tipBox = $('#box .tip_box'),
    $tips = $('#box .img_box .tip'),
    $lis = $('#box .img_box ul li');
    $box = $('#box'),
    $leftBtn = $('#box .left_btn'),
    $rightBtn = $('#box .right_btn');
let n = 0, timer = null;

function getData() {
    $.ajax({
        type: 'get',
        url: './data2.json',
        success: function (data) {
            //请求成功执行
            console.log(data)
            render(data)
            init()
            // tipclick();//数据加载完成后再去给小圆点绑定事件
        } 
    })
}
getData();
function render(data) {
    let str = '';
    let tipStr = '';
    data.forEach((item, index) => {
        str += `
        <li>
          <img src="${item.img}" alt="">
          <p class="desc">${item.desc}</p>
        </li> `;
        tipStr += index == 0 ? `<span class="tip current"></span>` : `<span class="tip"></span>`
    });
    $ul.html(str);
    $tipBox.html(tipStr);
}
function init() {
    $lis = $('#box .img_box ul li');//更新
    $lis.eq(0).siblings().hide();
    autoMove()
}
function autoMove() {
    timer = setInterval(() => {
        move();
    }, 2000);
}
function move() {
    n++;
    if (n >= $lis.length) {
        n = 0
    }
    autoFocus();
    // $lis.eq(n).show().siblings().hide();
    $lis.eq(n).css({ opacity: 0 }).show().animate({ opacity: 1 }, 300).siblings().animate({ opacity: 0 }, 300, function () {
        $lis.eq(n).siblings().hide()
    })
}
function autoFocus(){
    $tips.eq(n).addClass('current').siblings().removeClass('current')
}
$box.on('onmoueenter',function(){
    clearInterval(timer);
})
$box.on('onmouleave',function(){
    autoMove();
})
$rightBtn.on('click',_.throttle(function(){
    move();
},1000))
$leftBtn.on('click',_.throttle(function(){//下划线是underscore的标识符
    n --;
    if(n<0){
        n = $lis.length-1
    }
    n--;
    move();
},1000))