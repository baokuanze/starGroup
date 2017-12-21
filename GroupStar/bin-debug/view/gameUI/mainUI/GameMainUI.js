var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var GameMainUI = (function (_super) {
        __extends(GameMainUI, _super);
        function GameMainUI() {
            _super.call(this);
            this.index = 0;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.create_complete, this);
            //            this.touchChildren=false;
            this.touchEnabled = false;
        }
        var d = __define,c=GameMainUI,p=c.prototype;
        p.create_complete = function () {
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.create_complete, this);
            this.resize();
        };
        p.initData = function (obj) {
            if (this.mainUI) {
                this.mainUI.setData(obj);
                if (GameApp.Manager.dataManager.topEnter == 1) {
                    GameApp.Manager.dataManager.topEnter = 2;
                }
            }
        };
        /*
            送花会调用这个
        */
        p.sendF = function (obj, ml) {
            if (ml === void 0) { ml = true; }
            if (ml) {
                //                switch(obj["type"]+""){
                //                    case "1":this.takecharm(8);break;
                //                    case "2": this.takecharm(88); break;
                //                    case "3": this.takecharm(288); break;
                //                    case "4": this.takecharm(-1);break;
                //                }
                this.mainUI.setHot(obj["id"]);
                this.mainUI.barrageManager.add(obj); //送花
            }
            else {
            }
            //            barrage.BarrageMananger.getInstance().add(obj);
            this.mainUI.mbarrageUI.add(obj); //聊天内容
            live.LiveTalkChat.receiveTalk(obj);
            if (obj["uid"] == GameApp.Manager.dataManager.uid) {
                //                this.barrage.createItem1(obj,true);
                this.mainUI.setLevel(obj["intimate_level"]);
            }
            else {
            }
        };
        p.takecharm = function (nu) {
            //            GameApp.Manager.bar_info["star_charm_count"] = parseInt(GameApp.Manager.bar_info["star_charm_count"]) + nu;
            //            if(this.mainUI1&&this.mainUI1.parent){
            //                this.mainUI1.takecharm(nu);
            //            }else if(this.mainUI2&&this.mainUI2.parent){
            //                this.mainUI2.takecharm(nu);
            //            }
        };
        p.getLuckyStarByServer = function () {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/syncLuckyStar", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                this.getLuckyStar(obj);
            }, true, this);
        };
        p.getLuckyStar = function (data) {
            console.log("luckystar返回监听:", data);
            var self = this;
            if (data) {
                switch (data["st"]) {
                    case 1:
                        if (pay.PayUI.getLuckyStarNum > 0) {
                            if (GameApp.Manager.dataManager.lucystar == data["lucky_star"]) {
                                pay.PayUI.getLuckyStarNum--;
                                setTimeout(function () {
                                    self.getLuckyStarByServer();
                                }, 500, this);
                            }
                            else {
                                pay.PayUI.getLuckyStarNum = 3;
                                GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                                this.setLucky();
                            }
                        }
                        else {
                            pay.PayUI.getLuckyStarNum = 3;
                            GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                            this.setLucky();
                        }
                        //                        if(this.mainUI1){
                        //                            GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                        //                            this.setLucky();
                        //                        }
                        break;
                }
            }
        };
        p.setLucky = function () {
            flower.FlowerUI.getInstance().setLucky();
            //            GameApp.Manager.viewManager.payManager.setLucky();
        };
        p.setData = function () {
            if (!this.mainUI) {
                this.mainUI = new mainUI.MainUI();
                this.addChild(this.mainUI);
            }
            else {
                this.addChild(this.mainUI);
            }
            this.alpha = 0;
            this.mainUI.setData1();
            egret.Tween.get(this).to({ alpha: 1 }, 500);
            this.mainUI.mbarrageUI.come();
        };
        p.hide = function () {
            if (this.mainUI) {
                if (this.mainUI.parent) {
                    this.removeChild(this.mainUI);
                    this.mainUI.clear();
                    this.mainUI.mbarrageUI.leave();
                }
            }
        };
        p.clear = function () {
        };
        p.update = function (ct) {
            if (this.mainUI) {
                this.mainUI.updata(ct);
            }
            ;
        };
        p.resize = function () {
            if (this.mainUI) {
                this.mainUI.resize();
            }
        };
        return GameMainUI;
    }(eui.Group));
    mainUI.GameMainUI = GameMainUI;
    egret.registerClass(GameMainUI,'mainUI.GameMainUI');
})(mainUI || (mainUI = {}));
