var weekPush;
(function (weekPush) {
    /**
     *
     * @author
     *
     */
    var WeekPushManage = (function (_super) {
        __extends(WeekPushManage, _super);
        function WeekPushManage(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=WeekPushManage,p=c.prototype;
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
            if (!this.weekPush) {
                this.weekPush = new newWeekPush.NewWeekPush();
            }
            this.BottomUIStage.addChild(this.weekPush);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.wts + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getWeeklyNew", { user_id: GameApp.Manager.dataManager.uid + "", bid: GameApp.Manager.dataManager.bid, wts: GameApp.Manager.dataManager.wts, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    self.weekPush.setData(obj["data"]);
                }
            }, true, this);
        };
        //隐藏
        p.hide = function () {
            if (this.weekPush.parent) {
                this.BottomUIStage.removeChild(this.weekPush);
                this.weekPush.clear();
            }
        };
        p.loading = function () {
            var self = this;
            GameApp.Manager.controllerManager.loader.mainLoading(["public"], this.load_end, this);
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return WeekPushManage;
    }(common.BaseView));
    weekPush.WeekPushManage = WeekPushManage;
    egret.registerClass(WeekPushManage,'weekPush.WeekPushManage');
})(weekPush || (weekPush = {}));
