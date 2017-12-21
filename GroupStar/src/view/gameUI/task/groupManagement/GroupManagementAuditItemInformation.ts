module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagementAuditItemInformation extends eui.Component {
        private lable_itemTitle:eui.Label;
        private lable_yj:eui.Label;
        private btn_reward:eui.Rect;
        private group_itemInformation:eui.Group;//要添加进去的
        private btn_back:eui.Image;
        private open_id:string;  //需要传送的
        private scro2:eui.Scroller;
       // private groupBottom:eui.Group;
        private groupButton:eui.Scroller;
        private lable_ZW:eui.Label //暂无
        
        private groupLarge: eui.Group;
        private bmpLarge: eui.Image;
        private groupTip: eui.Group;
        private bmpTX: eui.Image;
        private smallImg: string;
        private largeImg: string;
        private rect_henggang:eui.Rect;
		
        public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/groupManagementAuditItemInformationSkin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_itemTitle.fontFamily = "Heiti SC";
                this.lable_yj.fontFamily = "Heiti SC";
            }
              this.scro2.height = this.stage.stageHeight - 127 - 245;
              this.groupButton.y=this.stage.stageHeight-127;
            this.btn_reward.addEventListener(egret.TouchEvent.TOUCH_TAP,this.reward,this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.comeToGroupManagerScreen,this)
        }
        
        public setData(obj:Object,_open_id:string,title:string):void{
            //console.log("审计详情页",obj,obj["data"]);
            this.clear();
            this.lable_itemTitle.text = window["hexToDec"](title);
            
            this.open_id = _open_id;
            var len = obj["data"].length;
            if(len == 0){
                this.rect_henggang.visible = false;
                this.btn_reward.visible = false;
                this.lable_yj.visible = false;
                this.lable_ZW.visible = true;
            }else{
                this.lable_ZW.visible = false;
                this.btn_reward.visible = true;
                this.lable_yj.visible = true;
                this.rect_henggang.visible = true;
            }
            console.log(len,"长度");
            for(var i: number = 0;i<len; i++){
                var it = groupManagement.GroupManagementAuditItemInformationItem.produce();
                this.group_itemInformation.addChild(it);
                it.setData(obj["data"][i],_open_id);
             
            }
        }
        public disLarge(url: string): void {
            console.log(url);
            RES.getResByUrl(url,this.loadlarge_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.startx();
        }
        private loadlarge_end(source: egret.Texture): void {
            this.bmpLarge.source = source;
            this.groupLarge.visible = true;
            this.endtx();
            this.groupTip.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addLargeLis,this);
        }
        private addLargeLis(): void {
            this.groupLarge.visible = false;
            this.bmpLarge.source = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.addLargeLis,this);
        }
        private startx(): void {
            this.groupTip.visible = true;
            this.bmpTX.visible = true;
            //            this.scroll1.height=1492;
            egret.Tween.get(this.bmpTX,{ loop: true }).to({ rotation: 360 },1000);
        }
        private endtx(): void {
            this.bmpTX.visible = false;
            egret.Tween.removeTweens(this.bmpTX);
        }
        
        public reward(e:egret.Event):void{
            system.TipText.produce().open("所有粉丝都已奖励")
            var self: groupManagement.GroupManagementAuditItemInformation = this
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + this.open_id + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/rewardRedFlowerAll",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,open_task_id: this.open_id,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    var num = self.group_itemInformation.numElements;
                    for(var i:number = 0;i<num;i++){
                        var it: groupManagement.GroupManagementAuditItemInformationItem = <groupManagement.GroupManagementAuditItemInformationItem>self.group_itemInformation.getElementAt(i);
                        for(var j: number = 0;j < obj["data"].length; j++){
                            var it1_id = obj["data"][j]["user_id"];
                            console.log(it1_id,it.target_id,"id");
                            if(it.target_id == it1_id){
                                it.lable_getCount.text = "获得" + window["hexToDec"](obj["data"][j]["red_flower_num"]) + "次";
                                it.lable_getRedFlower.text = "已奖励"
                            }
                        }
                    }
                }
            },true,this);
        }
        public comeToGroupManagerScreen():void{
            GameApp.Manager.controllerManager.groupManagerAuditController.hide();
            GameApp.Manager.controllerManager.groupManagerController.show("管理任务");
        }
        
        public clear():void{
          console.log("删除——————————————————————————");
            while(this.group_itemInformation.numElements>0){
                var it4: groupManagement.GroupManagementAuditItemInformationItem = <groupManagement.GroupManagementAuditItemInformationItem>this.group_itemInformation.getElementAt(this.group_itemInformation.numElements - 1);
                groupManagement.GroupManagementAuditItemInformationItem.reclaim(it4);
                if(it4.parent){
                    it4.parent.removeChild(it4);
                }
            }
        }
		
		
	}
}
