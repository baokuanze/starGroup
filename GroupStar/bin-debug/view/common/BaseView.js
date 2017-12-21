var common;
(function (common) {
    /**
     *
     * @author
     *
     */
    var BaseView = (function () {
        function BaseView(viewManager) {
            this.stage = egret.MainContext.instance.stage;
            this.UIStage = viewManager.UIStage;
            this.BottomUIStage = viewManager.BottomUIStage;
            this.GameEffect = viewManager.GameEffect;
            this.TopUIStage = viewManager.TopUIStage;
            this.garbageUiStage = viewManager.garbageStage;
            this.gameMainUI = viewManager.gameMainUI;
        }
        var d = __define,c=BaseView,p=c.prototype;
        return BaseView;
    }());
    common.BaseView = BaseView;
    egret.registerClass(BaseView,'common.BaseView');
})(common || (common = {}));
