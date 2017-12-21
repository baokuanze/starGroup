var sweepsTasks;
(function (sweepsTasks) {
    /**
     *
     * @author
     *
     */
    var SweepsTasksManager = (function (_super) {
        __extends(SweepsTasksManager, _super);
        function SweepsTasksManager(viewManager) {
            _super.call(this, viewManager);
            this.viewManager = viewManager;
        }
        var d = __define,c=SweepsTasksManager,p=c.prototype;
        p.show = function () {
            this.initUI();
        };
        p.initUI = function () {
            var self = this;
            if (!this.sweepsTasks) {
                this.sweepsTasks = new sweepsTasks.SweepsTasks();
            }
            self.sweepsTasks.setData();
            this.BottomUIStage.addChild(this.sweepsTasks);
        };
        p.hide = function () {
            if (this.sweepsTasks.parent) {
                this.BottomUIStage.removeChild(this.sweepsTasks);
                this.sweepsTasks.clear();
            }
        };
        return SweepsTasksManager;
    }(common.BaseView));
    sweepsTasks.SweepsTasksManager = SweepsTasksManager;
    egret.registerClass(SweepsTasksManager,'sweepsTasks.SweepsTasksManager');
})(sweepsTasks || (sweepsTasks = {}));
