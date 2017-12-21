var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var MainProIcon = (function (_super) {
        __extends(MainProIcon, _super);
        function MainProIcon(track, thumb) {
            _super.call(this);
            this.now = 0;
            this.total = 100;
            this.val = 0;
            this.track = new eui.Image(track);
            this.thumb = new eui.Image(thumb);
            this.addChild(this.track);
            this.addChild(this.thumb);
            this.thumb.mask = new egret.Rectangle(0, 0, 0, 0);
            this.validateNow();
        }
        var d = __define,c=MainProIcon,p=c.prototype;
        p.setData = function (v) {
            //            this.now = now; this.total = total;
            this.val = v;
            //            if(this.now > this.total) {
            //                this.now = this.total;
            //            }
            this.setMask();
        };
        p.setMask = function () {
            var c = this.val / 100 * this.thumb.height;
            this.thumb.mask = new egret.Rectangle(0, this.thumb.height - c, this.thumb.width, c);
        };
        return MainProIcon;
    }(eui.Group));
    mainUI.MainProIcon = MainProIcon;
    egret.registerClass(MainProIcon,'mainUI.MainProIcon');
})(mainUI || (mainUI = {}));
