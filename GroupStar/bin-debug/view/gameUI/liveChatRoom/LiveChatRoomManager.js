var live;
(function (live) {
    /**
     *
     * @author
     *
     */
    var LiveChatRoomManager = (function (_super) {
        __extends(LiveChatRoomManager, _super);
        function LiveChatRoomManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=LiveChatRoomManager,p=c.prototype;
        p.show = function (state) {
            this.stateIndex = state;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.init();
            }
        };
        p.init = function () {
            if (!this.liveChatRoomUI)
                this.liveChatRoomUI = new live.LiveChatRoomUI();
            this.BottomUIStage.addChild(this.liveChatRoomUI);
            this.liveChatRoomUI.open(this.stateIndex);
            console.log(this.stateIndex, "-----");
            if (this.stateIndex == 0) {
            }
            else {
                console.log(this.stateIndex, "直播");
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getLiveLastMessage", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, "group_openid": GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        live.LiveTalkChat.getInstance().adds(obj["lastMsg"]);
                    }
                }, true, this);
            }
            //            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
            //            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starRank",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
            //                this.initUI(obj);
            //            },true,this)
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        };
        p.initUI = function (obj) {
            //            this.liveChatRoomUI.setData(obj);
        };
        p.hide = function () {
            if (this.liveChatRoomUI) {
                this.liveChatRoomUI.parent.removeChild(this.liveChatRoomUI);
                this.liveChatRoomUI.clear();
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
        return LiveChatRoomManager;
    }(common.BaseView));
    live.LiveChatRoomManager = LiveChatRoomManager;
    egret.registerClass(LiveChatRoomManager,'live.LiveChatRoomManager');
})(live || (live = {}));
