var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Zfdy1 = (function (_super) {
        __extends(Zfdy1, _super);
        function Zfdy1() {
            _super.call(this);
            this.raintime = 0;
            this.israin = false;
            this.skinName = "src/view/gameUI/zfdy/Zfdy1Skin.exml";
        }
        var d = __define,c=Zfdy1,p=c.prototype;
        Zfdy1.open = function (obj, star) {
            if (!this.zfdy1) {
                this.zfdy1 = new Zfdy1();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy1);
            this.zfdy1.setData(obj, star);
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
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
            egret.Tween.get(this.bmpIcon2).to({ x: 0 }, 2000).to({ visible: false }, 0).call(function () {
                egret.Ticker.getInstance().unregister(this.rain, this);
            }, this);
            egret.Tween.get(this).wait(2800).call(this.close);
            egret.Ticker.getInstance().register(this.rain, this);
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
        p.rain = function (dt) {
            this.raintime += dt;
            if (!this.israin) {
                if (this.raintime >= 0) {
                    this.israin = true;
                    this.raintime = 0;
                }
            }
            else {
                if (this.raintime >= Tools.getInstance().getRandomByNum(100, 300)) {
                    this.raintime = 0;
                    this.rainone();
                }
            }
        };
        p.rainone = function () {
            var r = new eui.Image("zfdy_3");
            r.x = Tools.getInstance().getRandomByNum(this.bmpIcon2.x + 30, this.bmpIcon2.x + 160);
            r.y = 170;
            this.addChild(r);
            egret.Tween.get(r).to({ y: Tools.getInstance().getRandomByNum(250, 340) }, 300).call(function () {
                if (r.parent) {
                    r.parent.removeChild(r);
                    r.source = null;
                    r = null;
                }
            }, this);
        };
        p.clear = function () {
            //            egret.Ticker.getInstance().unregister(this.rain,this);
            this.bmpIcon2.visible = true;
            this.bmpIcon2.x = 548;
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
        p.close = function () {
            this.clear();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return Zfdy1;
    }(eui.Component));
    zfdy.Zfdy1 = Zfdy1;
    egret.registerClass(Zfdy1,'zfdy.Zfdy1');
})(zfdy || (zfdy = {}));
