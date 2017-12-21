module TopScreenOfGroupRank {
	/**
	 *
	 * @author 
	 *
	 */
	export class TopRank extends eui.Component {
        private img_ico:eui.Image;
        private img_number:eui.Image;
        private lable_starName:eui.Label;
        private lable_hot:eui.Label;
        private img_pro:eui.Image;
        private lable_rankNumber:eui.Label;
        private bid:string;//访客界面需要
        
        private static cacheDict: Object = {};
        public static produce(mtype: string = "1",index: number = 0): TopRank {
            if(TopRank.cacheDict[mtype] == null) {
                TopRank.cacheDict[mtype] = [];
            }
            var dict: TopRank[] = TopRank.cacheDict[mtype];
            var theFighter: TopRank;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new TopRank();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: TopRank,mtype: string = "1"): void {
            if(TopRank.cacheDict[mtype] == null) {
                TopRank.cacheDict[mtype] = [];
            }
            var dict: TopRank[] = TopRank.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }

		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/system/TopScreenOfGroupRank/TopRankSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_hot.fontFamily = "Heiti SC";
                this.lable_rankNumber.fontFamily = "Heiti SC";
            }
            this.img_pro.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gotoFanke,this);
        }
        public gotoFanke(e:egret.Event):void{
            GameApp.Manager.dataManager.entenVisiter = 1;
            GameApp.Manager.controllerManager.start(this.bid);
        }
        public setData(obj:Object,n:number):void{
            this.lable_starName.text = window["hexToDec"](obj["star_name"]);    
            this.lable_hot.text = window["hexToDec"](obj["hot"]);
         
            if(obj["rank"] == 1){
                this.img_number.source = "fistpag_1"
                this.img_pro.source = "fistpag_no1"
            } else if(obj["rank"] == 2){
                this.img_number.source = "fistpag_2"
                this.img_pro.source = "fistpag_no2"
            } else if(obj["rank"] == 3){
                this.img_number.source = "fistpag_3"
                this.img_pro.source = "fistpag_no3"
            }else{
                this.img_number.source = "fistpag_4"
                this.img_pro.source = "fistpag_no4"
            }
            RES.getResByUrl(obj["head_img"],this.setIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.lable_rankNumber.text = n + "";
            this.bid = obj["bid"];
        }
        
        public setIcon(source:egret.Texture):void{
            this.img_ico.texture = source;
        }
         public clear():void{
             this.img_ico.source = null;
             this.img_number.source = null;
             this.img_pro.source = null;
             this.lable_starName.text = "";
             this.lable_hot.text = "";
         }
	}
}
