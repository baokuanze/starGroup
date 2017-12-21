var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskOpenManager = (function (_super) {
        __extends(TaskOpenManager, _super);
        function TaskOpenManager(viewManager) {
            _super.call(this, viewManager);
        }
        var d = __define,c=TaskOpenManager,p=c.prototype;
        p.show = function (tid, obj) {
            if (obj === void 0) { obj = null; }
            var self = this;
            if (!this.taskOpenUI) {
                this.taskOpenUI = new task.TaskOpenUI();
            }
            this.BottomUIStage.addChild(this.taskOpenUI);
            if (!obj) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + GameApp.Manager.dataManager.bid_save + tid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getOpenTaskDetail", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid_save, group_openid: GameApp.Manager.dataManager.group_openid, open_task_id: tid, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        obj["data"]["type"] = 1;
                        self.taskOpenUI.setData(obj["data"]);
                    }
                }, true, this);
            }
            else {
                self.taskOpenUI.setData(obj);
            }
        };
        p.hide = function () {
            if (this.taskOpenUI) {
                this.taskOpenUI.parent.removeChild(this.taskOpenUI);
                this.taskOpenUI.clear();
            }
        };
        return TaskOpenManager;
    }(common.BaseView));
    task.TaskOpenManager = TaskOpenManager;
    egret.registerClass(TaskOpenManager,'task.TaskOpenManager');
})(task || (task = {}));
