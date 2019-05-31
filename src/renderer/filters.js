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

    },
    formatNameType(tit) {
        switch (tit) {
            case "3303_0":
            case "temp":
                return '温度';
                break;
            case "3304_0":
            case "humi":
                return '湿度';
                break;
            case "3301_0":
            case "illu":
                return '光照';
                break;
            case "3316_0":
            case "volt":
                return '电量';
                break;
            case "3320_0":
            case "perc":
                return '裂隙';
                break;
            case "3321_0":
            case "alti":
                return '海拔';
                break;
            case "3332_0":
            case "dire_0":
                return '前后倾角';
                break;
            case "3332_1":
            case "dire_1":
                return '左右倾角';
                break;
        }

    }

};
export default filters
