function on(ele, type, f) {
    //不是原生事件 我们自己创造一个事件池
    //认为规定一下 my开头的都是自定义的事件
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        ele[type].push(f);
    } else {
        //原生事件不需要造  事件池
        type = type.replace(/^on/, '')//防止传入的参数带着 'on'字符
        ele.addEventListener(type, f, false);
    }
}
function fire(ele, type, ...arg) {
    //不是原生事件 我们把事件池中的事件执行
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        ele[type].forEach((item) => {
            item.call(this, ...arg)
        })
    }
}
function off(ele, type, f) {
    //原生事件
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        let n = ele[type].indexOf(f);
        if (n != -1) {
            ele[type].splice(n, 1)
        }
    } else {
        //原生事件不需要造 事件池
        type = type.replace(/^on/, '')//防止传入的参数带着 'on'字符
        ele.removeEventListener(type, f, false);
    }
}