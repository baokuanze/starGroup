module socketio {
	/**
	 *
	 * @author 
	 *
	 */
    export class IoConnect {
        public static _intance: IoConnect = new IoConnect();
        public pomelo = window["pomelo"];
//        private host = "210.51.190.141";
        //        private port = "3014";
        public icount: number = 0; 
        public cl: boolean = false;
        public host = "115.159.190.186";
        private port = "3014";
//        private portArr: Array<string> = ["3014","3015","3016","3017","3018","3019","3020","3021"];
        public cltime: number = 0;
        public initbo: boolean = false;
        private gateTimer: any;
        private gateConnect: boolean = false;
        private bid;
        private uid;
        private timerVar:any;
        private fun:Function;
        private scope:any;
        public constructor() {
            window["ioconnect"] = this;
        }
        public static getInstance(): IoConnect {
            return this._intance;
        }
        public connectError(): void {
            //            console.log("重连gate");
            //            var self:IoConnect=this;
            //            setTimeout(function(){
            //                self.initPomelo(self.bid,self.uid);    
            //            },1000)
        }
        /*
            初始化pomelo
         */
        public initPomelo(bid,uid,fun:Function=null,scope:any=null): void {
            this.fun=fun;
            this.scope=scope;
            this.bid = bid; this.uid = uid;
            var self: IoConnect = this;
            this.pomelo = window["pomelo"];
            this.icount = 0;
            //this.port=this.portArr[Math.floor(Tools.getInstance().getRandomByNum(0,this.portArr.length))];
            this.pomelo.init({
                host: this.host,
                port: this.port,
                log: true
            },function() {
                console.log('链接gate:'+bid);
                self.pomelo.request("gate.gateHandler.queryEntry",{ uid: uid,bid: bid },function(data) {
                    //                    if(data["code"]==500){
                    //                        self.cltime = 0;
                    //                        self.cl = true;
                    //                        self.chonglian();
                    //                    }else{
                    if(data["code"] == 200) {
                        console.log(data,"初始化数据dta")
                        clearTimeout(self.timerVar);
                        self.gateConnect = true;
                        console.log('链接上gate 分配端口:' + data.host + " " + data.port + " uid:" + uid + " bid:" + bid,data);
                        //断开链接
                        self.pomelo.disconnect();
                        //链接分配的服务器
                        self.connectServer(data.host,data.port,{ uid: uid,bid: bid,plat_type: 1,group_openid: GameApp.Manager.dataManager.group_openid });
                    }else{
                        console.log("gete 失败",data);
                        self.cltime = 0;
                        self.cl = true;
                        self.chonglian();
                    }
                    //}
                });
            });
            clearTimeout(this.timerVar);
            this.timerVar=setTimeout(function() {
                if(!self.gateConnect) {
                    self.cltime = 0;
                    self.cl = true;
                    self.chonglian();
                }
            },2000);
        }
        //链接服务器
        public connectServer(host,port,param): void {
            console.log("链接服务器")
            var self: IoConnect = this;
            this.icount = 1;
            this.pomelo.init({
                host: host,
                port: port,
                log: true
            },function() {
                console.log('链接connector:',param);
                self.pomelo.request("connector.entryHandler.entry",param,function(res) {
                    if(res["code"]==200){
                        clearTimeout(self.timerVar);
                        self.gateConnect = true;
                        console.log("链接成功！",res);
                        if(self.fun){
                            self.fun.call(self.scope);
                            self.fun=null;self.scope=null;
                        }
                        var data: Object = JSON.parse(res["data"]);
                        var lastmsg: Object = data["last_msg"];
                        var lastCrowdfunding: Object = data["lastCrowdfundingOrMass"];
                        var surround: Object = data["surround"];
                        var redPackets: Array<string> = data["redPackets"];
                        var crowdfunding: Object = data["crowdfunding"];
                        var groupMass: Object = data["groupMass"];
                        var sign:Object=data["sign"];
                        var live:Object = data["star_live"];
                        var xuanGrop: Object = data["group_publicity"];
                        var can_buy_stars_guard_gift: number = data["can_buy_stars_guard_gift"];
                        var stars_guard_valid: number = data["stars_guard_valid"];
                        
                        if(Tools.getInstance().isObject(lastmsg)) {
                            console.log("lastmsg:",lastmsg);
                            self.onMessage(lastmsg,false);
                        }
                        if(lastCrowdfunding) {
                            console.log("lastCrowdfunding:",lastCrowdfunding);
                            GameApp.Manager.viewManager.gameMainUI.sendF(lastCrowdfunding,false);
                        }
                        if(Tools.getInstance().isObject(surround)) {//环绕数据 十个人
    //                        mainUI.HumenBarrage.getInstance().saveSurround(surround);
                        }
                        if(redPackets) {//红包
                            containmoney.ContainmoneyUI.getInstance().saveRedPackets(redPackets);
                        }
                        if(crowdfunding){
                            task.GiftCf.setData(crowdfunding);
                        }
                        if(sign){
                            signIn.SignInManager.init(sign);
                        }
                        if(xuanGrop){
                            groupXuan.TaskGroupXuan.init(xuanGrop);
                            rankGroupContribution.RankGroupContributionUI.groupsArr(xuanGrop);
                        }
                        
                        if(can_buy_stars_guard_gift == 1){//是否能买
                            pay.PayUI.isByGift = true;
                            task.TaskUI.changeCanBuy();
                        }
                        
                        if(stars_guard_valid == 1) { //第三个是否繁星
                            task.TaskUI.changePosOfTask();
                        }
                        
                        if(live){
                            mainUI.MainUI.init(live);
                        }
                        
                        if(groupMass) {     //集结
                            task.AggregationIcon1.setData(groupMass);
                            task.TaskManager.groupMass();
                        }
                        self.connectok(res);
                    }else{
                        console.log("connector 失败",res);
                        self.cltime = 0;
                        self.cl = true;
                        self.chonglian();
                    }
                });
            });
        }
        public disconnect():void{
            this.pomelo.disconnect();
        }
        public connectok(res): void {
            this.icount = 2;
            var self: IoConnect = this;
            if(!this.initbo) {
                this.initbo = true;
                this.pomelo.on("onMsg",this.onMessage);
                this.pomelo.on('error',function() {
                    console.log('error');
                });
                this.pomelo.on('onKick',function() {
                    console.log('onKick');
                });
                this.pomelo.on('close',function() {
                    console.log('close:' + self.cl);
                });
                this.pomelo.on('io-error',function() {
                    console.log('io-error');
                });
                this.pomelo.on('heartbeat timeout',function() {
                    console.log('heartbeat timeout');
                    var d: Date = new Date();
                    console.log('heartbeat timeout' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
                    self.cltime = 0;
                    self.cl = true;
                    self.chonglian();
                });
                GameApp.Manager.controllerManager.PomeloOK();
            }
            this.cl = false;
        }
        public chonglian(): void {
            if(this.cl) {
                this.icount = 0;
                console.log("断线重连中");
                this.gateConnect = false;
                //                GameApp.Manager.viewManager.gameMainUI.consoleSocket(GameApp.Manager.bb+" 断线重连");
                if(this.cltime == 0) {
                    this.cltime = 1000;
                    if(IoConnect.getInstance().icount != 2) {
                        socketio.IoConnect.getInstance().initPomelo(this.bid,GameApp.Manager.dataManager.uid,this.fun,this.scope);
                    } else {
                        socketio.IoConnect.getInstance().chonglian();
                    }
                } else {
                    setTimeout(function() {
                        if(IoConnect.getInstance().icount != 2) {
                            socketio.IoConnect.getInstance().initPomelo(this.bid,GameApp.Manager.dataManager.uid,this.fun,this.scope);
                        } else {
                            socketio.IoConnect.getInstance().chonglian();
                        }
                    },this.cltime)
                }
            }
        }
        /*
        接收消息
        */
        private onMessage(res,ml: boolean = true): void {
//            console.log("接收群体消息:",res);
            var obj: Object = JSON.parse(res["data"]);
            switch(res["type"]) {
                case data.PomeloData.sendFlower: //送礼
                    GameApp.Manager.viewManager.gameMainUI.sendF(obj,ml);//.mainUI1.sendF(JSON.parse(res["data"]));
                    break;
                case data.PomeloData.sendEgg://仍但
//                    obj["id"] = 0;
//                    GameApp.Manager.viewManager.gameMainUI.sendF(obj,ml);//.mainUI2.sendEgg(JSON.parse(res["data"]));
                    break;
                case data.PomeloData.liveInit:
                    mainUI.MainUI.init(obj);
                break;
                case data.PomeloData.receiveTalk://接受聊天
//                    GameApp.Manager.viewManager.gameMainUI.setGuardData(obj);
                    live.LiveTalkChat.receiveTalk(obj);
                    break;
//                case data.PomeloData.hitEggs1://砸蛋-系统
//                    GameApp.Manager.viewManager.gameMainUI.hitEggs(1,obj["key"]);
//                    break;
                case data.PomeloData.hongbao://红包
                    containmoney.ContainmoneyUI.getInstance().onMsg(obj);
                    break;
                case data.PomeloData.hongbaoClick://点击红包 
                    GameApp.Manager.viewManager.gameMainUI.mainUI.setHot(6);
                    containmoney.ContainmoneyOpen.getInstance().onMsg(obj);
                    break;
                case data.PomeloData.opentx:
                    if(obj["uid"]!=GameApp.Manager.dataManager.uid)
                    GameApp.Manager.viewManager.gameMainUI.mainUI.opentx(obj["x"],obj["y"],obj["user_pic"]);
                break;
                
                case data.PomeloData.receive:
                    task.AggregationIcon1.updateChangeValue(obj);
                break;
                
                case data.PomeloData.getGiftCf:
                    task.GiftCf.updateCf(obj);
                break;
                case data.PomeloData.addLucyStar:
                
                    GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
                    flower.FlowerUI.getInstance().setLucky();
                    
                    if(obj["times"] >= 1 && obj["times"] <= 15) {
                        aler.AlertPanel1.getInstance().show("恭喜！本群集结成功！","本群经验+100，钻石+10","确定");
                        aler.AlertPanel1.getInstance().lblTitle.size = 36
                    }else if(obj["times"] > 15) {
                        aler.AlertPanel1.getInstance().show("今日参与集结次数超过15次，无钻石奖励","本群经验+100","确定");
                        aler.AlertPanel1.getInstance().lblTitle.size = 28;
                    }
                 break;
                 
                 case data.PomeloData.medal3receive:  //勋章上面的
                    userPanel.UserPanel.getInstance().changeStage(obj);
                 break;
                 
                 case data.PomeloData.getAndReceiveAnnounceGroup:
                    rankGroupContribution.RankGroupContributionUI.addxuanGroups(obj);
                 break
            }
        }
        
        /*
            发送消息
        */
        public sendMessage(type: number,msg: Object,fun: Function,scope: any): void {
            this.pomelo.request("star.playerHandler.sendMsgQq",{ type: type,content: JSON.stringify(msg) },function(data) { 
                //console.log("接收自己监听:" + JSON.stringify(data)+" "+fun);
                if(fun) {
                    fun.call(scope,data);
                }
            });
        }
        public upload(type: number,msg: Object,fun: Function,scope: any): void {
            this.pomelo.request("file.uploadHandler.upload",{ type: type,content: JSON.stringify(msg) },function(data) { 
                //                console.log("接收自己监听:" + JSON.stringify(data)+" "+fun);
                if(fun) {
                    fun.call(scope,data);
                }
            });
        }
        public relaveMessage(data): void {
        }
        private trace(msg: string): void {
            console.log(msg);
        }
    }
}
