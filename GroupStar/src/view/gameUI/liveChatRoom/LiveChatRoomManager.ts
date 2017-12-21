module live {
	/**
	 *
	 * @author 
	 *
	 */
    export class LiveChatRoomManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        private test: Object;
        private viewManager: view.ViewManager;
        public liveChatRoomUI: LiveChatRoomUI;
        public stateIndex:number;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(state:number): void {
            this.stateIndex = state;
            if(!this.loaded) {
                this.loading();
            } else {
                this.init();
            }

        }
        private init(): void {
            if(!this.liveChatRoomUI)
                this.liveChatRoomUI = new LiveChatRoomUI();
            this.BottomUIStage.addChild(this.liveChatRoomUI);
            this.liveChatRoomUI.open(this.stateIndex);
            console.log(this.stateIndex,"-----");
            if(this.stateIndex == 0){
                
            }else{
                console.log(this.stateIndex,"直播");
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getLiveLastMessage",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,"group_openid": GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        LiveTalkChat.getInstance().adds(obj["lastMsg"]);
                    }
                },true,this)
            
            }
            
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + "&");
//            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starRank",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
//                this.initUI(obj);
//            },true,this)
            //            this.getTest(); 
            //this.initUI(this.test['starRank']);
        }
        private initUI(obj: Object): void {
//            this.liveChatRoomUI.setData(obj);
        }
        public hide(): void {
            if(this.liveChatRoomUI) {
                this.liveChatRoomUI.parent.removeChild(this.liveChatRoomUI);
                this.liveChatRoomUI.clear();
            }
        }
        private loading(): void {
            var self = this;
            //GameApp.Manager.controllerManager.loader.moduleLoading(["starRank"],this.load_end,this);
            this.init();
        }
        private load_end(): void {
            this.init();
            this.loaded = true;
        }

    }
}
