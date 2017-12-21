var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagementAuditManager = (function (_super) {
        __extends(GroupManagementAuditManager, _super);
        function GroupManagementAuditManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=GroupManagementAuditManager,p=c.prototype;
        p.show = function (str, str1) {
            this.open_id = str;
            this.title = str1;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.groupManagerAuditInfor) {
                this.groupManagerAuditInfor = new groupManagement.GroupManagementAuditItemInformation();
                this.BottomUIStage.addChild(this.groupManagerAuditInfor);
            }
            this.BottomUIStage.addChild(this.groupManagerAuditInfor);
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + this.open_id + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/reviewOpenTask", { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, open_task_id: this.open_id, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    console.log("接收群任务成功");
                    self.groupManagerAuditInfor.setData(obj, self.open_id, self.title);
                }
            }, true, this);
        };
        p.hide = function () {
            if (this.groupManagerAuditInfor.parent) {
                this.BottomUIStage.removeChild(this.groupManagerAuditInfor);
                this.groupManagerAuditInfor.clear();
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
        return GroupManagementAuditManager;
    }(common.BaseView));
    groupManagement.GroupManagementAuditManager = GroupManagementAuditManager;
    egret.registerClass(GroupManagementAuditManager,'groupManagement.GroupManagementAuditManager');
})(groupManagement || (groupManagement = {}));
