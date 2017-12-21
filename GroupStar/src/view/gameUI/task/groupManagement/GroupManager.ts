module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        private type: string;
        public hostManager: groupManagement.HostManagement;
        private title:string;

        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }

        public show(str:string): void {
            this.title = str;
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
        }

        private initUI(): void {
            var self: GroupManager = this
            if(!this.hostManager) {
                var self: GroupManager = this;
                this.hostManager = new groupManagement.HostManagement();
            }
            this.BottomUIStage.addChild(this.hostManager);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getCustomOpenTaskList",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    console.log("接收群任务成功",obj);
                    self.obj = obj;
                    self.hostManager.setData(obj["data"],self.title);
                    console.log("3")
                }
            },true,this);
            console.log("4")
        }

        public hide(): void {
            if(this.hostManager.parent) {
                this.BottomUIStage.removeChild(this.hostManager);
                this.hostManager.clear();
            }
            
        }
        private loading(): void {
            var self = this;
            this.load_end();
//            GameApp.Manager.controllerManager.loader.mainLoading(["public"],this.load_end,this);
        }
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
	}
}
