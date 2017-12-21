module weekPush {
	/**
	 *
	 * @author 
	 *
	 */
	export class WeekPushManage extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public weekPush: newWeekPush.NewWeekPush;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(): void {
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
            
        }
        private initUI(): void {
            var self:WeekPushManage = this;
            if(!this.weekPush){
                this.weekPush = new newWeekPush.NewWeekPush();
            }
            this.BottomUIStage.addChild(this.weekPush);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + ""+ GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.wts + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getWeeklyNew",{ user_id: GameApp.Manager.dataManager.uid+ "",bid: GameApp.Manager.dataManager.bid,wts: GameApp.Manager.dataManager.wts,sign: sign },function(obj: Object) {
               if(obj["st"] == 1){
                   self.weekPush.setData(obj["data"]);  
               }
            },true,this);
        }
        
        //隐藏
        public hide(): void {
            if(this.weekPush.parent) {
                this.BottomUIStage.removeChild(this.weekPush);
                this.weekPush.clear();
            }
        }
        private loading(): void {
            var self = this;
            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
        }
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
    }
}
