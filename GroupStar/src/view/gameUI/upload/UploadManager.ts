module upload {
	/**
	 *
	 * @author 
	 *
	 */
    export class UploadManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public uploadUI: upload.Upload;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(): void {
            if(!this.uploadUI)
                this.uploadUI = new Upload();
            this.BottomUIStage.addChild(this.uploadUI);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid+GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1("http://sf.xintiao100.com" + "/starImages",{ user_id: GameApp.Manager.dataManager.uid,bid:GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                this.initUI(obj);
            },true,this);
        }
        private initUI(obj: Object): void {
            this.uploadUI.setData(obj);
        }
        public hide(): void {
            if(this.uploadUI.parent) {
                this.BottomUIStage.removeChild(this.uploadUI);
                this.uploadUI.clear();
            }
        }
        private loading(): void {
            var self = this;
            GameApp.Manager.controllerManager.loader.moduleLoading(["public"],this.load_end,this);
        }
        private load_end(): void {
//            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded = true;
        }
    }
}
