var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var BtnBuluo = (function (_super) {
        __extends(BtnBuluo, _super);
        function BtnBuluo() {
            _super.call(this);
            this.skinName = "src/view/gameUI/mainUI/BtnBuluoSkin.exml";
        }
        var d = __define,c=BtnBuluo,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbltxt.fontFamily = "Heiti SC";
                this.lbltxt1.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (str) {
            var self = this;
            this.lbltxt.text = str;
            setTimeout(function () {
                self.lbltxt1.x = self.lbltxt.x + 1;
                self.lbltxt1.y = self.lbltxt.y + 1;
                self.lbltxt1.text = str;
            }, 500, this);
        };
        return BtnBuluo;
    }(eui.Component));
    mainUI.BtnBuluo = BtnBuluo;
    egret.registerClass(BtnBuluo,'mainUI.BtnBuluo');
})(mainUI || (mainUI = {}));
