var upload;
(function (upload) {
    /**
     *
     * @author
     *
     */
    var UploadManager = (function (_super) {
        __extends(UploadManager, _super);
        function UploadManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=UploadManager,p=c.prototype;
        p.show = function () {
            if (!this.uploadUI)
                this.uploadUI = new upload.Upload();
            this.BottomUIStage.addChild(this.uploadUI);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1("http://sf.xintiao100.com" + "/starImages", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                this.initUI(obj);
            }, true, this);
        };
        p.initUI = function (obj) {
            this.uploadUI.setData(obj);
        };
        p.hide = function () {
            if (this.uploadUI.parent) {
                this.BottomUIStage.removeChild(this.uploadUI);
                this.uploadUI.clear();
            }
        };
        p.loading = function () {
            var self = this;
            GameApp.Manager.controllerManager.loader.moduleLoading(["public"], this.load_end, this);
        };
        p.load_end = function () {
            //            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded = true;
        };
        return UploadManager;
    }(common.BaseView));
    upload.UploadManager = UploadManager;
    egret.registerClass(UploadManager,'upload.UploadManager');
})(upload || (upload = {}));
