var rankStar;
(function (rankStar) {
    /**
     *
     * @author
     *
     */
    var RankStarManager = (function (_super) {
        __extends(RankStarManager, _super);
        function RankStarManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=RankStarManager,p=c.prototype;
        p.show = function () {
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.init = function () {
            if (!this.rankStarUI)
                this.rankStarUI = new rankStar.RankStarUI();
            this.BottomUIStage.addChild(this.rankStarUI);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starRank", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, sign: sign }, function (obj) {
                this.initUI(obj['data']["list"], obj["data"]["self"]);
                console.log(obj);
            }, true, this);
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        };
        p.initUI = function (arr, obj) {
            this.rankStarUI.setData(arr, obj);
        };
        p.hide = function () {
            if (this.rankStarUI.parent) {
                this.rankStarUI.parent.removeChild(this.rankStarUI);
                this.rankStarUI.clear();
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
        return RankStarManager;
    }(common.BaseView));
    rankStar.RankStarManager = RankStarManager;
    egret.registerClass(RankStarManager,'rankStar.RankStarManager');
})(rankStar || (rankStar = {}));
