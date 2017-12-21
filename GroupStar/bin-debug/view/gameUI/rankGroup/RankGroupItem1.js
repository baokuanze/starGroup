var rankGroup;
(function (rankGroup) {
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
            this.skinName = "src/view/gameUI/rankGroup/RankGroupItem1Skin.exml";
            this.bmpIcon = new module.BaseCircleImage();
            this.bmpIcon.x = 336 + 81 / 2;
            this.bmpIcon.y = 28 + 81 / 2;
            this.iconNow = new task.TaskIcon();
            //            this.iconNow.x = 550; this.iconNow.y = 151;
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
            if (Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }
            this.groupData.addChild(this.iconNow);
            this.addChildAt(this.bmpIcon, 1);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
            //            this.cacheAsBitmap = true;
        };
        p.tap = function (e) {
            system.GroupJoin.join(this.group_openid);
        };
        p.setData = function (obj, rank) {
            this.group_openid = obj["group_openid"];
            if (rank == 2) {
                this.bmpBack.source = "p_no" + rank;
            }
            this.bmpIcon.setData(obj["group_face"], 81, 81);
            this.lblRank.text = "NO." + rank + "";
            this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["hexToDec"](obj["group_name"]));
            this.lblNum.textFlow = (new egret.HtmlTextParser).parser("成员 <font color=#82ddff>" + obj["member_num"] + "</font> 人");
            this.iconNow.setText(obj["level"]);
            setTimeout(function (self) {
                self.iconNow.x = self.lblName.x + Tools.getInstance().getTextLenChar(self.lblName.text) * 15 + 10;
            }, 50, this);
        };
        p.clear = function () {
            this.bmpIcon.clear();
        };
        RankGroupItem1.cacheDict = {};
        return RankGroupItem1;
    }(eui.Component));
    rankGroup.RankGroupItem1 = RankGroupItem1;
    egret.registerClass(RankGroupItem1,'rankGroup.RankGroupItem1');
})(rankGroup || (rankGroup = {}));
