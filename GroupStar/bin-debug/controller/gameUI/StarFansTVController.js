var starfanstv;
(function (starfanstv) {
    /**
     *
     * @author
     *
     */
    var StarFansTVController = (function () {
        function StarFansTVController() {
        }
        var d = __define,c=StarFansTVController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.starFanTVManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.starFanTVManager.hide();
        };
        return StarFansTVController;
    }());
    starfanstv.StarFansTVController = StarFansTVController;
    egret.registerClass(StarFansTVController,'starfanstv.StarFansTVController');
})(starfanstv || (starfanstv = {}));
