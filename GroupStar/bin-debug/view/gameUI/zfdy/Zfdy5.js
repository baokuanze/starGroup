var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy5 = (function (_super) {
        __extends(Zfdy5, _super);
        function Zfdy5() {
            _super.call(this);
            this.imgarr = [];
            this.skinName = "src/view/gameUI/zfdy/Zfdy5Skin.exml";
        }
        var d = __define,c=Zfdy5,p=c.prototype;
        Zfdy5.open = function (obj, star) {
            if (!this.zfdy5) {
                this.zfdy5 = new Zfdy5();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy5);
            this.zfdy5.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.bmpIcon2.alpha = 0;
            this.bmpIcon3.alpha = 0;
            this.imgarr = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7, this.img8];
            for (var i in this.imgarr) {
                var bmp = this.imgarr[i];
                bmp.scaleX = bmp.scaleY = 0;
            }
        };
        p.setData = function (obj, star) {
            //    		console.log("obj:",obj);
            //            console.log("star:",star);
            this.bmpHead1 = new zfdy.ZfHeadItem();
            this.bmpHead2 = new zfdy.ZfHeadItem();
            this.bmpHead1.x = 232;
            this.bmpHead1.y = 510;
            this.bmpHead2.x = 518;
            this.bmpHead2.y = 510;
            this.bmpIcon1.scaleX = 0;
            this.bmpIcon1.scaleY = 0;
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
            egret.Tween.get(this.bmpIcon1).wait(0).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.bounceOut);
            egret.Tween.get(this.bmpIcon2).wait(800).to({ alpha: 1 }, 400);
            egret.Tween.get(this.bmpIcon3).wait(800).to({ alpha: 1 }, 400);
            var n = 1000;
            for (var i = this.imgarr.length - 1; i >= 0; i--) {
                var index = parseInt(Tools.getInstance().getRandomByNum(0, this.imgarr.length) + "");
                var sx = Tools.getInstance().getRandomByNum(.5, 1);
                var bmp = this.imgarr[index];
                console.log(bmp + " " + index);
                egret.Tween.get(bmp).wait(n).to({ scaleX: sx, scaleY: sx }, 300, egret.Ease.bounceOut);
                this.imgarr.splice(index, 1);
                n += 200;
            }
            egret.Tween.get(this).wait(2800).call(this.close);
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
        p.clearHead = function () {
            while (this.groupHead.numElements > 0) {
                var item = this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if (item.parent)
                    item.parent.removeChild(item);
                zfdy.ZfdyHeadItem.reclaim(item);
            }
        };
        p.clear = function () {
            if (this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if (this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.imgarr = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7, this.img8];
            for (var i in this.imgarr) {
                var bmp = this.imgarr[i];
                bmp.scaleX = bmp.scaleY = 0;
            }
            this.bmpIcon2.alpha = 0;
            this.bmpIcon3.alpha = 0;
            this.clearHead();
        };
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return Zfdy5;
    }(eui.Component));
    zfdy.Zfdy5 = Zfdy5;
    egret.registerClass(Zfdy5,'zfdy.Zfdy5');
})(zfdy || (zfdy = {}));
