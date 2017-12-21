var pay;
(function (pay) {
    /**
     *
     * @author
     *
     */
    var PayController = (function () {
        function PayController() {
        }
        var d = __define,c=PayController,p=c.prototype;
        p.show = function (callback, type, isByModal) {
            GameApp.Manager.viewManager.payManager.show(callback, type, isByModal);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.payManager.hide();
        };
        return PayController;
    }());
    pay.PayController = PayController;
    egret.registerClass(PayController,'pay.PayController');
})(pay || (pay = {}));
