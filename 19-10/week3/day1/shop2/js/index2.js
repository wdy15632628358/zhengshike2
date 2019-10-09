// 获取数据 展示到页面上；

let data = null;
let oLis = document.getElementsByTagName('li');
//getElement获取的元素有映射关系：当页面上增加或者减少了对应的元素，该变量会跟这默认改变
let Olis2 = document.querySelectorAll('li');
//querySelectorAll系列获取的元素，没有这种映射关系，获取的时候是哪些元素，那么对应的变量就永远是哪些变量。
console.log(oLis)
console.log(Olis2)
let xhr = new XMLHttpRequest(); // 创造实例
xhr.open('get', './data.json', true); // true 代表异步； false 同步
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(JSON.parse(xhr.response));
        data = JSON.parse(xhr.response)
        render(data); // 请求成功之后 再去渲染数据
        myBind();
    }
}
xhr.send();

let box = document.getElementById('box'),
    timeBtn = document.getElementById('timeBtn'),
    priceBtn = document.getElementById('priceBtn'),
    commentBtn = document.getElementById('commentBtn');

function render(ary) {
    // 把数据渲染到页面上
    console.log(ary); // ary就是后台传过来的数组；
    let str = '';
    ary.forEach(item => {
        // item 就是数组中的每一个对象；
        let {
            img,
            title,
            price,
            num
        } = item;
        str += `<li>
                <div class="imgBox">
                    <img src="${img}" alt="">
                </div>
                <div class="til">${title}</div>
                <div class="desc">${title}</div>
                <div class="price">￥${price}</div>
                <div class="botBox">
                    <div>选购</div>
                    <div>${num}评价</div>
                </div>
            </li>`;
    })
    // str 就是 拼接好的字符串； 
    box.innerHTML = str;
}

function myBind(){
    timeBtn.onclick = function(){
        box.appendChild(oLis[0]);//把第一个li元素，添加到box末尾
        //若添加的是页面存在的元素，那只是相当于改变一下元素位置，不会新增元素
        //DOM的回流：当页面的结构发生改变时，需要浏览器重新渲染一次页面。：浪费性能
        //DOM的重绘：结构不发生改变，只是样式需要修改（出了那些改变位置的修改），也就是只需要重新渲染对应的CSS
    }
}
//文档碎片：var a = document.createDocumentFragment
