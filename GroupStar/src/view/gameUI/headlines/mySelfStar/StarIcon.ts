module mySelfStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarIcon extends eui.Component{
        public btn_icon:eui.Image;
        public img_icon:eui.Image;
        private bid:string;
    	
        private static cacheDict: Object = {};
        public static produce(mtype: string = "1",index: number = 0): StarIcon {
            if(StarIcon.cacheDict[mtype] == null) {
                StarIcon.cacheDict[mtype] = [];
            }
            var dict: StarIcon[] = StarIcon.cacheDict[mtype];
            var theFighter: StarIcon;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new StarIcon();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: StarIcon,mtype: string = "1"): void {
            if(StarIcon.cacheDict[mtype] == null) {
                StarIcon.cacheDict[mtype] = [];
            }
            var dict: StarIcon[] = StarIcon.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }

		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/headlines/mySelfStar/StarIconSkin.exml"
    	
		}
		
        public childrenCreated(): void {
//            this.btn_icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goTo,this);
        }
        
        public goTo(e:egret.Event):void{
//            socketio.IoConnect.getInstance().disconnect();//断开连接
//            GameApp.Manager.controllerManager.start(this.bid);
//            GameApp.Manager.controllerManager.headLinesController.hide(); 
        }
        
		
		public setData(obj:Object,btn_width:number,btn_height:number,icon_width:number,icon_height:number):void{
		    this.btn_icon.width = btn_width;
		    this.btn_icon.height = btn_height;
		    this.img_icon.width = icon_width;
		    this.img_icon.height = icon_height;
            RES.getResByUrl(obj["head_img"],this.onCompFun,this,RES.ResourceItem.TYPE_IMAGE);
		}
		
        public onCompFun(source:egret.Texture):void{
            this.img_icon.texture = source;
        }
		
        public clear():void{
            this.img_icon.texture = null;
        }
	}
}
