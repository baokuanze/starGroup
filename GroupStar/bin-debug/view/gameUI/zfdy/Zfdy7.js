var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy7 = (function (_super) {
        __extends(Zfdy7, _super);
        function Zfdy7() {
            _super.call(this);
            this.skinName = "src/view/gameUI/zfdy/Zfdy7Skin.exml";
        }
        var d = __define,c=Zfdy7,p=c.prototype;
        Zfdy7.open = function (obj, star) {
            if (!this.zfdy7) {
                this.zfdy7 = new Zfdy7();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy7);
            this.zfdy7.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_twoDog.scaleX = 0;
            this.img_twoDog.scaleY = 0;
            this.img_light.alpha = 0;
            this.probar.value = 0;
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
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1, scaleY: 1 }, 800);
            egret.Tween.get(this.bmpHead2).wait(600).to({ scaleX: 1, scaleY: 1 }, 800);
            egret.Tween.get(this.img_twoDog).wait(0).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.bounceOut);
            egret.Tween.get(this.img_light).wait(800).to({ alpha: 1 }, 1000);
            this.initProgressBar();
            this.addHead(obj);
            egret.Tween.get(this).wait(4000).call(this.close);
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
        p.initProgressBar = function () {
            var self = this;
            egret.Tween.get(this.probar).wait(1000).to({ value: 100 }, 2000).call(function () {
                egret.Tween.removeTweens(self.probar);
            });
        };
        p.clearHead = function () {
            while (this.groupHead.numElements > 0) {
                var item = this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if (item.parent)
                    item.parent.removeChild(item);
                zfdy.ZfdyHeadItem.reclaim(item);
            }
        };
        p.clear = function () {
            this.img_twoDog.scaleX = 0;
            this.img_twoDog.scaleY = 0;
            this.img_light.alpha = 0;
            if (this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if (this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.clearHead();
            this.probar.value = 0;
        };
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return Zfdy7;
    }(eui.Component));
    zfdy.Zfdy7 = Zfdy7;
    egret.registerClass(Zfdy7,'zfdy.Zfdy7');
})(zfdy || (zfdy = {}));
