module pay {
	/**
	 *
	 * @author 
	 *
	 */
	export class PayUI extends eui.Component{
//        private static _intance: PayUI = new PayUI();
        private static _instance: PayUI;
        public static getInstance(): PayUI {
            if(!this._instance) {
                this._instance = new PayUI();
            }
            return this._instance;
        }
    	private btn1:eui.Button;
    	private btn2:eui.Button;
    	private btn3:eui.Button;
    	private btn4:eui.Button;
    	private btn5:eui.Button;
        private lblStar:eui.Label;
        private lbl1:eui.Label;
        private lbl2: eui.Label;
        private lbl3: eui.Label;
        private lbl4: eui.Label;
        private lbl5: eui.Label;
        private lbl6: eui.Label;
        private lbl7: eui.Label;
        private lbl8: eui.Label;
        private lbl9: eui.Label;
        private lbl10: eui.Label;
        private lbl11: eui.Label;
        private lbl12: eui.Label;
        private lbl13: eui.Label;
        private lbl14: eui.Label;
        private lbl15: eui.Label;
        
        private lblIOSID:eui.Label;
        private groupIOS:eui.Group;
        private btnCloseIos:eui.Image;
        private btnClose:eui.Image;
        private btnCloseTip:eui.Image;
        public static getLuckyStarNum:number=3;
        private lable_uid:eui.Label;
        private lable_des:eui.Label;
        
        public type:number=0;
        public isBuyModul:number;
        private lable_love:eui.Label;
        private lable_loveDsc:eui.Label;
        private btn8:eui.Button
        private group_canBuyLoveGift:eui.Group;
        public  static isByGift:boolean = false;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/pay/PayUISkin.exml";
		}
//        public static getInstance(): PayUI {
//            return this._intance;
//        }
//		
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblStar.fontFamily = "Heiti SC";
                this.lblIOSID.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
                this.lbl12.fontFamily = "Heiti SC";
                this.lbl13.fontFamily = "Heiti SC";
                this.lbl14.fontFamily = "Heiti SC";
                this.lbl15.fontFamily = "Heiti SC";
                this.lable_uid.fontFamily = "Heiti SC";
                this.lable_des.fontFamily = "Heiti SC";
                this.lable_love.fontFamily = "Heiti SC";
                this.lable_loveDsc.fontFamily = "Heiti SC";
            }
    		this.groupIOS.visible=false;
            this.lblIOSID.text ="用户ID:"+GameApp.Manager.dataManager.uid;
		    this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn1_tap,this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn2_tap,this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn3_tap,this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn4_tap,this);
            this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn5_tap,this);
//            this.btnCloseIos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnIosClose,this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.btnCloseTip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTip,this);
            this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn8_tap,this);
		}
		
        private btnIosClose():void{
            this.groupIOS.visible=false;
        }
        
		public setData():void{
		    this.setLucky();
            this.lable_uid.text = "ID: " + GameApp.Manager.dataManager.uid;
            if(PayUI.isByGift){
                this.group_canBuyLoveGift.visible = true;
                this.lable_des.y = 1024;
            }else{
                this.group_canBuyLoveGift.visible = false;
                this.lable_des.y = 905
            }
            this.lable_des.visible = true;
		}
        public setLucky():void{
            this.lblStar.text = GameApp.Manager.dataManager.lucystar + "";
        }
		private btn1_tap():void{
		    this.pay(1);
		}
        private btn2_tap(): void {
            this.pay(2);
        }
        private btn3_tap(): void {
            this.pay(3);
        }
        private btn4_tap(): void {
            this.pay(4);
        }
        private btn5_tap(): void {
            this.pay(5);
        }
        public btn6_tap(): void {
            this.pay(6);
        }
        public btn7_tap(): void {
            this.pay(7);
        }
        public btn8_tap(): void {
            this.pay(8);
        }
        private pay(type:number):void{
            aler.AlertPanel1.getInstance().show('温馨提示','暂停充值，新版开放后则可继续充值。',"确定",function() {
                GameApp.Manager.viewManager.clearMask();//清楚遮照
            },this);
            
//            var goods_id: number = type;
//            if(Tools.getInstance().isIphone()) {
//                console.log("iphone");
//                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.group_openid + goods_id + "&");
//                Util.sendJson1(GameApp.Manager.dataManager.IP + "/rechargeCustom",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,goods_id: goods_id,sign: sign },function(obj: string) {
//                    console.log(obj,"返回值",obj["info"],"info");
//                    if(obj["st"] == 1) {
//                        location.href = obj["info"];
//                    }
//                },true,this);
//            } else {
//                console.log("android");
//                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + goods_id + "&");
//                Util.sendJson1(GameApp.Manager.dataManager.IP + "/recharge",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,goods_id: goods_id,sign: sign },function(obj: Object) {
//                    obj['goods_id'] = goods_id;
//                    this.payCall(obj);
//                },true,this);
//            } 
            
            
            
//            if(type==8){
//                i
//            }else{
//                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.group_openid + goods_id + "&");
//                Util.sendJson1(GameApp.Manager.dataManager.IP + "/rechargeCustom",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,goods_id: goods_id,sign: sign },function(obj: string) {
//                    console.log(obj,"返回值",obj["info"],"info");
//                    if(obj["st"] == 1) {
//                        location.href = obj["info"];
//                    }
//                },true,this);
//            }
        }
        private payCall(obj:Object):void{
            console.log(obj["st"]);
            switch(obj["st"]){
                case 1:
                    this.jspay(obj);
                break;
                case 2:
//                    this.groupIOS.visible=true; //ios充值；
                break;
                default:
                    //失败
                break;
            }
        }
        private jspay(obj:Object):void{
            var self: PayUI = this;
                window["openGroup"].pay({
                appid: obj["appid"], // 选填，若不填则使用url参数appid（必须有）
                // 本群openid
                group_openid: obj["group_openid"], // 选填，若不填则使用url参数group_openid（必须有）
                goodsname   : obj["goodsname"], // 商品名称，该参数只做出问题之后排查和记录使用，不会出现在支付页面
                goodsdesc: obj["goodsdesc"], // 商品描述，与商品名称字符串总和不超过256 且不能包含"*" 也不能包含换行符，该参数只做出问题之后排查和记录使用，不会出现在支付页面
                goodsurl : obj["goodsurl"], // 商品链接，长度不超过512字符
                money    : obj["money"],  // 总金额，以角为单位，不允许包含任何字、符号
                tid      : obj["tid"],      // 内部的定单号，32个字符内、只能由字母数字组成，同一个appid下，tid不得重复
                sign     : obj["sign"],    // 签名
                onSuccess: function(res) {
//                    GameApp.Manager.viewManager.labelAnimation("购买成功");
                    system.TipText.produce().open("购买成功",2000,1000);
                    GameApp.Manager.viewManager.gameMainUI.getLuckyStarByServer();
//                    console.log(res);
                    if(self.isBuyModul == 2){
                        userPanel.UserPanel.getInstance().changeMedal2Stage();
                    }
                    if(obj['goods_id'] &&　obj['goods_id']==8){
                       GameApp.Manager.viewManager.taskManager.taskUI.changeLiBaoPos();
                    }
                },
                onError: function(res) {
                    // res.code === 1，表示支付取消，其余情况表示支付失败
//                    GameApp.Manager.viewManager.labelAnimation("购买失败");
                    system.TipText.produce().open("购买失败",2000,1000);
//                    aler.AlertPanel1.getInstance().show(JSON.stringify(res),"本群经验+100，钻石+10","确定");
                }
            });
        }
        private closeTip():void{
            this.groupIOS.visible=false;
        }
        private close():void{
            this.groupIOS.visible = false;
            if(this.type==0){
                GameApp.Manager.controllerManager.payController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            }else{
                GameApp.Manager.controllerManager.payController.hide();
                GameApp.Manager.viewManager.liveChatRoomManager.show(-1);
            }
            this.lable_des.visible = false;
        }
	}
}
