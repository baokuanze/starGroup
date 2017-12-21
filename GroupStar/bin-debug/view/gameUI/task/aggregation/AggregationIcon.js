var aggregation;
(function (aggregation) {
    /**
     *
     * @author
     *
     */
    var AggregationIcon = (function (_super) {
        __extends(AggregationIcon, _super);
        function AggregationIcon() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/aggregation/AggregationIconSkin.exml";
        }
        var d = __define,c=AggregationIcon,p=c.prototype;
        /**生產*/
        AggregationIcon.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (AggregationIcon.cacheDict[mtype] == null) {
                AggregationIcon;
                AggregationIcon.cacheDict[mtype] = [];
            }
            var dict = AggregationIcon.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new AggregationIcon();
            }
            return theFighter;
        };
        /**回收*/
        AggregationIcon.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (AggregationIcon.cacheDict[mtype] == null) {
                AggregationIcon.cacheDict[mtype] = [];
            }
            var dict = AggregationIcon.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            this.img_personIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (this.userId > 0)
                    userPanel.UserPanel.getInstance().open(this.userId, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid);
                e.stopPropagation();
            }, this);
        };
        p.setData = function (obj) {
            this.userId = obj["user_id"];
            RES.getResByUrl(obj["user_pic"], this.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_personIcon = function (source) {
            this.img_personIcon.texture = source;
            this.img_personIcon.width = 100;
            this.img_personIcon.height = 100;
        };
        p.clear = function () {
            this.img_personIcon.texture = null;
        };
        AggregationIcon.cacheDict = {};
        return AggregationIcon;
    }(eui.Component));
    aggregation.AggregationIcon = AggregationIcon;
    egret.registerClass(AggregationIcon,'aggregation.AggregationIcon');
})(aggregation || (aggregation = {}));
