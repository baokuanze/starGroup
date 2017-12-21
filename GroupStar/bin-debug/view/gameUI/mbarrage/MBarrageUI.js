var mbarrage;
(function (mbarrage) {
    /**
     *
     * @author
     *
     */
    var MBarrageUI = (function (_super) {
        __extends(MBarrageUI, _super);
        function MBarrageUI() {
            _super.call(this);
            this.arrObj = [];
            this.canTip = false;
            this.arr = [];
            this.canUpdate = true;
            this.touch = false;
            this.maxlength = 10;
            this.jiange = 50;
            this.isleave = false;
            this.skinName = "src/view/gameUI/mbarrage/MBarrageUISkin.exml";
        }
        var d = __define,c=MBarrageUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblTip.fontFamily = "Heiti SC";
                this.lblTip1.fontFamily = "Heiti SC";
                this.lblTip_1.fontFamily = "Heiti SC";
                this.lblTip1_1.fontFamily = "Heiti SC";
            }
            this.y = egret.MainContext.instance.stage.stageHeight - 420;
            //		    this.scroll1.viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.viweport_touch_begin,this);
            //            this.scroll1.viewport.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.viweport_touch_move,this);
            //            this.groupData.addEventListener(egret.TouchEvent.TOUCH_END,this.viweport_touch_end,this);
            //            this.scroll1.viewport.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.viweport_release_outside,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE_END, this.viweport_touch_end, this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE, this.viweport_touch_begin, this);
            this.bmpTip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bmpTip_tap, this);
            this.btn_Tip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTip_tap, this);
            //            this.groupData.addEventListener(egret.TouchEvent.TOUCH_END,function(){'touchend'},this);
        };
        p.bmpTip_tap = function (e) {
            if (this.tipObj["type"] == 3) {
                GameApp.Manager.viewManager.gameMainUI.mainUI.disZC(this.tipObj, { head_img: this.tipObj["head_img"] });
            }
            e.stopPropagation();
        };
        p.btnTip_tap = function (e) {
            //            if(!Tools.getInstance().isIphone()) {
            if (this.tipObj && this.tipObj["group_openid"] != GameApp.Manager.dataManager.group_openid) {
                system.GroupJoin.join(this.tipObj["group_openid"]);
            }
            //            }
        };
        p.viweport_touch_begin = function () {
            if (!this.touch) {
                console.log('viweport_touch_begin');
                this.touch = true;
                this.canUpdate = false;
                egret.Tween.removeTweens(this.scroll1.viewport);
                egret.Tween.removeTweens(this);
            }
        };
        //        private viweport_touch_move():void{
        //            console.log('viweport_touch_move');
        //            if(!this.touch){
        //                this.touch = true;
        //                this.canUpdate = false;
        //                egret.Tween.removeTweens(this.scroll1.viewport);
        //                egret.Tween.removeTweens(this);
        //            }
        //        }
        p.viweport_touch_end = function () {
            if (this.touch) {
                this.touch = false;
                console.log('viweport_touch_end');
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).wait(2000).call(function () {
                    this.touchend();
                }, this);
            }
        };
        p.viweport_release_outside = function () {
            if (this.touch) {
                this.touch = false;
                console.log('viweport_release_outside');
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).wait(2000).call(function () {
                    this.touchend();
                }, this);
            }
        };
        p.touchend = function () {
            //                this.canUpdate=true;
            if (this.arrObj.length > this.maxlength) {
                for (var i in this.arr) {
                    var del = this.arr[i];
                    mbarrage.MBarrageItem.reclaim(del);
                    if (del.parent) {
                        del.parent.removeChild(del);
                    }
                }
                this.arr = [];
                for (var j = this.arrObj.length - this.maxlength; j < this.arrObj.length; j++) {
                    var item = mbarrage.MBarrageItem.produce();
                    this.groupData.addChild(item);
                    item.validateNow();
                    item.setData(this.arrObj[j]);
                    item.y = this.arr.length * this.jiange;
                    this.arr.push(item);
                }
                this.arrObj = [];
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange }, 300).call(function () { this.canUpdate = true; }, this);
            }
            else if (this.arrObj.length > 0) {
                while (this.arrObj.length > 0) {
                    this.addItem(this.arrObj.shift(), false);
                }
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange }, 300).call(function () { this.canUpdate = true; }, this);
            }
            else {
                this.canUpdate = true;
            }
        };
        p.update = function (ct) {
            //    		console.log("updata----")
            if (this.canUpdate && !this.isleave) {
                if (this.arrObj.length > 0) {
                    this.canUpdate = false;
                    this.addItem(this.arrObj.shift());
                }
                this.addTip();
            }
        };
        p.leave = function () {
            this.isleave = true;
        };
        p.come = function () {
            if (this.isleave) {
                this.isleave = false;
                if (this.arrObj.length > 0) {
                    if (this.arrObj.length > this.maxlength) {
                        this.arrObj = this.arrObj.slice(this.arrObj.length - this.maxlength, this.arrObj.length - 1);
                    }
                    while (this.arrObj.length > 0) {
                        this.addItem(this.arrObj.shift(), false);
                    }
                    //egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 5) * this.jiange },300).call(function() { this.canUpdate = true; },this);
                    this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
                    this.canUpdate = true;
                }
                this.addTip();
            }
        };
        p.addItem = function (obj, tween) {
            if (tween === void 0) { tween = true; }
            if (this.arr.length == this.maxlength) {
                var del = this.arr.shift();
                mbarrage.MBarrageItem.reclaim(del);
                if (del.parent) {
                    del.parent.removeChild(del);
                }
                for (var i = 0; i < this.arr.length; i++) {
                    var up = this.arr[i];
                    up.y = i * this.jiange;
                }
                if (tween) {
                    this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
                }
            }
            var item = mbarrage.MBarrageItem.produce();
            this.groupData.addChild(item);
            item.setData(obj);
            //            console.log("addItem:" + obj["name"]);
            item.y = this.arr.length * this.jiange;
            this.arr.push(item);
            if (tween) {
                if (this.arr.length >= 4) {
                    egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange }, 100).call(function () { this.canUpdate = true; }, this);
                }
                else {
                    this.scroll1.viewport.scrollV = 0;
                    this.canUpdate = true;
                }
            }
        };
        p.addTip = function () {
            if (this.canTip) {
                console.log("addTip:", this.tipObj);
                var newName = window["hexToDec"](this.tipObj["group_name"]);
                var addlen = window["Emoji"]["emojiLength"](newName) * 23;
                switch (this.tipObj["type"]) {
                    case 3:
                        this.lblTip_1.textFlow = (new egret.HtmlTextParser).parser("<font color=#ffffff>众筹成功</font>");
                        this.lblTip1_1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>众筹成功</font>");
                        if (Tools.getInstance().isIphone()) {
                            this.lblTip.text = newName;
                            this.lblTip1.text = newName;
                            this.validateNow();
                            addlen = window["Emoji"]["emojiLength"](newName) * 23;
                            this.lblTip_1.x = this.lblTip.x + this.lblTip.textWidth + addlen + 5;
                            this.lblTip1_1.x = this.lblTip_1.x + 1;
                            this.groupTip.x = this.lblTip_1.x + this.lblTip_1.textWidth + 10;
                        }
                        else {
                            this.lblTip.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                            this.lblTip1.text = this.lblTip.text;
                            this.validateNow();
                            this.lblTip_1.x = this.lblTip.x + this.lblTip.textWidth + addlen + 5;
                            this.lblTip1_1.x = this.lblTip_1.x + 1;
                            this.groupTip.x = this.lblTip_1.x + this.lblTip_1.textWidth + 10;
                        }
                        this.bmpTip.source = "zfdy_font" + this.tipObj["crowdfunding_id"];
                        this.bmpTip.touchEnabled = true;
                        break;
                    case 4:
                        if (Tools.getInstance().isIphone()) {
                            this.lblTip.text = newName;
                            this.lblTip1.text = newName;
                            this.validateNow();
                            addlen = window["Emoji"]["emojiLength"](newName) * 23;
                            this.groupTip.x = this.lblTip.x + this.lblTip.textWidth + addlen + 10;
                        }
                        else {
                            this.lblTip.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                            this.lblTip1.text = this.lblTip.text;
                            this.validateNow();
                            this.groupTip.x = this.lblTip.x + this.lblTip.textWidth + 10;
                            this.lblTip1.x = this.lblTip.x + 1;
                        }
                        this.bmpTip.source = "p1_jjok";
                        this.bmpTip.touchEnabled = false;
                        break;
                }
                this.canTip = false;
            }
        };
        p.add = function (obj) {
            console.log("addMBarrge:", obj);
            switch (obj["type"]) {
                case 3:
                case 4:
                    this.tipObj = obj;
                    this.canTip = true;
                    break;
                default:
                    this.arrObj.push(obj);
                    break;
            }
        };
        p.adds = function (arr) {
            while (arr.length > 0) {
                var obj = arr.shift();
                switch (obj["type"]) {
                    case 3:
                    case 4:
                        this.tipObj = obj;
                        this.canTip = true;
                        break;
                    default:
                        this.addItem(obj, false);
                        break;
                }
            }
            if (this.arr.length >= 4) {
                this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
            }
            this.addTip();
        };
        p.setPoint = function () {
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
            }
        };
        p.clear = function () {
            this.lblTip.text = "";
            this.lblTip1.text = "";
            this.bmpTip.source = null;
            this.lblTip_1.text = "";
            this.lblTip1_1.text = "";
            this.tipObj = null;
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
                if (item.parent) {
                    item.parent.removeChild(this);
                }
                mbarrage.MBarrageItem.reclaim(item);
            }
            this.groupData.removeChildren();
            this.arrObj = [];
            this.arr = [];
            this.touch = false;
            this.canUpdate = true;
        };
        return MBarrageUI;
    }(eui.Component));
    mbarrage.MBarrageUI = MBarrageUI;
    egret.registerClass(MBarrageUI,'mbarrage.MBarrageUI');
})(mbarrage || (mbarrage = {}));
