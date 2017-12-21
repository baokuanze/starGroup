module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameMainUI extends eui.Group {
//        private b: egret.gui.UIAsset;
//        private bmpLight1: egret.gui.UIAsset;//灯光
//        private bmpLight2: egret.gui.UIAsset;
      
    
        public mainUI:MainUI;//全屏
        public index:number = 0;
		public constructor() {
            super();
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.create_complete,this);
//            this.touchChildren=false;
            this.touchEnabled=false; 
		}
        private create_complete(): void { 
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.create_complete,this);
            this.resize();
        }
        public initData(obj: Object):void{
            if(this.mainUI) {
                this.mainUI.setData(obj);
                if(GameApp.Manager.dataManager.topEnter == 1) { //用来第一次加载进去的
                    GameApp.Manager.dataManager.topEnter = 2;
//                    GameApp.Manager.controllerManager.topGroupRankController.show();
                }
            }
        }
        /*
            送花会调用这个
        */
        public sendF(obj:Object,ml:boolean=true):void{
            if(ml){
//                switch(obj["type"]+""){
//                    case "1":this.takecharm(8);break;
//                    case "2": this.takecharm(88); break;
//                    case "3": this.takecharm(288); break;
//                    case "4": this.takecharm(-1);break;
//                }
                this.mainUI.setHot(obj["id"]);  
                this.mainUI.barrageManager.add(obj);//送花
            }else{
                
            }
//            barrage.BarrageMananger.getInstance().add(obj);
            this.mainUI.mbarrageUI.add(obj); //聊天内容
            live.LiveTalkChat.receiveTalk(obj);
           
            if(obj["uid"] == GameApp.Manager.dataManager.uid) {
//                this.barrage.createItem1(obj,true);
                this.mainUI.setLevel(obj["intimate_level"])
            } else {
//                this.barrage.createItem1(obj);
            }
            
        }
        public takecharm(nu: number):void{
//            GameApp.Manager.bar_info["star_charm_count"] = parseInt(GameApp.Manager.bar_info["star_charm_count"]) + nu;
//            if(this.mainUI1&&this.mainUI1.parent){
//                this.mainUI1.takecharm(nu);
//            }else if(this.mainUI2&&this.mainUI2.parent){
//                this.mainUI2.takecharm(nu);
//            }
        }
        public getLuckyStarByServer():void{
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/syncLuckyStar",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                this.getLuckyStar(obj);
            },true,this)
        }
        private getLuckyStar(data:Object):void{
            console.log("luckystar返回监听:" ,data);
            var self:GameMainUI=this;
            if(data) {
                switch(data["st"]) {
                    case 1://成功
                        if(pay.PayUI.getLuckyStarNum>0){
                            if(GameApp.Manager.dataManager.lucystar == data["lucky_star"]){
                                pay.PayUI.getLuckyStarNum--;
                                setTimeout(function(){
                                    self.getLuckyStarByServer();
                                    },500,this);
                            }else{
                                pay.PayUI.getLuckyStarNum=3;
                                GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                                this.setLucky();
                            }
                        }else{
                            pay.PayUI.getLuckyStarNum = 3;
                            GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                            this.setLucky();
                        }
                       
                        
//                        if(this.mainUI1){
//                            GameApp.Manager.dataManager.lucystar = data["lucky_star"];
//                            this.setLucky();
//                        }
                    break;
                }
            }
        }
        public setLucky():void{
            flower.FlowerUI.getInstance().setLucky();
//            GameApp.Manager.viewManager.payManager.setLucky();
        }
        public setData(): void {//openstate 1:开启任务 2:送花
            if(!this.mainUI){
                this.mainUI = new MainUI();
                this.addChild(this.mainUI);
            }else{
                this.addChild(this.mainUI);
            }
            this.alpha = 0;
            this.mainUI.setData1();
            egret.Tween.get(this).to({ alpha: 1 },500);
           this.mainUI.mbarrageUI.come();
        }
        public hide(): void { 
            if(this.mainUI){
                if(this.mainUI.parent){
                    this.removeChild(this.mainUI);
                    this.mainUI.clear();
                    this.mainUI.mbarrageUI.leave();
//                    this.clearLight();
                }
            }
        }
        
        
        public clear():void{
        }
        public update(ct:number):void{
            if(this.mainUI){this.mainUI.updata(ct)};
        }
        public resize(): void { 
            if(this.mainUI) {
                this.mainUI.resize();
            }
        }
	}
}
