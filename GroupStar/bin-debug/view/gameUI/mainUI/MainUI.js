var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var MainUI = (function (_super) {
        __extends(MainUI, _super);
        function MainUI() {
            _super.call(this);
            this.liveChateState = -1; // 直播状态、 0 海报 1 直播 2 关闭
            this.pointArr = [
                { id: 1, x: 375, y: 786.5, bo: true },
                { id: 2, x: 375, y: 756.5, bo: true },
                { id: 3, x: 375, y: 726.5, bo: true },
                { id: 4, x: 375, y: 696.5, bo: true }
            ];
            this.issatartx = true;
            /*
            * 钻石闪烁
            */
            this.nt = 0;
            this.nindex = 1;
            this.maxt = 0;
            this.canSend = true;
            this.skinName = "src/view/gameUI/mainUI/MainUISkin.exml";
            this.barrageManager = new barrage.BarrageMananger(this);
            this.mbarrageUI = new mbarrage.MBarrageUI();
            this.alertHaiQue = new buyTicketActive.AlertBuyTicket();
            this.Publish = new Publish.NewPublish();
            this.alertHaiQue.x = 0;
            this.alertHaiQue.y = 0;
            this.btnGift.x = 25;
            this.btnGift.y = 20;
            this.follow = new follow.Follow();
            this.follow.x = 0;
            this.follow.y = 0;
            this.Publish.x = 0;
            this.Publish.y = 0;
        }
        var d = __define,c=MainUI,p=c.prototype;
        p.childrenCreated = function () {
            this.getUrlAttribute('is_owner');
            this.addChild(this.mbarrageUI);
            this.addChild(this.groupJiTip);
            if (Tools.getInstance().isIphone()) {
                this.lblGroupName.fontFamily = "Heiti SC";
                this.lblGroupRank.fontFamily = "Heiti SC";
                this.lblStarRank.fontFamily = "Heiti SC";
                this.lblGroupName1.fontFamily = "Heiti SC";
                this.lblGroupRank1.fontFamily = "Heiti SC";
                this.lblStarRank1.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl1_1.fontFamily = "Heiti SC";
                this.lblj1.fontFamily = "Heiti SC";
                this.lblj2.fontFamily = "Heiti SC";
                this.lblJiTip.fontFamily = "Heiti SC";
                this.lblLiveTitle.fontFamily = "Heiti SC";
                this.lblLiveTime.fontFamily = "Heiti SC";
                this.lable_jujiao.fontFamily = "Heiti SC";
                this.lable_jujiao0.fontFamily = "Heiti SC";
                this.lable_sendDiamod.fontFamily = "Heiti SC";
                this.lable_sendDiamod1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
            }
            this.groupLive.y = this.mbarrageUI.y - 130;
            this.btn_buyTicket.y = this.mbarrageUI.y - 130;
            this.bmpStarIcon.mask = this.bmpStarIconMask;
            this.groupJiTip.visible = false;
            this.groupBottom.touchEnabled = true;
            this.groupBottom.y = this.stage.stageHeight - 155; //设置下部Y轴
            this.groupBottom2.y = this.stage.stageHeight - 155;
            this.groupBottom1.y = this.stage.stageHeight - 120;
            this.groupJiTip.y = this.groupBottom1.y - 120;
            this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gift_tap, this);
            this.btnQiandao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiandao_tap, this);
            this.btnJieji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jijie, this);
            this.btnZhongchou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zhongchou_tap, this);
            this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                GameApp.Manager.controllerManager.gameMainController.hide();
                this.forwardTask(e);
            }, this);
            this.groupRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankGroupContribution_tap, this);
            this.groupStarRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankStar_tap, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_tap, this);
            this.rectBack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.thistap, this);
            var self = this;
            this.btn_MonthBan.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.comeMonthRank();
            }, this);
            this.groupBottom1_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinStar_tap, this);
            this.groupBottom1_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinGroup_tap, this);
            this.groupLive.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (live.LiveChatRoomUI.obj && (live.LiveChatRoomUI.obj["state"] == 1 || live.LiveChatRoomUI.obj["state"] == 0)) {
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.viewManager.liveChatRoomManager.show(GameApp.Manager.viewManager.gameMainUI.mainUI.liveChateState);
                }
            }, this);
            this.rect_btnHeadLines.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.headLinesController.show(1, 1, 1);
                GameApp.Manager.controllerManager.gameMainController.hide();
            }, this);
            this.group_follow.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.addChild(self.follow);
            }, this);
            this.rect_Sweepstakes.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.sweepsTasksController.show();
            }, this);
            this.btn_buyTicket.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var self = this;
                if (GameApp.Manager.dataManager.uid == 12900) {
                    GameApp.Manager.controllerManager.buyTicketActiveController.show();
                    GameApp.Manager.controllerManager.gameMainController.hide();
                }
                else {
                    self.alertHaiQue.setData();
                    self.addChild(self.alertHaiQue);
                }
            }, this);
        };
        /*
         * 进入月榜
         */
        p.comeMonthRank = function () {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.monthTieController.show(GameApp.Manager.dataManager.mts, "main");
        };
        p.qiandao_tap = function (e) {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.signController.show(0);
        };
        p.jijie_tap = function (e) {
            this.jijie(e);
        };
        p.zhongchou_tap = function (e) {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.viewManager.taskManager.giftCfManager.show(0);
        };
        p.thistap = function (e) {
            var self = this;
            this.opentx(e.stageX, e.stageY, GameApp.Manager.dataManager.user_pic);
            if (self.issatartx) {
                self.issatartx = false;
                socketio.IoConnect.getInstance().sendMessage(data.PomeloData.opentx, { x: e.stageX, y: e.stageY }, function (data) {
                }, this);
                setTimeout(function () {
                    self.issatartx = true;
                }, 2000);
            }
        };
        p.opentx = function (_x, _y, pic) {
            var item = mainUI.StarTx.produce();
            this.addChild(item);
            item.setData(pic);
            item.x = _x;
            item.y = _y;
        };
        p.close_tap = function () {
            socketio.IoConnect.getInstance().disconnect();
            if (GameApp.Manager.dataManager.visitor == 1) {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.viewManager.starPageManager.show(GameApp.Manager.dataManager.reset);
            }
            else if (GameApp.Manager.dataManager.visitor == 2) {
                GameApp.Manager.dataManager.entenVisiter = 0;
                GameApp.Manager.controllerManager.start();
            }
        };
        p.setStar = function (n) {
        };
        p.disZC = function (obj, star) {
            switch (obj["crowdfunding_id"]) {
                case 1:
                    zfdy.Zfdy1.open(obj, star);
                    break;
                case 2:
                    zfdy.Zfdy2.open(obj, star);
                    break;
                case 3:
                    zfdy.Zfdy3.open(obj, star);
                    break;
                case 4:
                    zfdy.Zfdy4.open(obj, star);
                    break;
                case 5:
                    zfdy.Zfdy5.open(obj, star);
                    break;
                case 6:
                    zfdy.Zfdy6.open(obj, star);
                    break;
                case 7:
                    zfdy.Zfdy7.open(obj, star);
                    break;
                case 8:
                    zfdy.Zfdy8.open(obj, star);
                    break;
                case 9:
                    zfdy.Zfdy9.open(obj, star);
                    break;
                case 10:
                    zfdy.Zfdy10.open(obj, star);
                    break;
                case 11:
                    zfBag.Zfdy11.open(obj, star);
                    break;
                case 12:
                    zfBag.Zfdy12.open(obj, star);
                    break;
            }
        };
        MainUI.init = function (obj) {
            if (obj) {
                if (obj["state"] == 2) {
                    GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = false;
                }
                else if (obj["state"] == 0) {
                    GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = true;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.liveChateState = 0;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.img_btnPro.visible = true;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.btnZhibo.visible = false;
                }
                else if (obj["state"] == 1) {
                    GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = true;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.liveChateState = 1;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.img_btnPro.visible = false;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.btnZhibo.visible = true;
                }
                live.LiveChatRoomUI.setData(obj);
                GameApp.Manager.viewManager.gameMainUI.mainUI.lblLiveTitle.text = window["hexToDec"](obj["title"]);
                GameApp.Manager.viewManager.gameMainUI.mainUI.lblLiveTime.text = "时间: " + Tools.getInstance().getMonth(obj["begin_time"]) + " " + Tools.getInstance().getHour(obj["begin_time"]) + "-" + Tools.getInstance().getHour(obj["finish_time"]);
            }
            else {
                GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = false;
            }
        };
        p.tx = function (ct) {
            this.nt += ct;
            if (this.nt >= this.maxt) {
                this.nt = 0;
                this.nindex++;
                this.img_follow.source = "" + this.nindex;
                if (this.nindex == 15) {
                    this.nindex = 0;
                    this.maxt = 1000;
                }
                else {
                    this.maxt = 100;
                }
            }
        };
        p.setData = function (obj) {
            this.addChild(this.Publish);
            this.group_sweepsTakes.visible = false;
            if (GameApp.Manager.dataManager.haiquan == 0) {
            }
            else {
                this.addChild(this.alertHaiQue);
            }
            if (GameApp.Manager.dataManager.isFollower == 1) {
                this.group_follow.visible = true;
                egret.Ticker.getInstance().register(this.tx, this);
                this.img_follow.source = "1";
                this.maxt = 1000;
            }
            else {
                this.group_follow.visible = false;
            }
            if (GameApp.Manager.dataManager.monthly_ts > 0) {
                this.btn_MonthBan.visible = true;
            }
            else {
                this.btn_MonthBan.visible = false;
            }
            this.mbarrageUI.clear();
            this.data = obj;
            if (GameApp.Manager.dataManager.visitor == 1 || GameApp.Manager.dataManager.visitor == 2) {
                //访客显示
                this.groupRank.visible = false;
                this.groupBottom.visible = false;
                this.btnGift.visible = false;
                this.btnClose.visible = true;
                this.groupBottom1.visible = true;
                this.groupBottom2.visible = false;
                if (GameApp.Manager.dataManager.visitor == 2) {
                    this.lblj2.text = obj["group_num"] + "个群已入驻";
                    this.groupBottom1_1.visible = false;
                    this.groupBottom1_2.visible = true;
                    this.groupBottom1_2.x = 236;
                }
                else {
                    this.groupBottom1_1.visible = true;
                    this.groupBottom1_2.visible = true;
                    this.groupBottom1_1.x = 61;
                    this.groupBottom1_2.x = 416;
                    this.lblj2.text = obj["group_num"] + "个群已入驻";
                }
            }
            else {
                //正常显示  
                this.groupRank.visible = true;
                this.groupBottom.visible = true;
                this.btnGift.visible = true;
                this.btnClose.visible = false;
                this.groupBottom1.visible = false;
                this.groupBottom2.visible = true;
            }
            RES.getResByUrl(obj["head_img"], function (s) { this.bmpStarIcon.source = s; }, this, RES.ResourceItem.TYPE_IMAGE);
            GameApp.Manager.dataManager.hot = obj["hot"];
            this.lblStarRank.text = "NO." + obj["star_rank"] + "";
            this.lblGroupName.text = window["hexToDec"](obj["group_name"]);
            if (obj["group_rank"] > 0) {
                this.lblGroupRank.text = "群排名 " + obj["group_rank"] + " >";
            }
            else {
                this.lblGroupRank.text = "未进榜 >";
            }
            this.lblStarRank1.text = "NO." + obj["star_rank"] + "";
            this.lblGroupName1.text = window["hexToDec"](obj["group_name"]);
            this.lblGroupRank1.text = this.lblGroupRank.text;
            this.mbarrageUI.adds(obj["lastMsg"]);
            if (obj["activity"] == 1) {
                containmoney.ContainmoneyUI.getInstance().saveActivePackets("activity");
            }
            //群主奖励--
            system.GroupReward.getInstance().show(obj["owner_reward"]);
            if (!obj["owner_reward"] || !obj["owner_reward"]['canReward']) {
                if (GameApp.Manager.dataManager.buluo != 0) {
                    var str = '您在部落中有' + GameApp.Manager.dataManager.buluo + '个幸运星，已自动转换为钻石';
                    aler.AlertPanel1.getInstance().show('', str, '', function () {
                    }, this);
                }
            }
            containmoney.ContainmoneyUI.getInstance().addRedPackets();
        };
        p.setData1 = function () {
            //            this.btn_buyTicket.visible = false;
            //            if(GameApp.Manager.dataManager.haiquan == 0) {
            //                this.btn_buyTicket.visible = true;
            //            } else {
            //                this.btn_buyTicket.visible = true;
            //            }
            containmoney.ContainmoneyUI.getInstance().addRedPackets();
            if (GameApp.Manager.dataManager.monthly_ts > 0) {
                this.btn_MonthBan.visible = true;
            }
            else {
                this.btn_MonthBan.visible = false;
            }
            if (GameApp.Manager.dataManager.isFollower == 1) {
                this.group_follow.visible = true;
                egret.Ticker.getInstance().register(this.tx, this);
                this.img_follow.source = "1";
                this.maxt = 1000;
            }
            else {
                this.group_follow.visible = false;
            }
        };
        p.setLevel = function (level) {
        };
        p.updata = function (ct) {
            this.mbarrageUI.update(ct);
        };
        p.joinGroup_tap = function (e) {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.rankGroupContributionController.show(0);
        };
        // 1 先判断是不是集结，如果running == 1 集结中 == -1 没有集结
        p.jijie = function (e) {
            if (task.AggregationIcon1.Allobj["date"] > 0) {
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jijieTipclose, this);
                var task_time = task.AggregationIcon1.Allobj["date"];
                var task_timeJilu = new Date().getTime();
                var djs = task_time - (task_timeJilu - task.AggregationIcon1.crrentTime);
                var t = djs - (new Date().getTime() - task_timeJilu);
                if (t > 0) {
                    this.groupJiTip.visible = true;
                    this.lblJiTip.textFlow = (new egret.HtmlTextParser).parser("集结还有 <font color=#00abec>" + Tools.getInstance().formatTime2(t) + "</font> 开始");
                    egret.Tween.removeTweens(this.groupJiTip);
                    egret.Tween.get(this.groupJiTip).wait(3000).call(function () {
                        this.jijieTipclose(null);
                    }, this);
                }
                else {
                    task.AggregationIcon1.Allobj["date"] = 0;
                    this.jijie(null);
                }
            }
            else {
                if (task.AggregationIcon1.Allobj["time"]) {
                    this.groupJiTip.visible = false;
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(0, 2);
                }
                else {
                    this.groupJiTip.visible = false; //可集结
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(0, 1);
                }
            }
            if (e)
                e.stopPropagation();
        };
        p.jijieTipclose = function (e) {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.jijieTipclose, this);
            this.groupJiTip.visible = false;
        };
        p.joinStar_tap = function (e) {
            if (GameApp.Manager.dataManager.visitor == 1) {
                this.getUrlAttribute('is_owner');
                if (GameApp.Manager.dataManager.is_owner) {
                    aler.AlertPanel.getInstance().show('温馨提示', '本群只有一次选择机会，确认入驻？', '取消', '确认', function (t) {
                        if (t == 'ok') {
                            GameApp.Manager.viewManager.gameMainManager.joinStar(function () { });
                        }
                    });
                }
                else {
                    aler.AlertPanel.getInstance().show('温馨提示', '确认入驻此明星粉丝团？', '取消', '确认', function (t) {
                        if (t == 'ok') {
                            GameApp.Manager.viewManager.gameMainManager.joinStar(function () { });
                        }
                    });
                }
            }
            else {
                this.joinGroup_tap(null);
            }
            e.stopPropagation();
        };
        p.getUrlAttribute = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            context == null || context == "" || context == "undefined" ? "" : context;
            context == '1' ? GameApp.Manager.dataManager.is_owner = true : GameApp.Manager.dataManager.is_owner = false;
        };
        p.gift_tap = function (e) {
            if (GameApp.Manager.dataManager.lucystar >= 8) {
                var fid = 11;
                this.canSend = false;
                socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendFlower, { id: fid }, function (data) {
                    flower.FlowerUI.listerFlower(data);
                    this.canSend = true;
                    if (data['worksDrop']) {
                        var point = this.getPoint();
                        if (point) {
                            point["bo"] = false;
                            var collection = zfdy.Collection.produce();
                            collection.x = point['x'];
                            collection.y = point['y'];
                            collection.pid = point['id'];
                            console.log(collection.x, collection.y, "xy");
                            collection.scaleX = 0;
                            collection.scaleY = 0;
                            collection.anchorOffsetX = 390 / 2;
                            collection.anchorOffsetY = 190 / 2;
                            GameApp.Manager.viewManager.TopUIStage.addChild(collection);
                            collection.setData(data['worksDrop'], GameApp.Manager.dataManager.star_name);
                            collection.addEventListener("END", this.end, this);
                        }
                    }
                }, this);
            }
            else {
                aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                    if (data == "ok") {
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide, 0);
                    }
                }, this);
            }
            e.stopPropagation();
        };
        p.end = function (e) {
            var item = e.data;
            var point = this.getPointById(item.pid);
            point["bo"] = true;
            zfdy.Collection.reclaim(item);
            if (item.parent) {
                item.parent.removeChild(item);
            }
        };
        p.getPointById = function (pid) {
            var ret = null;
            for (var i in this.pointArr) {
                var obj = this.pointArr[i];
                if (obj["id"] == pid) {
                    ret = obj;
                    break;
                }
            }
            return ret;
        };
        p.getPoint = function () {
            var ret = null;
            for (var i in this.pointArr) {
                var obj = this.pointArr[i];
                if (obj["bo"] == true) {
                    ret = obj;
                    break;
                }
            }
            return ret;
        };
        p.rankTopTen_tap = function (e) {
            GameApp.Manager.controllerManager.rankGroupController.show();
            e.stopPropagation();
        };
        p.rankStar_tap = function (e) {
            if (e === void 0) { e = null; }
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.rankStarController.show();
            if (e)
                e.stopPropagation();
        };
        p.rankGroupContribution_tap = function (e) {
            if (e === void 0) { e = null; }
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.rankGroupContributionController.show(0);
            if (e)
                e.stopPropagation();
        };
        p.forwardTask = function (e) {
            if (GameApp.Manager.dataManager.visitor > 0) {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.rankGroupContributionController.show(0);
            }
            else {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.taskController.show(-1);
            }
            e.stopPropagation();
        };
        p.fs_tap = function (e) {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/cho_star", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                switch (obj["st"]) {
                    case 1: break;
                    case 2: break;
                    case 3:
                        system.Share.share(obj, function () { });
                        break;
                }
            }, true, this);
            e.stopPropagation();
        };
        p.setHot = function (id) {
            var r = 0;
            switch (id) {
                case 1:
                    r = 1;
                    break;
                case 2:
                    r = 8;
                    break;
                case 3:
                    r = 88;
                    break;
                case 4:
                    r = 288;
                    break;
                case 5:
                    r = 888;
                    break;
                case 6:
                    r = 0;
                    break;
            }
            GameApp.Manager.dataManager.hot += r;
            //            this.lblHot.text = "热度:" + GameApp.Manager.dataManager.hot;
        };
        p.setHotNum = function (r) {
            GameApp.Manager.dataManager.hot = r;
            //            this.lblHot.text = "热度:" + GameApp.Manager.dataManager.hot;
        };
        p.resize = function () {
        };
        p.clear = function () {
            if (GameApp.Manager.dataManager.isFollower == 1) {
                egret.Ticker.getInstance().unregister(this.tx, this);
            }
            //            containmoney.ContainmoneyUI.getInstance().removeAll();
        };
        return MainUI;
    }(eui.Component));
    mainUI.MainUI = MainUI;
    egret.registerClass(MainUI,'mainUI.MainUI');
})(mainUI || (mainUI = {}));
