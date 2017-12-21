var flower;
(function (flower) {
    /**
     *
     * @author
     *
     */
    var FlowerUI = (function (_super) {
        __extends(FlowerUI, _super);
        function FlowerUI() {
            _super.call(this);
            this.bo = false;
            this.arr = [];
            this.canSend = true;
            this.btnSend = new flower.FlowerBtnSend();
            this.skinName = "src/view/gameUI/flower/FlowerUISkin.exml";
        }
        var d = __define,c=FlowerUI,p=c.prototype;
        FlowerUI.getInstance = function () {
            if (!this._instance) {
                this._instance = new FlowerUI();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.txtCZ.fontFamily = "Heiti SC";
                this.txtStar.fontFamily = "Heiti SC";
                this.lblStar.fontFamily = "Heiti SC";
            }
            this.addChild(this.btnSend);
            this.btnSend.x = 590;
            this.btnSend.y = 310 - 85;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.send_tap, this);
            this.btnSend1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.send_tap1, this);
            this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pay_tap, this);
        };
        p.tap = function (e) {
            e.stopPropagation();
        };
        p.initData = function (obj) {
            this.obj = obj;
            if (obj) {
                var o = obj["1"];
                GameApp.Manager.dataManager.gift_cd = o["cd"];
                GameApp.Manager.dataManager.gift_time = new Date().getTime();
            }
        };
        p.setLucky = function () {
            this.lblStar.text = "" + GameApp.Manager.dataManager.lucystar + "";
            GameApp.Manager.viewManager.payManager.setLucky();
        };
        p.setLianji = function (n) {
            this.btnSend1.label = n + "";
            if (this.selectItem)
                this.selectItem.setLight();
        };
        p.setLastCount = function (giftid, lastcount, gift_cd) {
            if (this.zhItem.fid == giftid) {
                this.zhItem.lastcount = lastcount;
                if (this.zhItem.lastcount != 0) {
                    GameApp.Manager.dataManager.gift_cd = gift_cd;
                    GameApp.Manager.dataManager.gift_time = new Date().getTime();
                    var ct = GameApp.Manager.dataManager.gift_time - new Date().getTime() + GameApp.Manager.dataManager.gift_cd;
                    this.zhItem.setDJS(ct);
                }
                else {
                    this.zhItem.djsEnd();
                }
            }
        };
        p.setData = function () {
            if (!this.bo) {
                this.bo = true;
                for (var i in this.obj) {
                    var obj = this.obj[i];
                    switch (obj["id"]) {
                        case 2:
                        case 3:
                        case 4:
                            var item = new flower.FlowerItem();
                            this.groupData.addChild(item);
                            item.setData(obj);
                            this.arr.push(item);
                            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.item_tap, this);
                            //                            if(item.fid == 1) {
                            //                                this.zhItem = item;
                            //                            }
                            break;
                    }
                }
            }
            this.lblStar.text = "" + GameApp.Manager.dataManager.lucystar + "";
        };
        p.item_tap = function (e) {
            var item = e.currentTarget;
            if (item != this.selectItem) {
                if (this.selectItem) {
                    this.selectItem.off();
                }
                this.selectItem = item;
                this.selectItem.on();
                this.btnSend.visible = true;
                if (this.selectItem.fid == 1) {
                    if (this.selectItem.lastcount == 0 || this.selectItem.cd > 0) {
                        this.btnSend.setState(0);
                    }
                    else {
                        this.btnSend.setState(1);
                    }
                }
                else {
                    this.btnSend.setState(1);
                }
                this.btnSend1.label = "";
                this.btnSend1.visible = false;
            }
        };
        p.send_tap = function () {
            if (this.selectItem && this.selectItem.canSend && this.canSend) {
                console.log(GameApp.Manager.dataManager.lucystar + " " + this.selectItem.price);
                if (GameApp.Manager.dataManager.lucystar >= this.selectItem.price) {
                    var fid = this.selectItem.fid;
                    this.canSend = false;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendFlower, { id: fid }, function (data) { FlowerUI.listerFlower(data); }, this);
                    if (this.selectItem.click > 0) {
                        this.btnSend.visible = false;
                        this.btnSend1.visible = true;
                        this.btnSendTween();
                    }
                    else if (this.selectItem.fid == 1) {
                        this.btnSend.setState(0);
                    }
                    else if (this.selectItem.fid == 6) {
                        this.close();
                    }
                }
                else {
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide, 1);
                        }
                    }, this);
                }
            }
        };
        p.send_tap1 = function () {
            if (this.selectItem.canSend && this.canSend) {
                if (GameApp.Manager.dataManager.lucystar >= this.selectItem.price) {
                    var fid = this.selectItem.fid;
                    this.canSend = false;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendFlower, { id: fid }, function (data) { FlowerUI.listerFlower(data); }, this);
                    this.btnSendTween();
                }
                else {
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide, 1);
                        }
                    }, this);
                }
            }
        };
        p.pay_tap = function () {
            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.viewManager.liveChatRoomManager.hide, 1);
        };
        p.btnSendTween = function () {
            egret.Tween.removeTweens(this.btnSend1);
            egret.Tween.get(this.btnSend1).wait(2000).call(function () {
                this.btnSend.visible = true;
                this.btnSend1.visible = false;
                if (this.selectItem)
                    this.selectItem.setloW();
            }, this);
        };
        p.open = function (pat) {
            //            GameApp.Manager.viewManager.maskStage(.4);
            pat.addChild(this);
            this.x = 0; //this.y = egret.MainContext.instance.stage.stageHeight - 570;
            this.setData();
            if (this.selectItem) {
                this.selectItem.off();
                this.selectItem = null;
            }
            this.btnSend.visible = true;
            this.btnSend.setState(0);
            this.btnSend1.visible = false;
            GameApp.Manager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, flower.FlowerUI.getInstance().close, flower.FlowerUI.getInstance());
        };
        p.getMainUIIndex = function () {
            return this.parent ? this.parent.getChildIndex(this) : GameApp.Manager.viewManager.gameMainUI.mainUI.numChildren;
        };
        p.close = function () {
            if (this.parent) {
                GameApp.Manager.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, flower.FlowerUI.getInstance().close, flower.FlowerUI.getInstance());
                this.btnSend.visible = true;
                this.btnSend1.visible = false;
                if (this.selectItem) {
                    this.selectItem.off();
                }
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
        };
        FlowerUI.listerFlower = function (data) {
            FlowerUI.getInstance().canSend = true;
            if (data) {
                console.log("送花自己监听:", data);
                switch (data["st"]) {
                    case 1:
                        GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                        FlowerUI.getInstance().setLucky();
                        //                        FlowerUI.getInstance().setLastCount(data["id"],data["gift_last"],data["gift_cd"]);
                        switch (data["id"] + "") {
                            case "1":
                                GameApp.Manager.dataManager.gift_cd = 10 * 60 * 1000;
                                GameApp.Manager.dataManager.gift_time = new Date().getTime();
                                break;
                            case "2":
                                break;
                            case "3":
                                break;
                            case "4":
                                break;
                            case "6":
                                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                                Util.sendJson1(GameApp.Manager.dataManager.IP + "/redPacketPush", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                                    system.Share.share(obj, function (n) {
                                        //                                            if(n == 1)
                                        //                                                system.TipText.produce().open("发送成功");
                                    });
                                }, true, this);
                                break;
                        }
                        break;
                    case -1:
                        break;
                    case -2: break;
                    case -3:
                        aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                            if (data == "ok") {
                                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide, -1);
                            }
                        }, this);
                        break;
                }
            }
        };
        return FlowerUI;
    }(eui.Component));
    flower.FlowerUI = FlowerUI;
    egret.registerClass(FlowerUI,'flower.FlowerUI');
})(flower || (flower = {}));
