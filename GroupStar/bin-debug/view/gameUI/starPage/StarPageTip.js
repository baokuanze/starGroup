var starPage;
(function (starPage) {
    /**
     *
     * @author
     *
     */
    var StarPageTip = (function (_super) {
        __extends(StarPageTip, _super);
        function StarPageTip() {
            _super.call(this);
            this.skinName = "src/view/gameUI/starPage/StarPageTipSkin.exml";
        }
        var d = __define,c=StarPageTip,p=c.prototype;
        p.childrenCreated = function () {
            var self = this;
            if (Tools.getInstance().isIphone()) {
                this.lbl0.fontFamily = "Heiti SC";
                this.lblStarName.fontFamily = "Heiti SC";
            }
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
                if (self.lblStarName.text == "请输入明星姓名或组合全称") {
                    self.lblStarName.text = "";
                    self.lblStarName.textColor = 0x14b8f6;
                }
            }, this);
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_OUT, function () {
                if (self.lblStarName.text == "") {
                    self.lblStarName.text = "请输入明星姓名或组合全称";
                    self.lblStarName.textColor = 0xbcd5df;
                }
                this.btn_tap();
            }, this);
            //            this.btnSerach.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn_tap,this);
        };
        p.btn_tap = function () {
            console.log('starpagetipserach' + this.lblStarName.text);
            if (this.lblStarName.text != "" && this.lblStarName.text != "请输入明星姓名或组合全称") {
                GameApp.Manager.controllerManager.newStarController.showSerach(this.lblStarName.text);
                GameApp.Manager.viewManager.starPageManager.hide();
            }
        };
        p.clear = function () {
            this.lblStarName.textColor = 0xbcd5df;
            this.lblStarName.text = "请输入明星姓名或组合全称";
        };
        return StarPageTip;
    }(eui.Component));
    starPage.StarPageTip = StarPageTip;
    egret.registerClass(StarPageTip,'starPage.StarPageTip');
})(starPage || (starPage = {}));
