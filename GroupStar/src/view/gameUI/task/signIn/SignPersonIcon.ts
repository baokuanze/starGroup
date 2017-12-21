module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class SignPersonIcon extends eui.Component{
        private uid1: number;
    
    	
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): SignPersonIcon {
            if(SignPersonIcon.cacheDict[mtype] == null) {
                SignPersonIcon.cacheDict[mtype] = [];
            }
            var dict: SignPersonIcon[] = SignPersonIcon.cacheDict[mtype];
            var theFighter: SignPersonIcon;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new SignPersonIcon();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: SignPersonIcon,mtype: string = "1"): void {
            if(SignPersonIcon.cacheDict[mtype] == null) {
                SignPersonIcon.cacheDict[mtype] = [];
            }
            var dict: SignPersonIcon[] = SignPersonIcon.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        
    	public userId:number;
        private img_personIcon:eui.Image;
        public num: number = 0;
        private img_bg:eui.Image;
        
        
		public constructor() {
    		 super();
             this.skinName = "src/view/gameUI/task/signIn/signPersonIconSkin.exml"
		}
		
        public childrenCreated(): void   {
           
            this.img_personIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e: egret.Event) {
                if(this.uid1 > 0)
                    console.log("点击里面")
                console.log(this.uid1,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid);
                    userPanel.UserPanel.getInstance().open(this.uid1,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid);
                e.stopPropagation();
            },this);
		}
		//设置别人的参数。
        public setData(obj: Object): void {
            RES.getResByUrl(obj["user_pic"],this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.uid1 = obj["user_id"];
            this.userId = obj["user_id"];
        }
        //把自己填加上用的；
        public setData1(obj: Object): void {
            RES.getResByUrl(obj["user_pic"],this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.userId = obj["user_id"];
            this.uid1 = obj["uid"]; 
        }
        
        
        public load_personIcon(source:egret.Texture):void{
             this.img_personIcon.texture = source;
             this.img_personIcon.width = 85;
             this.img_personIcon.height = 85;
        }
        
        public clear():void{
            this.img_personIcon.texture=null;
        }
	}
}
