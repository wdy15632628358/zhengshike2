class Banner {
    constructor(idSelector,url) {
        this.url = url;
        this.box = document.querySelector(idSelector);
        this.ul = this.box.querySelector('.img_box ul');
        this.tipBox = this.box.querySelector('.tip_box');
        this.tips = this.box.getElementsByClassName('tip');
        this.leftBtn =this.box.querySelector('.left_btn');
        this.rightBtn = this.box.querySelector('.right_btn');
        this.n = 0;
        this.timer = null;
        this.getData();//获取数据

    }
    getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', this.url, true);
        xhr.onreadystatechange = (() => {
            //ES5 let _this = this:
            //ES6 普通函数改为箭头函数
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                let data = JSON.parse(xhr.response)
                console.log(data)
                this.render(data)
                this.move();//数据渲染完成 之后再去开启轮播
                this.tipClick();
                this.bindEvent();
            }
        })
        xhr.send();
    }
    render(data) {
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
        this.tipBox.innerHTML = tipStr;
        this.ul.innerHTML = str;
        this.ul.style.width = data.length * 1000 + 'px'//新添加一个图片 要更新盒子的宽度
    }
    move() {
        this.timer = setInterval(() => {
            this.change();
        }, 1000);
    }
    change() {
        this.n++;//n=4的时候现实的是  伪 第一张
        if (this.n == (this.tips.length + 1)) {
            this.ul.style.transition = 'none'
            this.ul.style.left = 0;//让图片直接闪到第一张，紧接着要向第二章图移动
            this.n = 1;
        }
        this.tipClass(this.n)
        // animate(ul, { left: -1000 * n }, 500, function () { console.log(666) })
        // ul.style.transition = 'left 0.5s ease-in';
        // ul.style.left = -1000 * n + 'px'
        setTimeout(() => {
            //同步情况下，代码从上到下执行，只会让下边代码起作用，上变被覆盖
            //异步情况下，异步代码会被忽略，同步先执行，完事之后异步再去执行
            this.ul.style.transition = 'left 0.5s ease-in';
            this.ul.style.left = -1000 * this.n + 'px'
        }, 10);
    }
    tipClass(m) {
        m = m >= this.tips.length ? 0 : m;//当n指向了 伪 第一张的时候 要让第一张高亮
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].className = 'tip';
        }
        this.tips[m].className = 'tip current';
    }
    bindEvent() {
        //只负责时间绑定
        this.box.onmouseenter = (() => {
            clearInterval(this.timer);

        })
        //鼠标滑出  动画在重启
        this.box.onmouseleave = (() => {
            this.move();
        })
        this.rightBtn.onclick = this.debounce(() => {//使用防抖处理一下
            this.change();
        })

        this.leftBtn.onclick = this.debounce(() => {
            this.n--;
            if (this.n < 0) {
                this.ul.style.transition = 'none';
                this.ul.style.left = -1000 * (this.tips.length) + 'px';
                this.n = this.tips.length - 1;
            }
            this.tipClass(this.n)
            setTimeout(() => {
                this.ul.style.transition = 'left 0.5s ease-in';
                this.ul.style.left = -1000 * this.n + 'px'
            }, 10);
            // animate(ul, { left: -1000 * n }, 500, function () { console.log(666) })
        })
    }
    tipClick() {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick = (() => {
                this.n = i;
                this.tipClass(this.n)
                // animate(ul, { left: -1000 * n }, 500, function () { console.log(666) })
                this.ul.style.transition = 'left 0.5s ease-in'
                this.ul.style.left = -1000 * this.n + 'px'
            })

        }
    }
    debounce(fn, wait = 500) {
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
                timer = null;
            }, wait)
        }
    }
}




