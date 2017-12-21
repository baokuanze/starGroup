module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagement extends eui.Component{
    	
        public group_addManagement:eui.Group;//添加管理
        public scroll2:eui.Scroller;
        
        public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementSkin.exml";
		}
		
        public childrenCreated(): void {
            this.scroll2.height = this.stage.stageHeight -245;
        }
		
		public setData(obj:Object):void{
		    for(var i:number = 0;i<obj["list"].length;i++){
                var item = obj["list"][i]
                var managerItem = groupManagement.GroupManagementItem.produce();  //每一小项
                this.group_addManagement.addChild(managerItem);
                managerItem.setData(item["title"],i,item);
		    }
		}
	}
}
