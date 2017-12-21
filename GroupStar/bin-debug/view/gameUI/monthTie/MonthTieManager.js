var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTieManager = (function (_super) {
        __extends(MonthTieManager, _super);
        function MonthTieManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=MonthTieManager,p=c.prototype;
        p.show = function (str, type) {
            this.mts = str;
            this.type = type;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.monthTie) {
                this.monthTie = new monthTie.MonthTie();
                this.monthTie.type = this.type;
            }
            this.BottomUIStage.addChild(this.monthTie);
            var sign = new md5().hex_md5(self.mts + "&");
            Util.sendJson1("http://115.159.190.186/getMonthly", { mts: self.mts, sign: sign }, function (obj) {
                self.monthTie.setData(obj["data"], self.mts);
            }, true, this);
        };
        p.hide = function () {
            if (this.monthTie.parent) {
                this.BottomUIStage.removeChild(this.monthTie);
                this.monthTie.clear();
            }
        };
        p.loading = function () {
            var self = this;
            //            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
            this.initUI();
        };
        return MonthTieManager;
    }(common.BaseView));
    monthTie.MonthTieManager = MonthTieManager;
    egret.registerClass(MonthTieManager,'monthTie.MonthTieManager');
})(monthTie || (monthTie = {}));
