module groupXuan {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskGroupXuan extends eui.Component {
        private lable_call:eui.Label;
        private Edit_xuanGroupDes:eui.EditableText;
        private lable_pushXuanGroup:eui.Label;
        private lable_xuanGroupTitle:eui.Label;
        private rect_pushXuanGroup:eui.Rect;
        private btn_back:eui.Image;
        private static obj:Object;
        private isBuy:boolean = false;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupXuan/TaskGroupXuanSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_call.fontFamily = "Heiti SC"
                this.Edit_xuanGroupDes.fontFamily = "Heiti SC";
                this.lable_xuanGroupTitle.fontFamily = "Heiti SC";
                this.lable_pushXuanGroup.fontFamily = "Heiti SC";
            }
            var self: TaskGroupXuan = this;
            
            this.rect_pushXuanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                if(self.Edit_xuanGroupDes.text == "" || self.Edit_xuanGroupDes.text == "限制长度30字以内"){
                    system.TipText.produce().open("宣群口号不能为空",1000,800);
                }else{
                    if(GameApp.Manager.dataManager.lucystar>=50){
                        socketio.IoConnect.getInstance().sendMessage(data.PomeloData.getAndReceiveAnnounceGroup,{ message: window["decToHex"](self.Edit_xuanGroupDes.text) },function(data: Object) {
                           console.log(data,"data");
                            if(data['st'] == 1){
                                self.isBuy = true;
                                GameApp.Manager.dataManager.lucystar = data["data"]["lucky_star"];
                                console.log(data["data"]["lucky_star"],GameApp.Manager.dataManager.lucystar,"data");
                                system.TipText.produce().open("宣群成功，请到群排行查看",1000,800);
                            } else if((data["st"] == -1 )&& (data["msg"]["code"] == 2)){
                                system.TipText.produce().open("3小时之内不能重复宣群",1000,800);
                            } else if((data["st"] == -1) && (data["msg"]["code"] == 1)){
                                system.TipText.produce().open("钻石不够，请购买钻石",1000,800); 
                            } else if((data["st"] == -1) && (data["msg"]["code"] == 0)){
                                system.TipText.produce().open("宣群失败",1000,800);
                            } 
                        },this)
                    }else{
                        aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                            if(data == "ok") {
                                self.close();
                                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide,0);
                            }
                        },this);
                    }
                }
            },this);
                
            this.Edit_xuanGroupDes.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                self.Edit_xuanGroupDes.text = "";
            },this); 
            
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                   self.close();
                },this)
        }
        public static init(obj:Object):void{
            TaskGroupXuan.obj = obj;  
        }
        
        
        public setData():void{
            if(!this.isBuy){
                if(TaskGroupXuan.obj["self"] && TaskGroupXuan.obj["self"]["message"]) {
                    GameApp.Manager.viewManager.taskManager.taskUI.xuanGrop.Edit_xuanGroupDes.text = window["hexToDec"](TaskGroupXuan.obj["self"]["message"]);
                } else {
                    GameApp.Manager.viewManager.taskManager.taskUI.xuanGrop.Edit_xuanGroupDes.text = "限制长度30字以内";
                }
            }else{
                
            }
        }
        
        public close(): void {
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
	}
}
