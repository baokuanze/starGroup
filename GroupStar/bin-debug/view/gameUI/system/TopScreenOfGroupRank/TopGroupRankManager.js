var TopScreenOfGroupRank;
(function (TopScreenOfGroupRank) {
    /**
     *
     * @author
     *
     */
    var TopGroupRankManager = (function (_super) {
        __extends(TopGroupRankManager, _super);
        function TopGroupRankManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=TopGroupRankManager,p=c.prototype;
        p.show = function () {
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.topGroupRank) {
                this.topGroupRank = new TopScreenOfGroupRank.TopGroupRank();
            }
            this.garbageUiStage.addChild(this.topGroupRank);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getEnterPage", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    this.topGroupRank.setData(obj["data"]);
                }
            }, true, self);
        };
        p.hide = function () {
            if (this.topGroupRank.parent) {
                this.topGroupRank.parent.removeChild(this.topGroupRank);
                this.topGroupRank.clear();
            }
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        p.loading = function () {
            this.load_end();
            //            GameApp.Manager.controllerManager.loader.moduleLoading(["topEnter"],this.load_end,this);
        };
        return TopGroupRankManager;
    }(common.BaseView));
    TopScreenOfGroupRank.TopGroupRankManager = TopGroupRankManager;
    egret.registerClass(TopGroupRankManager,'TopScreenOfGroupRank.TopGroupRankManager');
})(TopScreenOfGroupRank || (TopScreenOfGroupRank = {}));
