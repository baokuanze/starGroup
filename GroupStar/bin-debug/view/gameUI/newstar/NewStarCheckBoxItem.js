var newstar;
(function (newstar) {
    /**
     *
     * @author
     *
     */
    var NewStarCheckBoxItem = (function (_super) {
        __extends(NewStarCheckBoxItem, _super);
        function NewStarCheckBoxItem() {
            _super.call(this);
            this.isSelect = false;
            this.key = 0;
            this.skinName = "src/view/gameUI/newstar/NewStarCheckBoxItemSkin.exml";
            this.touchEnabled = true;
        }
        var d = __define,c=NewStarCheckBoxItem,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
            }
            this.bmpS.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        p.tap = function () {
            if (!this.isSelect) {
                this.isSelect = true;
                this.bmpS.visible = true;
            }
            else {
                this.isSelect = false;
                this.bmpS.visible = false;
            }
        };
        p.setData = function (txt, key) {
            this.lbl1.text = txt;
            this.key = key;
        };
        return NewStarCheckBoxItem;
    }(eui.Component));
    newstar.NewStarCheckBoxItem = NewStarCheckBoxItem;
    egret.registerClass(NewStarCheckBoxItem,'newstar.NewStarCheckBoxItem');
})(newstar || (newstar = {}));
