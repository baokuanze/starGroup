var starfanstv;
(function (starfanstv) {
    /**
     *
     * @author
     *
     */
    var StarFansTVManager = (function (_super) {
        __extends(StarFansTVManager, _super);
        function StarFansTVManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=StarFansTVManager,p=c.prototype;
        p.show = function () {
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.init = function () {
            socketio.IoConnect.getInstance().initPomelo("0", GameApp.Manager.dataManager.uid);
            if (!this.starFanTVUI)
                this.starFanTVUI = new starfanstv.StarFansTVUI();
            this.BottomUIStage.addChild(this.starFanTVUI);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid_save + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getVideosList", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid_save, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    this.initUI(obj['video_list']);
                }
            }, true, this);
        };
        p.initUI = function (arr) {
            this.starFanTVUI.setData(arr);
        };
        p.hide = function () {
            if (this.starFanTVUI) {
                this.starFanTVUI.parent.removeChild(this.starFanTVUI);
                this.starFanTVUI.clear();
                socketio.IoConnect.getInstance().disconnect();
            }
        };
        p.hideSerach = function () {
            if (this.starFanTVUI) {
                this.starFanTVUI.parent.removeChild(this.starFanTVUI);
                this.starFanTVUI.clear();
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
        return StarFansTVManager;
    }(common.BaseView));
    starfanstv.StarFansTVManager = StarFansTVManager;
    egret.registerClass(StarFansTVManager,'starfanstv.StarFansTVManager');
})(starfanstv || (starfanstv = {}));
