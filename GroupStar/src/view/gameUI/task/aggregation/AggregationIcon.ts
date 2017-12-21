module aggregation {
	/**
	 *
	 * @author 
	 *
	 */
	export class AggregationIcon extends eui.Component {
        private img_personIcon:eui.Image;
        public userId:number;
        public Index:number ;
        
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): AggregationIcon {
            if(AggregationIcon.cacheDict[mtype] == null) {
                AggregationIcon
                AggregationIcon.cacheDict[mtype] = [];
            }
            var dict: AggregationIcon[] = AggregationIcon.cacheDict[mtype];
            var theFighter: AggregationIcon;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new AggregationIcon();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: AggregationIcon,mtype: string = "1"): void {
            if(AggregationIcon.cacheDict[mtype] == null) {
                AggregationIcon.cacheDict[mtype] = [];
            }
            var dict: AggregationIcon[] = AggregationIcon.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/aggregation/AggregationIconSkin.exml";
		}
        public childrenCreated(): void {
            this.img_personIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e: egret.Event) {
                if(this.userId > 0)
                    userPanel.UserPanel.getInstance().open(this.userId,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid);
                e.stopPropagation();
            },this);
        }
        
        public setData(obj:Object):void{
            this.userId = obj["user_id"];
            RES.getResByUrl(obj["user_pic"],this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
        }
        
        public load_personIcon(source: egret.Texture): void {
            this.img_personIcon.texture = source;
            this.img_personIcon.width = 100;
            this.img_personIcon.height = 100;
        }

        public clear():void{
            this.img_personIcon.texture = null;
        }
        
     
	}
}
