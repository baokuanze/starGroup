var rankGroupContribution;
(function (rankGroupContribution) {
    /**
     *
     * @author
     *
     */
    var RankGroupContributionManager = (function (_super) {
        __extends(RankGroupContributionManager, _super);
        function RankGroupContributionManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.type = 0;
            this.viewManager = viewManager;
        }
        var d = __define,c=RankGroupContributionManager,p=c.prototype;
        p.show = function (type) {
            if (type != -1) {
                this.type = type;
            }
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.init = function () {
            if (!this.rankGroupContributionUI) {
                this.rankGroupContributionUI = new rankGroupContribution.RankGroupContributionUI();
            }
            this.BottomUIStage.addChild(this.rankGroupContributionUI);
            this.rankGroupContributionUI.type = this.type;
            //            if(!this.rankGroupContributionUI.bo){
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.bid_save + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupContributionRankList", { bid: GameApp.Manager.dataManager.bid_save, index: 0, sign: sign }, function (obj) {
                if (obj['st'] == 1) {
                    this.initUI(obj);
                }
            }, true, this);
            //            }
        };
        p.initUI = function (arr) {
            this.rankGroupContributionUI.setData(arr);
        };
        p.hide = function () {
            if (this.rankGroupContributionUI) {
                this.rankGroupContributionUI.parent.removeChild(this.rankGroupContributionUI);
                this.rankGroupContributionUI.clear();
            }
        };
        p.loading = function () {
            var self = this;
            //GameApp.Manager.controllerManager.loader.moduleLoading(["starRank"],this.load_end,this);
            this.init();
        };
        p.load_end = function () {
            this.init();
            this.loaded = true;
        };
        return RankGroupContributionManager;
    }(common.BaseView));
    rankGroupContribution.RankGroupContributionManager = RankGroupContributionManager;
    egret.registerClass(RankGroupContributionManager,'rankGroupContribution.RankGroupContributionManager');
})(rankGroupContribution || (rankGroupContribution = {}));
