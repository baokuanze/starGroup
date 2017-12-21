var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var GiftCf = (function (_super) {
        __extends(GiftCf, _super);
        function GiftCf() {
            _super.call(this);
            this.type = 0;
            this.bo1 = false;
            this.bo2 = false;
            this.isSend = false;
            this.cftime = 0;
            this.ttime = 0;
            this.skinName = "src/view/gameUI/task/giftcf/GiftCfSkin.exml";
        }
        var d = __define,c=GiftCf,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbltab1.fontFamily = "Heiti SC";
                this.lbltab2.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lb6.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblDate.fontFamily = "Heiti SC";
                this.lblLucky.fontFamily = "Heiti SC";
                this.lblPro.fontFamily = "Heiti SC";
                this.lblFansNum.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblJL.fontFamily = "Heiti SC";
            }
            this.scroll1.height = this.stage.stageHeight;
            this.btn1 = new task.GiftCfBtn(1);
            this.btn2 = new task.GiftCfBtn(2);
            this.btn3 = new task.GiftCfBtn(3);
            this.btn4 = new task.GiftCfBtn(4);
            this.groupBtn.addChild(this.btn1);
            this.groupBtn.addChild(this.btn2);
            this.groupBtn.addChild(this.btn3);
            this.groupBtn.addChild(this.btn4);
            if (this.groupEnd.parent) {
                this.removeChild(this.groupEnd);
            }
            this.btntab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1_tap, this);
            this.btntab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2_tap, this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_1, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_2, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_3, this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_4, this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.help_tap, this);
            this.btnZH.addEventListener(egret.TouchEvent.TOUCH_TAP, function (obj) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriendsForCrowdfunding", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                    system.Share.share(obj, function (n) {
                        if (n == 1)
                            system.TipText.produce().open("发送成功");
                    });
                }, true, this);
            }, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        p.help_tap = function () {
            //            this.dispatchEventWith("help",false,{type:3,state:"open"});
            this.groupTip3.visible = true;
            GameApp.Manager.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.help_end, this);
        };
        p.help_end = function () {
            //            this.dispatchEventWith("help",false,{ type: 3,state: "close" });
            this.groupTip3.visible = false;
            GameApp.Manager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.help_end, this);
        };
        p.buy_1 = function () {
            if (!this.isSend) {
                if (GameApp.Manager.dataManager.lucystar >= 1) {
                    this.isSend = true;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendGiftCf, { record_id: GiftCf.obj["current"]["info"]["record_id"], num: 1 }, this.buy_call, this);
                }
                else {
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.viewManager.taskManager.giftCfManager.hide();
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0);
                        }
                    }, this);
                }
            }
        };
        p.buy_2 = function () {
            if (!this.isSend) {
                if (GameApp.Manager.dataManager.lucystar >= 59) {
                    this.isSend = true;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendGiftCf, { record_id: GiftCf.obj["current"]["info"]["record_id"], num: 2 }, this.buy_call, this);
                }
                else {
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.viewManager.taskManager.giftCfManager.hide();
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0);
                        }
                    }, this);
                }
            }
        };
        p.buy_3 = function () {
            if (!this.isSend) {
                if (GameApp.Manager.dataManager.lucystar >= 99) {
                    this.isSend = true;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendGiftCf, { record_id: GiftCf.obj["current"]["info"]["record_id"], num: 3 }, this.buy_call, this);
                }
                else {
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.viewManager.taskManager.giftCfManager.hide();
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0);
                        }
                    }, this);
                }
            }
        };
        p.buy_4 = function () {
            if (!this.isSend) {
                if (GameApp.Manager.dataManager.lucystar >= 999) {
                    this.isSend = true;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendGiftCf, { record_id: GiftCf.obj["current"]["info"]["record_id"], num: 4 }, this.buy_call, this);
                }
                else {
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.viewManager.taskManager.giftCfManager.hide();
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0);
                        }
                    }, this);
                }
            }
        };
        p.buy_call = function (obj) {
            this.isSend = false;
            if (obj["st"] == 1) {
                console.log('buycall', obj);
                GameApp.Manager.dataManager.lucystar = obj["data"]["user_lucky_star"];
                flower.FlowerUI.getInstance().setLucky();
                system.TipText.produce().open("贡献成功");
            }
        };
        p.btn1_tap = function () {
            if (this.groupEnd.parent) {
                this.btntab1.alpha = 1;
                this.lbltab1.textColor = 0xffffff;
                this.btntab2.alpha = 0;
                this.lbltab2.textColor = 0xABABAB;
                this.removeChild(this.groupEnd);
                this.addChild(this.groupStart);
                this.showTab1();
            }
        };
        p.btn2_tap = function () {
            if (this.groupStart.parent) {
                this.btntab2.alpha = 1;
                this.lbltab2.textColor = 0xffffff;
                this.btntab1.alpha = 0;
                this.lbltab1.textColor = 0xABABAB;
                this.removeChild(this.groupStart);
                this.addChild(this.groupEnd);
                this.showTab2();
            }
        };
        GiftCf.setData = function (obj) {
            this.obj = obj;
            console.log('众筹初始化数据:', obj);
        };
        GiftCf.updateCf = function (obj) {
            console.log(obj, 'obj11111111111');
            if (obj['code'] == 201) {
                GiftCf.obj = obj;
                if (GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf) {
                    GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf.group_des.visible = true;
                }
            }
            else {
                if (obj) {
                    console.log('update', obj);
                    if (!obj["isFinish"]) {
                        if (obj["num"] != GiftCf.obj["current"]["info"]["num"]) {
                            GiftCf.active(obj);
                            if (GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf && GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf.parent) {
                                GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf.updatePro();
                                GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf.updateUser(obj["user"]);
                            }
                        }
                    }
                    else {
                        GiftCf.obj = obj["crowdfunding"];
                        GameApp.Manager.viewManager.gameMainUI.mainUI.setHotNum(obj["current_star_hot"]);
                        if (GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf && GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf.parent) {
                            GameApp.Manager.viewManager.taskManager.giftCfManager.giftCf.updatePanel();
                        }
                    }
                }
            }
        };
        GiftCf.active = function (obj) {
            GiftCf.obj["current"]["info"]["num"] = obj["num"];
            if (obj["user"]) {
                var arr = GiftCf.obj["current"]["userArray"];
                //                console.log('修改:',arr);
                //                console.log('修改1:',obj["user"]);
                //                if(arr.length>0){
                var bo = false;
                for (var i in arr) {
                    if (arr[i]["user_id"] == obj["user"]["user_id"]) {
                        arr[i]["num"] += obj["user"]["num"];
                        bo = true;
                        break;
                    }
                }
                if (!bo) {
                    arr.push(obj["user"]);
                }
            }
        };
        p.updatePro = function () {
            if (this.bo1) {
                var obj = GiftCf.obj["current"];
                this.lblLucky.text = obj["info"]["num"] + "";
                this.lblPro.text = "当前进度:" + parseInt((obj["info"]["num"] / obj["info"]["need_num"]) * 100 + "") + "%";
                this.pro1.value = obj["info"]["num"] / obj["info"]["need_num"] * 100;
            }
        };
        p.updateUser = function (user) {
            var item;
            var i = 0;
            var j = 0;
            //            while(this.groupData.numElements>0){
            //                var it:GiftCfItem=<GiftCfItem>this.groupData.getElementAt(i);
            //                if(it.uid==user["user_id"]){
            //                    item=it;
            //                    console.log("找到item:" + item.uid);
            //                    break;
            //                }else{
            //                    i++;
            //                    if(i==this.groupData.numElements){
            //                        console.log("未找到"+user["user_id"]);
            //                        break;
            //                    }
            //                }
            //            }
            for (i = 0; i < this.groupData.numElements; i++) {
                //GiftCfItem
                var it = this.groupData.getElementAt(i);
                if (it.uid == user["user_id"]) {
                    item = it;
                    console.log("找到item:" + item.uid);
                    break;
                }
                else {
                    if (i == this.groupData.numElements) {
                        console.log("未找到" + user["user_id"]);
                        break;
                    }
                }
            }
            if (item) {
                item.updateNum(user["num"]);
                for (j = 0; j < this.groupData.getChildIndex(item); j++) {
                    var itt = this.groupData.getElementAt(j);
                    if (itt.num < item.num) {
                        this.groupData.addChildAt(item, j);
                        break;
                    }
                }
            }
            else {
                for (j = 0; j < this.groupData.numElements; j++) {
                    var itt = this.groupData.getElementAt(j);
                    if (itt.num < user["num"]) {
                        item = task.GiftCfItem.produce();
                        this.groupData.addChildAt(item, j);
                        item.setData(user, j + 1);
                        break;
                    }
                }
                if (!item) {
                    item = task.GiftCfItem.produce();
                    this.groupData.addChild(item);
                    item.setData(user, this.groupData.numElements + 1);
                }
            }
            for (i = 0; i < this.groupData.numElements; i++) {
                var tt = this.groupData.getElementAt(i);
                tt.updateRank(i + 1);
            }
            this.lblFansNum.text = this.groupData.numElements + "粉丝参加";
        };
        p.updatePanel = function () {
            this.clear();
            if (this.groupStart.parent) {
                this.showTab1();
            }
            else {
                this.showTab2();
            }
        };
        p.show = function () {
            if (GiftCf.obj['code'] == 201) {
                this.group_des.visible = true;
            }
            else {
                this.showTab1();
            }
        };
        p.showTab1 = function () {
            this.groupTip.visible = false;
            var obj = GiftCf.obj["current"];
            if (!this.bo1) {
                this.bo1 = true;
                if (obj) {
                    this.lblTitle.text = window["hexToDec"](obj["info"]["name"]);
                    this.showEndDate(obj);
                    this.lblLucky.text = obj["info"]["num"] + "";
                    this.lblPro.text = "当前进度:" + parseInt((obj["info"]["num"] / obj["info"]["need_num"]) * 100 + "") + "%";
                    this.pro1.value = obj["info"]["num"] / obj["info"]["need_num"] * 100;
                    this.lblFansNum.text = obj["userArray"].length + "粉丝参加";
                    this.lblGX.textFlow = (new egret.HtmlTextParser).parser("贡献<font color=#e88319>" + obj["info"]["need_num"] + "</font>颗钻石");
                    this.lblJL.textFlow = (new egret.HtmlTextParser).parser(GameApp.Manager.dataManager.star_name + "<font color=#e88319>+" + obj["info"]["star_hot"] + "</font>热度,本群<font color=#e88319>+" + obj["info"]["group_exp"] + "</font>经验");
                    RES.getResByUrl(obj["info"]["pic"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
                    var arr = obj["userArray"];
                    for (var ii = 0; ii < arr.length; ii++) {
                        for (var jj = arr.length - 1; jj > ii; jj--) {
                            if (arr[jj]["num"] > arr[jj - 1]["num"]) {
                                var tmp = this.swapuserobj({}, arr[jj]);
                                this.swapuserobj(arr[jj], arr[jj - 1]);
                                this.swapuserobj(arr[jj - 1], tmp);
                            }
                        }
                    }
                    for (var i = 0; i < obj["userArray"].length; i++) {
                        var item = task.GiftCfItem.produce();
                        this.groupData.addChild(item);
                        item.setData(obj["userArray"][i], i + 1);
                    }
                }
            }
        };
        p.swapuserobj = function (user, user1) {
            user["num"] = user1["num"];
            user["user_id"] = user1["user_id"];
            user["user_name"] = user1["user_name"];
            user["user_pic"] = user1["user_pic"];
            return user;
        };
        p.showEndDate = function (obj) {
            var self = this;
            var date = new Date();
            this.cftime = obj["info"]["end_time"];
            this.ttime = obj["info"]["end_time"] - date.getTime();
            var date1 = new Date(this.ttime);
            if (date1.getDate() > 1) {
                this.lblDate.textFlow = (new egret.HtmlTextParser).parser("结束日期:还差<font color=#ff0000>" + date1.getDate() + "</font>天结束");
            }
            else {
                if (this.timeVar)
                    clearInterval(this.timeVar);
                this.timeVar = setInterval(function () {
                    var NowTime = new Date().getTime();
                    var t = self.cftime - (NowTime);
                    if (t <= 0) {
                        self.lblDate.text = "日期已过期";
                    }
                    else {
                        self.lblDate.textFlow = (new egret.HtmlTextParser).parser("结束日期:还差<font color=#ff0000>" + Tools.getInstance().formatTime2(t) + "</font>结束");
                    }
                }, 980);
            }
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.showTab2 = function () {
            var arr = GiftCf.obj["history"];
            if (!this.bo2) {
                this.bo2 = true;
                for (var i = 0; i < arr.length; i++) {
                    var item = task.GiftCfItem1.produce();
                    this.groupEnd.addChild(item);
                    item.setData(arr[i]);
                }
            }
            if (this.groupEnd.numElements == 0) {
                this.groupTip.visible = true;
            }
        };
        p.formatTime = function (mss) {
            var date = new Date(mss);
            return (date.getMonth() + 1) + "-" + date.getDate();
        };
        p.clear = function () {
            this.groupTip.visible = false;
            this.bo1 = false;
            this.bo2 = false;
            this.lblTitle.text = "";
            this.lblDate.text = "";
            this.lblLucky.text = "";
            this.lblPro.text = "";
            this.pro1.value = 0;
            this.lblFansNum.text = "";
            this.lblGX.text = "";
            this.lblJL.text = "";
            while (this.groupData.numElements > 0) {
                var item = this.groupData.getElementAt(this.groupData.numElements - 1);
                task.GiftCfItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while (this.groupEnd.numElements > 0) {
                var item1 = this.groupData.getElementAt(this.groupData.numElements - 1);
                task.GiftCfItem1.reclaim(item1);
                if (item1.parent) {
                    item1.parent.removeChild(item1);
                }
            }
            this.group_des.visible = false;
        };
        p.close = function () {
            if (this.type == 0) {
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else {
                GameApp.Manager.controllerManager.taskController.show();
            }
            GameApp.Manager.viewManager.taskManager.giftCfManager.hide();
        };
        return GiftCf;
    }(eui.Component));
    task.GiftCf = GiftCf;
    egret.registerClass(GiftCf,'task.GiftCf');
})(task || (task = {}));
