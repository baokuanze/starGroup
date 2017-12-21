var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var BtnMain = (function (_super) {
        __extends(BtnMain, _super);
        function BtnMain() {
            _super.call(this);
            this.skinName = "src/view/gameUI/mainUI/BtnMainSkin.exml";
            this.cacheAsBitmap = true;
        }
        var d = __define,c=BtnMain,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (src, txt) {
            this.icon = "p_" + src + "";
            this.lblText.text = txt;
        };
        p.setNum = function (txt1) {
            if (txt1) {
                this.lblNum.visible = true;
                this.lblNum.text = txt1;
            }
            else {
                this.lblNum.visible = false;
            }
        };
        return BtnMain;
    }(eui.Button));
    mainUI.BtnMain = BtnMain;
    egret.registerClass(BtnMain,'mainUI.BtnMain');
})(mainUI || (mainUI = {}));
