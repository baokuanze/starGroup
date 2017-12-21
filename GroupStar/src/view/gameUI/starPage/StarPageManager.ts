module starPage {
	/**
	 *
	 * @author 
	 *
	 */
    export class StarPageManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public starPageUI: StarPageUI;
        public testdata:Object;
        public reset:number;
        
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(reset?:any): void {
            this.reset = reset;
          
            if(!this.loaded){
                this.loading();
            }else{
                this.initUI();
            }
        }
        private initUI(): void {
            var self: StarPageManager = this;
            if(!this.starPageUI){
                this.starPageUI = new StarPageUI();
            }
            this.BottomUIStage.addChild(this.starPageUI);
            if(this.reset == 1){
                console.log("1");
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starsChoosePage",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,reset:this.reset,sign: sign },function(obj: Object) {
                    if(obj['st'] == 2) {
                        GameApp.Manager.dataManager.reset = 1;
                        GameApp.Manager.dataManager.bid = obj['bid'];
                        GameApp.Manager.viewManager.starPageManager.hide();
                        GameApp.Manager.controllerManager.start();
                    } else {
                        GameApp.Manager.dataManager.reset = 1;
                        this.setData(obj);
                    }
                },true,self);
            }else{
                console.log("0");
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starsChoosePage",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                    if(obj['st'] == 2) {
                        GameApp.Manager.dataManager.bid = obj['bid'];
                        GameApp.Manager.viewManager.starPageManager.hide();
                        GameApp.Manager.controllerManager.start();
                    } else {
                        this.setData(obj);
                    }
                },true,self);
            }
            
        }
        private setData(obj:Object):void{
            this.starPageUI.setData(obj);
        }
        
        public hide(): void {
            if(this.starPageUI.parent) {
                this.BottomUIStage.removeChild(this.starPageUI);
                this.starPageUI.clear();
            }
        }
        private loading(): void {
            var self = this;
            GameApp.Manager.controllerManager.loader.moduleLoading(["starpage"],this.load_end,this);
        }
        private load_end(): void {
//            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded = true;
            this.initUI();
        }
    }
}
