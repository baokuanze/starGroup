var buyTicketActive;
(function (buyTicketActive) {
    /**
     *
     * @author
     *
     */
    var AlertBuyTicket = (function (_super) {
        __extends(AlertBuyTicket, _super);
        function AlertBuyTicket() {
            _super.call(this);
            this.skinName = "src/view/gameUI/buyTicketActive/AlertBuyTicketSkin.exml";
            this.AlertContent = new buyTicketActive.AlertContent();
            this.AlertContent.x = 0;
            this.AlertContent.y = 0;
        }
        var d = __define,c=AlertBuyTicket,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb2.fontFamily = "Heiti SC";
            }
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        p.setData = function () {
            this.AlertContent.setData();
            this.groupData.addChild(this.AlertContent);
        };
        p.close = function () {
            while (this.groupData.numElements > 0) {
                var item = this.groupData.getElementAt(this.groupData.numElements - 1);
                if (item.parent) {
                    item.clear();
                    item.parent.removeChild(item);
                }
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AlertBuyTicket;
    }(eui.Component));
    buyTicketActive.AlertBuyTicket = AlertBuyTicket;
    egret.registerClass(AlertBuyTicket,'buyTicketActive.AlertBuyTicket');
})(buyTicketActive || (buyTicketActive = {}));
