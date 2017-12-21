module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagementItem extends eui.Component{
    	
        private lable_managementTitle:eui.Label ;
        private btn_nextScreen:eui.Rect;
        private managementObj:Object;
        private itemIndex:number;
        public gMI_open_task_id: string;
        //private groupManagementItenInfor = groupManagement.GroupManagementItemInformation;
        
        
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): GroupManagementItem {
            if(GroupManagementItem.cacheDict[mtype] == null) {
                GroupManagementItem.cacheDict[mtype] = [];
            }
            var dict: GroupManagementItem[] = GroupManagementItem.cacheDict[mtype];
            var theFighter: GroupManagementItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new GroupManagementItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: GroupManagementItem,mtype: string = "1"): void {
            if(GroupManagementItem.cacheDict[mtype] == null) {
                GroupManagementItem.cacheDict[mtype] = [];
            }
            var dict: GroupManagementItem[] = GroupManagementItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementItemSkin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_managementTitle.fontFamily = "Heiti SC";
            }
            this.btn_nextScreen.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextScreen,this);
            //this.groupManagementItenInfor = new 
        }
        
        public setData(str: string,index:number,obj:Object): void {
            this.managementObj = GameApp.Manager.viewManager.groupManager.hostManager.allObj
            this.lable_managementTitle.text = window["hexToDec"](str);
            //this.itemIndex = index;
            this.gMI_open_task_id = obj["open_task_id"]
            //console.log(obj,obj["open_task_id"],"哪一项",this.gMI_open_task_id);
        }
		
        public nextScreen(e:egret.Event):void{
            var self: GroupManagementItem = this;
            console.log(self.gMI_open_task_id,"===========")
            GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.visible = true;
            GameApp.Manager.viewManager.groupManager.hostManager.group_manager.visible = false;
            var num = GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation.group_addToImg1.numElements;
            for(var i:number =0;i<num;i++){
                var it = GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation.group_addToImg1.getElementAt(i);
            }
            
            var number1 = GameApp.Manager.viewManager.groupManager.hostManager.objArr.length;
                for(var j:number = 0;j<number1;j++){
                    var it2 = GameApp.Manager.viewManager.groupManager.hostManager.objArr[j];
                    console.log(it2["open_task_id"]);
                    if(self.gMI_open_task_id == it2["open_task_id"]){
                        console.log("下一页");
                        GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation.setData(it2,self.gMI_open_task_id)
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.addChild(GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation);
                    }
                }
        }
        
        public clear():void{
            
        }
		
	}
}
