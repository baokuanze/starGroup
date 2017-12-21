module rankUserContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankUserContributionItem extends eui.Component {
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): RankUserContributionItem {
            if(RankUserContributionItem.cacheDict[mtype] == null) {
                RankUserContributionItem.cacheDict[mtype] = [];
            }
            var dict: RankUserContributionItem[] = RankUserContributionItem.cacheDict[mtype];
            var theFighter: RankUserContributionItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new RankUserContributionItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: RankUserContributionItem,mtype: string = "1"): void {
            if(RankUserContributionItem.cacheDict[mtype] == null) {
                RankUserContributionItem.cacheDict[mtype] = [];
            }
            var dict: RankUserContributionItem[] = RankUserContributionItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private groupLevel: eui.Group;
        private bmpTitleBack: eui.Image;
        private lblIntimate_Title: eui.Label;
        private lblRank: eui.Label;
        private lblName: eui.Label;
        private lblGX: eui.Label;
        private bmpIcon: eui.Image;
        private bmpRank: eui.Image;
        private btnIcon:eui.Image;
        private user_id: number = 0;
        public bid:string;
        public group_openid:string;
//        private btnJoin: eui.Image;
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/rankUserContribution/RankUserContributionItemSkin.exml";
        }
        public childrenCreated(): void {
            var self: RankUserContributionItem = this;
            this.addChildAt(this.bmpIcon,2);
            if(Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblIntimate_Title.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
            this.btnIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                userPanel.UserPanel.getInstance().open(self.user_id,self.bid,self.group_openid + "");
            },this);
//            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
////                system.GroupJoin.join(self.group_openid);
//            },this);
        }
        private tap(e: egret.Event): void {
            //  system.GroupJoin.join(this.group_openid);
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
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("本月贡献 <font color=#EDBE28>" + obj["contribution"] + "</font>");
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
            this.groupLevel.x = this.lblName.x + len * 15 + 10;
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
