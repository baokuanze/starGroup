module TopScreenOfGroupRank {
	/**
	 *
	 * @author 
	 *
	 */
	export class TopGroupRankManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public topGroupRank: TopScreenOfGroupRank.TopGroupRank;

        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(): void {
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }

        }
        private initUI(): void {
            var self: TopGroupRankManager = this;
            if(!this.topGroupRank) {
                this.topGroupRank = new TopScreenOfGroupRank.TopGroupRank();
            }
            this.garbageUiStage.addChild(this.topGroupRank);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getEnterPage",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    this.topGroupRank.setData(obj["data"]);
                }
            },true,self)
        }

        public hide(): void {
            if(this.topGroupRank.parent) {
                this.topGroupRank.parent.removeChild(this.topGroupRank);
                this.topGroupRank.clear();
            }
        }
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
        private loading(): void {
            this.load_end();
//            GameApp.Manager.controllerManager.loader.moduleLoading(["topEnter"],this.load_end,this);
        }
    }
}
