var live;
(function (live) {
    /**
     *
     * @author
     *
     */
    var LiveChatRoomUI = (function (_super) {
        __extends(LiveChatRoomUI, _super);
        //        private bmpBack1:eui.Image;
        //        public liveTalkChat:LiveTalkChat;
        function LiveChatRoomUI() {
            _super.call(this);
            this.src = "";
            this.skinName = "src/view/gameUI/liveChatRoom/LiveChatRoomUISkin.exml";
            //            this.liveTalkChat=new LiveTalkChat();
        }
        var d = __define,c=LiveChatRoomUI,p=c.prototype;
        LiveChatRoomUI.setData = function (obj) {
            this.obj = obj;
            if (GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI) {
                GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.setData(obj);
            }
        };
        p.childrenCreated = function () {
            var self = this;
            if (Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.txtInput.fontFamily = "Heiti SC";
            }
            else {
            }
            this.lbl1.text = GameApp.Manager.dataManager.star_name + "的直播间";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.groupBottom.y = this.stage.stageHeight - 642;
            var talkchat = live.LiveTalkChat.getInstance();
            this.groupBottom.addChild(talkchat);
            talkchat.y = 642 - 390;
            this.btnFX.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starLiveShare", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                    system.Share.share(obj, function (n) {
                        if (n == 1)
                            system.TipText.produce().open("发送成功");
                    });
                }, true, this);
            }, this);
            this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGift_tap, this);
            this.btnTalk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.talk_tap, this);
            this.txtInput.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
                if (self.timevar) {
                    clearTimeout(self.timevar);
                }
                if (self.txtInput.text == "和大家说点什么") {
                    self.txtInput.text = "";
                }
                self.btnGift.visible = false;
                self.btnTalk.visible = true;
            }, this);
            this.txtInput.addEventListener(egret.FocusEvent.FOCUS_OUT, function () {
                if (self.txtInput.text == "") {
                    self.txtInput.text = "和大家说点什么";
                    if (self.timevar) {
                        clearTimeout(self.timevar);
                    }
                    self.btnGift.visible = true;
                    self.btnTalk.visible = false;
                }
                else {
                    if (self.timevar) {
                        clearTimeout(self.timevar);
                    }
                    self.timevar = setTimeout(function () {
                        self.btnGift.visible = true;
                        self.btnTalk.visible = false;
                    }, 2000);
                }
            }, this);
        };
        p.setData = function (obj) {
            switch (obj["state"]) {
                case 0:
                    this.lbl1.text = "";
                    break;
                case 1:
                    this.src = obj["link"];
                    if (this.parent) {
                        this.groupBottom.visible = true;
                        this.group_pro.visible = false;
                        GameApp.Manager.viewManager.hideBackGroup();
                        live.LiveTalkChat.getInstance().come();
                        this.lbl1.text = window["hexToDec"](live.LiveChatRoomUI.obj["title"]);
                        var src1 = live.LiveChatRoomUI.obj["link"];
                        window["playVideo"](420 * GameApp.Manager.dataManager.sc, 90 * GameApp.Manager.dataManager.sc, src1);
                    }
                    break;
                case 2:
                    this.src = "";
                    if (this.parent) {
                        this.close();
                    }
                    break;
            }
        };
        p.btnGift_tap = function (e) {
            flower.FlowerUI.getInstance().open(this.groupBottom);
            flower.FlowerUI.getInstance().y = 642 - 310;
            e.stopPropagation();
        };
        p.talk_tap = function () {
            console.log('发送:' + this.txtInput.text);
            if (this.txtInput.text != "" && this.txtInput.text != "和大家说点什么") {
                var txt = this.txtInput.text;
                socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendTalk, { message: txt }, function (data) { }, this);
            }
            this.txtInput.text = '';
            if (this.timevar) {
                clearTimeout(this.timevar);
            }
            this.btnGift.visible = true;
            this.btnTalk.visible = false;
        };
        p.talk = function (obj) {
        };
        p.open = function (state) {
            if (GameApp.Manager.dataManager.visitor > 0) {
                this.btnFX.visible = false;
            }
            else {
                this.btnFX.visible = true;
            }
            if (state == 0) {
                this.group_pro.visible = true;
                //海报图片
                RES.getResByUrl(LiveChatRoomUI.obj["poster"], this.load_end0, this, RES.ResourceItem.TYPE_IMAGE);
                this.groupBottom.visible = false;
                this.lbl1.text = "";
            }
            else {
                this.group_pro.visible = false;
                GameApp.Manager.viewManager.hideBackGroup();
                live.LiveTalkChat.getInstance().come();
                this.lbl1.text = window["hexToDec"](live.LiveChatRoomUI.obj["title"]);
                var src1 = live.LiveChatRoomUI.obj["link"];
                window["playVideo"](420 * GameApp.Manager.dataManager.sc, 90 * GameApp.Manager.dataManager.sc, src1);
                this.groupBottom.visible = true;
            }
        };
        p.load_end0 = function (source) {
            this.img_bgImg.texture = source;
        };
        p.clear = function () {
            window["endVideo"]();
            live.LiveTalkChat.getInstance().leave();
            GameApp.Manager.viewManager.showBackGroup();
        };
        p.close = function () {
            GameApp.Manager.viewManager.liveChatRoomManager.hide();
            GameApp.Manager.controllerManager.gameMainController.show();
        };
        return LiveChatRoomUI;
    }(eui.Component));
    live.LiveChatRoomUI = LiveChatRoomUI;
    egret.registerClass(LiveChatRoomUI,'live.LiveChatRoomUI');
})(live || (live = {}));
