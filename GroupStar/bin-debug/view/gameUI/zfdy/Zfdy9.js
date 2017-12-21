var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy9 = (function (_super) {
        __extends(Zfdy9, _super);
        function Zfdy9() {
            _super.call(this);
            this.skinName = "src/view/gameUI/zfdy/Zfdy9Skin.exml";
        }
        var d = __define,c=Zfdy9,p=c.prototype;
        Zfdy9.open = function (obj, star) {
            if (!this.zfdy9) {
                this.zfdy9 = new Zfdy9();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy9);
            this.zfdy9.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_star1.scaleY = 0;
            this.img_star1.scaleX = 0;
            this.img_star2.scaleY = 0;
            this.img_star2.scaleX = 0;
            this.img_roseButton.scaleX = 0;
            this.img_roseButton.scaleY = 0;
            this.img_roseUp.alpha = 0;
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
            egret.Tween.get(this.img_roseButton).wait(0).to({ scaleX: 0.3, scaleY: 0.3 }, 600).wait(200).to({ scaleX: 1, scaleY: 1, rotation: 720 }, 1000);
            egret.Tween.get(this.img_roseUp).wait(1800).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.img_star1).wait(2300).to({ scaleX: 1, scaleY: 1 }, 800);
            egret.Tween.get(this.img_star2).wait(2500).to({ scaleX: 1, scaleY: 1 }, 800);
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
            this.img_roseButton.scaleX = 0;
            this.img_roseButton.scaleY = 0;
            this.img_star2.scaleX = 0;
            this.img_star2.scaleY = 0;
            this.img_star1.scaleX = 0;
            this.img_star1.scaleY = 0;
            this.img_roseUp.alpha = 0;
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
        return Zfdy9;
    }(eui.Component));
    zfdy.Zfdy9 = Zfdy9;
    egret.registerClass(Zfdy9,'zfdy.Zfdy9');
})(zfdy || (zfdy = {}));
