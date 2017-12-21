module newstar {
	/**
	 *
	 * @author 
	 *
	 */
    export class NewStarManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private test: Object;
        private viewManager: view.ViewManager;
        public newStarUI: NewStarUI;
        public newStarSerachUI:NewStarSerachUI;
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
        public showSerach(serach_name?: string):void{
            if(!this.newStarSerachUI)
                this.newStarSerachUI = new NewStarSerachUI();
            this.BottomUIStage.addChild(this.newStarSerachUI);
            this.newStarSerachUI.serach(serach_name);
        }
        private init(): void {
            socketio.IoConnect.getInstance().initPomelo("0",GameApp.Manager.dataManager.uid);
            if(!this.newStarUI)
                this.newStarUI = new NewStarUI();
            this.BottomUIStage.addChild(this.newStarUI);
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid_save + "&");
//            Util.sendJson1(GameApp.Manager.dataManager.IP + "/groupLevelRank",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid_save,sign: sign },function(obj: Object) {
//                if(obj["st"] == 1) {
//                    this.initUI(obj['rank']);
//                }
//            },true,this)
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        }
//        private initUI(arr: Array<Object>): void {
//            this.rankGroupUI.setData(arr);
//        }
        public hide(): void {
            if(this.newStarUI) {
                this.newStarUI.parent.removeChild(this.newStarUI);
                this.newStarUI.clear();
                socketio.IoConnect.getInstance().disconnect();
            }
        }
        public hideSerach(): void {
            if(this.newStarSerachUI) {
                this.newStarSerachUI.parent.removeChild(this.newStarSerachUI);
                this.newStarSerachUI.clear();
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
