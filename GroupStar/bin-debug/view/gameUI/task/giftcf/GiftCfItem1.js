var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var GiftCfItem1 = (function (_super) {
        __extends(GiftCfItem1, _super);
        function GiftCfItem1() {
            _super.call(this);
            this.state = "close";
            this.skinName = "src/view/gameUI/task/giftcf/GiftCfItem1Skin.exml";
        }
        var d = __define,c=GiftCfItem1,p=c.prototype;
        /**生產*/
        GiftCfItem1.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (GiftCfItem1.cacheDict[mtype] == null) {
                GiftCfItem1.cacheDict[mtype] = [];
            }
            var dict = GiftCfItem1.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new GiftCfItem1();
            }
            return theFighter;
        };
        /**回收*/
        GiftCfItem1.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (GiftCfItem1.cacheDict[mtype] == null) {
                GiftCfItem1.cacheDict[mtype] = [];
            }
            var dict = GiftCfItem1.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }
            if (this.groupData.parent) {
                this.removeChild(this.groupData);
            }
            this.rectCon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rectCon_tap, this);
        };
        p.rectCon_tap = function () {
            if (this.state == "open") {
                this.state = "close";
            }
            else {
                this.state = "open";
            }
            this.showlist();
        };
        p.setData = function (obj) {
            var info = obj["info"];
            var userArray = obj["userArray"];
            this.lblTitle.text = window["hexToDec"](info["name"]);
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("贡献<font color=#e88319>" + info["need_num"] + "</font>颗钻石");
            this.lblNum.text = userArray.length + "";
            for (var i = 0; i < userArray.length; i++) {
                var item = task.GiftCfItem.produce();
                this.groupData.addChild(item);
                item.setData(userArray[i], i + 1);
            }
            this.showlist();
            RES.getResByUrl(obj["pic"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.showlist = function () {
            if (this.state == "open") {
                this.addChild(this.groupData);
            }
            else {
                if (this.groupData.parent) {
                    this.removeChild(this.groupData);
                }
            }
        };
        p.clear = function () {
            this.bmpIcon.source = null;
            while (this.groupData.numElements > 0) {
                var item = this.groupData.getElementAt(this.groupData.numElements - 1);
                task.GiftCfItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        };
        GiftCfItem1.cacheDict = {};
        return GiftCfItem1;
    }(eui.Component));
    task.GiftCfItem1 = GiftCfItem1;
    egret.registerClass(GiftCfItem1,'task.GiftCfItem1');
})(task || (task = {}));
