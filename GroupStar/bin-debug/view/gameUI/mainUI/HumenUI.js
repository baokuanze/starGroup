var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var HumenUI = (function (_super) {
        __extends(HumenUI, _super);
        function HumenUI() {
            _super.call(this);
            this.star_level = 0;
            this.star_index = 0;
            this.bodyArr = [];
            this.bodytx = false;
            this.state = 0; //0:大屏页面三人 1:大屏页面1人 2:半屏页面
            this.bleft = 150;
            this.bcenter = 750 / 2;
            this.bright = 600;
            this.tx = 0;
            this.tt = 0;
            this.tb = true;
            this.humenDH = false;
            //            HumenBarrage.getInstance().setData(this);
            //            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE,this.init,this);
            this.init();
            //            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
        }
        var d = __define,c=HumenUI,p=c.prototype;
        //		private tap():void{
        //    		console.log('hearo click'+this.state);
        //		    if(this.state==2){
        //    		    GameApp.Manager.controllerManager.gameMainController.hide();
        //		        GameApp.Manager.controllerManager.figureController.show();
        //		    }
        //		}
        p.init = function () {
            this.groupBody = new eui.Group();
            this.groupBody.width = 750;
            this.anchorOffsetX = 750 / 2;
            this.x = 750 / 2;
            //            this.groupBody.height = this.bmpWutai.y + 200;
            this.addChild(this.groupBody);
            this.bmpTouch = new eui.Rect();
            this.bmpTouch.width = this.groupBody.width;
            this.bmpTouch.height = this.groupBody.height;
            this.bmpTouch.graphics.beginFill(0xff0000);
            this.bmpTouch.graphics.drawRect(0, 0, this.groupBody.width, this.groupBody.height);
            this.groupBody.addChild(this.bmpTouch);
            this.bmpTouch.alpha = 0;
            this.groupBody.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.bmptouch_begin, this);
        };
        p.setAny = function (anY) {
            this.anchorOffsetY = anY;
        };
        p.bmptouch_begin = function (e) {
            if (this.state == 0) {
                this.tb = true;
                this.tt = egret.getTimer();
                this.tx = e.stageX;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.tend, this);
            }
        };
        p.tend = function (e) {
            if (egret.getTimer() - this.tt < 300) {
                if (this.tx - e.stageX > 50) {
                    this.lastClick();
                }
                else if (e.stageX - this.tx > 50) {
                    this.nextClick();
                }
            }
            this.tb = false;
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.tend, this);
        };
        p.body_tap = function (e) {
            if (this.state != 2) {
                var hu = e.currentTarget;
                if (this.star_index == hu.star_index) {
                }
                else if (hu.star_index < this.star_index) {
                    this.lastbody_tap();
                }
                else {
                    this.nextbody_tap();
                }
            }
        };
        p.lastbody_tap = function () {
            this.nextClick();
        };
        p.nextbody_tap = function () {
            this.lastClick();
        };
        p.centerClick = function () {
            if (this.state == 0) {
                this.state = 1;
                this.setBody();
            }
            else {
                this.state = 0;
                this.setBody();
            }
        };
        p.lastClick = function () {
            if (this.star_index < this.star_level - 1 && this.state == 0 && !this.humenDH) {
                var prev, now, next, last;
                if (this.star_index + 2 < this.bodyArr.length) {
                    prev = this.bodyArr[this.star_index + 2];
                    this.groupBody.addChild(prev);
                    this.setNext(prev);
                    prev.x = 750;
                    egret.Tween.get(prev).to({ x: this.bright }, 300);
                }
                else if (this.star_index + 2 == this.bodyArr.length) {
                    prev = this.shadowBody;
                    this.groupBody.addChild(prev);
                    this.setNext(prev);
                    prev.x = 750;
                    egret.Tween.get(prev).to({ x: this.bright }, 300);
                }
                now = this.bodyArr[this.star_index + 1];
                next = this.bodyArr[this.star_index];
                this.humenDH = true;
                egret.Tween.get(now).to({ x: this.bcenter, sc: next.sc, y: next.y }, 300).call(function () {
                    this.humenDH = false;
                    this.setBody();
                }, this);
                egret.Tween.get(next).to({ x: this.bleft, sc: now.sc, y: now.y }, 300);
                if (this.star_index > 0) {
                    last = this.bodyArr[this.star_index - 1];
                    egret.Tween.get(last).to({ x: 0 }, 300);
                }
                this.star_index++;
            }
        };
        p.nextClick = function () {
            if (this.star_index > 0 && this.state == 0 && !this.humenDH) {
                var prev, now, next, last;
                if (this.star_index > 1) {
                    prev = this.bodyArr[this.star_index - 2];
                    this.groupBody.addChild(prev);
                    this.setLast(prev);
                    prev.x = 0;
                    egret.Tween.get(prev).to({ x: this.bleft }, 300);
                }
                now = this.bodyArr[this.star_index - 1];
                next = this.bodyArr[this.star_index];
                last = this.getNext();
                if (!last)
                    last = this.shadowBody;
                this.star_index--;
                this.humenDH = true;
                egret.Tween.get(now).to({ x: this.bcenter, sc: next.sc, y: next.y }, 300);
                egret.Tween.get(next).to({ x: this.bright, sc: now.sc, y: now.y }, 300);
                egret.Tween.get(last).to({ x: 750 }, 300).call(function () {
                    this.humenDH = false;
                    this.setBody();
                }, this);
            }
        };
        //        private copybody(copy:egret.gui.UIAsset,source:egret.gui.UIAsset):void{
        //            copy.source = source.source;
        //            copy.y = source.y;
        //            copy.scaleX = source.scaleX;
        //            copy.scaleY = source.scaleY;
        //        }
        p.getBodyById = function (id) {
            var ret;
            if (this.bodyArr.length > 0) {
                for (var i in this.bodyArr) {
                    var body = this.bodyArr[i];
                    if (body.uid == id) {
                        ret = body;
                        break;
                    }
                }
            }
            return ret;
        };
        p.clearBodys = function () {
            var i = 0;
            for (i = this.bodyArr.length - 1; i >= 0; i--) {
                var u = this.bodyArr[i];
                u.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.body_tap, this);
                mainUI.HumenBody.reclaim(u);
                if (u.parent) {
                    this.groupBody.removeChild(u);
                }
            }
            this.bodyArr = [];
        };
        p.setBodyArr = function () {
            var i = 0;
            var ui;
            for (i = 0; i < this.star_level; i++) {
                ui = new mainUI.HumenBody();
                this.bodyArr.push(ui);
                ui.star_index = i;
                if (i == this.star_level - 1) {
                    ui.setData(this.bodySrc, i + 1);
                    ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.body_tap, this);
                }
            }
        };
        p.setData = function () {
            this.star_level = GameApp.Manager.dataManager.level; //明星等级
            this.star_index = this.star_level - 1; //明星显示图片
            this.bodySrc = GameApp.Manager.dataManager.nowImg; //明星图片路径
            //            this.shadow_img = GameApp.Manager.dataManager.shadow_img;
            this.clearBodys();
            this.setBodyArr();
            this.setBody();
        };
        p.setDatas = function (img_arr, shadow_img) {
            this.star_level = img_arr.length; //明星等级
            this.star_index = this.star_level - 1; //明星显示图片
            var ui;
            for (var i = 0; i < img_arr.length; i++) {
                if (i < this.bodyArr.length) {
                    ui = this.bodyArr[i];
                    if (ui.url != img_arr[i]) {
                        ui.setData(img_arr[i], i + 1);
                        ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.body_tap, this);
                    }
                }
                else {
                    ui = new mainUI.HumenBody();
                    this.bodyArr.push(ui);
                    ui.star_index = i;
                    ui.setData(img_arr[i], i + 1);
                    ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.body_tap, this);
                }
            }
            if (!this.shadowBody) {
                this.shadowBody = new mainUI.HumenBody();
                this.shadowBody.setData(shadow_img, 1);
            }
            this.state = 0;
            this.setBody();
        };
        p.setLast = function (u) {
            u.x = this.bleft;
            u.load();
            u.sc = .8;
        };
        p.setNow = function (u) {
            u.x = this.bcenter;
            u.load();
            u.sc = 1;
        };
        p.setNext = function (u) {
            u.x = this.bright;
            u.load();
            u.sc = .8;
        };
        p.getNext = function () {
            if (this.star_index + 1 < this.bodyArr.length) {
                return this.bodyArr[this.star_index + 1];
            }
            else {
                return this.shadowBody;
            }
        };
        p.getLast = function () {
            if (this.star_index > 0) {
                return this.bodyArr[this.star_index - 1];
            }
            else {
                return null;
            }
        };
        p.setBody = function () {
            if (this.star_level > 0) {
                var i = 0;
                for (i = this.bodyArr.length - 1; i >= 0; i--) {
                    var u = this.bodyArr[i];
                    if (u.parent) {
                        this.groupBody.removeChild(u);
                    }
                }
                if (this.shadowBody && this.shadowBody.parent) {
                    this.groupBody.removeChild(this.shadowBody);
                }
                var last, now, next;
                switch (this.state) {
                    case 0:
                        next = this.getNext();
                        if (next) {
                            this.setNext(next);
                            this.groupBody.addChild(next);
                        }
                        last = this.getLast();
                        if (last) {
                            this.setLast(last);
                            this.groupBody.addChild(last);
                        }
                        now = this.bodyArr[this.star_index];
                        this.setNow(now);
                        this.groupBody.addChild(now);
                        break;
                    case 1:
                        now = this.bodyArr[this.star_index];
                        this.setNow(now);
                        now.sc = 1; //sc;
                        this.groupBody.addChild(now);
                        next = this.bodyArr[this.star_index + 1];
                        break;
                    case 2:
                        now = this.bodyArr[this.star_index];
                        now.x = 750 / 2;
                        now.load();
                        //                        now.y = 805;
                        now.sc = 1;
                        this.groupBody.addChild(now);
                        break;
                }
            }
        };
        p.mainUIInit = function () {
            this.state = 2;
            this.star_index = this.star_level - 1;
            this.setBody();
        };
        p.otherInit = function () {
            this.state = 2;
            this.star_index = this.star_level - 1;
            this.setBody();
        };
        p.resize = function () {
        };
        return HumenUI;
    }(eui.Group));
    mainUI.HumenUI = HumenUI;
    egret.registerClass(HumenUI,'mainUI.HumenUI');
})(mainUI || (mainUI = {}));
