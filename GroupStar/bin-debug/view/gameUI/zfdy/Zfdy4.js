var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy4 = (function (_super) {
        __extends(Zfdy4, _super);
        function Zfdy4() {
            _super.call(this);
            this.ntime = 0;
            this.nmaxtime = 100;
            this.nIndex = 0;
            this.skinName = "src/view/gameUI/zfdy/Zfdy4Skin.exml";
        }
        var d = __define,c=Zfdy4,p=c.prototype;
        Zfdy4.open = function (obj, star) {
            if (!this.zfdy4) {
                this.zfdy4 = new Zfdy4();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy4);
            this.zfdy4.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.bmpXing1.scaleX = this.bmpXing1.scaleY = 0;
            this.bmpXing2.scaleX = this.bmpXing2.scaleY = 0;
            this.bmpXing3.scaleX = this.bmpXing3.scaleY = 0;
            this.bmpTx.visible = false;
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
            egret.Tween.get(this.bmpXing1).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.bounceOut);
            egret.Tween.get(this.bmpXing2).wait(150).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.bounceOut);
            egret.Tween.get(this.bmpXing3).wait(300).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.bounceOut);
            egret.Tween.get(this.bmpHead1).wait(600).to({ scaleX: 1, scaleY: 1 }, 600);
            egret.Tween.get(this.bmpHead2).wait(1000).to({ scaleX: 1, scaleY: 1 }, 600);
            egret.Tween.get(this.bmpIcon1).wait(600).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.bounceOut);
            egret.Tween.get(this).wait(3200).call(this.close);
            egret.Ticker.getInstance().register(this.tx, this);
            this.nmaxtime = 1800;
            this.bmpTx.source = "zfdy_4_tx1";
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
        p.tx = function (ct) {
            this.ntime += ct;
            if (this.ntime >= this.nmaxtime) {
                if (this.nIndex == 7) {
                    this.ntime = 0;
                    this.nIndex = 0;
                    egret.Ticker.getInstance().unregister(this.tx, this);
                    this.bmpTx.visible = false;
                }
                else {
                    this.ntime = 0;
                    this.nIndex++;
                    this.bmpTx.visible = true;
                    this.bmpTx.source = "zfdy_4_tx" + this.nIndex;
                    this.nmaxtime = 100;
                    console.log(this.nIndex);
                }
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
            this.bmpXing1.scaleX = this.bmpXing1.scaleY = 0;
            this.bmpXing2.scaleX = this.bmpXing2.scaleY = 0;
            this.bmpXing3.scaleX = this.bmpXing3.scaleY = 0;
            this.bmpTx.source = null;
            this.ntime = 0;
            this.nIndex = 0;
            this.bmpTx.visible = false;
            this.clearHead();
        };
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return Zfdy4;
    }(eui.Component));
    zfdy.Zfdy4 = Zfdy4;
    egret.registerClass(Zfdy4,'zfdy.Zfdy4');
})(zfdy || (zfdy = {}));
