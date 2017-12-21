var newstar;
(function (newstar) {
    /**
     *
     * @author
     *
     */
    var NewStarController = (function () {
        function NewStarController() {
        }
        var d = __define,c=NewStarController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.newStarManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.newStarManager.hide();
        };
        p.showSerach = function (serach_name) {
            GameApp.Manager.viewManager.newStarManager.showSerach(serach_name);
        };
        p.hideSerach = function () {
            GameApp.Manager.viewManager.newStarManager.hideSerach();
        };
        return NewStarController;
    }());
    newstar.NewStarController = NewStarController;
    egret.registerClass(NewStarController,'newstar.NewStarController');
})(newstar || (newstar = {}));
