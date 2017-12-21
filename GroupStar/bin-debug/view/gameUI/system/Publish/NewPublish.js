var Publish;
(function (Publish) {
    /**
     *
     * @author
     *
     */
    var NewPublish = (function (_super) {
        __extends(NewPublish, _super);
        function NewPublish() {
            _super.call(this);
            this.skinName = 'src/view/gameUI/system/Publish/NewPublishSkin.exml';
        }
        var d = __define,c=NewPublish,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
            }
            this.Part1 = new Publish.Part1();
            this.Part1.x = 0;
            this.Part1.y = 0;
            this.groupData.addChild(this.Part1);
            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var self = this;
                if (self.parent) {
                    self.parent.removeChild(self);
                }
            }, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var self = this;
                if (self.parent) {
                    self.parent.removeChild(self);
                }
            }, this);
        };
        p.setData = function () {
        };
        return NewPublish;
    }(eui.Component));
    Publish.NewPublish = NewPublish;
    egret.registerClass(NewPublish,'Publish.NewPublish');
})(Publish || (Publish = {}));
