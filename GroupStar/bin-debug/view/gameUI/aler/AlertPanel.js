var aler;
(function (aler) {
    /**
     *
     * @author
     *
     */
    var AlertPanel = (function (_super) {
        __extends(AlertPanel, _super);
        /**
        * 确定取消弹窗
        */
        function AlertPanel() {
            _super.call(this);
            this.skinName = "src/view/gameUI/aler/alertPanelSkin.exml";
        }
        var d = __define,c=AlertPanel,p=c.prototype;
        AlertPanel.getInstance = function () {
            if (!this._instance) {
                this._instance = new AlertPanel();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1_tap, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2_tap, this);
            this.y = (this.stage.stageHeight - this.height) / 2;
            this.x = (this.stage.stageWidth - this.width) / 2;
        };
        p.show = function (title, desc, str1, str2, closeHander, scope) {
            GameApp.Manager.viewManager.maskStage(.4);
            GameApp.Manager.viewManager.TopUIStage.addChild(this);
            this.callBack = closeHander;
            this.scope = scope;
            this.lblTitle.text = title ? title : "温馨提示";
            this.lblDesc.text = desc ? desc : "";
            this.lbl1.text = str1 ? str1 : "取消";
            this.lbl2.text = str2 ? str2 : "确认";
        };
        p.btn1_tap = function () {
            this.close();
            if (this.callBack) {
                if (this.scope) {
                    this.callBack.call(this.scope, "fail");
                }
                else {
                    this.callBack.call(this, "fail");
                }
            }
        };
        p.btn2_tap = function () {
            this.close();
            if (this.callBack) {
                if (this.scope) {
                    this.callBack.call(this.scope, "ok");
                }
                else {
                    this.callBack.call(this, "ok");
                }
            }
        };
        p.close = function () {
            GameApp.Manager.viewManager.clearMask();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        p.clear = function () {
        };
        return AlertPanel;
    }(eui.Component));
    aler.AlertPanel = AlertPanel;
    egret.registerClass(AlertPanel,'aler.AlertPanel');
})(aler || (aler = {}));
