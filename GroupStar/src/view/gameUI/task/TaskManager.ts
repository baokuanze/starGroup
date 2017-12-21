module task {
	/**
	 *
	 * @author 
	 *
	 */
    export class TaskManager extends common.BaseView{
        private viewManager: view.ViewManager;
        public taskUI: TaskUI;
        public obj : Object;
        public testObj : Object;
        public taskOpenManager:TaskOpenManager;
        public giftCfManager: GiftManager;
        public constructor(viewManager: view.ViewManager) {
    		super(viewManager);
    		this.taskOpenManager=new TaskOpenManager(viewManager);
    		this.giftCfManager=new GiftManager(viewManager);
		}
		public static go1():void{
		    GameApp.Manager.controllerManager.gameMainController.hide();
		    GameApp.Manager.controllerManager.taskController.show(0);
		}
        public static go2(): void {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.taskController.show(1);
        }
        public static go3(): void {
            GameApp.Manager.controllerManager.gameMainController.hide();
            GameApp.Manager.controllerManager.taskController.show(2);
        }
        public static groupMass():void{
            if(GameApp.Manager.viewManager.taskManager.taskUI && GameApp.Manager.viewManager.taskManager.taskUI.parent){
                GameApp.Manager.viewManager.taskManager.taskUI.groupMass();
            }
        }
		public show(dispage:number=-1):void{
    		var self = this;
        	if(!this.taskUI)
            {
                this.taskUI = new TaskUI();
                
                //this.taskUI.setData(this.testObj);
            }
            switch(dispage) {
                case 0: this.taskUI.btn1_tap(); break;
//                case 1: this.taskUI.btn2_tap(); break;
                case 2: this.taskUI.btn3_tap(); break;
                default:
                    this.BottomUIStage.addChild(this.taskUI);
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupData",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            self.taskUI.setData(obj["data"]);
                            
                        }
                    },true,this);
                break;
            }
           
		}
		public hide():void{
            if(this.taskUI)
            {
                if(this.taskUI.parent)
                    this.taskUI.parent.removeChild(this.taskUI);
                this.taskUI.clear();
            }
		}
	}
}
