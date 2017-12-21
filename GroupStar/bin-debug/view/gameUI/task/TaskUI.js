var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskUI = (function (_super) {
        __extends(TaskUI, _super);
        function TaskUI() {
            _super.call(this);
            //public signIn:SignIn;//签到
            //        public aggregation:AggregationIcon1;//集结
            //        public giftCf:GiftCf;//众筹
            this.taskOpenArr = [];
            this.state = "1";
            this.disHavaTask = 0; //用于充值时
            this.skinName = "src/view/gameUI/task/TaskUISkin.exml";
            this.iconNow = new task.TaskIcon();
            this.iconNext = new task.TaskIcon();
            this.xuanGrop = new groupXuan.TaskGroupXuan();
            //            this.signIn = new SignIn();
            //            this.aggregation=new AggregationIcon1();
            //            this.giftCf=new GiftCf();
        }
        var d = __define,c=TaskUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
                this.lblr1.fontFamily = "Heiti SC";
                this.lblExp.fontFamily = "Heiti SC";
                this.lblSignNum.fontFamily = "Heiti SC";
                this.lblJjState.fontFamily = "Heiti SC";
                this.lblGiftNum.fontFamily = "Heiti SC";
                this.lblGroupName.fontFamily = "Heiti SC";
                this.lable_publish.fontFamily = "Heiti SC";
                this.lable_shenYue.fontFamily = "Heiti SC";
                this.lable_guangLi.fontFamily = "Heiti SC";
                this.lable_qunTitle.fontFamily = "Heiti SC";
                this.lblGroupBook.fontFamily = "Heiti SC";
                this.lable_starDes.fontFamily = "Heiti SC";
                this.lable_buy.fontFamily = "Heiti SC";
                this.lable_xuangroup.fontFamily = "Heiti SC";
                this.lable_joinGroup.fontFamily = "Heiti SC";
            }
            this.lable_starDes.textFlow = (new egret.HtmlTextParser).parser("繁星特惠福利" + "<font color = 0xff0000>[1元真爱礼包30钻]</font>");
            this.scroll1.height = this.stage.stageHeight;
            //            this.groupBottom.addChild(this.signIn);
            this.groupData.addChildAt(this.iconNow, 3);
            this.groupData.addChildAt(this.iconNext, 3);
            this.iconNow.x = 55;
            this.iconNow.y = 130;
            this.iconNext.x = 580;
            this.iconNext.y = 130;
            //            this.groupTab1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.forwardMain,this);
            //            this.btnGroupRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnGroupRank_tap,this);
            //            this.btnGXRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnGXRank_tap,this);
            this.btnClose2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close2, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1_tap, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2_tap, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn3_tap, this);
            //            this.btnTaskManager.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            //                GameApp.Manager.controllerManager.groupManagerController.show();
            //                GameApp.Manager.controllerManager.taskController.hide();
            //                },this);
            this.btn_publish.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.groupManagerController.show("发布任务");
                GameApp.Manager.controllerManager.taskController.hide();
                GameApp.Manager.viewManager.groupManager.hostManager.task_publish();
            }, this);
            this.btn_shenYue.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.groupManagerController.show("审阅任务");
                GameApp.Manager.controllerManager.taskController.hide();
                GameApp.Manager.viewManager.groupManager.hostManager.task_shenYue();
            }, this);
            this.btn_guangLi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.groupManagerController.show("管理任务");
                GameApp.Manager.controllerManager.taskController.hide();
                GameApp.Manager.viewManager.groupManager.hostManager.task_guangLi();
            }, this);
            this.btn_joinGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                aler.AlertPanel.getInstance().show("更改入驻明星", "只能更改一次且本群贡献清零，请谨慎使用", "取消", "确定", function (data) {
                    if (data == "ok") {
                        GameApp.Manager.controllerManager.taskController.hide();
                        GameApp.Manager.viewManager.starPageManager.show(1);
                    }
                }, this);
            }, this);
            this.btnSelf.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                userPanel.UserPanel.getInstance().open(GameApp.Manager.dataManager.uid, GameApp.Manager.dataManager.bid, GameApp.Manager.dataManager.group_openid);
                e.stopPropagation();
            }, this);
            this.btnGroupBook.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.taskController.hide();
                system.GroupBookUI.getInstance().show();
            }, this);
            var self = this;
            this.group_puyLove.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (TaskUI.isCanByLiBao) {
                    pay.PayUI.getInstance().btn8_tap();
                }
                else {
                    system.TipText.produce().open("一天只能买一次", 800, 500);
                }
            }, this);
            this.btn_Xuangroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.xuanGrop.setData();
                self.addChild(self.xuanGrop);
            }, this);
        };
        TaskUI.changeCanBuy = function () {
            this.isCanByLiBao = true;
        };
        TaskUI.changePosOfTask = function () {
            this.stars_guard_valid = true;
        };
        p.setData = function (obj) {
            if (GameApp.Manager.dataManager.resetState == 1) {
                this.group_join.visible = false;
            }
            else if (GameApp.Manager.dataManager.resetState == 0) {
                this.group_join.visible = true;
            }
            this.disHavaTask = 1;
            this.obj = obj;
            var data1 = obj["groupInfo"];
            this.lblGroupName.text = window["hexToDec"](data1["group_name"]);
            this.iconNow.setText(data1["level"]);
            this.iconNext.setText(data1["level"] + 1);
            this.lblExp.text = data1["exp"] + "/" + data1["need_exp"] + "";
            this.pro1.value = (data1["exp"] / data1["need_exp"]) * 100;
            this.lblSignNum.text = "每日签到(" + obj["signedUserCount"] + "/" + data1["member_num"] + ")";
            this.jjstate();
            this.setGiftCfPro();
            this.setTaskOpen();
            this.setCelebrity(); //名人堂
            var vote = 355;
            var h1 = 95;
            var h2 = 172;
            var h3 = 98;
            this.groupOne.y = vote;
            this.groupBottom.y = vote;
            if (TaskUI.isCanByLiBao) {
                this.groupOne.y += h1;
                this.groupBottom.y += h1;
                if (GameApp.Manager.dataManager.is_owner) {
                    this.groupBottom.y += h2;
                    if (TaskUI.stars_guard_valid || GameApp.Manager.dataManager.resetState == 0) {
                        this.groupBottom.y += h3;
                        if (TaskUI.stars_guard_valid) {
                            this.group_xuanqun.visible = true;
                        }
                    }
                }
            }
            else {
                if (GameApp.Manager.dataManager.is_owner) {
                    this.groupBottom.y += h2;
                    if (TaskUI.stars_guard_valid || GameApp.Manager.dataManager.resetState == 0) {
                        this.groupBottom.y += h3;
                        if (TaskUI.stars_guard_valid) {
                            this.group_xuanqun.visible = true;
                        }
                    }
                }
            }
            if (GameApp.Manager.dataManager.is_owner) {
                this.group_book.visible = true;
            }
            else {
                this.group_book.visible = false;
            }
        };
        p.changeLiBaoPos = function () {
            TaskUI.isCanByLiBao = false;
            if (GameApp.Manager.dataManager.is_owner) {
                this.groupOne.y = 356;
                this.groupBottom.y = 630;
                this.group_xuanqun.visible = true;
            }
            else {
                this.groupBottom.y = 355;
            }
        };
        p.reSetAllPos = function () {
            this.groupBottom.y = 769;
            this.groupOne.y = 486;
        };
        p.setCelebrity = function () {
            this.clearMRT();
            var arr = this.obj["celebrityArray"];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    var item = task.TaskHallofFame.produce();
                    //                    item.y = (364 + 155) + 1 + i * 155;
                    this.groupMRT.addChild(item);
                    switch (i) {
                        case 0:
                        case 1:
                        case 2:
                            item.setData(obj, i + 1);
                            break;
                        default:
                            item.setData(obj);
                            break;
                    }
                }
            }
        };
        p.setTaskOpen = function () {
            this.clearTaskOpen();
            var arr = this.obj["openTaskArray"];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    var item = task.TaskOpen.produce();
                    item.y = (322 + 160) + 1 + i * 160;
                    this.groupBottom.addChild(item);
                    item.setData(obj, 1);
                    this.taskOpenArr.push(item);
                }
            }
            var arr1 = this.obj["extensionTaskArray"];
            if (arr1) {
                for (var i = 0; i < arr1.length; i++) {
                    var obj = arr1[i];
                    var item = task.TaskOpen.produce();
                    item.y = (322 + 160) + 1 + (i + arr.length) * 160;
                    this.groupBottom.addChild(item);
                    item.setData(obj, 2);
                    this.taskOpenArr.push(item);
                }
            }
        };
        p.setGiftCfPro = function () {
            this.lblGiftNum.text = window["hexToDec"](task.GiftCf.obj["current"]["info"]["name"]) + "(进度" + parseInt((task.GiftCf.obj["current"]["info"]["num"] / task.GiftCf.obj["current"]["info"]["need_num"]) * 100 + "") + "%)";
            this.lbl5.text = "" + GameApp.Manager.dataManager.star_name + "+" + task.GiftCf.obj["current"]["info"]["star_hot"] + "热度,本群+" + task.GiftCf.obj["current"]["info"]["group_exp"] + "经验";
        };
        p.groupMass = function () {
            //            clearInterval(this.timeVar);
            this.jjstate();
        };
        p.jjstate = function () {
            if (this.timeVar) {
                clearInterval(this.timeVar);
            }
            if (task.AggregationIcon1.Allobj["date"] > 0) {
                var self = this;
                this.task_time = task.AggregationIcon1.Allobj["date"];
                this.task_timeJilu = new Date().getTime();
                var djs = this.task_time - (this.task_timeJilu - task.AggregationIcon1.crrentTime);
                if (djs > 0) {
                    this.timeVar = setInterval(function () {
                        var NowTime = new Date().getTime();
                        var t = djs - (NowTime - self.task_timeJilu);
                        self.lblJjState.textFlow = (new egret.HtmlTextParser).parser("粉丝集结号 (<font color=#ff0000>不可集结 " + Tools.getInstance().formatTime2(t) + "</font>)");
                        if (t <= 0) {
                            clearInterval(self.timeVar);
                            self.lblJjState.text = "粉丝集结号(发起集结)";
                            task.AggregationIcon1.Allobj["date"] = 0;
                        }
                    }, 980, this);
                    self.lblJjState.textFlow = (new egret.HtmlTextParser).parser("粉丝集结号 (<font color=#ff0000>不可集结 " + Tools.getInstance().formatTime2(djs) + "</font>)");
                }
            }
            else {
                if (task.AggregationIcon1.Allobj && task.AggregationIcon1.Allobj["time"]) {
                    this.lblJjState.text = "粉丝集结号(集结中)";
                }
                else {
                    this.lblJjState.text = "粉丝集结号(发起集结)";
                }
            }
        };
        p.help = function (e) {
            var obj = e.data;
            if (obj["state"] == "open") {
                switch (obj["type"] + "") {
                    case "1":
                        this.groupTip1.visible = true;
                        console.log('open1');
                        break;
                    case "3":
                        this.groupTip3.visible = true;
                        console.log('open3');
                        break;
                }
            }
            else {
                switch (obj["type"] + "") {
                    case "1":
                        this.groupTip1.visible = false;
                        console.log('close1');
                        break;
                    case "3":
                        this.groupTip3.visible = false;
                        console.log('close3');
                        break;
                }
            }
        };
        p.signOK = function (e) {
            console.log('签到成功:', e.data);
            var obj = e.data;
            var self = this;
            var addJY = this.obj["signInfo"]["each_sign_group_exp"];
            this.lblSignNum.text = this.obj["signedUserArray"].length + "/" + this.obj["groupInfo"]["member_num"];
            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
            GameApp.Manager.viewManager.gameMainUI.setLucky();
            if (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"] >= this.obj["groupInfo"]["need_exp"]) {
                this.lblExp.text = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"] - this.obj["groupInfo"]["need_exp"]) + "/" + this.obj["groupInfo"]["next_exp"] + "";
                this.pro1.slideDuration = 0;
                this.pro1.value = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"] - this.obj["groupInfo"]["need_exp"]) / this.obj["groupInfo"]["next_exp"] * 100;
                this.obj["groupInfo"]["level"] = this.obj["groupInfo"]["level"] + 1;
                this.iconNow.setText(this.obj["groupInfo"]["level"]);
                this.iconNext.setText(this.obj["groupInfo"]["level"] + 1);
                this.obj["groupInfo"]["exp"] = (this.obj["groupInfo"]["exp"] + addJY - this.obj["groupInfo"]["need_exp"]);
                this.obj["groupInfo"]["need_exp"] = this.obj["groupInfo"]["next_exp"];
                setTimeout(function () {
                    self.pro1.slideDuration = 1500;
                }, this);
            }
            else {
                this.lblExp.text = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"]) + "/" + this.obj["groupInfo"]["need_exp"] + "";
                this.pro1.value = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"]) / this.obj["groupInfo"]["need_exp"] * 100;
                this.obj["groupInfo"]["exp"] = (this.obj["groupInfo"]["exp"] + addJY);
            }
        };
        p.addGroupExp = function (obj) {
            var self = this;
            if (obj["group_exp"] < this.obj["groupInfo"]["exp"]) {
                this.pro1.slideDuration = 0;
                setTimeout(function () {
                    self.pro1.slideDuration = 1500;
                }, this);
            }
            this.obj["groupInfo"]["exp"] = obj["group_exp"];
            this.obj["groupInfo"]["level"] = obj["group_level"];
            this.obj["groupInfo"]["need_exp"] = obj["group_need_exp"];
            this.obj["groupInfo"]["next_exp"] = obj["group_next_exp"];
            this.lblExp.text = (this.obj["groupInfo"]["exp"]) + "/" + this.obj["groupInfo"]["need_exp"] + "";
            this.pro1.value = (this.obj["groupInfo"]["exp"]) / this.obj["groupInfo"]["need_exp"] * 100;
            this.iconNow.setText(this.obj["groupInfo"]["level"]);
            this.iconNext.setText(this.obj["groupInfo"]["level"] + 1);
        };
        p.btn1_tap = function () {
            GameApp.Manager.controllerManager.taskController.hide();
            GameApp.Manager.controllerManager.signController.show(1);
        };
        p.btn2_tap = function (e) {
            console.log(task.AggregationIcon1.Allobj, "点击");
            if (task.AggregationIcon1.Allobj["date"] > 0) {
                return;
            }
            else {
                if (task.AggregationIcon1.Allobj["time"]) {
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(1, 2);
                }
                else {
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(1, 1);
                }
            }
        };
        p.btn3_tap = function () {
            GameApp.Manager.viewManager.taskManager.giftCfManager.show(1);
            GameApp.Manager.controllerManager.taskController.hide();
        };
        p.btnGroupRank_tap = function () {
            GameApp.Manager.controllerManager.rankGroupController.show();
            GameApp.Manager.controllerManager.taskController.hide();
        };
        p.btnGXRank_tap = function () {
            GameApp.Manager.controllerManager.rankGroupContributionController.show(1);
            GameApp.Manager.controllerManager.taskController.hide();
        };
        p.load_end = function (s) {
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
                if (len < 84) {
                    newStr += str[i];
                }
            }
            return newStr;
        };
        p.clear = function () {
            this.scroll1.viewport.scrollV = 0;
            clearInterval(this.timeVar);
            this.clearTaskOpen();
            this.clearMRT();
        };
        p.clearTaskOpen = function () {
            while (this.taskOpenArr.length > 0) {
                var item = this.taskOpenArr.pop();
                task.TaskOpen.reclaim(item);
                if (item.parent)
                    item.parent.removeChild(item);
            }
        };
        p.clearMRT = function () {
            while (this.groupMRT.numElements > 0) {
                var item1 = this.groupMRT.getElementAt(this.groupMRT.numElements - 1);
                task.TaskHallofFame.reclaim(item1);
                if (item1.parent)
                    item1.parent.removeChild(item1);
            }
        };
        p.forwardMain = function (e) {
            this.close();
        };
        p.close = function () {
            this.pro1.value = 0;
            this.groupOne.y = 355;
            this.groupBottom.y = 355;
            this.groupTip1.visible = false;
            this.groupTip3.visible = false;
            this.close2();
            GameApp.Manager.controllerManager.gameMainController.show();
            GameApp.Manager.controllerManager.taskController.hide();
        };
        p.close2 = function () {
            this.groupR.visible = false;
            this.rectTip.visible = false;
        };
        TaskUI.isCanByLiBao = false;
        TaskUI.stars_guard_valid = false;
        return TaskUI;
    }(eui.Component));
    task.TaskUI = TaskUI;
    egret.registerClass(TaskUI,'task.TaskUI');
})(task || (task = {}));
