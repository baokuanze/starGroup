var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskController = (function () {
        function TaskController() {
        }
        var d = __define,c=TaskController,p=c.prototype;
        p.show = function (dispage) {
            if (dispage === void 0) { dispage = -1; }
            GameApp.Manager.viewManager.taskManager.show(dispage);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.taskManager.hide();
        };
        return TaskController;
    }());
    task.TaskController = TaskController;
    egret.registerClass(TaskController,'task.TaskController');
})(task || (task = {}));
