const filters = {
    setCoursePrice: (course) => {
        if (course.pay_type === 2) {
            return '￥' + course.price
        } else {
            return '免费'
        }
    },
    formatMoney: (money, num = 2) => {
        return parseFloat(money).toFixed(num)
    },
    changeCount(x) {
        x = x / 10000;
        var y = x.toFixed(1) + "万";
        return y;
    },
    formatDuring(mss) {
        if (mss) {
            var minutes = parseInt(mss / 1000 / 60);
            var seconds = parseInt((mss % (1000 * 60)) / 1000);

            seconds = seconds > 9 ? seconds : '0' + seconds;
            return minutes >= 10 ? minutes : '0' + minutes + ":" + seconds;
        } else {
            return '00:00'
        }

    },
    formatIconStatus(num) {
        switch (num) {
            case 1:
                return 'el-icon-success';
                break;
            case 2:
                return 'el-icon-warning';
                break;
            case 3:
                return 'el-icon-error';
                break;

        }

    },
    formatTypeStatus(num) {
        switch (num) {
            case 1:
                return 'primary';
                break;
            case 2:
                return 'warning';
                break;
            case 3:
                return 'danger';
                break;

        }

    }
    ,
    formatColorStatus(num) {
        switch (num) {
            case 1:
                return '#67C23A';
                break;
            case 2:
                return '#E6A23C';
                break;
            case 3:
                return '#F56C6C';
                break;

        }

    },
    formatNameStatus(num) {
        switch (num) {
            case 1:
                return '正常';
                break;
            case 2:
                return '警告';
                break;
            case 3:
                return '危险';
                break;

        }

    }

};
export default filters
