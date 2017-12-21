var buyTicketActive;
(function (buyTicketActive) {
    /**
     *
     * @author
     *
     */
    var BuyTicketManager = (function (_super) {
        __extends(BuyTicketManager, _super);
        function BuyTicketManager(viewManager) {
            _super.call(this, viewManager);
            this.viewManager = viewManager;
        }
        var d = __define,c=BuyTicketManager,p=c.prototype;
        p.show = function () {
            this.initUI();
        };
        p.initUI = function () {
            var self = this;
            if (!this.BuyTicket) {
                this.BuyTicket = new buyTicketActive.BuyTicket();
            }
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "1" + "0" + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments", { "user_id": GameApp.Manager.dataManager.uid, type: 1, index: 0, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    self.BuyTicket.setDataHot(obj);
                }
            }, true, this);
            this.BottomUIStage.addChild(this.BuyTicket);
        };
        p.hide = function () {
            if (this.BuyTicket.parent) {
                this.BottomUIStage.removeChild(this.BuyTicket);
                this.BuyTicket.clear();
            }
        };
        return BuyTicketManager;
    }(common.BaseView));
    buyTicketActive.BuyTicketManager = BuyTicketManager;
    egret.registerClass(BuyTicketManager,'buyTicketActive.BuyTicketManager');
})(buyTicketActive || (buyTicketActive = {}));
