var weekPush;
(function (weekPush) {
    /**
     *
     * @author
     *
     */
    var WeekPushController = (function () {
        function WeekPushController() {
        }
        var d = __define,c=WeekPushController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.weekPushManage.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.weekPushManage.hide();
        };
        return WeekPushController;
    }());
    weekPush.WeekPushController = WeekPushController;
    egret.registerClass(WeekPushController,'weekPush.WeekPushController');
})(weekPush || (weekPush = {}));
