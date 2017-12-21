module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagementAuditManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        private type: string;
        public groupManagerAuditInfor: groupManagement.GroupManagementAuditItemInformation;
        private open_id:string
        private title:string;

        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }

        public show(str:string,str1:string): void {
            this.open_id = str
            this.title = str1
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
        }

        private initUI(): void {
            var self: GroupManagementAuditManager = this;
            if(!this.groupManagerAuditInfor) {
                this.groupManagerAuditInfor = new groupManagement.GroupManagementAuditItemInformation();
                this.BottomUIStage.addChild(this.groupManagerAuditInfor);
            }
            this.BottomUIStage.addChild(this.groupManagerAuditInfor);
        
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + this.open_id+ "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/reviewOpenTask",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,open_task_id:this.open_id,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    console.log("接收群任务成功");
                    self.groupManagerAuditInfor.setData(obj,self.open_id,self.title);
                }
            },true,this);
      
        }

        public hide(): void {
            if(this.groupManagerAuditInfor.parent) {
                this.BottomUIStage.removeChild(this.groupManagerAuditInfor);
                this.groupManagerAuditInfor.clear();
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
