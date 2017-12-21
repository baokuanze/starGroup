var sweepsTasks;
(function (sweepsTasks) {
    /**
     *
     * @author
     *
     */
    var SweepsTasksController = (function () {
        function SweepsTasksController() {
        }
        var d = __define,c=SweepsTasksController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.sweepsTasksManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.sweepsTasksManager.hide();
        };
        return SweepsTasksController;
    }());
    sweepsTasks.SweepsTasksController = SweepsTasksController;
    egret.registerClass(SweepsTasksController,'sweepsTasks.SweepsTasksController');
})(sweepsTasks || (sweepsTasks = {}));
