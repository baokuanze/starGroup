module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class groupManagementAudit extends eui.Component{
        private lable_taskWarn:eui.Label;
        public group_audit:eui.Group;
        private btn_taskWarn:eui.Rect; //提醒;
        private scor1:eui.Scroller;
        private groupBottom:eui.Group;
        
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementAuditSkin.exml"
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_taskWarn.fontFamily = "Heiti SC";
            }
            this.scor1.height = this.stage.stageHeight - 127 - 245;
            this.groupBottom.y = this.stage.stageHeight -127 - 245;
            this.btn_taskWarn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.taskWarm,this);
//            this.scor1.height = this.stage.stageHeight - 127- this.scor1.y;
        }
        
        public setData(obj:Object,allNumber:number):void{
            console.log(obj["list"])
            var number = obj["member_num"];
            for(var i: number = 0;i < obj["list"].length;i++ ){
                var item = obj["list"][i];
                var auditItem = groupManagement.GroupManagementAuditItem.produce(); //创建每一项审计
                this.group_audit.addChild(auditItem);
                auditItem.setData(item,allNumber,2);
                console.log(item,"对象")
            }
        }
      
        public taskWarm(e:egret.Event):void{
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriendsForTask",
                { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                    system.Share.share(obj,function(n: number) {
                        if(n == 1)
                            system.TipText.produce().open("发送成功");
                    });
                },true,this);
        }
	}
}
