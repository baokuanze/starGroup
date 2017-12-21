var rankUserContribution;
(function (rankUserContribution) {
    /**
     *
     * @author
     *
     */
    var RankUserContributionItem = (function (_super) {
        __extends(RankUserContributionItem, _super);
        //        private btnJoin: eui.Image;
        function RankUserContributionItem() {
            _super.call(this);
            this.user_id = 0;
            this.skinName = "src/view/gameUI/rankUserContribution/RankUserContributionItemSkin.exml";
        }
        var d = __define,c=RankUserContributionItem,p=c.prototype;
        /**生產*/
        RankUserContributionItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (RankUserContributionItem.cacheDict[mtype] == null) {
                RankUserContributionItem.cacheDict[mtype] = [];
            }
            var dict = RankUserContributionItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new RankUserContributionItem();
            }
            return theFighter;
        };
        /**回收*/
        RankUserContributionItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (RankUserContributionItem.cacheDict[mtype] == null) {
                RankUserContributionItem.cacheDict[mtype] = [];
            }
            var dict = RankUserContributionItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            var self = this;
            this.addChildAt(this.bmpIcon, 2);
            if (Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblIntimate_Title.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
            this.btnIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                userPanel.UserPanel.getInstance().open(self.user_id, self.bid, self.group_openid + "");
            }, this);
            //            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            ////                system.GroupJoin.join(self.group_openid);
            //            },this);
        };
        p.tap = function (e) {
            //  system.GroupJoin.join(this.group_openid);
        };
        p.setData = function (obj) {
            this.user_id = obj["user_id"];
            switch (obj["rank"] + "") {
                case "1":
                case "2":
                case "3":
                    this.lblRank.visible = false;
                    this.bmpRank.visible = true;
                    this.bmpRank.source = "p1_gxicon" + obj["rank"];
                    break;
                default:
                    this.lblRank.visible = true;
                    this.bmpRank.visible = false;
                    this.lblRank.text = "" + obj["rank"];
                    break;
            }
            this.lblName.text = "" + window["hexToDec"](obj["user_name"]);
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("本月贡献 <font color=#EDBE28>" + obj["contribution"] + "</font>");
            var len = 0;
            for (var i = 0; i < this.lblName.text.length; i++) {
                var length = this.lblName.text.charCodeAt(i);
                if (length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
            }
            this.groupLevel.x = this.lblName.x + len * 15 + 10;
            this.bmpTitleBack.source = data.DataManager.getintimateIcon(obj["intimate_level"]);
            this.lblIntimate_Title.text = data.DataManager.getintimateLevel(obj["intimate_level"]) + "";
            RES.getResByUrl(obj["user_pic"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            //            this.btnIcon.setText(obj["group_level"]);
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.clear = function () {
            //            this.bmpIcon.clear();
        };
        RankUserContributionItem.cacheDict = {};
        return RankUserContributionItem;
    }(eui.Component));
    rankUserContribution.RankUserContributionItem = RankUserContributionItem;
    egret.registerClass(RankUserContributionItem,'rankUserContribution.RankUserContributionItem');
})(rankUserContribution || (rankUserContribution = {}));
