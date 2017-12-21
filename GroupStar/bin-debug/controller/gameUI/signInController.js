var signIn;
(function (signIn) {
    /**
     *
     * @author
     *
     */
    var signInController = (function () {
        function signInController() {
        }
        var d = __define,c=signInController,p=c.prototype;
        p.show = function (type) {
            GameApp.Manager.viewManager.sign.show(type);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.sign.hide();
        };
        return signInController;
    }());
    signIn.signInController = signInController;
    egret.registerClass(signInController,'signIn.signInController');
})(signIn || (signIn = {}));
