module rankUserContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankUserContributionItem1 extends eui.Component{
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): RankUserContributionItem1 {
            if(RankUserContributionItem1.cacheDict[mtype] == null) {
                RankUserContributionItem1.cacheDict[mtype] = [];
            }
            var dict: RankUserContributionItem1[] = RankUserContributionItem1.cacheDict[mtype];
            var theFighter: RankUserContributionItem1;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new RankUserContributionItem1();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: RankUserContributionItem1,mtype: string = "1"): void {
            if(RankUserContributionItem1.cacheDict[mtype] == null) {
                RankUserContributionItem1.cacheDict[mtype] = [];
            }
            var dict: RankUserContributionItem1[] = RankUserContributionItem1.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private groupLevel:eui.Group;
        private bmpTitleBack:eui.Image;
        private lblIntimate_Title:eui.Label;
        private lblRank: eui.Label;
        private lblName: eui.Label;
        private lblGX: eui.Label;
        private bmpIcon: eui.Image
        private bmpRank: eui.Image;
        private user_id: number = 0;
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/rankUserContribution/RankUserContributionItem1Skin.exml";
        }
        public childrenCreated(): void {
            this.addChildAt(this.bmpIcon,2);
            if(Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblIntimate_Title.fontFamily="Heiti SC";
            }
        }
        public setData(obj: Object): void {
            this.user_id = obj["user_id"];
            switch(obj["rank"] + "") {
                case "1": case "2": case "3":
                    this.lblRank.visible = false;
                    this.bmpRank.visible = true;
                    this.bmpRank.source = "p1_gxicon" + obj["rank"];
                    break;
                default:
                    this.lblRank.visible = true;
                    this.bmpRank.visible = false;
                    this.lblRank.text = "" + obj["rank"];
                    break;
            }
            this.lblName.text = "" + window["hexToDec"](obj["user_name"]);
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("今日贡献 <font color=#ffffff>" + obj["contribution"] + "</font>");
            var len: number = 0;
            for(var i = 0;i < this.lblName.text.length;i++) {
                var length = this.lblName.text.charCodeAt(i);
                if(length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
            }
            this.groupLevel.x = this.lblName.x + len * 16 + 10;
            this.bmpTitleBack.source = data.DataManager.getintimateIcon(obj["intimate_level"]);
            this.lblIntimate_Title.text = data.DataManager.getintimateLevel(obj["intimate_level"]) + "";
            RES.getResByUrl(obj["user_pic"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
//            this.btnIcon.setText(obj["group_level"]);
        }
        private load_end(s: egret.Texture): void {
            this.bmpIcon.source = s;
        }
        public clear(): void {
            //            this.bmpIcon.clear();
        }
    }
}