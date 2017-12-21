module rankGroup {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankGroupManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private test: Object;
        private viewManager: view.ViewManager;
        public rankGroupUI: RankGroupUI;
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
        private init(): void {
            if(!this.rankGroupUI)
                this.rankGroupUI = new RankGroupUI();
            this.BottomUIStage.addChild(this.rankGroupUI);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid_save + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/groupLevelRank",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid_save,sign: sign },function(obj: Object) {
                if(obj["st"]==1){
                    this.initUI(obj['rank']);
                }
            },true,this)
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        }
        private initUI(arr: Array<Object>): void {
            this.rankGroupUI.setData(arr);
        }
        public hide(): void {
            if(this.rankGroupUI) {
                this.rankGroupUI.parent.removeChild(this.rankGroupUI);
                this.rankGroupUI.clear();
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
