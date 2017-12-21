module mainUI {
    /**
    *
    * @author 
    *
    */
    export class GameMainManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private viewManager:view.ViewManager;
        private openstate: string = "1";//打开全屏后 1:开启任务 2:送花
        
//        public humenUI: HumenUI;
        public constructor(viewManager) {
            super(viewManager);
            this.viewManager = viewManager;
//            this.humenUI = new HumenUI();
//            this.humenUI.scaleY=this.humenUI.scaleX = 1300 / egret.MainContext.instance.stage.stageHeight;
//            this.humenUI.y=940;
        }
        public showMain():void{
            if(!this.gameMainUI.parent)
                this.BottomUIStage.addChild(this.gameMainUI);
        }
        public initData(obj: Object): void {
//            this.humenUI.setData();
            this.gameMainUI.initData(obj);
        }
        public joinStar(callback:Function):void{//入驻明星
            var self: GameMainManager = this;
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/chooseStar",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,reset:GameApp.Manager.dataManager.reset,sign: sign },function(obj: Object) {
                callback();
                self.resetData(obj);
            },true,this)
           
                
        }
        public resetData(obj:Object):void{
            var self: GameMainManager = this;
            switch(obj["st"]){
                case 1:
                    GameApp.Manager.dataManager.reset = 0;
                    GameApp.Manager.dataManager.group_openid = obj['new_group_openid'] || GameApp.Manager.dataManager.group_openid;
                  
                    system.Share.share(obj,function(){
                        self.resetMainPage();
                    });
                    

                    //加入成功
//                    aler.AlertPanel1.getInstance().show("换明星了","是","确定",function(){
//                        self.resetMainPage();
//                    },this);
              
                break;
                case 2:
                    //已经选择该明星
                    GameApp.Manager.dataManager.bid=obj["bid"];
                    this.resetMainPage();
                break;
                case 3:
                    //不是群主 发送push
                    system.Share.share(obj,function(){});
                break;
            }
        }
        public resetMainPage():void{
            
            var self: GameMainManager = this;
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/mainPage",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,reset: GameApp.Manager.dataManager.reset,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.bid,GameApp.Manager.dataManager.uid);
                    GameApp.Manager.dataManager.visitor = obj["visitor"];
                    GameApp.Manager.dataManager.level = obj["star_level"];
                    GameApp.Manager.dataManager.star_name = window["hexToDec"](obj["star_name"]);
                    GameApp.Manager.dataManager.user_name = window["hexToDec"](obj["user_name"]);
                    GameApp.Manager.dataManager.exp = obj["exp"];
                    GameApp.Manager.dataManager.need_exp = obj["need_exp"];
                    GameApp.Manager.dataManager.nowImg = obj["img"];
                    GameApp.Manager.dataManager.shadow_img = obj["shadow_img"];
                    GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
                    GameApp.Manager.dataManager.egg_cd = obj["egg_cd"];
                    GameApp.Manager.dataManager.egg_time = new Date().getTime();
                    GameApp.Manager.dataManager.heart_num = obj["heart_num"];
                    GameApp.Manager.dataManager.appid = obj["appid"];
                    flower.FlowerUI.getInstance().initData(obj["gift"]);
                    //GameApp.Manager.controllerManager.gameMainController.show();
                    GameApp.Manager.viewManager.gameMainManager.initData(obj);
                    
                    if(GameApp.Manager.dataManager.visitor == 0) {
                        GameApp.Manager.dataManager.resetState = obj["resetState"];
                    }
                } else {
                    console.log("注册失败:" + obj["st"]);
                }
            },true,this);
        }
        public show(openstate:string=""):void{ 
            if(!this.loaded) {
                this.load_end();
//                this.BottomUIStage.addChild(this.humenUI);   
            }
            this.openstate = openstate;
            this.initUI();
        }
        public hide(): void { 
            this.BottomUIStage.removeChild(this.gameMainUI);
            this.gameMainUI.hide();
        }
        private initUI(): void { 
            //创建背景UI
            if(!this.gameMainUI.parent)
            this.BottomUIStage.addChild(this.gameMainUI);
//            this.humenUI.mainUIInit();
            this.callS();
        }
        private callS():void{
            this.gameMainUI.setData();
        }
        
        private loading(): void { 
            var self = this;
            GameApp.Manager.controllerManager.loader.moduleLoading(["public"],this.load_end,this);
        }
        private load_end(): void { 
            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded=true;
        }
    }
}
