module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
	export class ZfdyHeadItem extends eui.Component{
        private static cacheDict: Object = {};
        //private rankValueGroup:eui.Group;
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): ZfdyHeadItem {
            if(ZfdyHeadItem.cacheDict[mtype] == null) {
                ZfdyHeadItem.cacheDict[mtype] = [];
            }
            var dict: ZfdyHeadItem[] = ZfdyHeadItem.cacheDict[mtype];
            var theFighter: ZfdyHeadItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new ZfdyHeadItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: ZfdyHeadItem,mtype: string = "1"): void {
            if(ZfdyHeadItem.cacheDict[mtype] == null) {
                ZfdyHeadItem.cacheDict[mtype] = [];
            }
            var dict: ZfdyHeadItem[] = ZfdyHeadItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private bmpHead: module.BaseCircleImage;
    	private bmpRank:eui.Image;
    	public group_openid:string="";
    	public bid:string="";
    	public uid:number=0;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/zfdy/ZfdyHeadSkin.exml";
            this.bmpHead=new module.BaseCircleImage();
		}
		public childrenCreated():void{
    		this.addChildAt(this.bmpHead,0);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		}
		private tap(e:egret.Event):void{
            userPanel.UserPanel.getInstance().open(this.uid,this.bid,this.group_openid);
            e.stopPropagation();
		}
		public setData(obj:Object,rank:number):void{
            this.uid = obj["user_id"];
            this.bmpRank.source ="p1_r"+rank;
//            RES.getResByUrl(obj["user_pic"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.bmpHead.setData(obj["user_pic"],84,0,0,0);
		}
		private load_end(s:egret.Texture):void{
//		    this.bmpHead.source=s;
		}
		private clear():void{
//		    this.bmpHead.source=null;
    		this.bmpHead.clear();
		    this.bmpRank.source=null;
		}
	}
}
