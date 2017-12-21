var userPanel;
(function (userPanel) {
    /**
     *
     * @author
     *
     */
    var UserPanelItem = (function (_super) {
        __extends(UserPanelItem, _super);
        function UserPanelItem() {
            _super.call(this);
            this.desc = "";
            this.num = 0;
            this.need_num = 0;
            this.intimate = 0; //奖励的亲密
            this.skinName = "src/view/gameUI/userPanel/UserPanelItemSkin.exml";
        }
        var d = __define,c=UserPanelItem,p=c.prototype;
        /**生產*/
        UserPanelItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (UserPanelItem.cacheDict[mtype] == null) {
                UserPanelItem.cacheDict[mtype] = [];
            }
            var dict = UserPanelItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new UserPanelItem();
            }
            return theFighter;
        };
        /**回收*/
        UserPanelItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (UserPanelItem.cacheDict[mtype] == null) {
                UserPanelItem.cacheDict[mtype] = [];
            }
            var dict = UserPanelItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (obj) {
            //this.lblTitle.text = obj["name"];
            //显示5个灰色星星
            var count1 = 0;
            for (var j = 0; j < 5; j++) {
                var starBk = new eui.Image('u_star_h');
                this.groupStar.addChild(starBk);
                starBk.x = count1 * 26 + 2;
                starBk.y = 129;
                count1++;
            }
            if (obj["star_lv"] > 0) {
                this.bmpIcon.source = "cj" + obj["id"] + "";
                var point = data.DataManager.userStarPoint[obj["star_lv"]];
                var count = 0;
                for (var i in point) {
                    var o = point[i];
                    var star = new eui.Image("u_star");
                    this.groupStar.addChild(star);
                    star.x = count * 26 + 2;
                    star.y = 129;
                    count++;
                }
            }
            else {
                this.bmpIcon.source = "cj" + obj["id"] + "_1";
            }
            var msg = data.DataManager.userMSG[obj["id"]];
            this.desc = msg["desc"];
            this.num = obj["num"];
            this.need_num = obj["need_num"];
            this.intimate = obj["intimate"];
            if (this.desc.indexOf("n") > -1) {
                this.desc = this.desc.replace("n", this.need_num + "");
            }
        };
        p.clearStar = function () {
            this.groupStar.removeChildren();
        };
        p.clear = function () {
            this.clearStar();
            this.bmpIcon.source = null;
            this.lblTitle.text = "";
        };
        UserPanelItem.cacheDict = {};
        return UserPanelItem;
    }(eui.Component));
    userPanel.UserPanelItem = UserPanelItem;
    egret.registerClass(UserPanelItem,'userPanel.UserPanelItem');
})(userPanel || (userPanel = {}));
