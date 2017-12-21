var barrage;
(function (barrage) {
    /**
     *
     * @author
     *
     */
    var BarrageItem = (function (_super) {
        __extends(BarrageItem, _super);
        function BarrageItem() {
            _super.call(this);
            this.state = 0; //0:弹幕在最左面 1:弹幕移动中 2:弹幕移动完毕 3:消失ing
            this.pid = 0; //管理类中的pointArr id
            this.uid = 0;
            this.giftId = 0;
            this.skinName = "src/view/gameUI/barrage/BarrageItemSkin.exml";
        }
        var d = __define,c=BarrageItem,p=c.prototype;
        /**生產*/
        BarrageItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (BarrageItem.cacheDict[mtype] == null) {
                BarrageItem.cacheDict[mtype] = [];
            }
            var dict = BarrageItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new BarrageItem();
            }
            return theFighter;
        };
        /**回收*/
        BarrageItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (BarrageItem.cacheDict[mtype] == null) {
                BarrageItem.cacheDict[mtype] = [];
            }
            var dict = BarrageItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }
            var cirback = Tools.getInstance().getCricleMask(6 + 92 / 2, 4 + 92 / 2, 96, this);
            this.addChildAt(cirback, 1);
            var iconMask = Tools.getInstance().getCricleMask(6 + 92 / 2, 4 + 92 / 2, 92, this);
            this.bmpIcon.mask = iconMask;
            this.bmpGift.x = 0;
            this.bmpNum.visible = false;
        };
        p.setData = function (obj) {
            var self = this;
            ///////赋值属性
            this.uid = obj["uid"];
            this.giftId = obj["id"];
            this.lblName.text = this.getStringLen(window["hexToDec"](obj["user_name"]));
            if (obj["guard"]) {
                if (obj["guard"]["faith_guard"] == 1) {
                    var img = new eui.Image();
                    img.source = "u_m1";
                    //                    console.log(img,"source");
                    img.width = 30;
                    img.height = 45 * (30 / 46);
                    this.group_medal.addChild(img);
                }
                if (obj["guard"]["angel_guard"] == 1) {
                    var img = new eui.Image();
                    img.source = "u_m2";
                    img.width = 30;
                    img.height = 48 * (30 / 73);
                    this.group_medal.addChild(img);
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("热度+8" + "<font color=0xff0000>(+1)</font>");
                }
                if (obj["guard"]["stars_guard"] == 1) {
                    var img = new eui.Image();
                    img.source = "u_m3";
                    img.width = 30;
                    img.height = 51 * (30 / 53);
                    this.group_medal.addChild(img);
                }
            }
            this.group_medal.x = this.lblName.x + this.lblName.width + 8;
            if (this.giftId + "" == "11") {
                this.bmpGift.source = "p1_zhuwei";
            }
            else {
                this.bmpGift.source = "p_gift" + this.giftId + "";
            }
            //            this.lblDesc.text = "送出了"+data.DataManager.getGiftName(this.giftId);
            if (obj["click"] > 0) {
                this.bmpNum.text = "x" + obj["click"] + "";
            }
            RES.getResByUrl(obj["user_pic"], this.onCompFun, this, RES.ResourceItem.TYPE_IMAGE);
            ///////////开始动画
            this.x = -600;
            switch (this.state) {
                case 0:
                    self.state = 1;
                    egret.Tween.get(this.bmpGift).to({ x: 360 }, 250, egret.Ease.backIn);
                    egret.Tween.get(self).to({ x: 20 }, 200).call(function () {
                        self.state = 2;
                        self.bmpNum.visible = true;
                        self.fontEase();
                    }, this).wait(2000).call(function () {
                        self.END();
                    }, this);
                    break;
            }
            if (this.uid == GameApp.Manager.dataManager.uid) {
                flower.FlowerUI.getInstance().setLianji(obj["click"]);
            }
        };
        p.getStringLen = function (str) {
            var len = 0;
            var newStr = '';
            for (var i = 0; i < str.length; i++) {
                var length = str.charCodeAt(i);
                if (length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
                if (len < 13) {
                    newStr += str[i];
                }
                else {
                    newStr += '...';
                    return newStr;
                }
            }
            return newStr;
        };
        p.resetData = function (obj) {
            this.bmpGift.x = 360;
            this.x = 20;
            if (obj["click"] > 0) {
                this.bmpNum.text = "x" + obj["click"] + "";
            }
            if (this.uid == GameApp.Manager.dataManager.uid) {
                flower.FlowerUI.getInstance().setLianji(obj["click"]);
            }
            this.fontEase();
            var self = this;
            switch (this.state) {
                case 2:
                    egret.Tween.removeTweens(this);
                    egret.Tween.get(this).wait(2000).call(function () {
                        self.END();
                    }, this);
                    break;
            }
        };
        p.fontEase = function () {
            egret.Tween.get(this.bmpNum).to({ scaleX: 1.8, scaleY: 1.8 }, 80).to({ scaleX: 1, scaleY: 1 }, 150, egret.Ease.backOut);
        };
        p.onCompFun = function (source) {
            console.log('source:' + source);
            this.bmpIcon.texture = source;
        };
        p.END = function () {
            this.state = 3;
            egret.Tween.get(this).to({ y: this.y - 50, alpha: 0 }, 200).call(function () {
                this.dispatchEventWith("END", false, this);
            }, this);
        };
        p.clear = function () {
            this.state = 0;
            this.bmpGift.x = 0;
            this.bmpNum.visible = false;
            this.alpha = 1;
            while (this.group_medal.numElements > 0) {
                var item = this.group_medal.getElementAt(this.group_medal.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            this.lblDesc.text = "热度+8";
        };
        BarrageItem.cacheDict = {};
        return BarrageItem;
    }(eui.Component));
    barrage.BarrageItem = BarrageItem;
    egret.registerClass(BarrageItem,'barrage.BarrageItem');
})(barrage || (barrage = {}));
