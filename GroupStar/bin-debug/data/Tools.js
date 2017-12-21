/**
*
* @author
*
*/
var Tools = (function () {
    function Tools() {
        this.iphone = 0;
        /**
        * 返回万进制数字缩写
        * @param num
        * @returns {*}
        */
        this.shortNumberTT = function (num) {
            var n = parseInt(num, 10), r;
            if (n >= 10000) {
                r = Math.floor(n / 10000) + "万";
            }
            else
                r = n;
            return r;
        };
    }
    var d = __define,c=Tools,p=c.prototype;
    Tools.getInstance = function () {
        return this._intance;
    };
    p.resetSc = function (arr) {
        for (var i in arr) {
            var array = arr[i];
            var a = array[0];
            var isW = false;
            var isH = false;
            if (array.length > 1) {
                isW = array[1];
            }
            ;
            if (array.length > 2) {
                isH = array[2];
            }
            ;
            a.y = a.y * GameApp.sc;
            if (isW)
                a.width = a.width * GameApp.sc;
            if (isH)
                a.height = a.height * GameApp.sc;
        }
    };
    p.resetScGroup = function (g) {
        var arr = [];
        for (var i = 0; i < g.numElements; i++) {
            var a = g.getElementAt(i);
            arr.push([a, true, true]);
        }
        this.resetSc(arr);
    };
    /**
  * 返回时间搓时间
  * @param num
  * @returns {*}
  */
    p.getTime = function (now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + "-" + month + "-" + date;
    };
    p.getHour = function (now) {
        var data = new Date(now);
        var hour = data.getHours();
        var scend = data.getMinutes();
        if (scend < 9) {
            return hour + ":" + scend + "0";
        }
        else {
            return hour + ":" + scend + "";
        }
    };
    p.getMonth = function (now) {
        var data = new Date(now);
        var month = data.getMonth() + 1;
        var day = data.getDate();
        return month + "月" + day + "日";
    };
    p.getTime3 = function (now) {
        var year = now.getFullYear();
        var month = now.getMonth();
        if (month == 0) {
            year += 1;
            return year + "年" + 12 + "月";
        }
        else {
            return year + "年" + month + "月";
        }
    };
    p.getTime4 = function (now, str) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var lastMonth = now.getMonth() + 1;
        var data = now.getDate();
        return year + "年第" + str + "期(" + lastMonth + "." + "1" + "-" + month + "." + data + ")";
    };
    p.getTime6 = function (now) {
        var tempMonth;
        var tempDay;
        var tempMonth1;
        var tempDay1;
        var data = new Date(now - 1 * 24 * 3600 * 1000);
        var year = data.getFullYear();
        var month = data.getMonth() + 1;
        var day = data.getDate();
        var time2 = now - 7 * 24 * 3600 * 1000;
        var data2 = new Date(time2);
        var month2 = data2.getMonth() + 1;
        var day2 = data2.getDate();
        if (month <= 9) {
            tempMonth = "0" + month;
        }
        else {
            tempMonth = month + "";
        }
        if (day <= 9) {
            tempDay = "0" + day;
        }
        else {
            tempDay = day + "";
        }
        if (month2 <= 9) {
            tempMonth1 = "0" + month2;
        }
        else {
            tempMonth1 = month2 + "";
        }
        if (day2 <= 9) {
            tempDay1 = "0" + day2;
        }
        else {
            tempDay1 = day2 + "";
        }
        return year + "." + tempMonth1 + "." + tempDay1 + "-" + tempMonth + "." + tempDay;
    };
    p.getTime2 = function (now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + "." + month + "." + date;
    };
    p.getTime5 = function (now) {
        var hourse = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return hourse + ":" + minute + ":" + second;
    };
    /**
    * 获取URL中的参数
    * @param name
    * @returns {*}
    */
    p.getUrlAttribute = function (name) {
        var p = location.search.substring(1);
        var i = p.indexOf(name + "=");
        if (i > -1) {
            var t = p.substring(i);
            return t.substring((name + "=").length, t.indexOf("&") > -1 ? t.indexOf("&") : t.length);
        }
        else {
            return null;
        }
    };
    p.isIphone = function () {
        if (this.iphone == 0) {
            var s = navigator.userAgent.toLowerCase();
            //            console.log(s,"是什么设备");
            if (s.indexOf("iPhone") > -1 || s.indexOf("iPad") > -1 || s.indexOf("iphone") > -1) {
                this.iphone = 1;
                return true;
            }
            else {
                this.iphone = 2;
                return false;
            }
        }
        else {
            if (this.iphone == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        //        return false;
    };
    //    /**获取url**/
    //    public getUrlParam(name):string
    //    {
    //        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    //        var r = location.search.substr(1).match(reg);  //匹配目标参数
    //        if (r!=null) return unescape(r[2]); return null; //返回参数值
    //    }
    //格式化时间
    p.formatTime = function (time) {
        var hour = this.setTimeStyle(Math.floor(time / 3600));
        var min = this.setTimeStyle(Math.floor((time - parseInt(hour) * 3600) / 60));
        var sec = this.setTimeStyle(time - parseInt(hour) * 3600 - parseInt(min) * 60);
        return hour + ":" + min + ":" + sec;
    };
    p.formatTime2 = function (mss) {
        var hour = this.setTimeStyle(parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + ""));
        var min = this.setTimeStyle(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60) + ""));
        var sec = this.setTimeStyle(parseInt((mss % (1000 * 60)) / 1000 + ""));
        return hour + ":" + min + ":" + sec;
    };
    p.formatTime22 = function (mss) {
        var date = new Date(mss);
        if (date.getDate()) {
            var num = date.getDate();
            var hours = date.getHours() + num * 24;
            return hours + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
        else {
            return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
    };
    p.formatTime4 = function (mss) {
        var min = this.setTimeStyle(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60) + ""));
        var sec = this.setTimeStyle(parseInt((mss % (1000 * 60)) / 1000 + ""));
        return min + ":" + sec;
    };
    p.formatTime5 = function (date) {
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return minute + ":" + second;
    };
    p.formatTime3 = function (mss) {
        var date = new Date(mss);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    };
    p.formatTime1 = function (time) {
        if (time >= 3600) {
            return Math.floor(time / 3600) + "小时";
        }
        else if (time >= 60) {
            return Math.floor(time / 60) + "分";
        }
        else {
            return time + "秒";
        }
        //        return "0秒";
    };
    //将数字格式化成两位数如0=>00
    p.setTimeStyle = function (num) {
        if (num > 0 && num < 10) {
            return "0" + num.toString();
        }
        else if (num == 0) {
            return "00";
        }
        else {
            return num.toString();
        }
    };
    //判断是不是空对象
    p.isObject = function (obj) {
        var ret = false;
        if (obj) {
            for (var i in obj) {
                ret = true;
                break;
            }
            return ret;
        }
        else
            return false;
    };
    //控件舞台坐标  
    p.getPoint = function (UI) {
        var point = UI.localToGlobal();
        return point;
    };
    /**得到两个数字之间的随即书**/
    p.getRandomByNum = function (r1, r2) {
        if (r1 == r2)
            return r1;
        var ret = r1;
        var cha = Math.abs(r2 - r1);
        var min = r1 > r2 ? r2 : r1;
        ret = Math.random() * cha + min;
        return ret;
    };
    //得到圆形图片
    p.getCricle = function (x, y, r, color, group) {
        var circle = new egret.Shape();
        circle.graphics.beginFill(color);
        circle.graphics.drawCircle(0, 0, r / 2);
        circle.graphics.endFill();
        circle.x = x;
        circle.y = y;
        group.addChild(circle);
        return circle;
    };
    //得到圆形图片
    p.getCricleMask = function (x, y, r, group) {
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xffffff);
        circle.graphics.drawCircle(0, 0, r / 2);
        circle.graphics.endFill();
        circle.x = x;
        circle.y = y;
        group.addChild(circle);
        return circle;
    };
    p.getRoundRShape = function (x, y, w, h, wr, hr, color, alpha, sp) {
        if (alpha === void 0) { alpha = 1; }
        if (sp === void 0) { sp = null; }
        if (sp) {
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawRoundRect(x, y, w, h, wr, hr);
            sp.graphics.endFill();
            return sp;
        }
        else {
            var s = new egret.Shape();
            s.graphics.beginFill(color, alpha);
            s.graphics.drawRoundRect(x, y, w, h, wr, hr);
            s.graphics.endFill();
            return s;
        }
    };
    p.getShape = function (spp, w, h, x, y, wr, hr, linestyle, fill) {
        if (linestyle === void 0) { linestyle = -1; }
        if (fill === void 0) { fill = -1; }
        var sp;
        if (spp) {
            spp.graphics.clear();
            sp = spp;
        }
        else {
            sp = new egret.Shape();
        }
        if (linestyle >= 0) {
            sp.graphics.lineStyle(1, linestyle);
        }
        if (fill >= 0) {
            sp.graphics.beginFill(fill);
        }
        sp.graphics.drawRoundRect(x, y, w, h, wr, hr);
        sp.graphics.endFill();
        return sp;
    };
    p.getSp = function (w, h, x, y, color) {
        var sp = new egret.Shape();
        sp.graphics.beginFill(color);
        sp.graphics.drawRect(x, y, w, h);
        sp.graphics.endFill();
        return sp;
    };
    p.getTextLenChar = function (text) {
        var len = 0;
        for (var i = 0; i < text.length; i++) {
            var length = text.charCodeAt(i);
            if (length >= 0 && length <= 255) {
                len += 1;
            }
            else if (window["isChinese"](text.charAt(i))) {
                len += 2;
            }
            else {
                len += 2;
            }
        }
        return len;
    };
    p.getStringLen = function (str, _len) {
        var len = 0;
        var newStr = '';
        for (var i = 0; i < str.length; i++) {
            var length = str.charCodeAt(i);
            if (length >= 0 && length <= 255) {
                len += 1;
            }
            else {
                len += 2;
            }
            if (len < _len) {
                newStr += str[i];
            }
            else {
                newStr += '...';
                return newStr;
            }
        }
        return newStr;
    };
    Tools._intance = new Tools();
    return Tools;
}());
egret.registerClass(Tools,'Tools');
