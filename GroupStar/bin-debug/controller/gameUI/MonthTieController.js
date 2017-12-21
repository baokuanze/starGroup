var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTieController = (function () {
        function MonthTieController() {
        }
        var d = __define,c=MonthTieController,p=c.prototype;
        p.show = function (str, type) {
            GameApp.Manager.viewManager.monthTieManager.show(str, type);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.monthTieManager.hide();
        };
        return MonthTieController;
    }());
    monthTie.MonthTieController = MonthTieController;
    egret.registerClass(MonthTieController,'monthTie.MonthTieController');
})(monthTie || (monthTie = {}));
