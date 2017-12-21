var containmoney;
(function (containmoney) {
    /**
     *
     * @author
     *
     */
    var ContainMoneyItem = (function (_super) {
        __extends(ContainMoneyItem, _super);
        function ContainMoneyItem() {
            _super.call(this);
            this.pointId = 0;
            this.source = "p_hongbao";
            this.width = 61;
            this.height = 85;
        }
        var d = __define,c=ContainMoneyItem,p=c.prototype;
        /**生產*/
        ContainMoneyItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (ContainMoneyItem.cacheDict[mtype] == null) {
                ContainMoneyItem.cacheDict[mtype] = [];
            }
            var dict = ContainMoneyItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new ContainMoneyItem();
            }
            return theFighter;
        };
        /**回收*/
        ContainMoneyItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (ContainMoneyItem.cacheDict[mtype] == null) {
                ContainMoneyItem.cacheDict[mtype] = [];
            }
            var dict = ContainMoneyItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.open = function (key, pid, x, y) {
            this.key = key;
            this.pointId = pid;
            this.x = x;
            this.y = y;
            //		    GameApp.Manager.viewManager.BottomUIStage.addChild(this);
            if (GameApp.Manager.viewManager.gameMainUI.mainUI) {
                GameApp.Manager.viewManager.gameMainUI.mainUI.addChildAt(this, flower.FlowerUI.getInstance().getMainUIIndex());
            }
        };
        p.close = function () {
            //            GameApp.Manager.viewManager.BottomUIStage.removeChild(this);
            GameApp.Manager.viewManager.gameMainUI.mainUI.removeChild(this);
        };
        p.clear = function () {
            this.key = "";
            this.pointId = 0;
        };
        ContainMoneyItem.cacheDict = {};
        return ContainMoneyItem;
    }(eui.Image));
    containmoney.ContainMoneyItem = ContainMoneyItem;
    egret.registerClass(ContainMoneyItem,'containmoney.ContainMoneyItem');
})(containmoney || (containmoney = {}));
