var containmoney;
(function (containmoney) {
    /**
     *
     * @author
     *
     */
    var ContainmoneyOpen = (function (_super) {
        __extends(ContainmoneyOpen, _super);
        function ContainmoneyOpen() {
            _super.call(this);
            this.key = "";
            this.bmpIcon = new module.BaseCircleImage();
            this.bmpIcon.x = 119;
            this.bmpIcon.y = 110;
            //            this.skinName = ztc.view.gameUI.smallgames.containmoney.ContainMoneyOpenSkin;
            this.skinName = "src/view/gameUI/containmoney/ContainMoneyOpenSkin.exml";
        }
        var d = __define,c=ContainmoneyOpen,p=c.prototype;
        ContainmoneyOpen.getInstance = function () {
            if (!this._instance) {
                this._instance = new ContainmoneyOpen();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblGroupName.fontFamily = "Heiti SC";
                this.lblBtnText.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblTip.fontFamily = "Heiti SC";
                this.lblStar.fontFamily = "Heiti SC";
            }
            this.bmpIcon.x = 137;
            this.bmpIcon.y = 108;
            this.bmpIconBack.visible = false;
            this.bmpIcon.visible = false;
            this.btnClose.visible = false;
            this.lblTip.visible = false;
            this.btnOK.visible = true;
            this.lblName.visible = true;
            this.lblBtnText.visible = true;
            this.lblTitle.visible = true;
            this.bmpStar.visible = false;
            this.lblStar.visible = false;
            this.lblGroupName.visible = false;
            this.bmpT3.visible = false;
            this.addChild(this.bmpIcon);
            this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ok_tap, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            //            this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            //                console.log('34324234');
            //            },this);
        };
        p.ok_tap = function () {
            //    		console.log('点击打开红包');
            this.lblBtnText.text = "正在打开...";
            if (this.key == "activity") {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/receiveActivityRedPackets", { user_id: GameApp.Manager.dataManager.uid, sign: sign }, function (obj) {
                    if (obj['st'] == 1) {
                        this.success(obj);
                    }
                    else {
                        this.fail();
                    }
                }, true, this);
            }
            else {
                socketio.IoConnect.getInstance().sendMessage(5, { key: this.key }, function (data) { this.call(data); }, this);
            }
        };
        p.setData = function (key) {
            this.key = key;
            GameApp.Manager.viewManager.maskStage(.4);
            GameApp.Manager.viewManager.TopUIStage.addChild(this);
            this.x = (750 - 388) / 2;
            this.y = (egret.MainContext.instance.stage.stageHeight - 452) / 2;
            this.lblTitle.text = "里面装满了钻石";
            this.lblName.text = "真爱红包";
            this.lblBtnText.text = "打开红包";
            this.lblName.y = 189;
            this.lblTitle.y = 243;
            this.bmpBackTitle.source = "h_t1";
            this.bmpBackTitle.y = 23;
            this.lblName.visible = true;
            this.lblTitle.visible = true;
            this.btnOK.visible = true;
            this.lblBtnText.visible = true;
        };
        p.success = function (obj) {
            //            this.bmpBack.source = "p_hb2";
            if (this.key == "activity") {
                this.lblGroupName.visible = false;
                this.lblName.text = window["hexToDec"](GameApp.Manager.dataManager.star_name);
                this.bmpIcon.setData(GameApp.Manager.dataManager.head_img, 112);
            }
            else {
                if (obj["type"] == 1) {
                    this.lblGroupName.visible = true;
                    this.lblName.text = window["hexToDec"](obj["name"]);
                    this.bmpIcon.setData(obj["pic"], 112);
                }
                else {
                    this.lblGroupName.visible = false;
                    this.lblName.text = window["hexToDec"](obj["group_name"]);
                    this.bmpIcon.setData(obj["group_face"], 112);
                }
            }
            this.bmpBackTitle.source = "h_2";
            this.bmpBackTitle.y = 0;
            this.bmpT3.visible = true;
            this.btnClose.visible = true;
            this.bmpIconBack.visible = true;
            this.bmpIcon.visible = true;
            this.lblName.visible = true;
            this.lblTitle.visible = true;
            this.bmpStar.visible = true;
            this.lblStar.visible = true;
            this.btnOK.visible = false;
            this.lblBtnText.visible = false;
            //            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
            //            GameApp.Manager.viewManager.gameMainUI.setLucky();
            this.lblStar.text = obj["lucky_star_add"];
            this.lblGroupName.text = window["hexToDec"](obj["group_name"]);
            this.lblName.y = 255;
            this.lblGroupName.y = 306;
            this.lblTitle.text = "恭喜你成功领取";
            this.lblTitle.y = 397;
            //            RES.getResByUrl(obj["pic"],this.onCompFun,this,RES.ResourceItem.TYPE_IMAGE);
            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
            flower.FlowerUI.getInstance().setLucky();
        };
        p.fail = function () {
            this.bmpBackTitle.source = "h_2";
            this.bmpBackTitle.y = 0;
            //            this.bmpBack.source = "p_hb3";
            this.btnClose.visible = true;
            this.lblTip.visible = true;
            this.lblName.visible = true;
            this.lblGroupName.visible = false;
            this.lblTitle.visible = false;
            this.btnOK.visible = false;
            this.lblBtnText.visible = false;
            this.lblName.text = "空空如也~~";
            //            this.lblGroupName.text = Window["hexToDec"](obj["group_name"]);
            this.lblName.y = 230 + 23;
        };
        p.onMsg = function (obj) {
            console.log('call-14:', obj);
            if (obj) {
                if (obj["over"]) {
                    this.fail();
                }
                else {
                    this.success(obj);
                }
            }
        };
        p.call = function (data) {
            console.log('call-13:', data);
            switch (data["st"]) {
                case 2:
                    this.fail();
                    break;
                case 3:
                    //                    GameApp.Manager.viewManager.labelAnimation('已抽过');
                    break;
            }
        };
        p.close = function () {
            GameApp.Manager.viewManager.TopUIStage.removeChild(this);
            GameApp.Manager.viewManager.clearMask();
            this.bmpIconBack.visible = false;
            this.bmpIcon.visible = false;
            this.btnClose.visible = false;
            this.btnOK.visible = false;
            this.lblBtnText.visible = false;
            this.lblTitle.visible = false;
            this.bmpStar.visible = false;
            this.lblStar.visible = false;
            this.lblTip.visible = false;
            this.lblGroupName.visible = false;
            this.bmpT3.visible = false;
            ;
            this.bmpBackTitle.source = "h_t1";
            this.bmpBackTitle.y = 23;
            //            this.bmpBack.source = "p_hb1";
            this.bmpIcon.clear();
            containmoney.ContainmoneyUI.getInstance().addRedPackets();
        };
        return ContainmoneyOpen;
    }(eui.Component));
    containmoney.ContainmoneyOpen = ContainmoneyOpen;
    egret.registerClass(ContainmoneyOpen,'containmoney.ContainmoneyOpen');
})(containmoney || (containmoney = {}));
