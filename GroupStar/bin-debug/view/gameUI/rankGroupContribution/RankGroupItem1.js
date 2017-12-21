var rankGroupContribution;
(function (rankGroupContribution) {
    /**
     *
     * @author
     *
     */
    var RankGroupItem1 = (function (_super) {
        __extends(RankGroupItem1, _super);
        function RankGroupItem1() {
            _super.call(this);
            this.group_openid = "";
            this.bid = "";
            this.skinName = "src/view/gameUI/rankGroupContribution/RankGroupConItem1Skin.exml";
            this.btnIcon = new task.TaskIcon();
            this.btnIcon.scaleX = this.btnIcon.scaleY = .8;
        }
        var d = __define,c=RankGroupItem1,p=c.prototype;
        /**生產*/
        RankGroupItem1.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (RankGroupItem1.cacheDict[mtype] == null) {
                RankGroupItem1.cacheDict[mtype] = [];
            }
            var dict = RankGroupItem1.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new RankGroupItem1();
            }
            return theFighter;
        };
        /**回收*/
        RankGroupItem1.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (RankGroupItem1.cacheDict[mtype] == null) {
                RankGroupItem1.cacheDict[mtype] = [];
            }
            var dict = RankGroupItem1.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            this.addChild(this.btnIcon);
            this.btnIcon.x = 440;
            this.btnIcon.y = 35;
            this.addChildAt(this.bmpIcon, 2);
            if (Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblMember.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        p.tap = function (e) {
            //            system.GroupJoin.join(this.group_openid);
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
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("本月贡献 <font color=#ffffff>" + obj["contribution"] + "</font>");
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
            this.btnIcon.x = this.lblName.x + len * 16 + 10;
            RES.getResByUrl(obj["group_face"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.btnIcon.setText(obj["group_level"]);
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.clear = function () {
            //            this.bmpIcon.clear();
        };
        RankGroupItem1.cacheDict = {};
        return RankGroupItem1;
    }(eui.Component));
    rankGroupContribution.RankGroupItem1 = RankGroupItem1;
    egret.registerClass(RankGroupItem1,'rankGroupContribution.RankGroupItem1');
})(rankGroupContribution || (rankGroupContribution = {}));
