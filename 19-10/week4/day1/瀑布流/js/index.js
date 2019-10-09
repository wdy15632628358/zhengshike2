let body = document.getElementsByClassName('body')[0],
    olis = document.querySelectorAll('.body li'),
    oImg = body.getElementsByTagName('img')
let flag = false;//代表新数据渲染完成 什么时候 flag应该是个true ？？//新数据一请求，就把 flag 变 
let n = 0;

//获取数据
function getData() {
    flag = true;
    n++;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {//请求成功
            console.log(JSON.parse(xhr.response))
            let data = JSON.parse(xhr.response)
            render(data)//获取新数据 渲染页面
            flag = false;//新数据渲染完成后的操作
            loadAll();
        }
    }
    xhr.send();
}
getData();


function render(data) {
    //data 后台给的数组
    //循环数组 拼接字符串 拼接好的字符串放进页面
    let str = '';
    data.forEach(item => {
        let { pic, author, desc, height } = item
        // str = `
        //     <div class="img_box">
        //         <img realSrc="${pic}" realSrc="./img/1.jpg" alt="" style='height:${height}px'>
        //         <P class="desc">${desc}</P>
        //         <p class="author">${author}</p> 
        //     </div>`
        // //str是新拼接出来的一个快，我们需要决定的事 这个快放在哪个li中
        // // olis[index % 5].innerHTML += str;
        // let temp = getMinLi();//找出最短li
        // //把要增加的这一项放到最低的li中
        // temp.innerHTML += str;
        str = `
            <img realSrc="${pic}" realSrc="./img/1.jpg" alt="" style='height:${height}px'>
            <P class="desc">${desc}</P>
             <p class="author">${author}</p> 
            `
        let temp = getMinLi();//找出最短li
        let div = document.createElement('div')
        div.className = 'img_box';
        div.innerHTML = str;
        temp.appendChild(div);
    })
}

//找最短的li
function getMinLi() {
    //找最短的li
    let ary = [...olis].sort((a, b) => {
        return a.clientHeight - b.clientHeight;
    })
    return ary[0];
}

//第三部 滚动加载新数据

window.onscroll = function () {
    loadMore()
    loadAll()
}

function loadMore() {
    //最短的那个li漏出底部的时候 就加载新数据
    if (n >= 3) return;//滑动滚轮加载两次图片，如果不设置就无限加载
    let li = this.getMinLi();
    if (this.utils.offset(li).t + li.clientHeight <= document.documentElement.scrollTop + this.utils.winH().h) {
        //需要等新数据渲染到页面后 再去加载新数据
        if (!flag) {
            console.log(666)
            getData();
        }

    }
}
function loadAll() {
    [...oImg].forEach(item => {
        loadImg(item)
    })
}


function loadImg(ele) {
    if (ele.myLoad) return
    //懒加载
    if (utils.offset(ele).t + ele.clientHeight / 2 <= document.documentElement.scrollTop + utils.winH().h) {
        //图片漏出来一半
        let realSrc = ele.getAttribute('realSrc');
        // ele.src = realSrc;
        let temp = new Image();
        temp.src = realSrc;//让临时图片去请求真实的图片地址
        temp.onload = function () {
            //图片从远程拿到了本地
            ele.src = realSrc;
            ele.myLoad = true;//加载过之后就不再加载
            fadeIn(ele)
        }
        temp = null;
    }
}


//预加载
function fadeIn(ele) {
    ele.style.opacity = 0;
    let n = 0;
    ele.timer = setInterval(() => {
        n += 0.01;
        if (n >= 1) {
            n = 1;
            clearInterval(ele.timer)
        }
        ele.style.opacity = n;
    }, 10)
}





















