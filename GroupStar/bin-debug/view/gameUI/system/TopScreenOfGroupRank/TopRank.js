var TopScreenOfGroupRank;
(function (TopScreenOfGroupRank) {
    /**
     *
     * @author
     *
     */
    var TopRank = (function (_super) {
        __extends(TopRank, _super);
        function TopRank() {
            _super.call(this);
            this.skinName = "src/view/gameUI/system/TopScreenOfGroupRank/TopRankSkin.exml";
        }
        var d = __define,c=TopRank,p=c.prototype;
        TopRank.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (TopRank.cacheDict[mtype] == null) {
                TopRank.cacheDict[mtype] = [];
            }
            var dict = TopRank.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new TopRank();
            }
            return theFighter;
        };
        /**回收*/
        TopRank.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (TopRank.cacheDict[mtype] == null) {
                TopRank.cacheDict[mtype] = [];
            }
            var dict = TopRank.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_hot.fontFamily = "Heiti SC";
                this.lable_rankNumber.fontFamily = "Heiti SC";
            }
            this.img_pro.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoFanke, this);
        };
        p.gotoFanke = function (e) {
            GameApp.Manager.dataManager.entenVisiter = 1;
            GameApp.Manager.controllerManager.start(this.bid);
        };
        p.setData = function (obj, n) {
            this.lable_starName.text = window["hexToDec"](obj["star_name"]);
            this.lable_hot.text = window["hexToDec"](obj["hot"]);
            if (obj["rank"] == 1) {
                this.img_number.source = "fistpag_1";
                this.img_pro.source = "fistpag_no1";
            }
            else if (obj["rank"] == 2) {
                this.img_number.source = "fistpag_2";
                this.img_pro.source = "fistpag_no2";
            }
            else if (obj["rank"] == 3) {
                this.img_number.source = "fistpag_3";
                this.img_pro.source = "fistpag_no3";
            }
            else {
                this.img_number.source = "fistpag_4";
                this.img_pro.source = "fistpag_no4";
            }
            RES.getResByUrl(obj["head_img"], this.setIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.lable_rankNumber.text = n + "";
            this.bid = obj["bid"];
        };
        p.setIcon = function (source) {
            this.img_ico.texture = source;
        };
        p.clear = function () {
            this.img_ico.source = null;
            this.img_number.source = null;
            this.img_pro.source = null;
            this.lable_starName.text = "";
            this.lable_hot.text = "";
        };
        TopRank.cacheDict = {};
        return TopRank;
    }(eui.Component));
    TopScreenOfGroupRank.TopRank = TopRank;
    egret.registerClass(TopRank,'TopScreenOfGroupRank.TopRank');
})(TopScreenOfGroupRank || (TopScreenOfGroupRank = {}));
