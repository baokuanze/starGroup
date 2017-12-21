var mainUI;
(function (mainUI) {
    /**
    *
    * @author
    *
    */
    var GameMainManager = (function (_super) {
        __extends(GameMainManager, _super);
        //        public humenUI: HumenUI;
        function GameMainManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.openstate = "1"; //打开全屏后 1:开启任务 2:送花
            this.viewManager = viewManager;
            //            this.humenUI = new HumenUI();
            //            this.humenUI.scaleY=this.humenUI.scaleX = 1300 / egret.MainContext.instance.stage.stageHeight;
            //            this.humenUI.y=940;
        }
        var d = __define,c=GameMainManager,p=c.prototype;
        p.showMain = function () {
            if (!this.gameMainUI.parent)
                this.BottomUIStage.addChild(this.gameMainUI);
        };
        p.initData = function (obj) {
            //            this.humenUI.setData();
            this.gameMainUI.initData(obj);
        };
        p.joinStar = function (callback) {
            var self = this;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/chooseStar", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, reset: GameApp.Manager.dataManager.reset, sign: sign }, function (obj) {
                callback();
                self.resetData(obj);
            }, true, this);
        };
        p.resetData = function (obj) {
            var self = this;
            switch (obj["st"]) {
                case 1:
                    GameApp.Manager.dataManager.reset = 0;
                    GameApp.Manager.dataManager.group_openid = obj['new_group_openid'] || GameApp.Manager.dataManager.group_openid;
                    system.Share.share(obj, function () {
                        self.resetMainPage();
                    });
                    //加入成功
                    //                    aler.AlertPanel1.getInstance().show("换明星了","是","确定",function(){
                    //                        self.resetMainPage();
                    //                    },this);
                    break;
                case 2:
                    //已经选择该明星
                    GameApp.Manager.dataManager.bid = obj["bid"];
                    this.resetMainPage();
                    break;
                case 3:
                    //不是群主 发送push
                    system.Share.share(obj, function () { });
                    break;
            }
        };
        p.resetMainPage = function () {
            var self = this;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/mainPage", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, reset: GameApp.Manager.dataManager.reset, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.dataManager.bid, GameApp.Manager.dataManager.uid);
                    GameApp.Manager.dataManager.visitor = obj["visitor"];
                    GameApp.Manager.dataManager.level = obj["star_level"];
                    GameApp.Manager.dataManager.star_name = window["hexToDec"](obj["star_name"]);
                    GameApp.Manager.dataManager.user_name = window["hexToDec"](obj["user_name"]);
                    GameApp.Manager.dataManager.exp = obj["exp"];
                    GameApp.Manager.dataManager.need_exp = obj["need_exp"];
                    GameApp.Manager.dataManager.nowImg = obj["img"];
                    GameApp.Manager.dataManager.shadow_img = obj["shadow_img"];
                    GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
                    GameApp.Manager.dataManager.egg_cd = obj["egg_cd"];
                    GameApp.Manager.dataManager.egg_time = new Date().getTime();
                    GameApp.Manager.dataManager.heart_num = obj["heart_num"];
                    GameApp.Manager.dataManager.appid = obj["appid"];
                    flower.FlowerUI.getInstance().initData(obj["gift"]);
                    //GameApp.Manager.controllerManager.gameMainController.show();
                    GameApp.Manager.viewManager.gameMainManager.initData(obj);
                    if (GameApp.Manager.dataManager.visitor == 0) {
                        GameApp.Manager.dataManager.resetState = obj["resetState"];
                    }
                }
                else {
                    console.log("注册失败:" + obj["st"]);
                }
            }, true, this);
        };
        p.show = function (openstate) {
            if (openstate === void 0) { openstate = ""; }
            if (!this.loaded) {
                this.load_end();
            }
            this.openstate = openstate;
            this.initUI();
        };
        p.hide = function () {
            this.BottomUIStage.removeChild(this.gameMainUI);
            this.gameMainUI.hide();
        };
        p.initUI = function () {
            //创建背景UI
            if (!this.gameMainUI.parent)
                this.BottomUIStage.addChild(this.gameMainUI);
            //            this.humenUI.mainUIInit();
            this.callS();
        };
        p.callS = function () {
            this.gameMainUI.setData();
        };
        p.loading = function () {
            var self = this;
            GameApp.Manager.controllerManager.loader.moduleLoading(["public"], this.load_end, this);
        };
        p.load_end = function () {
            this.viewManager.addStageResizeEvent("mainUI", this.gameMainUI.resize, this.gameMainUI);
            this.loaded = true;
        };
        return GameMainManager;
    }(common.BaseView));
    mainUI.GameMainManager = GameMainManager;
    egret.registerClass(GameMainManager,'mainUI.GameMainManager');
})(mainUI || (mainUI = {}));
