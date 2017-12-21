var userPanel;
(function (userPanel) {
    /**
     *
     * @author
     *
     */
    var UserPanel = (function (_super) {
        __extends(UserPanel, _super);
        function UserPanel() {
            _super.call(this);
            this.uid = 0;
            /*
             * 作品掉落
             */
            this.colorArr = [0X565865, 0Xa37565, 0X87c49b, 0X199be6, 0Xf58ebd, 0Xf76864, 0Xf5b316];
            this.col = 0; //多少行
            this.itemArr = [];
            this.disSure = 0; //用来区别确认;
            this.medal2State = 0;
            this.proCredit = 0; //当前的积分；
            this.skinName = "src/view/gameUI/userPanel/UserPanelSkin.exml";
            this.bmpIcon = new module.BaseCircleImage();
            this.userPaise = new userPanel.UserPaise();
        }
        var d = __define,c=UserPanel,p=c.prototype;
        UserPanel.getInstance = function () {
            if (!this._instance) {
                this._instance = new UserPanel();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblPay.fontFamily = "Heiti SC";
                this.lblGroupName.fontFamily = "Heiti SC";
                this.lblHonghua.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lblstar.fontFamily = "Heiti SC";
                this.lblTip.fontFamily = "Heiti SC";
                this.lable_noWorks.fontFamily = "Heiti SC";
                //勋章
                this.lable_sign.fontFamily = "Heiti SC";
                this.lable_discount.fontFamily = "Heiti SC";
                this.lable_wealfe.fontFamily = "Heiti SC";
                this.lable_myDian.fontFamily = "Heiti SC";
                this.lable_Alreadylit.fontFamily = "Heiti SC";
                this.lable_day.fontFamily = "Heiti SC";
                this.lable_shouhu.fontFamily = "Heiti SC";
                this.lable_zhuwei.fontFamily = "Heiti SC";
                this.lable_fuli.fontFamily = "Heiti SC";
                this.lable_3day.fontFamily = "Heiti SC";
                this.lable_9day.fontFamily = "Heiti SC";
                this.lable_3yuan.fontFamily = "Heiti SC";
                this.lable_9yuan.fontFamily = "Heiti SC";
                this.lable_medal2Light.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl0.fontFamily = "Heiti SC";
                this.lable_medal2Day.fontFamily = "Heiti SC";
                this.lable_medal3Wealf.fontFamily = "Heiti SC";
                this.lable_medal3ZhuWei.fontFamily = "Heiti SC";
                this.lable_medal3shouHu.fontFamily = "Heiti SC";
                this.lable_medal3myLight.fontFamily = "Heiti SC";
                this.lable_getIntegral.fontFamily = "Heiti SC";
                this.lable_groupShare.fontFamily = "Heiti SC";
                this.lable_needOnerLight.fontFamily = "Heiti SC";
                this.lable_callOner.fontFamily = "Heiti SC";
            }
            this.lbl2.text = "与" + GameApp.Manager.dataManager.star_name + "亲密度";
            this.groupPaise.addChild(this.userPaise);
            this.bmpIcon.x = 35;
            this.bmpIcon.y = 40;
            this.bmpTipBack = Tools.getInstance().getShape(null, 350, 125, 0, 0, 20, 20, -1, 0x000000);
            this.bmpTipBack.alpha = .65;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeItem, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopPropagation();
            }, this);
            this.groupTip1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                location.href = "http://buluo.qq.com/p/barindex.html?bid=312564";
            }, this);
            this.groupStar.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.close();
                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0);
            }, this);
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.groupopenid != GameApp.Manager.dataManager.group_openid) {
                    system.GroupJoin.join(this.groupopenid);
                }
            }, this);
            this.group_goToMore.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                var self = this;
                GameApp.Manager.controllerManager.gabageController.show(self.uid, self.bid, 1);
                e.stopPropagation();
            }, this);
            var self = this;
            this.group_m1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.type = 1;
                this.group_medal1.visible = true;
                var sign1 = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + 1 + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGuardInfo", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, guard_id: 1, sign: sign1 }, function (obj) {
                    if (obj["st"] == 1) {
                        if (obj["data"]["can_buy"]) {
                            self.group_medul1Light.visible = true;
                            self.lable_day.visible = true;
                            self.lable_Alreadylit.visible = false;
                        }
                        else {
                            self.group_medul1Light.visible = false;
                            if (self.uid != GameApp.Manager.dataManager.uid) {
                                self.lable_day.visible = false;
                                self.lable_Alreadylit.visible = false;
                            }
                            else {
                                self.lable_Alreadylit.visible = true;
                                if (obj["data"]["surplus_day"]) {
                                    self.lable_day.visible = true;
                                    self.lable_day.text = "剩余" + obj["data"]["surplus_day"] + "天";
                                }
                            }
                        }
                    }
                }, true, this);
            }, this);
            this.group_m2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.type = 2;
                this.group_medal2.visible = true;
                var sign1 = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + 2 + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGuardInfo", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, guard_id: 2, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign1 }, function (obj) {
                    if (obj["st"] == 1) {
                        if (obj["data"]["can_buy"]) {
                            self.group_medul2Light.visible = true;
                            self.lable_medal2Light.visible = false; //已点亮；
                            self.lable_medal2Day.visible = false; //还剩多少天；  
                        }
                        else {
                            self.group_medul2Light.visible = false;
                            if (self.uid != GameApp.Manager.dataManager.uid) {
                                self.lable_medal2Day.visible = false;
                                self.lable_medal2Light.visible = false;
                            }
                            else {
                                self.lable_medal2Light.visible = true;
                                if (obj["data"]["surplus_day"]) {
                                    self.lable_medal2Day.visible = true;
                                    self.lable_medal2Day.text = "剩余" + obj["data"]["surplus_day"] + "天";
                                }
                            }
                        }
                    }
                }, true, this);
            }, this);
            this.group_m3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.type = 3;
                this.group_medal3.visible = true;
                var sign1 = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + 4 + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGuardInfo", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, guard_id: 4, sign: sign1 }, function (obj) {
                    if (obj["st"] == 1) {
                        if (obj["data"]["can_buy"]) {
                            if (GameApp.Manager.dataManager.is_owner) {
                                self.proCredit = obj["data"]["credits"];
                                self.group_isOner.visible = true;
                                self.lable_getIntegral.text = "3000本群积分或活动获得,当前积分" + obj["data"]["credits"];
                                self.group_isNotOner.visible = false;
                            }
                            else {
                                self.group_isOner.visible = false;
                                self.group_isNotOner.visible = true;
                            }
                        }
                        else {
                            if (GameApp.Manager.dataManager.is_owner && self.uid == GameApp.Manager.dataManager.uid) {
                                self.rect_medl3myLight.visible = false;
                                self.lable_medal3myLight.textColor = 0xFDFE02;
                                self.lable_medal3myLight.text = "已点亮";
                                self.lable_getIntegral.textColor = 0xffffff;
                                self.lable_getIntegral.text = "剩余" + obj["data"]["surplus_day"] + "天";
                                self.group_isOner.visible = true;
                                self.group_isNotOner.visible = false;
                            }
                            else if (!GameApp.Manager.dataManager.is_owner && self.uid == GameApp.Manager.dataManager.uid) {
                                self.lable_needOnerLight.textColor = 0xFDFE02;
                                self.lable_needOnerLight.text = "已点亮";
                                self.lable_callOner.textColor = 0xffffff;
                                self.lable_callOner.text = "剩余" + obj["data"]["surplus_day"] + "天";
                                self.group_isOner.visible = false;
                                self.group_isNotOner.visible = true;
                            }
                            else {
                                self.group_isOner.visible = false;
                                self.group_isNotOner.visible = false;
                            }
                        }
                    }
                }, true, this);
            }, this);
            this.rect_Light1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (GameApp.Manager.dataManager.lucystar >= 99) {
                    self.group_notice.visible = true;
                    self.lblTitle.text = "温馨提示";
                    self.lblDesc.text = "确认点亮信仰勋章";
                    self.lbl1.text = "取消";
                    self.lbl0.text = "点亮";
                    self.disSure = 1; //第一种确认情况
                }
                else {
                    self.group_notice.visible = true;
                    self.lblTitle.text = "温馨提示";
                    self.lblDesc.text = "钻石不足";
                    self.lbl1.text = "取消";
                    self.lbl0.text = "充值";
                    self.disSure = 11;
                }
            }, this);
            this.rect_3day.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                pay.PayUI.getInstance().isBuyModul = 2;
                pay.PayUI.getInstance().btn6_tap();
                this.medal2State = 30;
            }, this);
            this.rect_9day.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                pay.PayUI.getInstance().isBuyModul = 2;
                pay.PayUI.getInstance().btn7_tap();
                this.medal2State = 90;
            }, this);
            this.rect_medl3myLight.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (self.proCredit >= 3000) {
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.medal3, {}, function (data) {
                        if (data["st"] == -1) {
                            system.TipText.produce().open("只有群主才能买哦", 1000, 800);
                        }
                    }, this);
                }
                else {
                    system.TipText.produce().open("积分不足", 1000, 800);
                }
            }, this);
            //取消按钮
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.group_notice.visible = false;
            }, this);
            //确认按钮
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (self.disSure == 1) {
                    self.disSure = 0;
                    var sign2 = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/buyFaithGuard", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, sign: sign2 }, function (obj) {
                        if (obj["st"] && obj["st"] == 1) {
                            self.group_notice.visible = false;
                            if (self.uid == GameApp.Manager.dataManager.uid) {
                                self.img_medal1_bright.visible = true;
                                self.img_medal1_dark.visible = false;
                            }
                            self.group_medul1Light.visible = false;
                            self.lable_Alreadylit.visible = true;
                            self.lable_day.text = "剩余29天";
                            self.lblstar.text = obj["data"]["lucky_star"];
                            GameApp.Manager.dataManager.lucystar = obj["data"]["lucky_star"];
                            socketio.IoConnect.getInstance().disconnect(); //断开连接
                            socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.bid, GameApp.Manager.dataManager.uid, null, null);
                        }
                        else {
                            system.TipText.produce().open("点亮失败", 2000, 1000);
                        }
                    }, true, this);
                }
                else if (self.disSure == 11) {
                    self.close();
                    GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0, 1);
                }
            }, this);
            this.rect_join.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                system.GroupJoin.join("2970C88E2D2E0EDE54E8D57E14268B03");
            }, this);
        };
        p.changeMedal2Stage = function () {
            socketio.IoConnect.getInstance().disconnect(); //断开连接
            socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.bid, GameApp.Manager.dataManager.uid, null, null);
            if (this.medal2State == 30) {
                this.medal2State = 0;
                this.lable_medal2Day.text = "剩余29天";
            }
            else if (this.medal2State == 90) {
                this.medal2State = 0;
                this.lable_medal2Day.text = "剩余89天";
            }
            if (this.uid == GameApp.Manager.dataManager.uid) {
                this.img_medal2_bright.visible = true;
                this.img_medal2_dark.visible = false;
            }
            this.group_medul2Light.visible = false;
            this.lable_medal2Light.visible = true;
            this.lable_medal2Day.visible = true;
        };
        p.changeStage = function (obj) {
            var self = this;
            socketio.IoConnect.getInstance().disconnect(); //断开连接
            socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.bid, GameApp.Manager.dataManager.uid, null, null);
            this.img_medal3_bright.visible = true;
            this.img_medal3_dark.visible = false;
            task.TaskUI.isCanByLiBao = true; //任务界面能买
            pay.PayUI.isByGift = true; //支付界面能看到
            task.TaskUI.stars_guard_valid = true; //能能宣群
            GameApp.Manager.viewManager.taskManager.taskUI.reSetAllPos();
            if (GameApp.Manager.dataManager.is_owner && self.uid == GameApp.Manager.dataManager.uid) {
                self.rect_medl3myLight.visible = false;
                self.lable_medal3myLight.textColor = 0xFDFE02;
                self.lable_medal3myLight.text = "已点亮";
                self.lable_getIntegral.textColor = 0xffffff;
                self.lable_getIntegral.text = "剩余" + "29天";
                self.group_isOner.visible = true;
                self.group_isNotOner.visible = false;
            }
            else if (!GameApp.Manager.dataManager.is_owner && self.uid == GameApp.Manager.dataManager.uid) {
                self.lable_needOnerLight.textColor = 0xFDFE02;
                self.lable_needOnerLight.text = "已点亮";
                self.lable_callOner.textColor = 0xffffff;
                self.lable_callOner.text = "剩余" + "29天";
                self.group_isOner.visible = false;
                self.group_isNotOner.visible = true;
            }
        };
        p.closeTip = function () {
            //            this.groupTip.visible = false;
        };
        p.open = function (uid, bid, _group_openid) {
            var self = this;
            this.uid = uid;
            this.type = 0;
            this.bid = bid;
            this.groupopenid = _group_openid;
            var group_openid = _group_openid ? _group_openid : GameApp.Manager.dataManager.group_openid;
            GameApp.Manager.viewManager.maskStage(.4);
            GameApp.Manager.viewManager.TopUIStage.addChild(this);
            if (this.uid == GameApp.Manager.dataManager.uid) {
                this.groupStar.visible = true;
            }
            else {
                this.groupStar.visible = false;
            }
            this.x = (750 - 726) / 2;
            this.y = (egret.MainContext.instance.stage.stageHeight - 924) / 2;
            var sign = new md5().hex_md5(uid + bid + group_openid + "&");
            /*
             * 赞的部分
             */
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/userInfo", { user_id: uid, bid: bid, group_openid: group_openid, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    this.setData(obj);
                    self.userPaise.setData(obj, uid, bid, _group_openid);
                }
            }, true, this);
            if (uid == GameApp.Manager.dataManager.uid) {
                this.groupTip1.visible = true;
            }
            else {
                this.groupTip1.visible = false;
            }
        };
        p.setTitleUI = function (obj) {
            var txt = this.lblName.text;
            if (Tools.getInstance().isIphone()) {
                this.validateNow();
                var addlen = window["Emoji"]["emojiLength"](txt) * 23;
                //                this.lblName.x = (726 - (this.lblName.textWidth + addlen + 116)) / 2;
                this.groupLevel.x = this.lblName.x + this.lblName.textWidth + addlen + 10;
            }
            else {
                this.lblName.text = window["Emoji"]["emojiReplace"](txt);
                this.validateNow();
                //                this.lblName.x = (726 - (this.lblName.textWidth + 116)) / 2;
                this.groupLevel.x = this.lblName.x + this.lblName.textWidth + 10;
            }
        };
        p.setData = function (obj) {
            console.log("设置数据");
            if (obj["guard"]) {
                if (obj["guard"]["faith_guard"] == 1) {
                    this.img_medal1_dark.visible = false;
                    this.img_medal1_bright.visible = true;
                }
                else {
                    this.img_medal1_dark.visible = true;
                    this.img_medal1_bright.visible = false;
                }
                if (obj["guard"]["angel_guard"] == 1) {
                    this.img_medal2_dark.visible = false;
                    this.img_medal2_bright.visible = true;
                }
                else {
                    this.img_medal2_dark.visible = true;
                    this.img_medal2_bright.visible = false;
                }
                if (obj["guard"]["stars_guard"] == 1) {
                    this.img_medal3_dark.visible = false;
                    this.img_medal3_bright.visible = true;
                }
                else {
                    this.img_medal3_dark.visible = true;
                    this.img_medal3_bright.visible = false;
                }
            }
            this.bmpTitleBack0.source = data.DataManager.getintimateIcon(obj["intimate_level"]);
            this.lblIntimate_Title0.text = data.DataManager.getintimateLevel(obj["intimate_level"]) + "";
            if (obj["intimate_level"] < 45) {
                this.bmpTitleBack0.source = data.DataManager.getintimateIcon(obj["intimate_level"]);
                this.lblIntimate_Title0.text = data.DataManager.getintimateLevel(obj["intimate_level"]) + "";
            }
            else {
                this.bmpTitleBack0.source = null;
                this.lblIntimate_Title0.text = "";
            }
            this.lbl3.text = "点亮作品" + " (" + obj['starWorks'].length + "/" + obj["works_total"] + ")";
            console.log(this.groupopenid + "  " + GameApp.Manager.dataManager.group_openid);
            this.groupTop.addChild(this.bmpIcon);
            this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["hexToDec"](obj["user_name"])); //GameApp.Manager.dataManager.star_name;
            this.lblPay.textFlow = (new egret.HtmlTextParser).parser("本月送出 <font color=#ffffff>" + obj["contribution"] + "</font>" + " 钻");
            if (this.groupopenid == GameApp.Manager.dataManager.group_openid) {
                this.lblGroupName.textFlow = (new egret.HtmlTextParser).parser("所属群 <font color=#ffffff>" + window["hexToDec"](obj["group_name"]) + "</font>");
            }
            else {
                this.lblGroupName.textFlow = (new egret.HtmlTextParser).parser("所属群 <font color=#3FD5E3>" + window["hexToDec"](obj["group_name"]) + "</font>");
            }
            if (GameApp.Manager.dataManager.lucystar <= 0) {
                this.lblstar.text = "0" + "";
            }
            else {
                this.lblstar.text = GameApp.Manager.dataManager.lucystar + "";
            }
            this.lblHonghua.text = "x" + obj["red_flower_num"];
            this.lbl2.text = "与" + window["hexToDec"](obj["star_name"]) + "亲密度";
            this.setTitleUI(obj);
            if (obj['gender'] == '女') {
                this.sex.source = 'p_nv';
            }
            else {
                this.sex.source = "p_nan";
            }
            this.bmpIcon.setData(obj['user_pic'], 162, 0, 0, 4);
            //            this.bmpIcon.setData(obj['user_pic'],146,0,0,4);
            this.user_pic = obj["user_pic"];
            /*
             *作品掉落
             */
            if (obj['starWorks']) {
                if (obj["starWorks"].length == 0) {
                    this.lable_noWorks.visible = true;
                }
                for (var i = 0; i < obj['starWorks'].length; i++) {
                    var itmHeit = new garbageCollection.WorksItem();
                    var index = parseInt(obj["starWorks"][i]["colour"]);
                    var str = window["hexToDec"](obj['starWorks'][i]["name"]);
                    itmHeit.setData(str, index);
                    this.itemArr.push(itmHeit);
                    if (i == 0) {
                        itmHeit.x = 0;
                        itmHeit.y = 25;
                    }
                    else {
                        itmHeit.x = this.itemArr[i - 1].x + this.itemArr[i - 1].width + 20;
                        itmHeit.y = this.col * 75 + 25; //75行距 25y值
                        if (itmHeit.x + itmHeit.width > 640) {
                            this.col += 1;
                            if (this.col >= 2) {
                                break;
                            }
                            else {
                                itmHeit.x = 0;
                                itmHeit.y = this.col * 75 + 25;
                            }
                        }
                    }
                    this.groupData.addChild(itmHeit);
                }
            }
        };
        p.closeItem = function () {
            console.log(this.type, "type");
            if (this.type == 0) {
                this.close();
            }
            else if (this.type == 1) {
                this.type = 0;
                this.group_medal1.visible = false;
                this.lable_day.visible = false;
                this.lable_Alreadylit.visible = false;
            }
            else if (this.type == 2) {
                this.type = 0;
                this.group_medal2.visible = false;
                this.group_medul2Light.visible = false;
                this.lable_medal2Day.visible = false;
                this.lable_medal2Light.visible = false;
            }
            else if (this.type == 3) {
                this.type = 0;
                this.group_medal3.visible = false;
                this.group_isOner.visible = false;
                this.group_isNotOner.visible = false;
            }
        };
        p.close = function () {
            this.uid = 0;
            this.bid = "";
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.groupTip1.visible = false;
            if (this.bmpIcon && this.bmpIcon.parent)
                this.bmpIcon.parent.removeChild(this.bmpIcon);
            this.lblName.text = '';
            this.lblHonghua.text = "";
            this.lblGroupName.text = '';
            this.clearData();
            GameApp.Manager.viewManager.clearMask();
            GameApp.Manager.viewManager.TopUIStage.removeChild(this);
            this.userPaise.clear();
            /*
             * 勋章
             */
            this.group_medal1.visible = false;
            this.group_medal2.visible = false;
            this.group_medal3.visible = false;
            this.group_notice.visible = false;
            this.img_medal1_bright.visible = false;
            this.img_medal2_bright.visible = false;
            this.img_medal3_bright.visible = false;
            this.img_medal1_dark.visible = true;
            this.img_medal2_dark.visible = true;
            this.img_medal3_dark.visible = true;
        };
        p.touchend = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
            this.selectItem = null;
            this.closeTip();
        };
        p.clearData = function () {
            //            for(var i: number = this.groupData.numElements - 1;i >= 0;i--){
            //                var item: UserPanelItem = <UserPanelItem>this.groupData.getElementAt(i);
            //                UserPanelItem.reclaim(item);
            //                item.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.item_tap,this);
            //                if(item.parent)
            //                    this.groupData.removeChild(item);
            //		    }
            this.lable_noWorks.visible = false;
            this.itemArr = [];
            this.col = 0;
            while (this.groupData.numElements > 0) {
                var ite = this.groupData.getElementAt(this.groupData.numElements - 1);
                ;
                if (ite.parent) {
                    ite.parent.removeChild(ite);
                }
            }
        };
        return UserPanel;
    }(eui.Component));
    userPanel.UserPanel = UserPanel;
    egret.registerClass(UserPanel,'userPanel.UserPanel');
})(userPanel || (userPanel = {}));
