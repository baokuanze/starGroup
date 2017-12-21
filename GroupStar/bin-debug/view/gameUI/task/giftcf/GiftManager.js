var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var GiftManager = (function (_super) {
        __extends(GiftManager, _super);
        function GiftManager(viewManager) {
            _super.call(this, viewManager);
        }
        var d = __define,c=GiftManager,p=c.prototype;
        p.show = function (type) {
            var self = this;
            if (!this.giftCf) {
                this.giftCf = new task.GiftCf();
            }
            this.giftCf.type = type;
            this.BottomUIStage.addChild(this.giftCf);
            this.giftCf.show();
        };
        p.hide = function () {
            if (this.giftCf) {
                this.giftCf.parent.removeChild(this.giftCf);
                this.giftCf.clear();
            }
        };
        return GiftManager;
    }(common.BaseView));
    task.GiftManager = GiftManager;
    egret.registerClass(GiftManager,'task.GiftManager');
})(task || (task = {}));
