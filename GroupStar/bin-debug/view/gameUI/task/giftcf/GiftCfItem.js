var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var GiftCfItem = (function (_super) {
        __extends(GiftCfItem, _super);
        function GiftCfItem() {
            _super.call(this);
            this.uid = 0;
            this.num = 0;
            this.skinName = "src/view/gameUI/task/giftcf/GiftCfItemSkin.exml";
        }
        var d = __define,c=GiftCfItem,p=c.prototype;
        /**生產*/
        GiftCfItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (GiftCfItem.cacheDict[mtype] == null) {
                GiftCfItem.cacheDict[mtype] = [];
            }
            var dict = GiftCfItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new GiftCfItem();
            }
            return theFighter;
        };
        /**回收*/
        GiftCfItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (GiftCfItem.cacheDict[mtype] == null) {
                GiftCfItem.cacheDict[mtype] = [];
            }
            var dict = GiftCfItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                userPanel.UserPanel.getInstance().open(this.uid, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid + "");
                e.stopPropagation();
            }, this);
        };
        p.setData = function (obj, rank) {
            this.uid = obj["user_id"];
            this.lblName.text = window["hexToDec"](obj["user_name"]);
            this.num = obj["num"];
            this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("支持" + "<font color=#e88319>" + obj["num"] + "钻石</font>");
            switch (rank) {
                case 1:
                    this.bmpIconBack.source = "t_zc2";
                    break;
                case 2:
                    this.bmpIconBack.source = "t_zc3";
                    break;
                case 3:
                    this.bmpIconBack.source = "t_zc4";
                    break;
                default:
                    this.bmpIconBack.source = "t_zc5";
                    break;
            }
            RES.getResByUrl(obj["user_pic"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.updateRank = function (rank) {
            switch (rank) {
                case 1:
                    this.bmpIconBack.source = "t_zc2";
                    break;
                case 2:
                    this.bmpIconBack.source = "t_zc3";
                    break;
                case 3:
                    this.bmpIconBack.source = "t_zc4";
                    break;
                default:
                    this.bmpIconBack.source = "t_zc5";
                    break;
            }
        };
        p.updateNum = function (num) {
            console.log("this.num:" + this.num + " " + num);
            this.num = this.num + num;
            console.log("22this.num:" + this.num + " " + num);
            this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("支持" + "<font color=#e88319>" + this.num + "钻石</font>");
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.clear = function () {
            this.bmpIcon.source = null;
            this.bmpIconBack.source = null;
        };
        GiftCfItem.cacheDict = {};
        return GiftCfItem;
    }(eui.Component));
    task.GiftCfItem = GiftCfItem;
    egret.registerClass(GiftCfItem,'task.GiftCfItem');
})(task || (task = {}));
