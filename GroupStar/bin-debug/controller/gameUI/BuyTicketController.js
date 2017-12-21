var buyTicketActive;
(function (buyTicketActive) {
    /**
     *
     * @author
     *
     */
    var BuyTicketController = (function () {
        function BuyTicketController() {
        }
        var d = __define,c=BuyTicketController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.buyTicketActiveManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.buyTicketActiveManager.hide();
        };
        return BuyTicketController;
    }());
    buyTicketActive.BuyTicketController = BuyTicketController;
    egret.registerClass(BuyTicketController,'buyTicketActive.BuyTicketController');
})(buyTicketActive || (buyTicketActive = {}));
