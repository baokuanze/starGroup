var starPage;
(function (starPage) {
    /**
     *
     * @author
     *
     */
    var StarPageManager = (function (_super) {
        __extends(StarPageManager, _super);
        function StarPageManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=StarPageManager,p=c.prototype;
        p.show = function (reset) {
            this.reset = reset;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.starPageUI) {
                this.starPageUI = new starPage.StarPageUI();
            }
            this.BottomUIStage.addChild(this.starPageUI);
            if (this.reset == 1) {
                console.log("1");
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starsChoosePage", { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, reset: this.reset, sign: sign }, function (obj) {
                    if (obj['st'] == 2) {
                        GameApp.Manager.dataManager.reset = 1;
                        GameApp.Manager.dataManager.bid = obj['bid'];
                        GameApp.Manager.viewManager.starPageManager.hide();
                        GameApp.Manager.controllerManager.start();
                    }
                    else {
                        GameApp.Manager.dataManager.reset = 1;
                        this.setData(obj);
                    }
                }, true, self);
            }
            else {
                console.log("0");
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starsChoosePage", { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                    if (obj['st'] == 2) {
                        GameApp.Manager.dataManager.bid = obj['bid'];
                        GameApp.Manager.viewManager.starPageManager.hide();
                        GameApp.Manager.controllerManager.start();
                    }
                    else {
                        this.setData(obj);
                    }
                }, true, self);
            }
        };
        p.setData = function (obj) {
            this.starPageUI.setData(obj);
        };
        p.hide = function () {
            if (this.starPageUI.parent) {
                this.BottomUIStage.removeChild(this.starPageUI);
                this.starPageUI.clear();
            }
        };
        p.loading = function () {
            var self = this;
            GameApp.Manager.controllerManager.loader.moduleLoading(["starpage"], this.load_end, this);
        };
        p.load_end = function () {
            //            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded = true;
            this.initUI();
        };
        return StarPageManager;
    }(common.BaseView));
    starPage.StarPageManager = StarPageManager;
    egret.registerClass(StarPageManager,'starPage.StarPageManager');
})(starPage || (starPage = {}));
