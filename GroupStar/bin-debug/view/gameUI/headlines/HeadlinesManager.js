var headLines;
(function (headLines) {
    /**
     *
     * @author
     *
     */
    var HeadlinesManager = (function (_super) {
        __extends(HeadlinesManager, _super);
        function HeadlinesManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=HeadlinesManager,p=c.prototype;
        p.show = function (type, ts, comeType) {
            console.log("==1", type, ts);
            this.type = type;
            this.ts = ts ? ts : 0; //时间戳
            this.comeType = comeType; //用来计量是上一次的动作
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.headLines) {
                this.headLines = new headLines.HeadLines();
            }
            this.BottomUIStage.addChild(this.headLines);
            if (this.type == 1) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineData", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.headLines.setData(obj["data"], self.comeType, 1, self.ts);
                    }
                }, true, this);
            }
            else {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + this.ts + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineHistoryData", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, "ts": this.ts, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.headLines.setData(obj, self.comeType, 2, this.ts);
                    }
                }, true, this);
            }
        };
        p.hide = function () {
            if (this.headLines.parent) {
                this.headLines.parent.removeChild(this.headLines);
                this.headLines.clear();
            }
        };
        p.loading = function () {
            var self = this;
            this.initUI();
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return HeadlinesManager;
    }(common.BaseView));
    headLines.HeadlinesManager = HeadlinesManager;
    egret.registerClass(HeadlinesManager,'headLines.HeadlinesManager');
})(headLines || (headLines = {}));
