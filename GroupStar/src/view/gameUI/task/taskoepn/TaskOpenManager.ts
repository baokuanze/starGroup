module task {
	/**
	 *
	 * @author 
	 *
	 */
    export class TaskOpenManager extends common.BaseView {
        private viewManager: view.ViewManager;
        public taskOpenUI: TaskOpenUI;
        public obj: Object;
        public testObj: Object;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
        }
        public show(tid:number,obj:Object=null): void {
            var self:TaskOpenManager = this;
            if(!this.taskOpenUI) {
                this.taskOpenUI = new TaskOpenUI();
            }
            this.BottomUIStage.addChild(this.taskOpenUI);
            if(!obj){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + GameApp.Manager.dataManager.bid_save + tid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getOpenTaskDetail",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid_save,group_openid: GameApp.Manager.dataManager.group_openid,open_task_id: tid,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        obj["data"]["type"]=1;
                        self.taskOpenUI.setData(obj["data"]);
                    }
                },true,this);
            }else{
                self.taskOpenUI.setData(obj);
            }
           
           
        }
        public hide(): void {
            if(this.taskOpenUI) {
                this.taskOpenUI.parent.removeChild(this.taskOpenUI);
                this.taskOpenUI.clear();
            }
        }
    }
}
