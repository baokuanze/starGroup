module monthTie {
	/**
	 *
	 * @author 
	 *
	 */
	export class MonthTieManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public monthTie: monthTie.MonthTie;
        private type:string;
        private mts:string
       
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(str:string,type?:string): void {
            this.mts = str;
            this.type=type;
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
        }
        
        private initUI(): void {
            var self: MonthTieManager = this;
            if(!this.monthTie){
                this.monthTie = new MonthTie();
                this.monthTie.type = this.type;
            }
            this.BottomUIStage.addChild(this.monthTie);
            var sign: string = new md5().hex_md5(self.mts + "&");
            Util.sendJson1("http://115.159.190.186/getMonthly",{ mts: self.mts,sign: sign },function(obj: Object) {
                self.monthTie.setData(obj["data"],self.mts);
            },true,this);
        }

        public hide(): void {
            if(this.monthTie.parent) {
                this.BottomUIStage.removeChild(this.monthTie);
                this.monthTie.clear();
            }
        }
        private loading(): void {
            var self = this;

//            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
            this.initUI();
        }
//        private load_end(): void {
//            // this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
//            this.loaded = true;
//            this.initUI();
//        }
	}
}
