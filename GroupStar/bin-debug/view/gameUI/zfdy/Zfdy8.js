var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy8 = (function (_super) {
        __extends(Zfdy8, _super);
        function Zfdy8() {
            _super.call(this);
            this.skinName = "src/view/gameUI/zfdy/Zfdy8Skin.exml";
        }
        var d = __define,c=Zfdy8,p=c.prototype;
        Zfdy8.open = function (obj, star) {
            if (!this.zfdy8) {
                this.zfdy8 = new Zfdy8();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy8);
            this.zfdy8.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_bg8.scaleX = 0;
            this.img_bg8.scaleY = 0;
            this.img_star.scaleY = 0;
            this.img_star.scaleX = 0;
            this.img_star1.scaleY = 0;
            this.img_star1.scaleX = 0;
            this.img_star2.scaleY = 0;
            this.img_star2.scaleX = 0;
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
            egret.Tween.get(this.img_bg8).wait(0).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.bounceOut);
            egret.Tween.get(this.img_leftWineGlass).wait(800).to({ x: 185 }, 1000);
            egret.Tween.get(this.img_rightWineGlass).wait(800).to({ x: 350 }, 1000);
            egret.Tween.get(this.img_star).wait(1800).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this.img_star1).wait(2000).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this.img_star2).wait(3000).to({ scaleX: 1, scaleY: 1 }, 1000);
            egret.Tween.get(this).wait(5000).call(this.close);
            this.addHead(obj);
            this.initProgressBar();
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
            egret.Tween.get(this.pro).wait(1000).to({ value: 100 }, 2000).call(function () {
                egret.Tween.removeTweens(self.pro);
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
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        p.clear = function () {
            this.img_bg8.scaleX = 0;
            this.img_bg8.scaleY = 0;
            this.img_leftWineGlass.x = -268;
            this.img_rightWineGlass.x = 803;
            this.img_star.scaleX = 0;
            this.img_star.scaleY = 0;
            this.img_star1.scaleX = 0;
            this.img_star1.scaleY = 0;
            this.img_star2.scaleX = 0;
            this.img_star2.scaleY = 0;
            if (this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if (this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.clearHead();
            this.pro.value = 0;
        };
        return Zfdy8;
    }(eui.Component));
    zfdy.Zfdy8 = Zfdy8;
    egret.registerClass(Zfdy8,'zfdy.Zfdy8');
})(zfdy || (zfdy = {}));
