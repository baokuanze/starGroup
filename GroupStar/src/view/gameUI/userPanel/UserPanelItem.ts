module userPanel {
	/**
	 *
	 * @author 
	 *
	 */
	export class UserPanelItem extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): UserPanelItem {
            if(UserPanelItem.cacheDict[mtype] == null) {
                UserPanelItem.cacheDict[mtype] = [];
            }
            var dict: UserPanelItem[] = UserPanelItem.cacheDict[mtype];
            var theFighter: UserPanelItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new UserPanelItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: UserPanelItem,mtype: string = "1"): void {
            if(UserPanelItem.cacheDict[mtype] == null) {
                UserPanelItem.cacheDict[mtype] = [];
            }
            var dict: UserPanelItem[] = UserPanelItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private bmpIcon: eui.Image;
        private lblTitle: eui.Label;
        private groupStar: eui.Group;
        
        public desc: string = "";
        public num: number = 0;
        public need_num: number = 0;
        public intimate: number = 0;//奖励的亲密
		public constructor() {
            super();
            this.skinName = "src/view/gameUI/userPanel/UserPanelItemSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
            }
		}
		public setData(obj:Object):void{
            //this.lblTitle.text = obj["name"];
            //显示5个灰色星星
            var count1 = 0;
            for(var j = 0;j < 5;j++) {
                var starBk: eui.Image = new eui.Image('u_star_h');
                this.groupStar.addChild(starBk);
                starBk.x = count1 * 26 + 2; starBk.y = 129;
                count1++;
            }
            if(obj["star_lv"] > 0) {
                this.bmpIcon.source = "cj" + obj["id"] + "";
                var point: Array<Object> = data.DataManager.userStarPoint[obj["star_lv"]];
                var count = 0;
                for(var i in point){
                    var o: Object = point[i];
                    var star: eui.Image = new eui.Image("u_star");
                    this.groupStar.addChild(star);
                    star.x = count*26+2; star.y = 129;
                    count++;
                }
            }else{
               this.bmpIcon.source = "cj" + obj["id"] + "_1";
            }
            
            var msg: Object = data.DataManager.userMSG[obj["id"]];
            this.desc = msg["desc"];
            this.num = obj["num"];
            this.need_num = obj["need_num"]; 
            this.intimate = obj["intimate"];
            if(this.desc.indexOf("n")>-1){
                this.desc=this.desc.replace("n",this.need_num+"");
            }
		}
		private clearStar():void{
            this.groupStar.removeChildren();
		}
		private clear():void{
            this.clearStar();
            this.bmpIcon.source = null;
            this.lblTitle.text = "";
		}
	}
}
