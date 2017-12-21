var fansRecruit;
(function (fansRecruit) {
    /**
     *
     * @author
     *
     */
    var FansRecruitController = (function () {
        function FansRecruitController() {
        }
        var d = __define,c=FansRecruitController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.fansRecruitManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.fansRecruitManager.hide();
        };
        return FansRecruitController;
    }());
    fansRecruit.FansRecruitController = FansRecruitController;
    egret.registerClass(FansRecruitController,'fansRecruit.FansRecruitController');
})(fansRecruit || (fansRecruit = {}));
