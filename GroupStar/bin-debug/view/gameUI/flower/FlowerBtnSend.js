var flower;
(function (flower) {
    /**
     *
     * @author
     *
     */
    var FlowerBtnSend = (function (_super) {
        __extends(FlowerBtnSend, _super);
        function FlowerBtnSend() {
            _super.call(this);
            this.skinName = "src/view/gameUI/flower/FlowerBtnSendSkin.exml";
        }
        var d = __define,c=FlowerBtnSend,p=c.prototype;
        p.setState = function (state) {
            switch (state) {
                case 0:
                    this.rectBack.fillColor = 0xA0A2A3;
                    break;
                case 1:
                    this.rectBack.fillColor = 0x3EBCF3;
                    break;
            }
        };
        return FlowerBtnSend;
    }(eui.Button));
    flower.FlowerBtnSend = FlowerBtnSend;
    egret.registerClass(FlowerBtnSend,'flower.FlowerBtnSend');
})(flower || (flower = {}));
