module rankGroup {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankGroupItem1 extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): RankGroupItem1 {
            if(RankGroupItem1.cacheDict[mtype] == null) {
                RankGroupItem1.cacheDict[mtype] = [];
            }
            var dict: RankGroupItem1[] = RankGroupItem1.cacheDict[mtype];
            var theFighter: RankGroupItem1;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new RankGroupItem1();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: RankGroupItem1,mtype: string = "1"): void {
            if(RankGroupItem1.cacheDict[mtype] == null) {
                RankGroupItem1.cacheDict[mtype] = [];
            }
            var dict: RankGroupItem1[] = RankGroupItem1.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private bmpBack:eui.Image;
        private lblRank: eui.Label;
        private lblName: eui.Label;
        private lblNum: eui.Label;
        private bmpIcon: module.BaseCircleImage;
        private iconNow: task.TaskIcon;
        private groupData:eui.Group;
        private group_openid: string = "";
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/rankGroup/RankGroupItem1Skin.exml";
            this.bmpIcon = new module.BaseCircleImage();
            this.bmpIcon.x = 336+81/2; this.bmpIcon.y = 28+81/2;
            this.iconNow = new task.TaskIcon();
//            this.iconNow.x = 550; this.iconNow.y = 151;
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }
            this.groupData.addChild(this.iconNow);
            this.addChildAt(this.bmpIcon,1);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
//            this.cacheAsBitmap = true;
        }
        private tap(e: egret.Event): void {
            system.GroupJoin.join(this.group_openid);
        }
        public setData(obj: Object,rank: number): void {
            this.group_openid = obj["group_openid"];
            if(rank==2){
                this.bmpBack.source ="p_no"+rank;
            }
            this.bmpIcon.setData(obj["group_face"],81,81);
            this.lblRank.text = "NO." + rank + "";
            this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["hexToDec"](obj["group_name"]));
            this.lblNum.textFlow = (new egret.HtmlTextParser).parser("成员 <font color=#82ddff>" + obj["member_num"] + "</font> 人");
            this.iconNow.setText(obj["level"]);
            setTimeout(function(self: RankGroupItem1) {
                self.iconNow.x = self.lblName.x + Tools.getInstance().getTextLenChar(self.lblName.text) * 15 + 10;
            },50,this)
        }
        private clear(): void {
            this.bmpIcon.clear();
        }
	}
}
