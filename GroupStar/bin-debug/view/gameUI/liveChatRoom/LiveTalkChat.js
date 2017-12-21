var live;
(function (live) {
    /**
     *
     * @author
     *
     */
    var LiveTalkChat = (function (_super) {
        __extends(LiveTalkChat, _super);
        function LiveTalkChat() {
            _super.call(this);
            this.arrObj = [];
            this.arr = [];
            this.canUpdate = true;
            this.touch = false;
            this.maxlength = 50;
            this.isleave = false;
            this.skinName = "src/view/gameUI/liveChatRoom/LiveTalkChatSkin.exml";
        }
        var d = __define,c=LiveTalkChat,p=c.prototype;
        LiveTalkChat.getInstance = function () {
            if (!this._instance) {
                this._instance = new LiveTalkChat();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            this.y = egret.MainContext.instance.stage.stageHeight - 420;
            this.scroll1.addEventListener(eui.UIEvent.CHANGE_END, this.viweport_touch_end, this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE, this.viweport_touch_begin, this);
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
        p.touchend = function () {
            //                this.canUpdate=true;
            if (this.arrObj.length > this.maxlength) {
                for (var i in this.arr) {
                    var del = this.arr[i];
                    live.LiveTalkChatItem.reclaim(del);
                    if (del.parent) {
                        del.parent.removeChild(del);
                    }
                }
                this.arr = [];
                for (var j = this.arrObj.length - this.maxlength; j < this.arrObj.length; j++) {
                    var item = live.LiveTalkChatItem.produce();
                    this.groupData.addChild(item);
                    item.validateNow();
                    item.setData(this.arrObj[j]);
                    //                    item.y = this.arr.length * this.jiange;
                    if (this.arr.length > 0) {
                        item.y = this.arr[this.arr.length - 1].y + this.arr[this.arr.length - 1].getHeight() + 20; //this.arr.length * this.jiange;
                    }
                    else {
                        item.y = 0;
                    }
                    this.arr.push(item);
                }
                this.arrObj = [];
                var sv = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: sv }, 300).call(function () { this.canUpdate = true; }, this);
            }
            else if (this.arrObj.length > 0) {
                while (this.arrObj.length > 0) {
                    this.addItem(this.arrObj.shift(), false);
                }
                this.validateNow();
                var sv = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: sv }, 300).call(function () { this.canUpdate = true; }, this);
            }
            else {
                this.canUpdate = true;
            }
        };
        p.update = function (ct) {
            if (this.canUpdate && !this.isleave) {
                if (this.arrObj.length > 0) {
                    console.log('additem');
                    this.canUpdate = false;
                    this.addItem(this.arrObj.shift());
                }
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
                    this.validateNow();
                    //egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 5) * this.jiange },300).call(function() { this.canUpdate = true; },this);
                    var sv = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                    this.scroll1.viewport.scrollV = sv >= 0 ? sv : 0; //(this.arr.length - 4) * this.jiange;
                    this.canUpdate = true;
                }
            }
        };
        p.addItem = function (obj, tween) {
            if (tween === void 0) { tween = true; }
            if (this.arr.length == this.maxlength) {
                var del = this.arr.shift();
                live.LiveTalkChatItem.reclaim(del);
                if (del.parent) {
                    del.parent.removeChild(del);
                }
                for (var i = 0; i < this.arr.length; i++) {
                    var up = this.arr[i];
                    //                    up.y = i * this.jiange;
                    if (i == 0) {
                        up.y = 0;
                    }
                    else {
                        up.y = this.arr[i - 1].y + this.arr[i - 1].getHeight() + 20;
                    }
                    console.log('大于10的y:' + i + " " + up.y);
                }
                if (tween) {
                    //                    this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
                    this.setSv();
                }
            }
            var item = live.LiveTalkChatItem.produce();
            this.groupData.addChild(item);
            item.setData(obj);
            //            console.log("addItem:" + obj["name"]);
            this.setY(item);
            this.arr.push(item);
            if (tween) {
                this.validateNow();
                var sv = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                if (sv >= 0) {
                    egret.Tween.get(this.scroll1.viewport).to({ scrollV: sv }, 100).call(function () { this.canUpdate = true; }, this);
                }
                else {
                    this.scroll1.viewport.scrollV = 0;
                    this.canUpdate = true;
                }
            }
        };
        p.setY = function (item) {
            if (this.arr.length > 0) {
                item.y = this.arr[this.arr.length - 1].y + this.arr[this.arr.length - 1].getHeight() + 20; //this.arr.length * this.jiange;
            }
            else {
                item.y = 0;
            }
        };
        p.setSv = function () {
            var sv = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
            this.scroll1.viewport.scrollV = sv >= 0 ? sv : 0; //(this.arr.length - 4) * this.jiange;
        };
        LiveTalkChat.receiveTalk = function (obj) {
            console.log('聊天:', obj);
            if (this._instance)
                this._instance.add(obj);
        };
        p.add = function (obj) {
            //    		console.log("addMBarrge:",obj);
            if (!this.isleave) {
                switch (obj["type"]) {
                    case 1:
                    case 19:
                        this.arrObj.push(obj);
                        break;
                }
            }
        };
        p.adds = function (arr) {
            this.clear();
            for (var i in arr) {
                this.addItem(arr[i], false);
            }
            this.validateNow();
            this.setSv();
        };
        p.setPoint = function () {
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
            }
        };
        p.clear = function () {
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
                if (item.parent) {
                    item.parent.removeChild(this);
                }
                live.LiveTalkChatItem.reclaim(item);
            }
            this.groupData.removeChildren();
            this.arrObj = [];
            this.arr = [];
            this.touch = false;
            this.canUpdate = true;
        };
        return LiveTalkChat;
    }(eui.Component));
    live.LiveTalkChat = LiveTalkChat;
    egret.registerClass(LiveTalkChat,'live.LiveTalkChat');
})(live || (live = {}));
