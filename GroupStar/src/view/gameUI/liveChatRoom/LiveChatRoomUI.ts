module live {
	/**
	 *
	 * @author 
	 *
	 */
	export class LiveChatRoomUI extends eui.Component{
    	public static obj:Object;
        public static setData(obj:Object): void {
            this.obj=obj;
            if(GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI){
                GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.setData(obj);
            }
        }
    	private btnClose:eui.Image;
    	private lbl1:eui.Label;
        private groupBottom:eui.Group;
        private txtInput:eui.EditableText;
        private btnGift:eui.Image;
        private btnTalk:eui.Image;
        private bmpBack:eui.Image;
        private btnFX:eui.Image;
        private src:string="";
        private timevar:any;
        private group_pro:eui.Group; //海报的显示
        private img_bgImg:eui.Image;//直播海报图片；
      
//        private bmpBack1:eui.Image;
//        public liveTalkChat:LiveTalkChat;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/liveChatRoom/LiveChatRoomUISkin.exml";
//            this.liveTalkChat=new LiveTalkChat();
		}
		public childrenCreated():void{
    		var self:LiveChatRoomUI=this;
            if(Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.txtInput.fontFamily = "Heiti SC";
//                this.bmpBack.visible=false;
//                this.bmpBack1.visible=false;
            }else{
                
            }
            this.lbl1.text=GameApp.Manager.dataManager.star_name+"的直播间";
		    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.groupBottom.y=this.stage.stageHeight-642;
            var talkchat:LiveTalkChat=LiveTalkChat.getInstance();
            this.groupBottom.addChild(talkchat);
            talkchat.y=642-390;
            this.btnFX.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starLiveShare",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                        system.Share.share(obj,function(n: number) {
                            if(n == 1)
                                system.TipText.produce().open("发送成功");
                        });
                    },true,this);
            },this);
            
            this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnGift_tap,this);
            this.btnTalk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.talk_tap,this);
            this.txtInput.addEventListener(egret.FocusEvent.FOCUS_IN,function() {
                if(self.timevar) {
                    clearTimeout(self.timevar);
                }
                if(self.txtInput.text == "和大家说点什么") {
                    self.txtInput.text = "";
                }
                self.btnGift.visible=false;
                self.btnTalk.visible=true;
            },this);
            this.txtInput.addEventListener(egret.FocusEvent.FOCUS_OUT,function() {
                if(self.txtInput.text == "") {
                    self.txtInput.text = "和大家说点什么";
                    if(self.timevar) {
                        clearTimeout(self.timevar);
                    }
                    self.btnGift.visible = true;
                    self.btnTalk.visible = false;
                }else{
                    if(self.timevar) {
                        clearTimeout(self.timevar);
                    }
                    self.timevar = setTimeout(function() {
                        self.btnGift.visible = true;
                        self.btnTalk.visible = false;
                    },2000);
                }
            },this);
		}
        public setData(obj:Object):void{
            switch(obj["state"]){
                case 0:this.lbl1.text="";break;
                case 1: 
                    this.src = obj["link"];
                    if(this.parent){
                        this.groupBottom.visible = true;
                        this.group_pro.visible = false;
                        GameApp.Manager.viewManager.hideBackGroup();
                        LiveTalkChat.getInstance().come();
                        this.lbl1.text = window["hexToDec"](live.LiveChatRoomUI.obj["title"]);
                        var src1: string = live.LiveChatRoomUI.obj["link"];
                        window["playVideo"](420 * GameApp.Manager.dataManager.sc,90 * GameApp.Manager.dataManager.sc,src1);
                    }
                break;
                case 2:
                    this.src ="";
                    if(this.parent) {
                        this.close();
                    }
                break;
            }
        }
        private btnGift_tap(e:egret.Event):void{
            flower.FlowerUI.getInstance().open(this.groupBottom);
            flower.FlowerUI.getInstance().y=642-310;
            e.stopPropagation();
        }
        private talk_tap():void{
            console.log('发送:' + this.txtInput.text);
            if(this.txtInput.text != "" && this.txtInput.text != "和大家说点什么") {
                var txt:string=this.txtInput.text;
                socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendTalk,{ message: txt },function(data: Object) {  },this);
            }
            this.txtInput.text='';
            if(this.timevar) {
                clearTimeout(this.timevar);
            }
            this.btnGift.visible = true;
            this.btnTalk.visible = false;
        }
        public talk(obj:Object):void{
            
        }
		public open(state:number):void{
    		if(GameApp.Manager.dataManager.visitor>0){
                this.btnFX.visible=false;
    		}else{
                this.btnFX.visible = true;
    		}
    		if(state == 0){
    		    this.group_pro.visible = true;
    		    //海报图片
                RES.getResByUrl(LiveChatRoomUI.obj["poster"],this.load_end0,this,RES.ResourceItem.TYPE_IMAGE);
                this.groupBottom.visible = false;
                this.lbl1.text = "";
    		}else{
    		    this.group_pro.visible = false;
                GameApp.Manager.viewManager.hideBackGroup();
                LiveTalkChat.getInstance().come();
                this.lbl1.text = window["hexToDec"](live.LiveChatRoomUI.obj["title"]);
                var src1: string = live.LiveChatRoomUI.obj["link"];
                window["playVideo"](420 * GameApp.Manager.dataManager.sc,90 * GameApp.Manager.dataManager.sc,src1);
                this.groupBottom.visible = true;
    		}
    		
		}
        public load_end0(source:egret.Texture):void{
            this.img_bgImg.texture = source;
        }
		
		public clear():void{
            window["endVideo"]();
            LiveTalkChat.getInstance().leave();
            GameApp.Manager.viewManager.showBackGroup();
		}
		public close():void{
		    GameApp.Manager.viewManager.liveChatRoomManager.hide();
		    GameApp.Manager.controllerManager.gameMainController.show();
		}
	}
}
