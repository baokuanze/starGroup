var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var GameMainController = (function () {
        function GameMainController() {
        }
        var d = __define,c=GameMainController,p=c.prototype;
        p.showMain = function () {
            GameApp.Manager.viewManager.gameMainManager.showMain();
        };
        p.show = function () {
            GameApp.Manager.viewManager.gameMainManager.show();
        };
        p.showTask = function () {
            GameApp.Manager.controllerManager.taskController.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.gameMainManager.hide();
        };
        return GameMainController;
    }());
    mainUI.GameMainController = GameMainController;
    egret.registerClass(GameMainController,'mainUI.GameMainController');
})(mainUI || (mainUI = {}));
