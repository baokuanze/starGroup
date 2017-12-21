module pay {
	/**
	 *
	 * @author 
	 *
	 */
	export class PayManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public rankStarUI: PayUI;
        private callback:Function;
        public type:number=0;
        public isByModal:number;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public setLucky():void{
            if(this.rankStarUI){
                this.rankStarUI.setLucky();
            }
        }
        public show(callback: Function,type: number,isByModal?: any): void {
            if(type>=0)
                this.type=type; 
            this.callback=callback;
            this.isByModal = isByModal;
            if(!this.loaded) {
                this.loading();
            }else{
                this.initUI();
            }
        }
        private initUI(): void {
            if(this.callback){
                this.callback.call(null);
            }
            if(!this.rankStarUI)
                this.rankStarUI = new PayUI();
            this.rankStarUI.type=this.type;
            this.rankStarUI.isBuyModul = this.isByModal;
            this.BottomUIStage.addChild(this.rankStarUI);
            this.rankStarUI.setData();
        }
        public hide(): void {
            if(this.rankStarUI.parent) {
                this.BottomUIStage.removeChild(this.rankStarUI);
//                this.rankStarUI.clear();
            }
        }
        private loading(): void {
            GameApp.Manager.controllerManager.loader.moduleLoading(["public"],this.load_end,this);
        }
        private load_end(): void {
//            this.viewManager.addStageResizeEvent("mainUI",this.gameMainUI.resize,this.gameMainUI);
            this.loaded = true;
            this.initUI();
        }
    }
}
