module rankUserContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankUserContributionManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private test: Object;
        private viewManager: view.ViewManager;
        public rankUserContributionUI: RankUserContributionUI;
        public type: number = 0;
        private bid:string;
        private group_openid:string;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(bid:string,group_openid:string): void {
            this.bid=bid;
            this.group_openid=group_openid;
            if(!this.loaded) {
                this.loading();
            } else {
                this.init();
            }

        }
        private init(): void {
            if(!this.rankUserContributionUI)
                this.rankUserContributionUI = new RankUserContributionUI();
            this.BottomUIStage.addChild(this.rankUserContributionUI);
            this.rankUserContributionUI.bid=this.bid;
            this.rankUserContributionUI.group_openid=this.group_openid;
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid+this.bid+this.group_openid+ "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupUserContributionRankList",{user_id:GameApp.Manager.dataManager.uid,bid:this.bid, group_openid:this.group_openid,index: 0,sign: sign },function(obj: Object) {
                if(obj['st'] == 1) {
                    this.initUI(obj);
                }
            },true,this);
        }
        private initUI(arr: Array<Object>): void {
            this.rankUserContributionUI.setData(arr);
        }
        public hide(): void {
            if(this.rankUserContributionUI) {
                this.rankUserContributionUI.parent.removeChild(this.rankUserContributionUI);
                this.rankUserContributionUI.clear();
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
