module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class HostManagement extends eui.Component {
        public lable_taskManagement:eui.Label;
        private lable_Publish:eui.Label;
        private lable_audit:eui.Label;
        private lable_management:eui.Label;
        private img_jt:eui.Label;
        private btn_back: eui.Image; //返回按钮
        
        public group_push:eui.Group; //发布 
        public group_manager:eui.Group; //管理
        public group_audit:eui.Group;// 审计
        public group_manageInfo:eui.Group//管理详情页；
        
        public groupManagementPush: groupManagement.GroupManagementPush //发布
        public groupManagementAudit: groupManagement.groupManagementAudit;//审计
        public groupManagement: groupManagement.GroupManagement;//管理
        public groupManagementItemInformation:groupManagement.GroupManagementItemInformation;

        public allObj:Object;//所有数据
        public objArr:Array<Object> = []; 
        
        private rect_push:eui.Rect;
        private rect_audit:eui.Rect;
        private rect_manager:eui.Rect;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/HostManagementSkin.exml";
		}
		
        public childrenCreated(): void {
            var self: HostManagement = this;
            if(Tools.getInstance().isIphone()) {
                this.lable_taskManagement.fontFamily = "Heiti SC";
                this.lable_Publish.fontFamily = "Heiti SC";
                this.lable_audit.fontFamily = "Heiti SC";
                this.lable_management.fontFamily = "Heiti SC";
            }
            this.groupManagementPush = new groupManagement.GroupManagementPush();
            this.groupManagementPush.x = 0;this.groupManagementPush.y = 0;
            this.groupManagementAudit = new groupManagement.groupManagementAudit();
            this.groupManagementAudit.x = 0;this.groupManagementAudit.y = 0;
            this.groupManagement = new groupManagement.GroupManagement();
            this.groupManagement.x = 0;this.groupManagement.y = 0;
            this.groupManagementItemInformation = new groupManagement.GroupManagementItemInformation();
            this.groupManagementItemInformation.x =0; this.groupManagementItemInformation.y = 0;
            
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.comeBack,this);
         
            
            
//            this.rect_push.addEventListener(egret.TouchEvent.TOUCH_TAP,function() { // 13B7F6\
//                var self: HostManagement = this;
//                while(self.groupManagementPush.group_addToImg.numElements>0){
//                    self.groupManagementPush.group_addToImg.removeChildren();
//                }
//                var it = new groupManagement.GroupManagerPushImage();
//                self.groupManagementPush.group_addToImg.addChild(it);
//                
//                self.groupManagementPush.isCutPc = 0; //默认不截图
//                self.groupManagementPush.text_title.text = "如:部落签到"
//                self.groupManagementPush.text_taskDirections.text = "如何做任务的说明和指引";
//                self.groupManagementPush.text_taskLink.text = "请输入任务链接";
//                
//                
//                self.lable_Publish.textColor = 0x13B7F6;
//                self.lable_audit.textColor = 0x333333;
//                self.lable_management.textColor = 0x333333;
//                self.changePos(self.lable_Publish);
//                self.crateGroupItem(1);
//                
//                },this)
//                    
//            this.rect_audit.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
//                self.lable_audit.textColor = 0x13B7F6;
//                self.lable_Publish.textColor = 0x333333;
//                self.lable_management.textColor = 0x333333;
//                self.changePos(self.lable_audit);
//                self.crateGroupItem(2);
//                },this);
//                
//            this.rect_manager.addEventListener(egret.TouchEvent.TOUCH_TAP,function(sender){
//                self.lable_management.textColor = 0x13B7F6;
//                self.lable_Publish.textColor = 0x333333;
//                self.lable_audit.textColor = 0x333333;
//                self.changePos(self.lable_management);
//                self.crateGroupItem(3);
//                },this);
        }
        

        public task_publish(): void {
            var self: HostManagement = this;
            console.log(self.groupManagementPush.group_addToImg.numElements,"1")
            while(self.groupManagementPush.group_addToImg.numElements > 0) {
                self.groupManagementPush.group_addToImg.removeChildren();
            }
            console.log(self.groupManagementPush.group_addToImg.numElements,"2")
//            var it = new groupManagement.GroupManagerPushImage();
//            self.groupManagementPush.group_addToImg.addChild(it);
//            console.log(self.groupManagementPush.group_addToImg.numElements,"3")

            self.groupManagementPush.isCutPc = 0; //默认不截图
            self.groupManagementPush.text_title.text = "如:部落签到"
            self.groupManagementPush.text_taskDirections.text = "如何做任务的说明和指引";
            self.groupManagementPush.text_taskLink.text = "请输入任务链接";
//            self.lable_Publish.textColor = 0x13B7F6;
//            self.lable_audit.textColor = 0x333333;
//            self.lable_management.textColor = 0x333333;
//            self.changePos(self.lable_Publish);
            self.crateGroupItem(1);
        }
        
        public task_shenYue():void{
            var self: HostManagement = this;
//            self.lable_audit.textColor = 0x13B7F6;
//            self.lable_Publish.textColor = 0x333333;
//            self.lable_management.textColor = 0x333333;
//            self.changePos(self.lable_audit);
            self.crateGroupItem(2);
        }
        
        public task_guangLi():void{
            var self: HostManagement = this;
//            self.lable_management.textColor = 0x13B7F6;
//            self.lable_Publish.textColor = 0x333333;
//            self.lable_audit.textColor = 0x333333;
//            self.changePos(self.lable_management);
            self.crateGroupItem(3);
        }
        
        
        
        public changePos(str:eui.Label):void{
            var distance = Math.sqrt((this.img_jt.x - str.x) * (this.img_jt.x - str.x));
            var time = distance/2;
            var _x = str.x; 
            egret.Tween.get(this.img_jt).to({ x: _x - 50 },time);
        }
        
        public crateGroupItem(type:number):void{
            switch(type){
                case 1:
                    this.group_push.visible = true;
                    this.group_manager.visible = false;
                    this.group_audit.visible = false;
                    this.group_manageInfo.visible = false;
                    break;
                case 2:
                    this.group_audit.visible = true;
                    this.group_push.visible = false;
                    this.group_manager.visible = false;
                    this.group_manageInfo.visible = false;
                    break;
                case 3:
                    this.group_manager.visible = true
                    this.group_push.visible = false;
                    this.group_audit.visible = false;
                    this.group_manageInfo.visible = false;
                    break;
            }
        }
        
        public setData(obj: Object,task_title:string){
            this.lable_taskManagement.text = task_title;
            this.allObj = obj;
            for(var i:number = 0;i<obj["list"].length; i++){
                var it = obj["list"][i];
                this.objArr.push(it);
            }
            this.group_push.addChild(this.groupManagementPush);
            this.groupManagementPush.setData(obj["member_num"]); //发布界面
          
            this.group_audit.addChild(this.groupManagementAudit);
            this.groupManagementAudit.setData(this.allObj,obj["member_num"]); //审计界面
           
            this.group_manager.addChild(this.groupManagement);
            this.groupManagement.setData(this.allObj); //管理界面
           
        }
        
        
        public clear():void{
            console.log("删除");
            this.lable_taskManagement.text = "";
            while(this.group_push.numElements > 0) {
                var item = this.group_push.getElementAt(this.group_push.numElements - 1);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while(this.groupManagementAudit.group_audit.numElements > 0) {
                var it1: groupManagement.GroupManagementAuditItem = <groupManagement.GroupManagementAuditItem>this.groupManagementAudit.group_audit.getElementAt(this.groupManagementAudit.group_audit.numElements - 1);
                groupManagement.GroupManagementAuditItem.reclaim(it1);
                if(it1.parent) {
                    it1.parent.removeChild(it1);
                }
            }
            while(this.groupManagement.group_addManagement.numElements > 0) {
                var it: groupManagement.GroupManagementItem = <groupManagement.GroupManagementItem>this.groupManagement.group_addManagement.getElementAt(this.groupManagement.group_addManagement.numElements - 1);
                groupManagement.GroupManagementItem.reclaim(it);
                if(it.parent) {
                    it.parent.removeChild(it);
                }
            }
            
            while(this.groupManagementPush.group_addToImg.numElements > 0) {
                this.groupManagementPush.group_addToImg.removeChildren();
            }
        }
        
        public comeBack():void{
            GameApp.Manager.controllerManager.taskController.show();
            GameApp.Manager.controllerManager.groupManagerController.hide();
        }
	}
}
