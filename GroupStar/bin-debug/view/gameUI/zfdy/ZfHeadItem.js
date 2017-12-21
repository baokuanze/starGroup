var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var ZfHeadItem = (function (_super) {
        __extends(ZfHeadItem, _super);
        function ZfHeadItem() {
            _super.call(this);
            this.icon = new module.BaseCircleImage();
            this.icon.x = 16;
            this.icon.y = 16;
            this.bmpBack = new eui.Image();
            this.width = 152;
            this.height = 152;
            this.addChild(this.bmpBack);
            this.addChild(this.icon);
            this.anchorOffsetX = 152 / 2;
            this.anchorOffsetY = 152 / 2;
        }
        var d = __define,c=ZfHeadItem,p=c.prototype;
        p.setData = function (backurl, pic) {
            this.bmpBack.source = backurl;
            this.icon.setData(pic, 122);
        };
        p.setQunIcon = function () {
            var q = new eui.Image("zfdy_7");
            q.x = 86;
            q.y = 100;
            this.addChild(q);
        };
        return ZfHeadItem;
    }(eui.Group));
    zfdy.ZfHeadItem = ZfHeadItem;
    egret.registerClass(ZfHeadItem,'zfdy.ZfHeadItem');
})(zfdy || (zfdy = {}));
