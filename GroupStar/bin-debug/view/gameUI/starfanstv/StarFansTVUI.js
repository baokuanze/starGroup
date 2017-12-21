var starfanstv;
(function (starfanstv) {
    /**
     *
     * @author
     *
     */
    var StarFansTVUI = (function (_super) {
        __extends(StarFansTVUI, _super);
        function StarFansTVUI() {
            _super.call(this);
            this.bo = false;
            this.skinName = "src/view/gameUI/starfanstv/StarFansTVUISkin.exml";
        }
        var d = __define,c=StarFansTVUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC";
            }
            this.scroll1.height = this.stage.stageHeight - 120;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        p.setData = function (arr) {
            if (!this.bo) {
                this.bo = true;
                for (var i in arr) {
                    var item = new starfanstv.StarFanTVItem();
                    this.groupData.addChild(item);
                    item.setData(arr[i]);
                }
            }
        };
        p.clear = function () {
        };
        p.close = function () {
            GameApp.Manager.controllerManager.gameMainController.show();
            GameApp.Manager.controllerManager.starFansTVController.hide();
        };
        return StarFansTVUI;
    }(eui.Component));
    starfanstv.StarFansTVUI = StarFansTVUI;
    egret.registerClass(StarFansTVUI,'starfanstv.StarFansTVUI');
})(starfanstv || (starfanstv = {}));
