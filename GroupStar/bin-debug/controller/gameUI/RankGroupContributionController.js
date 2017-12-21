var rankGroupContribution;
(function (rankGroupContribution) {
    /**
     *
     * @author
     *
     */
    var RankGroupContributionController = (function () {
        function RankGroupContributionController() {
        }
        var d = __define,c=RankGroupContributionController,p=c.prototype;
        p.show = function (type) {
            GameApp.Manager.viewManager.rankGroupContributionManager.show(type);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.rankGroupContributionManager.hide();
        };
        return RankGroupContributionController;
    }());
    rankGroupContribution.RankGroupContributionController = RankGroupContributionController;
    egret.registerClass(RankGroupContributionController,'rankGroupContribution.RankGroupContributionController');
})(rankGroupContribution || (rankGroupContribution = {}));
