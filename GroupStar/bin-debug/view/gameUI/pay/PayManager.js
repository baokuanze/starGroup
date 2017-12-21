var pay;
(function (pay) {
    /**
     *
     * @author
     *
     */
    var PayManager = (function (_super) {
        __extends(PayManager, _super);
        function PayManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.type = 0;
            this.viewManager = viewManager;
        }
        var d = __define,c=PayManager,p=c.prototype;
        p.setLucky = function () {
            if (this.rankStarUI) {
                this.rankStarUI.setLucky();
            }
        };
        p.show = function (callback, type, isByModal) {
            if (type >= 0)
                this.type = type;
            this.callback = callback;
            this.isByModal = isByModal;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            if (this.callback) {
                this.callback.call(null);
            }
            if (!this.rankStarUI)
                this.rankStarUI = new pay.PayUI();
            this.rankStarUI.type = this.type;
            this.rankStarUI.isBuyModul = this.isByModal;
            this.BottomUIStage.addChild(this.rankStarUI);
            this.rankStarUI.setData();
        };
        p.hide = function () {
            if (this.rankStarUI.parent) {
                this.BottomUIStage.removeChild(this.rankStarUI);
            }
        };
        p.loading = function () {
            GameApp.Manager.controllerManager.loader.moduleLoading(["public"], this.load_end, this);
        };
        p.load_end = function () {
            //            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded = true;
            this.initUI();
        };
        return PayManager;
    }(common.BaseView));
    pay.PayManager = PayManager;
    egret.registerClass(PayManager,'pay.PayManager');
})(pay || (pay = {}));
