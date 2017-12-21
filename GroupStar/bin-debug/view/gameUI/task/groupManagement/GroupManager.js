var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManager = (function (_super) {
        __extends(GroupManager, _super);
        function GroupManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=GroupManager,p=c.prototype;
        p.show = function (str) {
            this.title = str;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.hostManager) {
                var self = this;
                this.hostManager = new groupManagement.HostManagement();
            }
            this.BottomUIStage.addChild(this.hostManager);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getCustomOpenTaskList", { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    console.log("接收群任务成功", obj);
                    self.obj = obj;
                    self.hostManager.setData(obj["data"], self.title);
                    console.log("3");
                }
            }, true, this);
            console.log("4");
        };
        p.hide = function () {
            if (this.hostManager.parent) {
                this.BottomUIStage.removeChild(this.hostManager);
                this.hostManager.clear();
            }
        };
        p.loading = function () {
            var self = this;
            this.load_end();
            //            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return GroupManager;
    }(common.BaseView));
    groupManagement.GroupManager = GroupManager;
    egret.registerClass(GroupManager,'groupManagement.GroupManager');
})(groupManagement || (groupManagement = {}));
