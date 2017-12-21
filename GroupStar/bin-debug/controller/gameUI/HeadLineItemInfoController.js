var headLineItemInforation;
(function (headLineItemInforation) {
    /**
     *
     * @author
     *
     */
    var HeadLineItemInfoController = (function () {
        function HeadLineItemInfoController() {
        }
        var d = __define,c=HeadLineItemInfoController,p=c.prototype;
        p.show = function (headline_id, name, ts) {
            GameApp.Manager.viewManager.headLinesItemInfoManager.show(headline_id, name, ts);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.headLinesItemInfoManager.hide();
        };
        return HeadLineItemInfoController;
    }());
    headLineItemInforation.HeadLineItemInfoController = HeadLineItemInfoController;
    egret.registerClass(HeadLineItemInfoController,'headLineItemInforation.HeadLineItemInfoController');
})(headLineItemInforation || (headLineItemInforation = {}));
