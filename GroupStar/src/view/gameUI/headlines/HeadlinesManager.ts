module headLines {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeadlinesManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public headLines: headLines.HeadLines;
        public type:number
        public ts:number;
        public comeType:number;
        
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(type:number,ts:number,comeType:number): void {
            console.log("==1",type,ts);
            this.type = type;
            this.ts = ts?ts:0;  //时间戳
            this.comeType = comeType;  //用来计量是上一次的动作
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }

        }
        private initUI(): void {
            var self: HeadlinesManager = this;
            if(!this.headLines){
                this.headLines = new headLines.HeadLines();
            }
            this.BottomUIStage.addChild(this.headLines);
            
            if(this.type == 1){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineData",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        self.headLines.setData(obj["data"],self.comeType,1,self.ts);
//                        console.log(obj,"有ts新闻头条");
                    }
                },true,this)
            } else { //getHeadlineHistoryData user_id,bid,ts
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + this.ts + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHeadlineHistoryData",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,"ts":this.ts , sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        self.headLines.setData(obj,self.comeType,2,this.ts);
//                        console.log(obj,"没有ts新闻头条");
                    }
                },true,this)
            }
        }
        public hide(): void {
            if(this.headLines.parent) {
                this.headLines.parent.removeChild(this.headLines);
                this.headLines.clear();
            }
        }
        private loading(): void {
            var self = this;
            this.initUI();
        }
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
	}
}
