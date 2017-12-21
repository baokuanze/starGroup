var rankGroup;
(function (rankGroup) {
    /**
     *
     * @author
     *
     */
    var RankGroupItem = (function (_super) {
        __extends(RankGroupItem, _super);
        function RankGroupItem() {
            _super.call(this);
            this.group_openid = "";
            this.bid = "";
            this.skinName = "src/view/gameUI/rankGroup/RankGroupItemSkin.exml";
            this.bmpIcon = new module.BaseCircleImage();
            this.bmpIcon.x = 324 + 116 / 2;
            this.bmpIcon.y = 58 + 116 / 2;
            this.iconNow = new task.TaskIcon();
            //            this.iconNow.x=550;this.iconNow.y=207;
        }
        var d = __define,c=RankGroupItem,p=c.prototype;
        /**生產*/
        RankGroupItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (RankGroupItem.cacheDict[mtype] == null) {
                RankGroupItem.cacheDict[mtype] = [];
            }
            var dict = RankGroupItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new RankGroupItem();
            }
            return theFighter;
        };
        /**回收*/
        RankGroupItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (RankGroupItem.cacheDict[mtype] == null) {
                RankGroupItem.cacheDict[mtype] = [];
            }
            var dict = RankGroupItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }
            this.groupData.addChild(this.iconNow);
            this.addChildAt(this.bmpIcon, 1);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
            //		    this.cacheAsBitmap=true;
        };
        p.tap = function (e) {
            system.GroupJoin.join(this.group_openid);
        };
        p.setData = function (obj, rank) {
            this.group_openid = obj["group_openid"];
            this.bid = obj["bid"];
            this.bmpIcon.setData(obj["group_face"], 116, 116);
            this.lblRank.text = "NO." + rank + "";
            this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["hexToDec"](obj["group_name"]) + "");
            this.lblNum.textFlow = (new egret.HtmlTextParser).parser("成员 <font color=#82ddff>" + obj["member_num"] + "</font> 人");
            this.iconNow.setText(obj["level"]);
            //            setTimeout(function(self:RankGroupItem){
            //                self.iconNow.x = self.lblName.x + Tools.getInstance().getTextLenChar(self.lblName.text) * 15+10;
            //            },50,this)
        };
        p.clear = function () {
            this.bmpIcon.clear();
        };
        RankGroupItem.cacheDict = {};
        return RankGroupItem;
    }(eui.Component));
    rankGroup.RankGroupItem = RankGroupItem;
    egret.registerClass(RankGroupItem,'rankGroup.RankGroupItem');
})(rankGroup || (rankGroup = {}));
