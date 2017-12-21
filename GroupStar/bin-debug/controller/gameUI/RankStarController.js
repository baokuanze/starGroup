var rankStar;
(function (rankStar) {
    /**
     *
     * @author
     *
     */
    var RankStarController = (function () {
        function RankStarController() {
        }
        var d = __define,c=RankStarController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.rankStarManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.rankStarManager.hide();
        };
        return RankStarController;
    }());
    rankStar.RankStarController = RankStarController;
    egret.registerClass(RankStarController,'rankStar.RankStarController');
})(rankStar || (rankStar = {}));
