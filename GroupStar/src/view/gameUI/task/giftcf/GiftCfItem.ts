module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class GiftCfItem extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): GiftCfItem {
            if(GiftCfItem.cacheDict[mtype] == null) {
                GiftCfItem.cacheDict[mtype] = [];
            }
            var dict: GiftCfItem[] = GiftCfItem.cacheDict[mtype];
            var theFighter: GiftCfItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new GiftCfItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: GiftCfItem,mtype: string = "1"): void {
            if(GiftCfItem.cacheDict[mtype] == null) {
                GiftCfItem.cacheDict[mtype] = [];
            }
            var dict: GiftCfItem[] = GiftCfItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        public uid:number=0;
        public num:number=0;
    	private lblName:eui.Label;
    	private lblDesc:eui.Label;
    	private bmpIcon:eui.Image;
    	private bmpIconBack:eui.Image;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/task/giftcf/GiftCfItemSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }  
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e: Event) {
                userPanel.UserPanel.getInstance().open(this.uid,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid + "");
                e.stopPropagation();
            },this);
		}
		public setData(obj:Object,rank:number):void{
            this.uid = obj["user_id"];
            this.lblName.text = window["hexToDec"](obj["user_name"]);
            this.num=obj["num"];
            this.lblDesc.textFlow =(new egret.HtmlTextParser).parser("支持"+"<font color=#e88319>"+obj["num"]+"钻石</font>");
            switch(rank){
                case 1: this.bmpIconBack.source ="t_zc2";break;
                case 2: this.bmpIconBack.source = "t_zc3"; break;
                case 3: this.bmpIconBack.source = "t_zc4"; break;
                default:
                    this.bmpIconBack.source = "t_zc5"; 
                break;
            }
            RES.getResByUrl(obj["user_pic"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
		}
		public updateRank(rank:number):void{
            switch(rank) {
                case 1: this.bmpIconBack.source = "t_zc2"; break;
                case 2: this.bmpIconBack.source = "t_zc3"; break;
                case 3: this.bmpIconBack.source = "t_zc4"; break;
                default:
                    this.bmpIconBack.source = "t_zc5";
                    break;
            }
		}
		public updateNum(num:number):void{
    		console.log("this.num:"+this.num+" "+num);
    		this.num=this.num+num;
            console.log("22this.num:" + this.num + " " + num);
            this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("支持" + "<font color=#e88319>" + this.num + "钻石</font>");
		}
		private load_end(s:egret.Texture):void{
		    this.bmpIcon.source=s;
		}
		private clear():void{
		    this.bmpIcon.source=null;
		    this.bmpIconBack.source=null;
		}
	}
}
