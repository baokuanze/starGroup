var mySelfStar;
(function (mySelfStar) {
    /**
     *
     * @author
     *
     */
    var MyselfHeadLines = (function (_super) {
        __extends(MyselfHeadLines, _super);
        function MyselfHeadLines() {
            _super.call(this);
            this.skinName = "src/view/gameUI/headlines/mySelfStar/MyselfHeadLinesSkin.exml";
        }
        var d = __define,c=MyselfHeadLines,p=c.prototype;
        /**生產*/
        MyselfHeadLines.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (MyselfHeadLines.cacheDict[mtype] == null) {
                MyselfHeadLines.cacheDict[mtype] = [];
            }
            var dict = MyselfHeadLines.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new MyselfHeadLines();
            }
            return theFighter;
        };
        /**回收*/
        MyselfHeadLines.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (MyselfHeadLines.cacheDict[mtype] == null) {
                MyselfHeadLines.cacheDict[mtype] = [];
            }
            var dict = MyselfHeadLines.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_name.fontFamily = "Heiti SC";
                this.lable_ticNumber.fontFamily = "Heiti SC";
            }
            this.img_personIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                var self = this;
                if (this.userId > 0)
                    userPanel.UserPanel.getInstance().open(this.userId, self.bid, self.group_openid);
                e.stopPropagation();
            }, this);
        };
        p.setData = function (obj) {
            console.log("-------");
            this.lable_null.visible = false;
            this.userId = obj["user_id"];
            this.bid = obj["bid"];
            this.group_openid = obj["group_openid"];
            var te = window["hexToDec"](obj["user_name"]);
            if (te.length >= 4) {
                var cutDownTitle = te.substring(0, 4);
                this.lable_name.text = cutDownTitle + "..";
            }
            else {
                this.lable_name.text = te;
            }
            this.lable_ticNumber.text = obj["votes"] + "票";
            RES.getResByUrl(obj["user_pic"], this.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_personIcon = function (source) {
            this.img_starIco.texture = source;
        };
        p.clear = function () {
            this.lable_null.visible = true;
            this.img_starIco.source = null;
            this.img_starIco.source = "j_imgButton";
            ;
            this.lable_name.text = "";
            this.lable_ticNumber.text = "";
        };
        MyselfHeadLines.cacheDict = {};
        return MyselfHeadLines;
    }(eui.Component));
    mySelfStar.MyselfHeadLines = MyselfHeadLines;
    egret.registerClass(MyselfHeadLines,'mySelfStar.MyselfHeadLines');
})(mySelfStar || (mySelfStar = {}));
