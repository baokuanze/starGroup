module sweepsTasks {
	/**
	 *
	 * @author 
	 *
	 */
	export class SweepsTasks extends eui.Component {
        private img_sweeps:eui.Image;
        private btn_arrow:eui.Group;
        private btn_close:eui.Image;
        private isRotate:boolean = true;
        private turnplate = 8;
        private lb1:eui.Label;
        private lb2:eui.Label;
        private lb3:eui.Label;
        private lb4: eui.Label;
        private lb5: eui.Label;
        private lb6: eui.Label;
        private group_free:eui.Group;
        private group_diamond:eui.Group;
        private group_result:eui.Group;
        private group_resultBg:eui.Group;
        private img_result_top:eui.Image;
        private rect_btn_sure:eui.Rect;
        private btn_share:eui.Rect;
        private group_share:eui.Group;
        
		public constructor() {
    		super();
            this.skinName ='src/view/gameUI/sweepsTasks/SweepsTasksSkin.exml';
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()){
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
                this.lb4.fontFamily = "Heiti SC";
                this.lb5.fontFamily = "Heiti SC";
                this.lb6.fontFamily = "Heiti SC";
            }
            this.img_sweeps.anchorOffsetX = this.img_sweeps.width / 2;
            this.img_sweeps.anchorOffsetY = this.img_sweeps.height / 2;
            this.btn_arrow.anchorOffsetX = this.btn_arrow.width / 2;
            this.btn_arrow.anchorOffsetY = this.btn_arrow.height / 2;
            this.group_resultBg.anchorOffsetX = this.group_resultBg.width/2;
            this.group_resultBg.anchorOffsetY = this.group_resultBg.height/2;
            this.img_sweeps.x = (this.stage.stageWidth - this.img_sweeps.width) / 2 + this.img_sweeps.anchorOffsetX;
            this.img_sweeps.y = (this.stage.stageHeight - this.img_sweeps.height) / 2 + this.img_sweeps.anchorOffsetY;
            this.btn_arrow.x = (this.stage.stageWidth - this.btn_arrow.width) / 2 + this.btn_arrow.anchorOffsetX;
            this.btn_arrow.y = (this.stage.stageHeight - this.btn_arrow.height) / 2 + this.btn_arrow.anchorOffsetY - 31;
            this.group_resultBg.x = (this.stage.stageWidth - this.group_resultBg.width) / 2 + this.group_resultBg.anchorOffsetX;
            this.group_resultBg.y = (this.stage.stageHeight - this.group_resultBg.height) / 2 + this.group_resultBg.anchorOffsetY;
            this.group_share.y = this.stage.stageHeight - 150;
            
            
            
            this.btn_arrow.addEventListener(egret.TouchEvent.TOUCH_TAP,this.runRotate,this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.rect_btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sure,this);
            this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/shareTimeLimitedActivity",
                    { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,count: this.iconCount,sign: sign },function(obj: Object) {
                        system.Share.share(obj,function(n: number) {
                            if(n == 1)
                                system.TipText.produce().open("发送成功");
                        });
                    },true,this);                
                },this);
         }
        
        public runRotate(e:egret.Event){
            var self: SweepsTasks = this;
            if(self.isRotate){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/joinTimeLimitedActivity",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
                    self.isRotate = false;
                    if(obj['st'] == 1) {
                        if(obj['data']['use_free'] || obj['data']['lucky_star_enough']) {
                            var angles = self.changeId(obj['data']['reward_id'])['tempId'] * (360 / self.turnplate) - (360 / (self.turnplate * 2));
                            if(angles <= 270) {
                                angles = 270 - angles - 22.5;
                            } else {
                                angles = 360 - angles + 270 - 22.5;
                            }
                            if(obj['data']['result']['lucky_star']) {
                                GameApp.Manager.dataManager.lucystar = obj['data']['result']['lucky_star']
                            }
                            if(obj['data']['result']['hot']) {
                                GameApp.Manager.dataManager.hot = obj['data']['result']['hot']
                            }
                            GameApp.Manager.dataManager.time_limited_activity_free = false;
                            egret.Tween.get(self.img_sweeps).to({ rotation: angles + 3600 },5000,egret.Ease.sineInOut).wait(400).call(function() {
                                egret.Tween.removeTweens(self.img_sweeps);
                                if(self.changeId(obj['data']['reward_id'])['tempId'] == 3) {
                                    self.img_result_top.visible = false;
                                } else {
                                    self.img_result_top.visible = true;
                                }
                                self.group_result.visible = true;
                                self.group_free.visible = false
                                self.group_diamond.visible = true;
                               
                                self.lb4.text = self.changeId(obj['data']['reward_id'])['title'];
                                self.lb5.text = self.changeId(obj['data']['reward_id'])['QQ'];
                            },this);
                        } else if(!obj['data']['lucky_star_enough']) {
                            self.isRotate = true;
                            aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                                if(data == "ok") {
                                    GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.sweepsTasksController.hide,0);
                                }
                            },this);
                        }
                    }else if(obj['st'] == -1){
                        self.isRotate = true;
                        aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                            if(data == "ok") {
                                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.sweepsTasksController.hide,0);
                            }
                        },this);
                    }
                },true,self);
            }
            
        }
        
        public changeId(id:number){
            var tempId;
            var title:string;
            var QQ:string;
            switch (id)
            {
                case 1:
                    tempId = 3;
                    title = '很遗憾未中奖，再接再厉哦！'
                    QQ=''
                    break;
                case 2:
                    tempId = 8;
                    title = '恭喜，您为明星贡献了5热度！'
                    QQ = ''
                    break;
                case 3:
                    tempId = 4
                    title = '恭喜，您获得了5钻石！'
                    QQ = ''
                    break;
                case 4:
                    tempId = 7;
                    title = '恭喜，您获得了10钻石！'
                    QQ = ''
                    break;
                case 5:
                    tempId = 2;
                    title = '恭喜，您为明星贡献了20热度！'
                    QQ = ''
                    break;
                case 6:
                    tempId = 5;
                    title = '恭喜，您为明星贡献了50热度！'
                    QQ = ''
                    break;
                case 7:
                    tempId = 1;
                    title = '恭喜，您获得了50钻石！'
                    QQ = ''
                    break;
                case 8:
                    tempId = 6;
                    title = '恭喜，您获得了珍贵的粉丝团周边1个，请与粉丝团客服联系兑奖。'
                    QQ = '客服:3409474914'
                    break;
            }
            return {
                tempId:tempId,
                title:title,
                QQ:QQ
            };
        }
        
        public close(e: egret.Event) {
            this.isRotate = true;
            GameApp.Manager.controllerManager.sweepsTasksController.hide();
            GameApp.Manager.controllerManager.gameMainController.show();   
        }
        public sure(e:egret.Event){
            this.group_result.visible = false;
            this.img_result_top.visible = false;
            this.isRotate = true;
            this.lb4.text='';
            this.lb5.text='';
        }
        
        public setData(){
            if(GameApp.Manager.dataManager.time_limited_activity_free){
                this.group_free.visible = true;
                this.group_diamond.visible = false;
            }else{
                this.group_diamond.visible = true;
                this.group_free.visible = false;
            }
        }
        
        public clear(){
            this.group_free.visible = false;
            this.group_diamond.visible = false;
            this.img_sweeps.rotation = 0;
            egret.Tween.removeTweens(this.img_sweeps);
        }
	}
}
