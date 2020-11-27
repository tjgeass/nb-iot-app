// 处理多次点击
function dianji(fn) {
    let that = this;
    if (that.noClick) {
        that.noClick = false;
        fn();
        setTimeout(function () {
            that.noClick = true;
        }, 1500)
    } else {
    	//如果一直走else分支可能是你没有在页面的data下面挂载onoff:true,不然一直都会走else
        console.log("请稍后点击")
    }
}
export {
    dianji
}