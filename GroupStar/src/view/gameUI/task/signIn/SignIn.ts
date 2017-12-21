module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class SignIn extends eui.Component{
    	public type:number=0;
    	private scroll1:eui.Scroller;
    	private groupTip1:eui.Group;
        private lable_continuousDay:eui.Label;
        private labla_crit:eui.Label;
        private lable_firstSign:eui.Label;
        private lable_fansName1:eui.Label;
        private lable_reward:eui.Label;
        private lable_fansName2:eui.Label;
        private lable_reward2:eui.Label;
        private lable_fansName3:eui.Label;
        private lable_reward3:eui.Label;
        private lable_todaySignNumber:eui.Label;
        private img_conDayIcon:eui.Image;
        private img_critIcon:eui.Image;
        private img_firstDayIcon:eui.Image;
        public group_signPersonIcon:eui.Group;
       // private btn_signIn:eui.Image; //签到
        private allObj:Object;
       // private userPic: task.SignPersonIcon;
        private btnHelp:eui.Image;
        private rect_haoZhao:eui.Rect;//号召群友
        private btn_back:eui.Image;//返回按钮
        private lable_lb1:eui.Label;
        private img_d1:eui.Image;
        private img_d2:eui.Image;
        private img_d3:eui.Image;
        private taskTip: TaskTip;
        private uid1:number;
        private uid2:number;
        private uid3:number;
        
        private lable_signIn:eui.Label;//签到
        private lable_getExpAndDia: eui.Label; 
        
        public diaNumber:number;
        public expNumber:number;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/signIn/SignInSkin.exml";
            this.taskTip = new TaskTip();
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_continuousDay.fontFamily = "Heiti SC";
                this.labla_crit.fontFamily = "Heiti SC";
                this.lable_firstSign.fontFamily = "Heiti SC";
                this.lable_fansName1.fontFamily = "Heiti SC";
                this.lable_fansName2.fontFamily = "Heiti SC";
                this.lable_fansName3.fontFamily = "Heiti SC";
                this.lable_reward.fontFamily = "Heiti SC";
                this.lable_reward2.fontFamily = "Heiti SC";
                this.lable_reward3.fontFamily = "Heiti SC";
                this.lable_todaySignNumber.fontFamily = "Heiti SC";
                this.lable_lb1.fontFamily = "Heiti SC";
                this.lable_signIn.fontFamily = "Heiti SC";
                this.lable_getExpAndDia.fontFamily = "Heiti SC";
                }  
            this.scroll1.height = this.stage.stageHeight;
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.help_tap,this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn_comeBack,this);
            this.rect_haoZhao.addEventListener(egret.TouchEvent.TOUCH_TAP,this.SignHaoZhao,this);
            this.img_conDayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchContinus,this);
            this.img_critIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchCrit,this);
            this.img_firstDayIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchtoday,this);
          
        }
        
        public touchContinus(e:egret.Event):void{
            if(this.uid1 > 0)
            userPanel.UserPanel.getInstance().open(this.uid1,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid);
            e.stopPropagation();
        }
        public touchCrit(e: egret.Event): void {
            if(this.uid2 > 0)
            userPanel.UserPanel.getInstance().open(this.uid2,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid);
            e.stopPropagation();
        }
        public touchtoday(e: egret.Event): void {
            if(this.uid3 > 0)
            userPanel.UserPanel.getInstance().open(this.uid3,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid);
            e.stopPropagation();
        }
        
        
        public setData(obj: Object): void {
         
            this.allObj = obj;
            
            if(obj["signedLongest"]["user_id"]){
                this.uid1 = obj["signedLongest"]["user_id"];
                this.lable_continuousDay.text = "连续" + window["hexToDec"](obj["signedLongest"]["num"]) + "天";
                this.lable_fansName1.text = window["hexToDec"](obj["signedLongest"]["user_name"]);
                this.lable_reward.text = "奖励：" + + window["hexToDec"](obj["signedLongest"]["longest_sign_reward"]);
                this.img_d1.visible = true
                RES.getResByUrl(obj["signedLongest"]["user_pic"],this.conDayIcon,this,RES.ResourceItem.TYPE_IMAGE);
            } else {
                this.lable_continuousDay.text = "连续签到";
                this.lable_fansName1.text = "暂无";
                this.lable_reward.text = "暂无";
                this.img_d1.visible = false;
            }
            
            if(obj["signedCrit"]["user_id"]){
                this.uid2 = obj["signedCrit"]["user_id"];
                this.lable_fansName2.text = window["hexToDec"](obj["signedCrit"]["user_name"]);
                this.lable_reward2.text = "奖励：" + window["hexToDec"](obj["signedCrit"]["crit_sign_reward"]);
                this.img_d2.visible = true;
                RES.getResByUrl(obj["signedCrit"]["user_pic"],this.critIcon,this,RES.ResourceItem.TYPE_IMAGE);
            }else{
                this.lable_fansName2.text = "暂无";
                this.img_d2.visible = false;
                this.lable_reward2.text = "暂无";
            }
            
            if(obj["signedFirst"]["user_id"]){
                this.uid3 = obj["signedFirst"]["user_id"];
                this.lable_fansName3.text = window["hexToDec"](obj["signedFirst"]["user_name"]);
                this.lable_reward3.text = "奖励：" + window["hexToDec"](obj["signedFirst"]["group_first_sign_reward"]);
                this.img_d3.visible = true;
                RES.getResByUrl(obj["signedFirst"]["user_pic"],this.firstDayIcon,this,RES.ResourceItem.TYPE_IMAGE);
            }else{
                this.lable_fansName3.text = "暂无";
                this.lable_reward3.text = "暂无";
                this.img_d3.visible = false;
            }
          
            
            var arrSign = obj["signedUserArray"];
            for(var i:number = 0;i<arrSign.length ; i++ ){
                var SignPersonIcon = task.SignPersonIcon.produce();
                this.group_signPersonIcon.addChild(SignPersonIcon);
//                SignPersonIcon.setData(arrSign[i]);
            }
            for(var i:number=this.group_signPersonIcon.numElements-1;i>=0;i--){
                var sicon:task.SignPersonIcon=<task.SignPersonIcon>this.group_signPersonIcon.getElementAt(i);
                sicon.setData(arrSign[i]);
            }
        }
        
        private help_tap(): void {
            this.groupTip1.visible=true;
            GameApp.Manager.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.help_end,this);
        }
        private help_end(): void {
            this.groupTip1.visible = false;
            GameApp.Manager.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.help_end,this);
        }
        
        public btnSign(b:egret.Event):void{
            if(!this.allObj["isSigned"]){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + this.allObj["signInfo"]["id"] + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/signIn",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,id: this.allObj["signInfo"]["id"],sign: sign },function(obj: Object) {
                    if(obj['st'] == 1) {
                    }
                },true,this);
          }
        }
        
        public SignHaoZhao(e:egret.Event):void{
            if(this.allObj["isSigned"]) {
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriends",
                    { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                        system.Share.share(obj,function(n: number) {
                            if(n == 1)
                                system.TipText.produce().open("发送成功");
                        });
                    },true,this);
            }
        }
        
        
        public signOK(obj: Object): void {
            console.log("签到返回值");
            this.diaNumber = obj["add_lucky_star"];
            this.expNumber = obj["each_sign_group_exp"];
            
            if(obj["isSignFrist"]){
                this.lable_getExpAndDia.text = "获得" + obj["add_lucky_star"] + "钻，" + obj["each_sign_group_exp"] + "点群经验!";
                this.lable_getExpAndDia.visible = true;
            }
            
            if(!obj["isSignFrist"]) {
                this.lable_getExpAndDia.text = "获得" + obj["each_sign_group_exp"] + "点群经验!";
                this.lable_getExpAndDia.visible = false;
            }
            
            this.taskTip.x = (750 - 346) / 2;
            this.taskTip.y = 500;
            
            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
            GameApp.Manager.viewManager.gameMainUI.setLucky();
            
        }
        
        public updatePOsAndStay(dia:number,exp:number):void{
            this.lable_signIn.text = "今日已签到!";
            if(dia>0){
                this.lable_getExpAndDia.text = "获得" + dia + "钻，" + exp + "点群经验!"; // 
            }
        }
        
        public setUpdateValue(obj:Object){
            if(obj["group_openid"] != GameApp.Manager.dataManager.group_openid) {
//                var userPic = task.SignPersonIcon.produce()
//                this.group_signPersonIcon.addChild(userPic);
//                console.log(obj,"-------");
//                userPic.setData1(obj);
                return;
            }
            if(obj["isSignFirst"] == true) {
                this.taskTip.show(obj["add_lucky_star"]);
                this.addChild(this.taskTip);
            }
            console.log(obj,"0000=");
            //添加自己
            var userPic = task.SignPersonIcon.produce();
            this.group_signPersonIcon.addChild(userPic);
            console.log(obj,"-------");
            userPic.setData1(obj);
            
            if(obj["isSignedLongest"]){
                this.lable_continuousDay.text = "连续" + obj["userSignedNum"] + "天";
                this.lable_fansName1.text = (GameApp.Manager.dataManager.user_name);
                this.lable_reward.text = "奖励：" + window["hexToDec"](this.allObj["signedLongest"]["longest_sign_reward"]);
                this.img_d1.visible = true;
                RES.getResByUrl(obj["user_pic"],this.conDayIcon,this,RES.ResourceItem.TYPE_IMAGE);
            }

            if(obj["isTodaySignedCrit"]) {
                this.lable_fansName2.text = (GameApp.Manager.dataManager.user_name);
                this.lable_reward2.text = "奖励：" + window["hexToDec"](this.allObj["signedCrit"]["crit_sign_reward"]);
                this.img_d2.visible = true;
                RES.getResByUrl(obj["user_pic"],this.critIcon,this,RES.ResourceItem.TYPE_IMAGE);
            }

            if(obj["isTodaySignedFrist"]) {
                this.lable_fansName3.text = (GameApp.Manager.dataManager.user_name);
                this.lable_reward3.text = "奖励：" + window["hexToDec"](this.allObj["signedFirst"]["group_first_sign_reward"]);
                this.img_d3.visible = true;
                RES.getResByUrl(obj["user_pic"],this.firstDayIcon,this,RES.ResourceItem.TYPE_IMAGE);
            }
        }
        
        public conDayIcon(source:egret.Texture):void {
            this.img_conDayIcon.texture = source;
        }
        
        public critIcon(source:egret.Texture):void{
            this.img_critIcon.texture = source;
        }
        public firstDayIcon(source: egret.Texture): void {
            this.img_firstDayIcon.texture = source;
        }
        
        public clear():void{
            while(this.group_signPersonIcon.numElements > 0){
               var iteme:SignPersonIcon = <SignPersonIcon>this.group_signPersonIcon.getElementAt(this.group_signPersonIcon.numElements -1);
               SignPersonIcon.reclaim(iteme);
               if(iteme.parent){
                  iteme.parent.removeChild(iteme);
               }
            }
            this.img_conDayIcon.texture = null;
            this.img_critIcon.texture = null;
            this.img_firstDayIcon.texture = null;
            this.scroll1.viewport.scrollV = 0;
        }
        
        public btn_comeBack():void{
            GameApp.Manager.controllerManager.signController.hide();
            if(this.type==0){
                //主界面
                GameApp.Manager.controllerManager.gameMainController.show();
            }else{
                //主界面
                GameApp.Manager.controllerManager.taskController.show();
            }
        }
	}
}
