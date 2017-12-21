var headLine;
(function (headLine) {
    /**
     *
     * @author
     *
     */
    var HeadLineController = (function () {
        function HeadLineController() {
        }
        var d = __define,c=HeadLineController,p=c.prototype;
        p.show = function (type, ts, come) {
            GameApp.Manager.viewManager.headLinesManager.show(type, ts, come);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.headLinesManager.hide();
        };
        return HeadLineController;
    }());
    headLine.HeadLineController = HeadLineController;
    egret.registerClass(HeadLineController,'headLine.HeadLineController');
})(headLine || (headLine = {}));
