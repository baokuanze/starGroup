var rankGroup;
(function (rankGroup) {
    /**
     *
     * @author
     *
     */
    var RankGroupController = (function () {
        function RankGroupController() {
        }
        var d = __define,c=RankGroupController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.rankGroupManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.rankGroupManager.hide();
        };
        return RankGroupController;
    }());
    rankGroup.RankGroupController = RankGroupController;
    egret.registerClass(RankGroupController,'rankGroup.RankGroupController');
})(rankGroup || (rankGroup = {}));
