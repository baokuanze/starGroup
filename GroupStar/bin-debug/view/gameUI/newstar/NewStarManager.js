var newstar;
(function (newstar) {
    /**
     *
     * @author
     *
     */
    var NewStarManager = (function (_super) {
        __extends(NewStarManager, _super);
        function NewStarManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=NewStarManager,p=c.prototype;
        p.show = function () {
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.showSerach = function (serach_name) {
            if (!this.newStarSerachUI)
                this.newStarSerachUI = new newstar.NewStarSerachUI();
            this.BottomUIStage.addChild(this.newStarSerachUI);
            this.newStarSerachUI.serach(serach_name);
        };
        p.init = function () {
            socketio.IoConnect.getInstance().initPomelo("0", GameApp.Manager.dataManager.uid);
            if (!this.newStarUI)
                this.newStarUI = new newstar.NewStarUI();
            this.BottomUIStage.addChild(this.newStarUI);
            //            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid_save + "&");
            //            Util.sendJson1(GameApp.Manager.dataManager.IP + "/groupLevelRank",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid_save,sign: sign },function(obj: Object) {
            //                if(obj["st"] == 1) {
            //                    this.initUI(obj['rank']);
            //                }
            //            },true,this)
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        };
        //        private initUI(arr: Array<Object>): void {
        //            this.rankGroupUI.setData(arr);
        //        }
        p.hide = function () {
            if (this.newStarUI) {
                this.newStarUI.parent.removeChild(this.newStarUI);
                this.newStarUI.clear();
                socketio.IoConnect.getInstance().disconnect();
            }
        };
        p.hideSerach = function () {
            if (this.newStarSerachUI) {
                this.newStarSerachUI.parent.removeChild(this.newStarSerachUI);
                this.newStarSerachUI.clear();
            }
        };
        p.loading = function () {
            var self = this;
            //GameApp.Manager.controllerManager.loader.moduleLoading(["starRank"],this.load_end,this);
            this.init();
        };
        p.load_end = function () {
            this.init();
            this.loaded = true;
        };
        return NewStarManager;
    }(common.BaseView));
    newstar.NewStarManager = NewStarManager;
    egret.registerClass(NewStarManager,'newstar.NewStarManager');
})(newstar || (newstar = {}));
