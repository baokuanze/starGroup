module rankStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankStarManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private test:Object;
        private viewManager: view.ViewManager;
        public rankStarUI: RankStarUI;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(): void {
            
            if(!this.loaded) {
                this.loading();
            } else {
                this.init();
            }
            
        }
        private init():void{
            if(!this.rankStarUI)
                this.rankStarUI = new RankStarUI();
            this.BottomUIStage.addChild(this.rankStarUI);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starRank",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
                this.initUI(obj['data']["list"],obj["data"]["self"]);
                console.log(obj)
            },true,this)
//            this.getTest(); 
            //this.initUI(this.test['starRank']);
        }
        private initUI(arr: Array<Object>,obj:Object): void {
            this.rankStarUI.setData(arr,obj);
        }
        public hide(): void {
            if(this.rankStarUI.parent) {
                this.rankStarUI.parent.removeChild(this.rankStarUI);
                this.rankStarUI.clear();
            }
        }
        private loading(): void {
            var self = this;
            //GameApp.Manager.controllerManager.loader.moduleLoading(["starRank"],this.load_end,this);
            this.init();
        }
        private load_end(): void {
            this.init();
            this.loaded = true;
        }
        
    }
}
