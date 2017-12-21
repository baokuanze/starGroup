var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskOpen = (function (_super) {
        __extends(TaskOpen, _super);
        function TaskOpen() {
            _super.call(this);
            this.type = 0; //1:普通任务 2:支线任务
            this.tid = 0;
            this.skinName = "src/view/gameUI/task/TaskOpenSkin.exml";
        }
        var d = __define,c=TaskOpen,p=c.prototype;
        /**生產*/
        TaskOpen.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (TaskOpen.cacheDict[mtype] == null) {
                TaskOpen.cacheDict[mtype] = [];
            }
            var dict = TaskOpen.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new TaskOpen();
            }
            return theFighter;
        };
        /**回收*/
        TaskOpen.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (TaskOpen.cacheDict[mtype] == null) {
                TaskOpen.cacheDict[mtype] = [];
            }
            var dict = TaskOpen.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        p.tap = function () {
            switch (this.type) {
                case 1:
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.viewManager.taskManager.taskOpenManager.show(this.tid);
                    break;
                case 2:
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.viewManager.taskManager.taskOpenManager.show(this.tid, this.obj);
                    break;
            }
        };
        p.setData = function (obj, type) {
            this.type = type;
            this.obj = obj;
            this.obj["type"] = type;
            switch (this.type) {
                case 1:
                    this.tid = obj['open_task_id'];
                    this.lblName.text = window["hexToDec"](obj["title"]) + "(" + obj["finish_count"] + "/" + obj["member_num"] + ")";
                    break;
                case 2:
                    this.tid = obj["extension_task_id"];
                    this.lblName.text = window["hexToDec"](obj["title"]);
                    break;
            }
            //            if(obj["each_reward_group_exp"]) {
            //                this.lblDesc.text = "每人完成后,群经验+" + obj["each_reward_group_exp"];
            //            }
        };
        p.clear = function () {
            this.lblName.text = "";
        };
        TaskOpen.cacheDict = {};
        return TaskOpen;
    }(eui.Component));
    task.TaskOpen = TaskOpen;
    egret.registerClass(TaskOpen,'task.TaskOpen');
})(task || (task = {}));
