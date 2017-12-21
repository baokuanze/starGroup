var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskManager = (function (_super) {
        __extends(TaskManager, _super);
        function TaskManager(viewManager) {
            _super.call(this, viewManager);
            this.taskOpenManager = new task.TaskOpenManager(viewManager);
            this.giftCfManager = new task.GiftManager(viewManager);
        }
        var d = __define,c=TaskManager,p=c.prototype;
        TaskManager.go1 = function () {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.taskController.show(0);
        };
        TaskManager.go2 = function () {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.taskController.show(1);
        };
        TaskManager.go3 = function () {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.taskController.show(2);
        };
        TaskManager.groupMass = function () {
            if (GameApp.Manager.viewManager.taskManager.taskUI && GameApp.Manager.viewManager.taskManager.taskUI.parent) {
                GameApp.Manager.viewManager.taskManager.taskUI.groupMass();
            }
        };
        p.show = function (dispage) {
            if (dispage === void 0) { dispage = -1; }
            var self = this;
            if (!this.taskUI) {
                this.taskUI = new task.TaskUI();
            }
            switch (dispage) {
                case 0:
                    this.taskUI.btn1_tap();
                    break;
                //                case 1: this.taskUI.btn2_tap(); break;
                case 2:
                    this.taskUI.btn3_tap();
                    break;
                default:
                    this.BottomUIStage.addChild(this.taskUI);
                    var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupData", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                        if (obj["st"] == 1) {
                            self.taskUI.setData(obj["data"]);
                        }
                    }, true, this);
                    break;
            }
        };
        p.hide = function () {
            if (this.taskUI) {
                if (this.taskUI.parent)
                    this.taskUI.parent.removeChild(this.taskUI);
                this.taskUI.clear();
            }
        };
        return TaskManager;
    }(common.BaseView));
    task.TaskManager = TaskManager;
    egret.registerClass(TaskManager,'task.TaskManager');
})(task || (task = {}));
