var headLines;
(function (headLines) {
    /**
     *
     * @author
     *
     */
    var HeadLineItemInfoManager = (function (_super) {
        __extends(HeadLineItemInfoManager, _super);
        function HeadLineItemInfoManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=HeadLineItemInfoManager,p=c.prototype;
        p.show = function (headline_id, name, ts) {
            this.headline_id = headline_id;
            this.ts = ts;
            this.name = name;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.headLinesItemInfo) {
                this.headLinesItemInfo = new headLines.HeadLineItemInfor();
            }
            this.BottomUIStage.addChild(this.headLinesItemInfo);
            if (this.ts == headLines.HeadLines.toDayTime) {
                console.log("是正常的时间");
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + this.headline_id + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineDetail", { "user_id": GameApp.Manager.dataManager.uid, "headline_id": this.headline_id, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.headLinesItemInfo.setData(obj["data"], self.name, self.ts);
                    }
                }, true, this);
            }
            else {
                console.log("往期时间");
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + this.headline_id + self.ts + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineHistoryDetail", { "user_id": GameApp.Manager.dataManager.uid, "headline_id": this.headline_id, "ts": self.ts, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.headLinesItemInfo.setData(obj["data"], self.name, self.ts);
                    }
                }, true, this);
            }
        };
        p.hide = function () {
            if (this.headLinesItemInfo) {
                this.headLinesItemInfo.parent.removeChild(this.headLinesItemInfo);
                this.headLinesItemInfo.clear();
            }
        };
        p.loading = function () {
            var self = this;
            this.initUI();
            //            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return HeadLineItemInfoManager;
    }(common.BaseView));
    headLines.HeadLineItemInfoManager = HeadLineItemInfoManager;
    egret.registerClass(HeadLineItemInfoManager,'headLines.HeadLineItemInfoManager');
})(headLines || (headLines = {}));
