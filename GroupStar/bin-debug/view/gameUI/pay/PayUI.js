var pay;
(function (pay) {
    /**
     *
     * @author
     *
     */
    var PayUI = (function (_super) {
        __extends(PayUI, _super);
        function PayUI() {
            _super.call(this);
            this.type = 0;
            this.skinName = "src/view/gameUI/pay/PayUISkin.exml";
        }
        var d = __define,c=PayUI,p=c.prototype;
        PayUI.getInstance = function () {
            if (!this._instance) {
                this._instance = new PayUI();
            }
            return this._instance;
        };
        //        public static getInstance(): PayUI {
        //            return this._intance;
        //        }
        //		
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
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
            this.groupIOS.visible = false;
            this.lblIOSID.text = "用户ID:" + GameApp.Manager.dataManager.uid;
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1_tap, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2_tap, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn3_tap, this);
            this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn4_tap, this);
            this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn5_tap, this);
            //            this.btnCloseIos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnIosClose,this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btnCloseTip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTip, this);
            this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn8_tap, this);
        };
        p.btnIosClose = function () {
            this.groupIOS.visible = false;
        };
        p.setData = function () {
            this.setLucky();
            this.lable_uid.text = "ID: " + GameApp.Manager.dataManager.uid;
            if (PayUI.isByGift) {
                this.group_canBuyLoveGift.visible = true;
                this.lable_des.y = 1024;
            }
            else {
                this.group_canBuyLoveGift.visible = false;
                this.lable_des.y = 905;
            }
            this.lable_des.visible = true;
        };
        p.setLucky = function () {
            this.lblStar.text = GameApp.Manager.dataManager.lucystar + "";
        };
        p.btn1_tap = function () {
            this.pay(1);
        };
        p.btn2_tap = function () {
            this.pay(2);
        };
        p.btn3_tap = function () {
            this.pay(3);
        };
        p.btn4_tap = function () {
            this.pay(4);
        };
        p.btn5_tap = function () {
            this.pay(5);
        };
        p.btn6_tap = function () {
            this.pay(6);
        };
        p.btn7_tap = function () {
            this.pay(7);
        };
        p.btn8_tap = function () {
            this.pay(8);
        };
        p.pay = function (type) {
            aler.AlertPanel1.getInstance().show('温馨提示', '暂停充值，新版开放后则可继续充值。', "确定", function () {
                GameApp.Manager.viewManager.clearMask(); //清楚遮照
            }, this);
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
        };
        p.payCall = function (obj) {
            console.log(obj["st"]);
            switch (obj["st"]) {
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
        };
        p.jspay = function (obj) {
            var self = this;
            window["openGroup"].pay({
                appid: obj["appid"],
                // 本群openid
                group_openid: obj["group_openid"],
                goodsname: obj["goodsname"],
                goodsdesc: obj["goodsdesc"],
                goodsurl: obj["goodsurl"],
                money: obj["money"],
                tid: obj["tid"],
                sign: obj["sign"],
                onSuccess: function (res) {
                    //                    GameApp.Manager.viewManager.labelAnimation("购买成功");
                    system.TipText.produce().open("购买成功", 2000, 1000);
                    GameApp.Manager.viewManager.gameMainUI.getLuckyStarByServer();
                    //                    console.log(res);
                    if (self.isBuyModul == 2) {
                        userPanel.UserPanel.getInstance().changeMedal2Stage();
                    }
                    if (obj['goods_id'] && obj['goods_id'] == 8) {
                        GameApp.Manager.viewManager.taskManager.taskUI.changeLiBaoPos();
                    }
                },
                onError: function (res) {
                    // res.code === 1，表示支付取消，其余情况表示支付失败
                    //                    GameApp.Manager.viewManager.labelAnimation("购买失败");
                    system.TipText.produce().open("购买失败", 2000, 1000);
                    //                    aler.AlertPanel1.getInstance().show(JSON.stringify(res),"本群经验+100，钻石+10","确定");
                }
            });
        };
        p.closeTip = function () {
            this.groupIOS.visible = false;
        };
        p.close = function () {
            this.groupIOS.visible = false;
            if (this.type == 0) {
                GameApp.Manager.controllerManager.payController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else {
                GameApp.Manager.controllerManager.payController.hide();
                GameApp.Manager.viewManager.liveChatRoomManager.show(-1);
            }
            this.lable_des.visible = false;
        };
        PayUI.getLuckyStarNum = 3;
        PayUI.isByGift = false;
        return PayUI;
    }(eui.Component));
    pay.PayUI = PayUI;
    egret.registerClass(PayUI,'pay.PayUI');
})(pay || (pay = {}));
