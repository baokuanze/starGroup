module flower {
	/**
	 *
	 * @author 
	 *
	 */
	export class FlowerUI extends eui.Component{
        private static _instance: FlowerUI;
        public static getInstance(): FlowerUI {
            if(!this._instance) {
                this._instance = new FlowerUI();
            }
            return this._instance;
        }
    	private groupData:eui.Group;
    	private lblStar:eui.Label;
    	private txtCZ:eui.Label;
    	private txtStar:eui.Label;
    	public btnSend:FlowerBtnSend;
    	private btnSend1:eui.Button;
        private btnPay:eui.Button;
        private obj: Object;
        private bo: boolean = false;
        private arr: Array<FlowerItem> = [];
        private selectItem: FlowerItem;
        private zhItem: FlowerItem;//纸鹤 单独处理
        public canSend:boolean=true;
		public constructor() {
    		super();
    		this.btnSend=new FlowerBtnSend();
            this.skinName ="src/view/gameUI/flower/FlowerUISkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.txtCZ.fontFamily = "Heiti SC";
                this.txtStar.fontFamily = "Heiti SC";
                this.lblStar.fontFamily = "Heiti SC";
            }
    		this.addChild(this.btnSend);
    		this.btnSend.x=590;this.btnSend.y=310-85;
		    this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		    this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.send_tap,this);
            this.btnSend1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.send_tap1,this);
            this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pay_tap,this);
		}
		private tap(e:egret.Event):void{
		    e.stopPropagation();
		}
        public initData(obj: Object): void {
            this.obj = obj;
            if(obj){
                var o: Object = obj["1"];
                GameApp.Manager.dataManager.gift_cd = o["cd"];
                GameApp.Manager.dataManager.gift_time = new Date().getTime();
            }
        }
        public setLucky():void{
            this.lblStar.text = "" + GameApp.Manager.dataManager.lucystar + "";
            GameApp.Manager.viewManager.payManager.setLucky();
        }
        public setLianji(n:number):void{
            this.btnSend1.label=n+"";
            if(this.selectItem)
            this.selectItem.setLight();
        }
        public setLastCount(giftid:number,lastcount:number,gift_cd:number):void{
            if(this.zhItem.fid==giftid){
                this.zhItem.lastcount=lastcount;
                if(this.zhItem.lastcount!=0){
                    GameApp.Manager.dataManager.gift_cd = gift_cd;
                    GameApp.Manager.dataManager.gift_time = new Date().getTime();
                    var ct: number = GameApp.Manager.dataManager.gift_time - new Date().getTime() + GameApp.Manager.dataManager.gift_cd;
                    this.zhItem.setDJS(ct);
                }else{
                    this.zhItem.djsEnd();
                }
            }
        }
        public setData(): void {
            if(!this.bo) {
                this.bo = true;
                for(var i in this.obj) {
                    var obj: Object = this.obj[i];
                    
                    switch(obj["id"]){
                        case 2:case 3:case 4:
                            var item = new FlowerItem();
                            this.groupData.addChild(item);
                            item.setData(obj);
                            this.arr.push(item);
                            item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.item_tap,this);
//                            if(item.fid == 1) {
//                                this.zhItem = item;
//                            }
                        break;
                    }
                }
//                if(GameApp.Manager.dataManager.gift_cd > 0 && this.zhItem.lastcount != 0) {
//                    var ct: number = GameApp.Manager.dataManager.gift_time - new Date().getTime() + GameApp.Manager.dataManager.gift_cd;
//                    if(ct > 0) {
//                        this.zhItem.setDJS(ct);
//                    } else {
//                        GameApp.Manager.dataManager.gift_cd = 0;
//                        this.zhItem.djsEnd();
//                    }
//                } else {
//                    this.zhItem.djsEnd();
//                }
            }
            this.lblStar.text = ""+GameApp.Manager.dataManager.lucystar + "";
            
        }
        private item_tap(e: egret.Event): void {
            var item: FlowerItem = e.currentTarget;
            if(item!=this.selectItem){
                if(this.selectItem) {
                    this.selectItem.off();
                }
                this.selectItem = item;
                this.selectItem.on();
                this.btnSend.visible = true;
                if(this.selectItem.fid==1){
                    if(this.selectItem.lastcount==0||this.selectItem.cd>0){
                        this.btnSend.setState(0);
                    }else{
                        this.btnSend.setState(1);
                    }
                }else{
                    this.btnSend.setState(1);
                }
                this.btnSend1.label="";
                this.btnSend1.visible = false;
            }
        }
        private send_tap():void{
            if(this.selectItem&&this.selectItem.canSend && this.canSend) {
                console.log(GameApp.Manager.dataManager.lucystar + " " + this.selectItem.price);
                if(GameApp.Manager.dataManager.lucystar >= this.selectItem.price) {//this.selectItem.price
                    var fid: number = this.selectItem.fid; 
                    this.canSend=false;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendFlower,{ id: fid },function(data: Object) { FlowerUI.listerFlower(data) },this);
                    if(this.selectItem.click>0){
                        this.btnSend.visible=false;
                        this.btnSend1.visible=true;
                        this.btnSendTween();
                    }else if(this.selectItem.fid==1){
                        this.btnSend.setState(0);
                    }else if(this.selectItem.fid==6){
                        this.close();
                    }
                } else {
                    aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                        if(data == "ok") {
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide,1);
                        }
                    },this);
//                    window["sendMess"]({ "cmd": "show_tips","appid": GameApp.Manager.dataManager.appId });
                }
            }
        }
        private send_tap1(): void {
            if(this.selectItem.canSend&&this.canSend) {
                
                if(GameApp.Manager.dataManager.lucystar >= this.selectItem.price) {//this.selectItem.price
                    var fid: number = this.selectItem.fid;
                    this.canSend = false;
                    socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendFlower,{ id: fid },function(data: Object) { FlowerUI.listerFlower(data) },this);
                    this.btnSendTween();
                } else {
                    aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data:string){
                        if(data=="ok"){
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide,1);
                        }
                    },this);
                    //                    window["sendMess"]({ "cmd": "show_tips","appid": GameApp.Manager.dataManager.appId });
                }
            }
        }
        private pay_tap():void{
            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.viewManager.liveChatRoomManager.hide,1);
        }
        private btnSendTween():void{
            egret.Tween.removeTweens(this.btnSend1);
            egret.Tween.get(this.btnSend1).wait(2000).call(function(){
                this.btnSend.visible = true;
                this.btnSend1.visible = false;    
                if(this.selectItem)
                    this.selectItem.setloW();
            },this);
        }
        public open(pat:egret.DisplayObjectContainer): void {
//            GameApp.Manager.viewManager.maskStage(.4);
            pat.addChild(this);
            this.x = 0; //this.y = egret.MainContext.instance.stage.stageHeight - 570;
            this.setData();
            if(this.selectItem) {
                this.selectItem.off();
                this.selectItem=null;
            }
            this.btnSend.visible=true;
            this.btnSend.setState(0);
            this.btnSend1.visible=false;
            GameApp.Manager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,flower.FlowerUI.getInstance().close,flower.FlowerUI.getInstance());
        }
        public getMainUIIndex():number{
            return this.parent?this.parent.getChildIndex(this):GameApp.Manager.viewManager.gameMainUI.mainUI.numChildren;
        }
        public close():void{
            if(this.parent){
                GameApp.Manager.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,flower.FlowerUI.getInstance().close,flower.FlowerUI.getInstance());
                this.btnSend.visible = true;
                this.btnSend1.visible = false;
                if(this.selectItem) {
                    this.selectItem.off();
                }
                if(this.parent){
                    this.parent.removeChild(this);
                }
            }
        }
        public static listerFlower(data: Object): void {//自己送花的监听
            FlowerUI.getInstance().canSend = true;
            if(data) {
                console.log("送花自己监听:",data);
                switch(data["st"]) {
                    case 1:
                        GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                        FlowerUI.getInstance().setLucky();
//                        FlowerUI.getInstance().setLastCount(data["id"],data["gift_last"],data["gift_cd"]);
                        switch(data["id"] + "") {
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
                                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                                Util.sendJson1(GameApp.Manager.dataManager.IP + "/redPacketPush",
                                    { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                                        system.Share.share(obj,function(n: number) {
//                                            if(n == 1)
//                                                system.TipText.produce().open("发送成功");
                                        });
                                    },true,this);
                            break;
                        }
                        break;
                    case -1:
                        break;
                    case -2: break;
                    case -3:
                        aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                            if(data == "ok") {
                                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide,-1);
                            }
                        },this);
                    break;
                }
            }
        }
	}
}
