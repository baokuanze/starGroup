var mySelfStar;
(function (mySelfStar) {
    /**
     *
     * @author
     *
     */
    var MySelfHeadLinesItem = (function (_super) {
        __extends(MySelfHeadLinesItem, _super);
        function MySelfHeadLinesItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/headlines/mySelfStar/MyselfHeadLinesItemSkin.exml";
        }
        var d = __define,c=MySelfHeadLinesItem,p=c.prototype;
        MySelfHeadLinesItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (MySelfHeadLinesItem.cacheDict[mtype] == null) {
                MySelfHeadLinesItem.cacheDict[mtype] = [];
            }
            var dict = MySelfHeadLinesItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new MySelfHeadLinesItem();
            }
            return theFighter;
        };
        /**回收*/
        MySelfHeadLinesItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (MySelfHeadLinesItem.cacheDict[mtype] == null) {
                MySelfHeadLinesItem.cacheDict[mtype] = [];
            }
            var dict = MySelfHeadLinesItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_time.fontFamily = "Heiti SC";
                this.lable_pro.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTime, this);
        };
        p.setData = function (time, dis) {
            this.time = time;
            this.lable_time.text = Tools.getInstance().getTime6(time);
            if (dis == 1) {
                this.lable_pro.visible = false;
                this.lable_time.textColor = 0x14b8f6;
            }
            else {
                this.lable_time.textColor = 0xb4b4b4;
                this.lable_pro.visible = true;
                this.lable_pro.textColor = 0xb4b4b4;
            }
        };
        p.changeTime = function (e) {
            console.log("------change");
            var self = this;
            self.dispatchEventWith('click', false, this);
        };
        p.clear = function () {
            this.lable_time.text = "";
        };
        MySelfHeadLinesItem.cacheDict = {};
        return MySelfHeadLinesItem;
    }(eui.Component));
    mySelfStar.MySelfHeadLinesItem = MySelfHeadLinesItem;
    egret.registerClass(MySelfHeadLinesItem,'mySelfStar.MySelfHeadLinesItem');
})(mySelfStar || (mySelfStar = {}));
