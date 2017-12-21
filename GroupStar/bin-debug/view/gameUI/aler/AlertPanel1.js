var aler;
(function (aler) {
    /**
     *
     * @author
     *
     */
    var AlertPanel1 = (function (_super) {
        __extends(AlertPanel1, _super);
        /**
        * 确定弹窗
        */
        function AlertPanel1() {
            _super.call(this);
            this.skinName = "src/view/gameUI/aler/AlertPanel1Skin.exml";
        }
        var d = __define,c=AlertPanel1,p=c.prototype;
        AlertPanel1.getInstance = function () {
            if (!this._instance) {
                this._instance = new AlertPanel1();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1_tap, this);
            this.y = (this.stage.stageHeight - this.height) / 2;
            this.x = (this.stage.stageWidth - this.width) / 2;
        };
        p.show = function (title, desc, str1, closeHander, scope) {
            GameApp.Manager.viewManager.maskStage(.4);
            GameApp.Manager.viewManager.TopUIStage.addChild(this);
            this.lblTitle.text = title ? title : "温馨提示";
            this.lblDesc.text = desc ? desc : "";
            this.lbl1.text = str1 ? str1 : "确定";
            this.callBack = closeHander;
            this.scope = scope;
        };
        p.btn1_tap = function () {
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
        return AlertPanel1;
    }(eui.Component));
    aler.AlertPanel1 = AlertPanel1;
    egret.registerClass(AlertPanel1,'aler.AlertPanel1');
})(aler || (aler = {}));
