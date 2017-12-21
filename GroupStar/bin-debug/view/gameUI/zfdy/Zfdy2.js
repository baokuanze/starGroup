var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy2 = (function (_super) {
        __extends(Zfdy2, _super);
        function Zfdy2() {
            _super.call(this);
            this.arr = [];
            this.point = [
                { bx: 275, by: 295, ex: 89, ey: 189 },
                { bx: 283, by: 372, ex: 97, ey: 318 },
                { bx: 284, by: 466, ex: 88, ey: 440 },
                { bx: 394, by: 289, ex: 532, ey: 146 },
                { bx: 493, by: 282, ex: 666, ey: 243 },
                { bx: 522, by: 362, ex: 697, ey: 356 },
                { bx: 459, by: 470, ex: 630, ey: 510 },
            ];
            this.skinName = "src/view/gameUI/zfdy/Zfdy2Skin.exml";
        }
        var d = __define,c=Zfdy2,p=c.prototype;
        Zfdy2.open = function (obj, star) {
            if (!this.zfdy2) {
                this.zfdy2 = new Zfdy2();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy2);
            this.zfdy2.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.arr.push(this.bmpl1, this.bmpl2, this.bmpl3, this.bmpt1, this.bmpr1, this.bmpr2, this.bmpr3);
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
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1, scaleY: 1 }, 600);
            egret.Tween.get(this.bmpHead2).wait(400).to({ scaleX: 1, scaleY: 1 }, 600);
            egret.Tween.get(this.bmpIcon1).wait(0).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.bounceOut);
            for (var i = 0; i < this.arr.length; i++) {
                var xin = this.arr[i];
                egret.Tween.get(xin).wait(800).to({ visible: true }, 0).to({ x: this.point[i]["ex"] }, 400, egret.Ease.sineOut).to({ visible: false }, 0);
                egret.Tween.get(xin).wait(800).to({ visible: true }, 0).to({ y: this.point[i]["ey"] }, 400, egret.Ease.sineOut).to({ visible: false }, 0);
                egret.Tween.get(xin).wait(950).to({ alpha: 0.1 }, 250);
            }
            egret.Tween.get(this).wait(2200).call(this.close);
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
                this.arr[i].visible = false;
                this.arr[i].alpha = 1;
                this.arr[i].x = this.point[i]["bx"];
                this.arr[i].y = this.point[i]["by"];
            }
            this.clearHead();
        };
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return Zfdy2;
    }(eui.Component));
    zfdy.Zfdy2 = Zfdy2;
    egret.registerClass(Zfdy2,'zfdy.Zfdy2');
})(zfdy || (zfdy = {}));
