class Drag {
    constructor(id, n) {
        this.n = n;//目标次数
        this.count = 0;//拖拽次数
        this.box = document.getElementById(id);
        this.MOVE = this.move.bind(this);
        this.END = this.end.bind(this);
        this.START = this.start.bind(this);
        // this.box.addEventListener('mousedown', this.START, false);
        on(this.box,'mousedown',this.START)
    }
    offset(ele) {
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
    move(e) {
        //this 就是当前的实例
        this.box.style.left = e.pageX - this.startPx + this.startX + 'px';
        this.box.style.top = e.pageY - this.startPy + this.startY + 'px';
    }
    end(e) {
        off(document,'mousemove',this.MOVE)
        off(document,'mouseup',this.END)
        // backZIndex(this.box);
        //拖拽次数的判断
        if (this.n === undefined) return;
        this.count++;//次数累加
        if (this.count >= this.n) {
            this.clear();
        }

    }
    start(e) {
        this.startX = this.offset(this.box).l;
        this.startY = this.offset(this.box).t;
        this.startPx = e.pageX;
        this.startPy = e.pageY;
        on(document,'mousemove',this.MOVE)
        on(document,'mouseup',this.END)       
        fire (this.box,'myIndex',this.box)
        // bigZIndex(this.box)//点击最高 松开回去
    }
    clear() {
        // this.box.removeEventListener('mousedown', this.START, false);
        off(this.box,'mousedown',this.START)
    }
}