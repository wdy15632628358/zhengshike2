//获取元素
let ul = document.querySelector('#box .img_box ul');
let box = document.querySelector('#box');
let tipBox = document.querySelector('#box .tip_box');
let tips = document.getElementById('box').getElementsByClassName('tip');//么有映射
let leftBtn = document.querySelector('#box .left_btn');
let rightBtn = document.querySelector('#box .right_btn');
let n = 0, timer = null;

//获取数据
function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            let data = JSON.parse(xhr.response)
            console.log(data)
            render(data)
            move();//数据渲染完成 之后再去开启轮播
            tipClick();
        }
    }
    xhr.send();
}
getData();

//渲染数据
function render(data) {
    data = data || [];
    let str = '';
    let tipStr = '';
    data.push(data[0]);//在数组末尾添加 第一项 ，是为了在最后补一张一样的图
    data.forEach((item, index) => {
        let { img, desc } = item;
        str += `
        <li>
        <img src="${img}" alt="">
        <p class="desc">${desc}</p>
       </li>`
        if (index != data.length - 1) {
            if (index == 0) {
                tipStr += `<span class="tip current"></span>\n`
            } else {
                tipStr += `<span class="tip"></span>\n`
            }
        }

    })
    tipBox.innerHTML = tipStr;
    ul.innerHTML = str;
    ul.style.width = data.length * 1000 + 'px'//新添加一个图片 要更新盒子的宽度
}

//图片运动
function move() {
    timer = setInterval(() => {
        change();
    }, 1000);
}
function change() {
    n++;//n=4的时候是  伪 第一张
    if (n == (tips.length + 1)) {
        ul.style.transition = 'none'
        ul.style.left = 0;//让图片直接闪到第一张，紧接着要向第二章图移动
        n = 1;
    }
    tipClass(n)
    // animate(ul, { left: -1000 * n }, 500, function () { console.log(666) })
    // ul.style.transition = 'left 0.5s ease-in';
    // ul.style.left = -1000 * n + 'px'
    setTimeout(() => {
        //同步情况下，代码从上到下执行，只会让下边代码起作用，上变被覆盖
        //异步情况下，异步代码会被忽略，同步先执行，完事之后异步再去执行
        ul.style.transition = 'left 0.5s ease-in';
        ul.style.left = -1000 * n + 'px'
    }, 10);
}

//鼠标滑入时  清除动画
box.onmouseenter = function () {
    clearInterval(timer);

}
//鼠标滑出  动画在重启
box.onmouseleave = function () {
    move();
}
//控制点和图片对应
function tipClass(m) {
    m = m >= tips.length ? 0 : m;//当n指向了 伪 第一张的时候 要让第一张高亮
    for (let i = 0; i < tips.length; i++) {
        tips[i].className = 'tip';
    }
    tips[m].className = 'tip current';
}

//点击左右按钮 切换轮播图
// rightBtn.onclick = function () {
//     change();
// }
rightBtn.onclick = debounce(function () {//使用防抖处理一下
    change();
})

leftBtn.onclick = function () {
    n--;
    if (n < 0) {
        ul.style.transition = 'none';
        ul.style.left = -1000 * (tips.length) + 'px';
        n = tips.length - 1;
    }
    tipClass(n)
    setTimeout(() => {
        ul.style.transition = 'left 0.5s ease-in';
        ul.style.left = -1000 * n + 'px'
    }, 10);
    // animate(ul, { left: -1000 * n }, 500, function () { console.log(666) })
}
//按钮点击事件
function tipClick() {
    for (let i = 0; i < tips.length; i++) {
        tips[i].onclick = function () {
            n = i;
            tipClass(n)
            // animate(ul, { left: -1000 * n }, 500, function () { console.log(666) })
            ul.style.transition = 'left 0.5s ease-in'
            ul.style.left = -1000 * n + 'px'
        }

    }
}
//防抖事件
function debounce(fn, wait = 500) {
    var timer = null;
    return function () {
        if (timer == null) {
            fn.apply(this, arguments)
            timer = 0;
            return
        }
        clearInterval(timer);
        timer = setTimeout(() => {
            //fn()执行时，里边的this是window
            fn.apply(this, arguments)//保证this指向
        }, wait)
    }
}




















