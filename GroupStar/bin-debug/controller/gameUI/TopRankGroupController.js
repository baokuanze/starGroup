var topRank;
(function (topRank) {
    /**
     *
     * @author
     *
     */
    var TopRankGroupController = (function () {
        function TopRankGroupController() {
        }
        var d = __define,c=TopRankGroupController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.topRankGroupManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.topRankGroupManager.hide();
        };
        return TopRankGroupController;
    }());
    topRank.TopRankGroupController = TopRankGroupController;
    egret.registerClass(TopRankGroupController,'topRank.TopRankGroupController');
})(topRank || (topRank = {}));
