var rankUserContribution;
(function (rankUserContribution) {
    /**
     *
     * @author
     *
     */
    var RankUserContributionController = (function () {
        function RankUserContributionController() {
        }
        var d = __define,c=RankUserContributionController,p=c.prototype;
        p.show = function (bid, group_openid) {
            GameApp.Manager.viewManager.rankUserContributionManager.show(bid, group_openid);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.rankUserContributionManager.hide();
        };
        return RankUserContributionController;
    }());
    rankUserContribution.RankUserContributionController = RankUserContributionController;
    egret.registerClass(RankUserContributionController,'rankUserContribution.RankUserContributionController');
})(rankUserContribution || (rankUserContribution = {}));
