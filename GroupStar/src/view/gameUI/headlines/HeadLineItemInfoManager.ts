module headLines {
	/**
	 *
	 * @author 
	 *
	 */
    export class HeadLineItemInfoManager extends common.BaseView{
        private loaded = false;
        private viewManager: view.ViewManager;
        public headLinesItemInfo: headLines.HeadLineItemInfor;
        public headline_id:string;
        public name:string;
        public ts:number;//时间戳
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(headline_id:string,name:string,ts:number): void {
            this.headline_id = headline_id;
            this.ts = ts;
            this.name = name;
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }

        }
        private initUI(): void {
            var self: HeadLineItemInfoManager = this;
            if(!this.headLinesItemInfo){
                this.headLinesItemInfo = new headLines.HeadLineItemInfor();
            }
            this.BottomUIStage.addChild(this.headLinesItemInfo);
            if(this.ts == HeadLines.toDayTime){
                console.log("是正常的时间")
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + this.headline_id + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineDetail",{ "user_id": GameApp.Manager.dataManager.uid,"headline_id": this.headline_id,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        self.headLinesItemInfo.setData(obj["data"],self.name,self.ts);
                    }
                },true,this) 
            }else{
                console.log("往期时间");
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + this.headline_id + self.ts + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineHistoryDetail",{ "user_id": GameApp.Manager.dataManager.uid,"headline_id": this.headline_id,"ts":self.ts,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        self.headLinesItemInfo.setData(obj["data"],self.name,self.ts);
                    }
                },true,this)
            }
        }
        public hide(): void {
            if(this.headLinesItemInfo) {
                this.headLinesItemInfo.parent.removeChild(this.headLinesItemInfo);
                this.headLinesItemInfo.clear();
            }
        }
        private loading(): void {
            var self = this;
            this.initUI();
//            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
        }
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
	}
}
