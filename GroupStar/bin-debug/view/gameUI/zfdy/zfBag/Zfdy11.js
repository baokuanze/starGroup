var zfBag;
(function (zfBag) {
    /**
     *
     * @author
     *
     */
    var Zfdy11 = (function (_super) {
        __extends(Zfdy11, _super);
        function Zfdy11() {
            _super.call(this);
            this.skinName = "src/view/gameUI/zfdy/zfBag/Zfdy11Skin.exml";
        }
        var d = __define,c=Zfdy11,p=c.prototype;
        Zfdy11.open = function (obj, star) {
            if (!this.zfdy11) {
                this.zfdy11 = new Zfdy11();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy11);
            this.zfdy11.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_bg.scaleY = 0;
            this.img_bg.scaleX = 0;
            this.img_bg.alpha = 0;
            this.img_star11.x = 266 + 600;
            this.img_star11.y = 406 - 600 * Math.tan(Math.PI / 6);
            this.img_star12.x = 262 + 600;
            this.img_star12.y = 276 - 600 * Math.tan(Math.PI / 6);
            this.img_star13.x = 521 + 600;
            this.img_star13.y = 346 - 600 * Math.tan(Math.PI / 6);
            this.img_star14.x = 144 + 600;
            this.img_star14.y = 296 - 600 * Math.tan(Math.PI / 6);
            this.img_star15.x = 432 + 600;
            this.img_star15.y = 445 - 600 * Math.tan(Math.PI / 6);
            this.img_star1.scaleX = 0;
            this.img_star1.scaleY = 0;
            this.img_star0.scaleX = 0;
            this.img_star0.scaleY = 0;
        };
        p.setData = function (obj, star) {
            this.bmpHead1 = new zfdy.ZfHeadItem();
            this.bmpHead2 = new zfdy.ZfHeadItem();
            this.bmpHead1.x = 232;
            this.bmpHead1.y = 510;
            this.bmpHead2.x = 518;
            this.bmpHead2.y = 510;
            this.lblText.textFlow = (new egret.HtmlTextParser).parser("<font color=#ffe533>" + window["hexToDec"](obj["group_name"]) + "</font>送给" + GameApp.Manager.dataManager.star_name + "<font color=#ffe533>" + window["hexToDec"](obj["name"]) + "</font>");
            this.bmpHead1.setData("zfdy_5", obj["group_face"]);
            this.bmpHead1.setQunIcon();
            this.bmpHead2.setData("zfdy_6", star["head_img"]);
            this.addChild(this.bmpHead1);
            this.addChild(this.bmpHead2);
            this.bmpHead1.scaleX = this.bmpHead1.scaleY = 0;
            this.bmpHead2.scaleX = this.bmpHead2.scaleY = 0;
            this.bmpTextBack.width = this.lblText.textWidth + 163;
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this.bmpHead2).wait(800).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this.img_star1, { loop: true }).wait(500).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this.img_star0, { loop: true }).wait(800).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this.img_bg).wait(0).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800);
            egret.Tween.get(this.img_star11).wait(1100).to({ x: 266, y: 406 }, 600);
            egret.Tween.get(this.img_star12).wait(900).to({ x: 262, y: 276 }, 1000);
            egret.Tween.get(this.img_star13).wait(900).to({ x: 521, y: 346 }, 1000);
            egret.Tween.get(this.img_star14).wait(600).to({ x: 144, y: 296 }, 1400);
            egret.Tween.get(this.img_star15).wait(600).to({ x: 432, y: 445 }, 1400);
            egret.Tween.get(this).wait(4000).call(this.close);
            this.addHead(obj);
        };
        p.addHead = function (obj) {
            var arr = obj["top_user"];
            for (var i = 0; i < arr.length; i++) {
                var item = zfdy.ZfdyHeadItem.produce();
                item.bid = obj["bid"];
                item.group_openid = obj["group_openid"];
                this.groupHead.addChild(item);
                item.setData(arr[i], i + 1);
            }
        };
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        p.clear = function () {
            this.img_bg.scaleY = 0;
            this.img_bg.scaleX = 0;
            this.img_bg.alpha = 0;
            this.img_star11.x = 344;
            this.img_star11.y = 306;
            this.img_star1.scaleX = 0;
            this.img_star1.scaleY = 0;
            this.img_star0.scaleX = 0;
            this.img_star0.scaleY = 0;
            this.img_star11.x = 266 + 600;
            this.img_star11.y = 600 - 750 * Math.tan(Math.PI / 6);
            this.img_star12.x = 262 + 600;
            this.img_star12.y = 276 - 600 * Math.tan(Math.PI / 6);
            this.img_star13.x = 521 + 600;
            this.img_star13.y = 346 - 600 * Math.tan(Math.PI / 6);
            this.img_star14.x = 144 + 600;
            this.img_star14.y = 296 - 600 * Math.tan(Math.PI / 6);
            this.img_star15.x = 432 + 600;
            this.img_star15.y = 445 - 600 * Math.tan(Math.PI / 6);
            egret.Tween.removeTweens(this.img_star1);
            egret.Tween.removeTweens(this.img_star0);
            egret.Tween.removeTweens(this.bmpHead1);
            egret.Tween.removeTweens(this.bmpHead2);
            egret.Tween.removeTweens(this.img_star11);
            egret.Tween.removeTweens(this.img_star12);
            egret.Tween.removeTweens(this.img_star13);
            egret.Tween.removeTweens(this.img_star14);
            egret.Tween.removeTweens(this.img_star15);
            if (this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if (this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.clearHead();
        };
        p.clearHead = function () {
            while (this.groupHead.numElements > 0) {
                var item = this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if (item.parent)
                    item.parent.removeChild(item);
                zfdy.ZfdyHeadItem.reclaim(item);
            }
        };
        return Zfdy11;
    }(eui.Component));
    zfBag.Zfdy11 = Zfdy11;
    egret.registerClass(Zfdy11,'zfBag.Zfdy11');
})(zfBag || (zfBag = {}));
