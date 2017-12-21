var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var SignIn = (function (_super) {
        __extends(SignIn, _super);
        function SignIn() {
            _super.call(this);
            this.type = 0;
            this.skinName = "src/view/gameUI/task/signIn/SignInSkin.exml";
            this.taskTip = new task.TaskTip();
        }
        var d = __define,c=SignIn,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_continuousDay.fontFamily = "Heiti SC";
                this.labla_crit.fontFamily = "Heiti SC";
                this.lable_firstSign.fontFamily = "Heiti SC";
                this.lable_fansName1.fontFamily = "Heiti SC";
                this.lable_fansName2.fontFamily = "Heiti SC";
                this.lable_fansName3.fontFamily = "Heiti SC";
                this.lable_reward.fontFamily = "Heiti SC";
                this.lable_reward2.fontFamily = "Heiti SC";
                this.lable_reward3.fontFamily = "Heiti SC";
                this.lable_todaySignNumber.fontFamily = "Heiti SC";
                this.lable_lb1.fontFamily = "Heiti SC";
                this.lable_signIn.fontFamily = "Heiti SC";
                this.lable_getExpAndDia.fontFamily = "Heiti SC";
            }
            this.scroll1.height = this.stage.stageHeight;
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.help_tap, this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_comeBack, this);
            this.rect_haoZhao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SignHaoZhao, this);
            this.img_conDayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchContinus, this);
            this.img_critIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCrit, this);
            this.img_firstDayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtoday, this);
        };
        p.touchContinus = function (e) {
            if (this.uid1 > 0)
                userPanel.UserPanel.getInstance().open(this.uid1, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid);
            e.stopPropagation();
        };
        p.touchCrit = function (e) {
            if (this.uid2 > 0)
                userPanel.UserPanel.getInstance().open(this.uid2, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid);
            e.stopPropagation();
        };
        p.touchtoday = function (e) {
            if (this.uid3 > 0)
                userPanel.UserPanel.getInstance().open(this.uid3, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid);
            e.stopPropagation();
        };
        p.setData = function (obj) {
            this.allObj = obj;
            if (obj["signedLongest"]["user_id"]) {
                this.uid1 = obj["signedLongest"]["user_id"];
                this.lable_continuousDay.text = "连续" + window["hexToDec"](obj["signedLongest"]["num"]) + "天";
                this.lable_fansName1.text = window["hexToDec"](obj["signedLongest"]["user_name"]);
                this.lable_reward.text = "奖励：" + +window["hexToDec"](obj["signedLongest"]["longest_sign_reward"]);
                this.img_d1.visible = true;
                RES.getResByUrl(obj["signedLongest"]["user_pic"], this.conDayIcon, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                this.lable_continuousDay.text = "连续签到";
                this.lable_fansName1.text = "暂无";
                this.lable_reward.text = "暂无";
                this.img_d1.visible = false;
            }
            if (obj["signedCrit"]["user_id"]) {
                this.uid2 = obj["signedCrit"]["user_id"];
                this.lable_fansName2.text = window["hexToDec"](obj["signedCrit"]["user_name"]);
                this.lable_reward2.text = "奖励：" + window["hexToDec"](obj["signedCrit"]["crit_sign_reward"]);
                this.img_d2.visible = true;
                RES.getResByUrl(obj["signedCrit"]["user_pic"], this.critIcon, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                this.lable_fansName2.text = "暂无";
                this.img_d2.visible = false;
                this.lable_reward2.text = "暂无";
            }
            if (obj["signedFirst"]["user_id"]) {
                this.uid3 = obj["signedFirst"]["user_id"];
                this.lable_fansName3.text = window["hexToDec"](obj["signedFirst"]["user_name"]);
                this.lable_reward3.text = "奖励：" + window["hexToDec"](obj["signedFirst"]["group_first_sign_reward"]);
                this.img_d3.visible = true;
                RES.getResByUrl(obj["signedFirst"]["user_pic"], this.firstDayIcon, this, RES.ResourceItem.TYPE_IMAGE);
            }
            else {
                this.lable_fansName3.text = "暂无";
                this.lable_reward3.text = "暂无";
                this.img_d3.visible = false;
            }
            var arrSign = obj["signedUserArray"];
            for (var i = 0; i < arrSign.length; i++) {
                var SignPersonIcon = task.SignPersonIcon.produce();
                this.group_signPersonIcon.addChild(SignPersonIcon);
            }
            for (var i = this.group_signPersonIcon.numElements - 1; i >= 0; i--) {
                var sicon = this.group_signPersonIcon.getElementAt(i);
                sicon.setData(arrSign[i]);
            }
        };
        p.help_tap = function () {
            this.groupTip1.visible = true;
            GameApp.Manager.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.help_end, this);
        };
        p.help_end = function () {
            this.groupTip1.visible = false;
            GameApp.Manager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.help_end, this);
        };
        p.btnSign = function (b) {
            if (!this.allObj["isSigned"]) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + this.allObj["signInfo"]["id"] + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/signIn", { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, id: this.allObj["signInfo"]["id"], sign: sign }, function (obj) {
                    if (obj['st'] == 1) {
                    }
                }, true, this);
            }
        };
        p.SignHaoZhao = function (e) {
            if (this.allObj["isSigned"]) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriends", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                    system.Share.share(obj, function (n) {
                        if (n == 1)
                            system.TipText.produce().open("发送成功");
                    });
                }, true, this);
            }
        };
        p.signOK = function (obj) {
            console.log("签到返回值");
            this.diaNumber = obj["add_lucky_star"];
            this.expNumber = obj["each_sign_group_exp"];
            if (obj["isSignFrist"]) {
                this.lable_getExpAndDia.text = "获得" + obj["add_lucky_star"] + "钻，" + obj["each_sign_group_exp"] + "点群经验!";
                this.lable_getExpAndDia.visible = true;
            }
            if (!obj["isSignFrist"]) {
                this.lable_getExpAndDia.text = "获得" + obj["each_sign_group_exp"] + "点群经验!";
                this.lable_getExpAndDia.visible = false;
            }
            this.taskTip.x = (750 - 346) / 2;
            this.taskTip.y = 500;
            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
            GameApp.Manager.viewManager.gameMainUI.setLucky();
        };
        p.updatePOsAndStay = function (dia, exp) {
            this.lable_signIn.text = "今日已签到!";
            if (dia > 0) {
                this.lable_getExpAndDia.text = "获得" + dia + "钻，" + exp + "点群经验!"; // 
            }
        };
        p.setUpdateValue = function (obj) {
            if (obj["group_openid"] != GameApp.Manager.dataManager.group_openid) {
                //                var userPic = task.SignPersonIcon.produce()
                //                this.group_signPersonIcon.addChild(userPic);
                //                console.log(obj,"-------");
                //                userPic.setData1(obj);
                return;
            }
            if (obj["isSignFirst"] == true) {
                this.taskTip.show(obj["add_lucky_star"]);
                this.addChild(this.taskTip);
            }
            console.log(obj, "0000=");
            //添加自己
            var userPic = task.SignPersonIcon.produce();
            this.group_signPersonIcon.addChild(userPic);
            console.log(obj, "-------");
            userPic.setData1(obj);
            if (obj["isSignedLongest"]) {
                this.lable_continuousDay.text = "连续" + obj["userSignedNum"] + "天";
                this.lable_fansName1.text = (GameApp.Manager.dataManager.user_name);
                this.lable_reward.text = "奖励：" + window["hexToDec"](this.allObj["signedLongest"]["longest_sign_reward"]);
                this.img_d1.visible = true;
                RES.getResByUrl(obj["user_pic"], this.conDayIcon, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (obj["isTodaySignedCrit"]) {
                this.lable_fansName2.text = (GameApp.Manager.dataManager.user_name);
                this.lable_reward2.text = "奖励：" + window["hexToDec"](this.allObj["signedCrit"]["crit_sign_reward"]);
                this.img_d2.visible = true;
                RES.getResByUrl(obj["user_pic"], this.critIcon, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (obj["isTodaySignedFrist"]) {
                this.lable_fansName3.text = (GameApp.Manager.dataManager.user_name);
                this.lable_reward3.text = "奖励：" + window["hexToDec"](this.allObj["signedFirst"]["group_first_sign_reward"]);
                this.img_d3.visible = true;
                RES.getResByUrl(obj["user_pic"], this.firstDayIcon, this, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        p.conDayIcon = function (source) {
            this.img_conDayIcon.texture = source;
        };
        p.critIcon = function (source) {
            this.img_critIcon.texture = source;
        };
        p.firstDayIcon = function (source) {
            this.img_firstDayIcon.texture = source;
        };
        p.clear = function () {
            while (this.group_signPersonIcon.numElements > 0) {
                var iteme = this.group_signPersonIcon.getElementAt(this.group_signPersonIcon.numElements - 1);
                task.SignPersonIcon.reclaim(iteme);
                if (iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
            this.img_conDayIcon.texture = null;
            this.img_critIcon.texture = null;
            this.img_firstDayIcon.texture = null;
            this.scroll1.viewport.scrollV = 0;
        };
        p.btn_comeBack = function () {
            GameApp.Manager.controllerManager.signController.hide();
            if (this.type == 0) {
                //主界面
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else {
                //主界面
                GameApp.Manager.controllerManager.taskController.show();
            }
        };
        return SignIn;
    }(eui.Component));
    task.SignIn = SignIn;
    egret.registerClass(SignIn,'task.SignIn');
})(task || (task = {}));
