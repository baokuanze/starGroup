module starfanstv {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarFansTVManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private test: Object;
        private viewManager: view.ViewManager;
        public starFanTVUI:StarFansTVUI;
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
            socketio.IoConnect.getInstance().initPomelo("0",GameApp.Manager.dataManager.uid);
            if(!this.starFanTVUI)
                this.starFanTVUI = new StarFansTVUI();
            this.BottomUIStage.addChild(this.starFanTVUI);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid_save + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getVideosList",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid_save,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    this.initUI(obj['video_list']);
                }
            },true,this)
        }
        private initUI(arr: Array<Object>): void {
            this.starFanTVUI.setData(arr);
        }
        public hide(): void {
            if(this.starFanTVUI) {
                this.starFanTVUI.parent.removeChild(this.starFanTVUI);
                this.starFanTVUI.clear();
                socketio.IoConnect.getInstance().disconnect();
            }
        }
        public hideSerach(): void {
            if(this.starFanTVUI) {
                this.starFanTVUI.parent.removeChild(this.starFanTVUI);
                this.starFanTVUI.clear();
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
