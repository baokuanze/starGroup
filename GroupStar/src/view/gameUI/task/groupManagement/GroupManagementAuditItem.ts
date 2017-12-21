module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagementAuditItem extends eui.Component{
        public lable_auditTitle:eui.Label;
        public lable_auditInformation:eui.Label;
        private btn_left:eui.Rect;
        private open_task_Id:string;
        private title:string; // 其他界面要的
       
        private groupManagementAuidtItemInformation:groupManagement.GroupManagementAuditItemInformation
        
        
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): GroupManagementAuditItem {
            if(GroupManagementAuditItem.cacheDict[mtype] == null) {
                GroupManagementAuditItem.cacheDict[mtype] = [];
            }
            var dict: GroupManagementAuditItem[] = GroupManagementAuditItem.cacheDict[mtype];
            var theFighter: GroupManagementAuditItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new GroupManagementAuditItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: GroupManagementAuditItem,mtype: string = "1"): void {
            if(GroupManagementAuditItem.cacheDict[mtype] == null) {
                GroupManagementAuditItem.cacheDict[mtype] = [];
            }
            var dict: GroupManagementAuditItem[] = GroupManagementAuditItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	
    	
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementAuditItemSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_auditTitle.fontFamily = "Heiti SC";
                this.lable_auditInformation.fontFamily = "Heiti SC";
            }
            this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goToNextScreen,this);
        }
		
        public setData(obj:Object,str:number,n:number):void{
            this.lable_auditTitle.text = window["hexToDec"](obj["title"]);
            this.title = obj["title"];
            var count;
            if(n == 1){
                count = 0
            }else{
                count = obj["count"]
            }
            this.lable_auditInformation.text = "今日完成情况" + "(" + count + "/" + str + ")";
            this.open_task_Id = obj["open_task_id"];
        }
        
        public goToNextScreen(e:egret.Event):void{
            //进入详情页；
            GameApp.Manager.controllerManager.groupManagerAuditController.show(this.open_task_Id,this.title);
            GameApp.Manager.controllerManager.groupManagerController.hide();
            
        }
        
        public clear():void{
        
        }
	}
}
