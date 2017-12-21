var buyTicketActive;
(function (buyTicketActive) {
    /**
     *
     * @author
     *
     */
    var AwardPerson = (function (_super) {
        __extends(AwardPerson, _super);
        function AwardPerson() {
            _super.call(this);
            this.skinName = 'src/view/gameUI/buyTicketActive/AwardPersonSkin.exml';
        }
        var d = __define,c=AwardPerson,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb_name.fontFamily = "Heiti SC";
                this.lb_userId.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (data) {
            this.lb_name.text = window["hexToDec"](data['user_name']);
            this.lb_userId.text = "ID:" + data['user_id'];
            RES.getResByUrl(data["user_pic"], this.load_end0, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_end0 = function (source) {
            this.img_icon.texture = source;
        };
        return AwardPerson;
    }(eui.Component));
    buyTicketActive.AwardPerson = AwardPerson;
    egret.registerClass(AwardPerson,'buyTicketActive.AwardPerson');
})(buyTicketActive || (buyTicketActive = {}));
