var rankUserContribution;
(function (rankUserContribution) {
    /**
     *
     * @author
     *
     */
    var RankUserContributionManager = (function (_super) {
        __extends(RankUserContributionManager, _super);
        function RankUserContributionManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.type = 0;
            this.viewManager = viewManager;
        }
        var d = __define,c=RankUserContributionManager,p=c.prototype;
        p.show = function (bid, group_openid) {
            this.bid = bid;
            this.group_openid = group_openid;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.init = function () {
            if (!this.rankUserContributionUI)
                this.rankUserContributionUI = new rankUserContribution.RankUserContributionUI();
            this.BottomUIStage.addChild(this.rankUserContributionUI);
            this.rankUserContributionUI.bid = this.bid;
            this.rankUserContributionUI.group_openid = this.group_openid;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + this.bid + this.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupUserContributionRankList", { user_id: GameApp.Manager.dataManager.uid, bid: this.bid, group_openid: this.group_openid, index: 0, sign: sign }, function (obj) {
                if (obj['st'] == 1) {
                    this.initUI(obj);
                }
            }, true, this);
        };
        p.initUI = function (arr) {
            this.rankUserContributionUI.setData(arr);
        };
        p.hide = function () {
            if (this.rankUserContributionUI) {
                this.rankUserContributionUI.parent.removeChild(this.rankUserContributionUI);
                this.rankUserContributionUI.clear();
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
        return RankUserContributionManager;
    }(common.BaseView));
    rankUserContribution.RankUserContributionManager = RankUserContributionManager;
    egret.registerClass(RankUserContributionManager,'rankUserContribution.RankUserContributionManager');
})(rankUserContribution || (rankUserContribution = {}));
