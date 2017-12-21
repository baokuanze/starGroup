module follow {
	/**
	 *
	 * @author 
	 *
	 */
	export class Follow extends eui.Component{
        private img_btnClose: eui.Image;
        private img_btnFllower: eui.Image;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/follow/FollowSkin.exml";
		}
		
        public childrenCreated(): void {
            var self:Follow = this;
            this.img_btnFllower.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                self.folloerAction(1);
            },this);
            
            this.img_btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                self.folloerAction(0);
                if(self.parent) {
                    self.parent.removeChild(self);
                }
            },this);
            this.img_btnFllower.y = (this.stage.stageHeight - this.img_btnFllower.height) / 2
            this.img_btnClose.y = this.img_btnFllower.y + 20;
        }
        
        public folloerAction(act: number): void {
            var self:Follow = this;
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + act + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/handleFollow",{ user_id: GameApp.Manager.dataManager.uid,operate: act,sign: sign },function(obj: Object) {
                if(obj["st"] == 1 && obj["data"]["redirect"] == 1&& obj["data"]["url"]){
                    location.href = obj["data"]["url"];
                }else{
                    if(self.parent) {
                        self.parent.removeChild(self);
                    }
                }
            },true,self);
        }
	}
}
