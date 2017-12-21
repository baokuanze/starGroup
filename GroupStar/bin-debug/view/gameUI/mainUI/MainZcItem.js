var mainUI;
(function (mainUI) {
    /**
     *
     * @author 众筹显示
     *
     */
    var MainZcItem = (function (_super) {
        __extends(MainZcItem, _super);
        function MainZcItem() {
            _super.call(this);
            this.backImg = new eui.Image();
            this.headImg = new eui.Image();
            this.addChild(this.backImg);
            this.headback = Tools.getInstance().getSp(24, 24, 0, 0, 0xffffff);
            this.addChild(this.headback);
            this.addChild(this.headImg);
            this.headImg.width = 20;
            this.headImg.height = 20;
            this.headback.x = 53;
            this.headback.y = 50;
            this.headImg.x = 54;
            this.headImg.y = 51;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        }
        var d = __define,c=MainZcItem,p=c.prototype;
        p.tap = function () {
            GameApp.Manager.viewManager.gameMainUI.mainUI.disZC(this.obj, this.star);
        };
        p.remlis = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        p.setData = function (obj, star) {
            this.obj = obj;
            this.star = star;
            RES.getResByUrl(obj["icon"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["group_face"], this.load_end1, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_end = function (s) {
            this.backImg.source = s;
        };
        p.load_end1 = function (s) {
            this.headImg.source = s;
        };
        p.clear = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        return MainZcItem;
    }(eui.Group));
    mainUI.MainZcItem = MainZcItem;
    egret.registerClass(MainZcItem,'mainUI.MainZcItem');
})(mainUI || (mainUI = {}));
