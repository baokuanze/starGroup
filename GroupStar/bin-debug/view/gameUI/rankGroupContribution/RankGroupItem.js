var rankGroupContribution;
(function (rankGroupContribution) {
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
            this.skinName = "src/view/gameUI/rankGroupContribution/RankGroupConItemSkin.exml";
            this.btnIcon = new task.TaskIcon();
            this.btnIcon.scaleX = this.btnIcon.scaleY = .8;
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
            var self = this;
            this.addChild(this.btnIcon);
            this.btnIcon.x = 428;
            this.btnIcon.y = 30;
            this.addChildAt(this.bmpIcon, 2);
            if (Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblMember.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                system.GroupJoin.join(self.group_openid);
            }, this);
        };
        p.tap = function (e) {
        };
        p.setData = function (obj) {
            this.group_openid = obj["group_openid"];
            this.bid = obj["bid"];
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
            this.lblName.text = "" + window["hexToDec"](obj["group_name"]);
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("本月贡献 <font color=#EDBE28>" + obj["contribution"] + "</font>");
            this.lblMember.text = obj["member_num"] + "人";
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
            this.btnIcon.x = this.lblName.x + len * 15 + 5;
            RES.getResByUrl(obj["group_face"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.btnIcon.setText(obj["group_level"]);
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.clear = function () {
            //            this.bmpIcon.clear();
        };
        RankGroupItem.cacheDict = {};
        return RankGroupItem;
    }(eui.Component));
    rankGroupContribution.RankGroupItem = RankGroupItem;
    egret.registerClass(RankGroupItem,'rankGroupContribution.RankGroupItem');
})(rankGroupContribution || (rankGroupContribution = {}));
