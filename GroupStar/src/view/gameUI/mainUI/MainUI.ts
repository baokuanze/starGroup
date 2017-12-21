module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
    export class MainUI extends eui.Component {

        private rectBack: eui.Rect;
        public liveChateState: number = -1; // 直播状态、 0 海报 1 直播 2 关闭
        private lblStarRank: eui.Label;//明星排行
        private lblStarRank1: eui.Label;//明星排行
        private lblGroupName: eui.Label;
        private lblGroupRank: eui.Label;
        private lblGroupName1: eui.Label;
        private lblGroupRank1: eui.Label;
        private lbl1: eui.Label;
        private lbl1_1: eui.Label;
        private lblj1: eui.Label;
        private lblj2: eui.Label;

        private rectGroupLevel: eui.Rect;
        private rectStarBack: eui.Rect;
        private bmpStarIcon: eui.Image;
        private bmpStarIconMask: eui.Rect;
        private groupUI: eui.Group;
        private groupBottom: eui.Group;
        private groupBottom1: eui.Group;
        private groupBottom2: eui.Group;
        private groupBottom1_1: eui.Group;
        private groupBottom1_2: eui.Group;
        private groupRank: eui.Group;
        private groupStarRank: eui.Group;
        private groupJiTip: eui.Group;
        private lblJiTip: eui.Label;
        public barrageManager: barrage.BarrageMananger;//大弹幕
        public mbarrageUI: mbarrage.MBarrageUI;//小弹幕
        private btnClose: eui.Image;
        private btn_MonthBan: eui.Image;
        private btnGift: eui.Image;
        private btnQiandao: eui.Image;
        private btnJieji: eui.Image;
        private btnZhongchou: eui.Image;
        private btnMore: eui.Image;

        private groupLive: eui.Group;
        private btnZhibo: eui.Image;
        private lblLiveTitle: eui.Label;
        private lblLiveTime: eui.Label;
        private btnSelf: BtnMain;

        private img_btnPro: eui.Image;
        private rect_btnHeadLines: eui.Image;
        private lable_jujiao: eui.Label;
        private lable_jujiao0: eui.Label;
        private pointArr: Array<Object> = [
            { id: 1,x: 375,y: 786.5,bo: true },
            { id: 2,x: 375,y: 756.5,bo: true },
            { id: 3,x: 375,y: 726.5,bo: true },
            { id: 4,x: 375,y: 696.5,bo: true }
        ];
        //数据
        public data: Object;
        private issatartx: boolean = true;
        //关注
        public follow: follow.Follow;
        private group_follow: eui.Group;
        private lable_sendDiamod: eui.Label;
        private lable_sendDiamod1: eui.Label;
        private img_follow: eui.Image;
        private group_sweepsTakes:eui.Group;
        private rect_Sweepstakes:eui.Image;
        private lb2:eui.Label;
        private lb3:eui.Label;
        private btn_buyTicket:eui.Image;
        //海泉
        public alertHaiQue:buyTicketActive.AlertBuyTicket;
        public Publish: Publish.NewPublish;
        

        public constructor() {
            super();
            this.skinName = "src/view/gameUI/mainUI/MainUISkin.exml";
            this.barrageManager = new barrage.BarrageMananger(this);
            this.mbarrageUI = new mbarrage.MBarrageUI();
            this.alertHaiQue = new buyTicketActive.AlertBuyTicket();
            this.Publish = new Publish.NewPublish();
            this.alertHaiQue.x = 0;this.alertHaiQue.y = 0;
            
            this.btnGift.x = 25; this.btnGift.y = 20;
            this.follow = new follow.Follow();
            this.follow.x = 0; this.follow.y = 0;
            this.Publish.x = 0;
            this.Publish.y = 0;
        }
        
        public childrenCreated(): void {
            this.getUrlAttribute('is_owner');
            this.addChild(this.mbarrageUI);
            this.addChild(this.groupJiTip);
            if(Tools.getInstance().isIphone()) {
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
            this.groupBottom.y = this.stage.stageHeight - 155;//设置下部Y轴
            this.groupBottom2.y = this.stage.stageHeight - 155;
            this.groupBottom1.y = this.stage.stageHeight - 120;
            this.groupJiTip.y = this.groupBottom1.y - 120;
            this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gift_tap,this);
            this.btnQiandao.addEventListener(egret.TouchEvent.TOUCH_TAP,this.qiandao_tap,this);
            this.btnJieji.addEventListener(egret.TouchEvent.TOUCH_TAP,this.jijie,this);
            this.btnZhongchou.addEventListener(egret.TouchEvent.TOUCH_TAP,this.zhongchou_tap,this);
            this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e) {
                GameApp.Manager.controllerManager.gameMainController.hide();
                this.forwardTask(e);
            },this);
            this.groupRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankGroupContribution_tap,this);
            this.groupStarRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankStar_tap,this);

            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close_tap,this);
            this.rectBack.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.thistap,this);
            var self: MainUI = this;
            this.btn_MonthBan.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                self.comeMonthRank();
            },this);

            this.groupBottom1_1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.joinStar_tap,this);
            this.groupBottom1_2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.joinGroup_tap,this);
            this.groupLive.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                if(live.LiveChatRoomUI.obj && (live.LiveChatRoomUI.obj["state"] == 1 || live.LiveChatRoomUI.obj["state"] == 0)) {
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.viewManager.liveChatRoomManager.show(GameApp.Manager.viewManager.gameMainUI.mainUI.liveChateState);
                }
            },this);
            this.rect_btnHeadLines.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                GameApp.Manager.controllerManager.headLinesController.show(1,1,1);
                GameApp.Manager.controllerManager.gameMainController.hide();
            },this);
            this.group_follow.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                this.addChild(self.follow);
            },this);
            this.rect_Sweepstakes.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.sweepsTasksController.show();
            },this)
                
            this.btn_buyTicket.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var self:MainUI = this;
                if(GameApp.Manager.dataManager.uid == 12900){
                    GameApp.Manager.controllerManager.buyTicketActiveController.show();
                    GameApp.Manager.controllerManager.gameMainController.hide();
                }else{
                    self.alertHaiQue.setData();
                    self.addChild(self.alertHaiQue);
                }
            },this);
        }
        /*
         * 进入月榜
         */
        public comeMonthRank(): void {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.monthTieController.show(GameApp.Manager.dataManager.mts,"main");
        }

        public qiandao_tap(e: egret.Event): void {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.signController.show(0);
        }
        public jijie_tap(e: egret.Event): void {
            this.jijie(e);
        }
        public zhongchou_tap(e: egret.Event): void {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.viewManager.taskManager.giftCfManager.show(0);
        }
        private thistap(e: egret.TouchEvent): void {
            var self: MainUI = this;
            this.opentx(e.stageX,e.stageY,GameApp.Manager.dataManager.user_pic);
            if(self.issatartx) {
                self.issatartx = false;
                socketio.IoConnect.getInstance().sendMessage(data.PomeloData.opentx,{ x: e.stageX,y: e.stageY },function(data: Object) {
                },this);
                setTimeout(function() {
                    self.issatartx = true;
                },2000);
            }
        }
        public opentx(_x: number,_y: number,pic: string): void {
            var item: StarTx = StarTx.produce();
            this.addChild(item);
            item.setData(pic);
            item.x = _x; item.y = _y;
        }
        private close_tap(): void {//访客进入 返回上一个页面
            socketio.IoConnect.getInstance().disconnect();
            if(GameApp.Manager.dataManager.visitor == 1) {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.viewManager.starPageManager.show(GameApp.Manager.dataManager.reset);

            } else if(GameApp.Manager.dataManager.visitor == 2) {
                GameApp.Manager.dataManager.entenVisiter = 0;
                GameApp.Manager.controllerManager.start();
            }
        }
        public setStar(n: string): void {//给当前钻石赋值
        }
        public disZC(obj: Object,star: Object): void {//显示众筹
            switch(obj["crowdfunding_id"]) {
                case 1: zfdy.Zfdy1.open(obj,star); break;
                case 2: zfdy.Zfdy2.open(obj,star); break;
                case 3: zfdy.Zfdy3.open(obj,star); break;
                case 4: zfdy.Zfdy4.open(obj,star); break;
                case 5: zfdy.Zfdy5.open(obj,star); break;
                case 6: zfdy.Zfdy6.open(obj,star); break;
                case 7: zfdy.Zfdy7.open(obj,star); break;
                case 8: zfdy.Zfdy8.open(obj,star); break;
                case 9: zfdy.Zfdy9.open(obj,star); break;
                case 10: zfdy.Zfdy10.open(obj,star); break;
                case 11: zfBag.Zfdy11.open(obj,star); break;
                case 12: zfBag.Zfdy12.open(obj,star); break;
            }
        }
        public static init(obj: Object): void {
            if(obj) {
                if(obj["state"] == 2) {
                    GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = false;
                } else if(obj["state"] == 0) {
                    GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = true;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.liveChateState = 0;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.img_btnPro.visible = true;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.btnZhibo.visible = false;

                } else if(obj["state"] == 1) {
                    GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = true;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.liveChateState = 1;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.img_btnPro.visible = false;
                    GameApp.Manager.viewManager.gameMainUI.mainUI.btnZhibo.visible = true;
                }
                live.LiveChatRoomUI.setData(obj);
                GameApp.Manager.viewManager.gameMainUI.mainUI.lblLiveTitle.text = window["hexToDec"](obj["title"]);
                GameApp.Manager.viewManager.gameMainUI.mainUI.lblLiveTime.text = "时间: " + Tools.getInstance().getMonth(obj["begin_time"]) + " " + Tools.getInstance().getHour(obj["begin_time"]) + "-" + Tools.getInstance().getHour(obj["finish_time"]);
            } else {
                GameApp.Manager.viewManager.gameMainUI.mainUI.groupLive.visible = false;
            }
        }
        
        
        /*
        * 钻石闪烁
        */
        private nt: number = 0;
        private nindex: number = 1;
        private maxt: number = 0;
        private tx(ct: number): void {
            this.nt += ct;
            if(this.nt >= this.maxt) {
                this.nt = 0;
                this.nindex++;
                this.img_follow.source = "" + this.nindex;
                if(this.nindex == 15) {
                    this.nindex = 0;
                    this.maxt = 1000;
                } else {
                    this.maxt = 100;
                }
            }
        }
        

        public setData(obj: Object): void {
            
            this.addChild(this.Publish);
            this.group_sweepsTakes.visible = false;
            if(GameApp.Manager.dataManager.haiquan == 0){
            }else{
                this.addChild(this.alertHaiQue);
            }
            if(GameApp.Manager.dataManager.isFollower == 1) {
                this.group_follow.visible = true;
                egret.Ticker.getInstance().register(this.tx,this);
                this.img_follow.source = "1";
                this.maxt = 1000;
            } else {
                this.group_follow.visible = false;
            }
            
            if(GameApp.Manager.dataManager.monthly_ts > 0) {
                this.btn_MonthBan.visible = true;
            } else {
                this.btn_MonthBan.visible = false;
            }
            this.mbarrageUI.clear();
            this.data = obj;
            if(GameApp.Manager.dataManager.visitor == 1 || GameApp.Manager.dataManager.visitor == 2) {
                //访客显示
                this.groupRank.visible = false;
                this.groupBottom.visible = false;
                this.btnGift.visible = false;
                this.btnClose.visible = true;
                this.groupBottom1.visible = true;
                this.groupBottom2.visible = false;
                if(GameApp.Manager.dataManager.visitor == 2) {//已入驻访问访客
                    this.lblj2.text = obj["group_num"] + "个群已入驻";
                    this.groupBottom1_1.visible = false;
                    this.groupBottom1_2.visible = true;
                    this.groupBottom1_2.x = 236;
                } else {//为入驻访问访客
                    this.groupBottom1_1.visible = true;
                    this.groupBottom1_2.visible = true;
                    this.groupBottom1_1.x = 61;
                    this.groupBottom1_2.x = 416;
                    this.lblj2.text = obj["group_num"] + "个群已入驻";
                }
            } else {
                //正常显示  
                this.groupRank.visible = true;
                this.groupBottom.visible = true;
                this.btnGift.visible = true;
                this.btnClose.visible = false;
                this.groupBottom1.visible = false;
                this.groupBottom2.visible = true;
            }
            RES.getResByUrl(obj["head_img"],function(s: egret.Texture) { this.bmpStarIcon.source = s; },this,RES.ResourceItem.TYPE_IMAGE);
            GameApp.Manager.dataManager.hot = obj["hot"];
            this.lblStarRank.text = "NO." + obj["star_rank"] + "";
            this.lblGroupName.text = window["hexToDec"](obj["group_name"]);
            if(obj["group_rank"] > 0) {
                this.lblGroupRank.text = "群排名 " + obj["group_rank"] + " >";
            } else {
                this.lblGroupRank.text = "未进榜 >";
            }

            this.lblStarRank1.text = "NO." + obj["star_rank"] + "";
            this.lblGroupName1.text = window["hexToDec"](obj["group_name"]);
            this.lblGroupRank1.text = this.lblGroupRank.text;

            this.mbarrageUI.adds(obj["lastMsg"]);
            if(obj["activity"] == 1) {
                containmoney.ContainmoneyUI.getInstance().saveActivePackets("activity");
            }
            //群主奖励--
            system.GroupReward.getInstance().show(obj["owner_reward"]);
            
            if(!obj["owner_reward"] || !obj["owner_reward"]['canReward']){
                if(GameApp.Manager.dataManager.buluo != 0) {
                    var str = '您在部落中有' + GameApp.Manager.dataManager.buluo + '个幸运星，已自动转换为钻石'
                    aler.AlertPanel1.getInstance().show('',str,'',function() {
                    },this)
                }
            }
            containmoney.ContainmoneyUI.getInstance().addRedPackets();
        }
        public setData1(): void {
//            this.btn_buyTicket.visible = false;
//            if(GameApp.Manager.dataManager.haiquan == 0) {
//                this.btn_buyTicket.visible = true;
//            } else {
//                this.btn_buyTicket.visible = true;
//            }
            containmoney.ContainmoneyUI.getInstance().addRedPackets();
            if(GameApp.Manager.dataManager.monthly_ts > 0) {
                this.btn_MonthBan.visible = true;
            } else {
                this.btn_MonthBan.visible = false;
            }
            
            if(GameApp.Manager.dataManager.isFollower == 1) {
                this.group_follow.visible = true;
                egret.Ticker.getInstance().register(this.tx,this);
                this.img_follow.source = "1";
                this.maxt = 1000;
            } else {
                this.group_follow.visible = false;
            }
            
        }

        public setLevel(level: number): void {
        }
        public updata(ct: number): void {
            this.mbarrageUI.update(ct);
        }
        private joinGroup_tap(e: egret.Event): void {//加入粉丝团
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.rankGroupContributionController.show(0);
        }
        // 1 先判断是不是集结，如果running == 1 集结中 == -1 没有集结
        private jijie(e: egret.Event): void {
            if(task.AggregationIcon1.Allobj["date"] > 0) {//冷却中
                egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.jijieTipclose,this);
                var task_time = task.AggregationIcon1.Allobj["date"];
                var task_timeJilu = new Date().getTime();
                var djs: number = task_time - (task_timeJilu - task.AggregationIcon1.crrentTime);
                var t: number = djs - (new Date().getTime() - task_timeJilu);
                if(t > 0) {
                    this.groupJiTip.visible = true;
                    this.lblJiTip.textFlow = (new egret.HtmlTextParser).parser("集结还有 <font color=#00abec>" + Tools.getInstance().formatTime2(t) + "</font> 开始");
                    egret.Tween.removeTweens(this.groupJiTip);
                    egret.Tween.get(this.groupJiTip).wait(3000).call(function() {
                        this.jijieTipclose(null);
                    },this);
                } else {
                    task.AggregationIcon1.Allobj["date"] = 0;
                    this.jijie(null);
                }
            } else {//可集结
                if(task.AggregationIcon1.Allobj["time"]) { //集结中
                    this.groupJiTip.visible = false;
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(0,2);
                } else {
                    this.groupJiTip.visible = false; //可集结
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(0,1);
                }
            }
            if(e)
                e.stopPropagation();
        }
        private jijieTipclose(e: egret.Event): void {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.jijieTipclose,this);
            this.groupJiTip.visible = false;
        }
        private joinStar_tap(e: egret.Event): void {//入驻明星
            if(GameApp.Manager.dataManager.visitor == 1) {
                this.getUrlAttribute('is_owner');
                if(GameApp.Manager.dataManager.is_owner) { //判断是不是群主 
                    aler.AlertPanel.getInstance().show('温馨提示','本群只有一次选择机会，确认入驻？','取消','确认',function(t) {
                        if(t == 'ok') {
                            GameApp.Manager.viewManager.gameMainManager.joinStar(function() { });
                        }
                    });
                } else {
                    aler.AlertPanel.getInstance().show('温馨提示','确认入驻此明星粉丝团？','取消','确认',function(t) {
                        if(t == 'ok') {
                            GameApp.Manager.viewManager.gameMainManager.joinStar(function() { });
                        }
                    });
                }
            } else {
                this.joinGroup_tap(null);
            }
            e.stopPropagation();
        }
        public getUrlAttribute(name): void {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if(r != null)
                context = r[2];
            reg = null;
            r = null;
            context == null || context == "" || context == "undefined" ? "" : context;
            context == '1' ? GameApp.Manager.dataManager.is_owner = true : GameApp.Manager.dataManager.is_owner = false;

        }
        private canSend: boolean = true;
        private gift_tap(e: egret.Event): void {//礼物按钮点击
            if(GameApp.Manager.dataManager.lucystar >= 8) {//this.selectItem.price
                var fid: number = 11;
                this.canSend = false;
                socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendFlower,{ id: fid },function(data: Object) {
                    flower.FlowerUI.listerFlower(data); this.canSend = true;
                    if(data['worksDrop']) {
                        var point = this.getPoint();
                        if(point) {
                            point["bo"] = false;
                            var collection = zfdy.Collection.produce();
                            collection.x = point['x'];
                            collection.y = point['y'];
                            collection.pid = point['id'];
                            console.log(collection.x,collection.y,"xy");
                            collection.scaleX = 0;
                            collection.scaleY = 0;
                            collection.anchorOffsetX = 390 / 2;
                            collection.anchorOffsetY = 190 / 2;
                            GameApp.Manager.viewManager.TopUIStage.addChild(collection);
                            collection.setData(data['worksDrop'],GameApp.Manager.dataManager.star_name);
                            collection.addEventListener("END",this.end,this);
                        }
                    }
                },this);
            } else {
                aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                    if(data == "ok") {
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide,0);
                    }
                },this);
            }
            e.stopPropagation();
        }

        public end(e: egret.Event): void {
            var item: zfdy.Collection = e.data;
            var point: Object = this.getPointById(item.pid);
            point["bo"] = true;
            zfdy.Collection.reclaim(item);
            if(item.parent) {
                item.parent.removeChild(item);
            }
        }

        private getPointById(pid: number): Object {
            var ret: Object = null;
            for(var i in this.pointArr) {
                var obj: Object = this.pointArr[i];
                if(obj["id"] == pid) {
                    ret = obj;
                    break;
                }
            }
            return ret;
        }

        private getPoint(): Object {
            var ret: Object = null;
            for(var i in this.pointArr) {
                var obj: Object = this.pointArr[i];
                if(obj["bo"] == true) {
                    ret = obj;
                    break;
                }
            }
            return ret;
        }


        private rankTopTen_tap(e: egret.Event): void {//粉丝前十排行
            GameApp.Manager.controllerManager.rankGroupController.show();
            e.stopPropagation();
        }
        public rankStar_tap(e: egret.Event = null): void {//明星排行
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.rankStarController.show();
            if(e)
                e.stopPropagation();
        }
        public rankGroupContribution_tap(e: egret.Event = null): void {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.rankGroupContributionController.show(0);
            if(e)
                e.stopPropagation();
        }
        private forwardTask(e: egret.Event): void { //跳转任务
            if(GameApp.Manager.dataManager.visitor > 0) {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.rankGroupContributionController.show(0);
            } else {
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.taskController.show(-1);
            }
            e.stopPropagation();
        }
        private fs_tap(e: egret.Event): void {//分享
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/cho_star",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                switch(obj["st"]) {
                    case 1: break;
                    case 2: break;
                    case 3:
                        system.Share.share(obj,function() { });
                        break;
                }
            },true,this);

            e.stopPropagation();
        }
        public setHot(id: number): void {
            var r: number = 0;
            switch(id) {
                case 1: r = 1; break;
                case 2: r = 8; break;
                case 3: r = 88; break;
                case 4: r = 288; break;
                case 5: r = 888; break;
                case 6: r = 0; break;
            }
            GameApp.Manager.dataManager.hot += r;
            //            this.lblHot.text = "热度:" + GameApp.Manager.dataManager.hot;
        }
        public setHotNum(r: number): void {
            GameApp.Manager.dataManager.hot = r;
            //            this.lblHot.text = "热度:" + GameApp.Manager.dataManager.hot;
        }
        public resize(): void {
        }
        public clear(): void {
            if(GameApp.Manager.dataManager.isFollower == 1) {
                egret.Ticker.getInstance().unregister(this.tx,this);
            }
            //            containmoney.ContainmoneyUI.getInstance().removeAll();
        }
    }
}
