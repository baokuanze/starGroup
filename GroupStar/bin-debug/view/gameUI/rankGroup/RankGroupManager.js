var rankGroup;
(function (rankGroup) {
    /**
     *
     * @author
     *
     */
    var RankGroupManager = (function (_super) {
        __extends(RankGroupManager, _super);
        function RankGroupManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=RankGroupManager,p=c.prototype;
        p.show = function () {
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.init = function () {
            if (!this.rankGroupUI)
                this.rankGroupUI = new rankGroup.RankGroupUI();
            this.BottomUIStage.addChild(this.rankGroupUI);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid_save + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/groupLevelRank", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid_save, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    this.initUI(obj['rank']);
                }
            }, true, this);
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        };
        p.initUI = function (arr) {
            this.rankGroupUI.setData(arr);
        };
        p.hide = function () {
            if (this.rankGroupUI) {
                this.rankGroupUI.parent.removeChild(this.rankGroupUI);
                this.rankGroupUI.clear();
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
        return RankGroupManager;
    }(common.BaseView));
    rankGroup.RankGroupManager = RankGroupManager;
    egret.registerClass(RankGroupManager,'rankGroup.RankGroupManager');
})(rankGroup || (rankGroup = {}));
