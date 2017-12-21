var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var GroupBookUI = (function (_super) {
        __extends(GroupBookUI, _super);
        function GroupBookUI() {
            _super.call(this);
            this.skinName = "src/view/gameUI/system/GroupBookSkin.exml";
        }
        var d = __define,c=GroupBookUI,p=c.prototype;
        GroupBookUI.getInstance = function () {
            if (!this._instance) {
                this._instance = new GroupBookUI();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            this.scorll1.height = this.stage.stageHeight;
            if (Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
                this.lbl12.fontFamily = "Heiti SC";
            }
            this.lbl3.textFlow = (new egret.HtmlTextParser).parser("加官方群主QQ群：<font color=#316BE9>201758241（点击加群）</font>");
            this.lbl2.textFlow = (new egret.HtmlTextParser).parser("关注部落：<font color=#316BE9>点击访问官方部落</font>");
            this.btnJoin1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.join1_tap, this);
            this.btnJoin2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.join2_tap, this);
            this.btnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        p.join1_tap = function () {
            location.href = "http://buluo.qq.com/p/barindex.html?bid=312564";
        };
        p.join2_tap = function () {
            system.GroupJoin.join("2970C88E2D2E0EDE54E8D57E14268B03");
        };
        p.show = function () {
            GameApp.Manager.viewManager.BottomUIStage.addChild(this);
        };
        p.close = function () {
            GameApp.Manager.viewManager.BottomUIStage.removeChild(this);
            GameApp.Manager.controllerManager.taskController.show();
        };
        return GroupBookUI;
    }(eui.Component));
    system.GroupBookUI = GroupBookUI;
    egret.registerClass(GroupBookUI,'system.GroupBookUI');
})(system || (system = {}));
