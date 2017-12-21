var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy3 = (function (_super) {
        __extends(Zfdy3, _super);
        function Zfdy3() {
            _super.call(this);
            this.arr = [];
            this.skinName = "src/view/gameUI/zfdy/Zfdy3Skin.exml";
        }
        var d = __define,c=Zfdy3,p=c.prototype;
        Zfdy3.open = function (obj, star) {
            if (!this.zfdy3) {
                this.zfdy3 = new Zfdy3();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy3);
            this.zfdy3.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.arr.push(this.bmp1, this.bmp2, this.bmp3, this.bmp4, this.bmp5, this.bmp6, this.bmp7, this.bmp8, this.bmp9, this.bmp10);
            for (var i = 0; i < this.arr.length; i++) {
                var xin = this.arr[i];
                //                xin.scaleX=xin.scaleY=0;
                xin.alpha = 0;
            }
        };
        p.setData = function (obj, star) {
            //            console.log("obj:",obj);
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
            for (var i = 0; i < this.arr.length; i++) {
                var xin = this.arr[i];
                egret.Tween.get(xin).wait(800 + i * 180).to({ visible: true }, 0).to({ alpha: 1 }, 250);
            }
            egret.Tween.get(this).wait(3200).call(this.close);
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
            for (var i = 0; i < this.arr.length; i++) {
                var xin = this.arr[i];
                //                xin.scaleX = xin.scaleY = 0;
                xin.visible = false;
                xin.alpha = 0;
            }
            this.clearHead();
        };
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return Zfdy3;
    }(eui.Component));
    zfdy.Zfdy3 = Zfdy3;
    egret.registerClass(Zfdy3,'zfdy.Zfdy3');
})(zfdy || (zfdy = {}));
