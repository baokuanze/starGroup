module rankGroupContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankGroupContributionManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private test: Object;
        private viewManager: view.ViewManager;
        public rankGroupContributionUI: RankGroupContributionUI;
        public type:number=0;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(type:number): void {
            if(type!=-1){
                this.type=type;
            }
            if(!this.loaded) {
                this.loading();
            } else {
                this.init();
            }

        }
        private init(): void {
            if(!this.rankGroupContributionUI){
                this.rankGroupContributionUI = new RankGroupContributionUI();
            }
              
            this.BottomUIStage.addChild(this.rankGroupContributionUI);
            this.rankGroupContributionUI.type=this.type;
//            if(!this.rankGroupContributionUI.bo){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.bid_save + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupContributionRankList",{bid:GameApp.Manager.dataManager.bid_save,index:0,sign: sign },function(obj: Object) {
                    if(obj['st'] == 1) {
                        this.initUI(obj);
                    }
                },true,this);
//            }
        }
        private initUI(arr: Array<Object>): void {
            this.rankGroupContributionUI.setData(arr);
        }
        public hide(): void {
            if(this.rankGroupContributionUI) {
                this.rankGroupContributionUI.parent.removeChild(this.rankGroupContributionUI);
                this.rankGroupContributionUI.clear();
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
