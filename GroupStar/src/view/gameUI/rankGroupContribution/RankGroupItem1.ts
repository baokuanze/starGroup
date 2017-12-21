module rankGroupContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankGroupItem1 extends eui.Component {
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
        private lblRank: eui.Label;
        private lblName: eui.Label;
        private lblGX: eui.Label;
        private lblMember: eui.Label;
        private btnIcon: task.TaskIcon;
        private bmpIcon: eui.Image
        private bmpRank:eui.Image;
        public group_openid: string = "";
        public bid:string="";
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/rankGroupContribution/RankGroupConItem1Skin.exml";
            this.btnIcon = new task.TaskIcon();
            this.btnIcon.scaleX = this.btnIcon.scaleY = .8;
        }
        public childrenCreated(): void {
            this.addChild(this.btnIcon);
            this.btnIcon.x = 440; this.btnIcon.y = 35;
            this.addChildAt(this.bmpIcon,2);
            if(Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblMember.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
        }
        private tap(e: egret.Event): void {
//            system.GroupJoin.join(this.group_openid);
        }
        public setData(obj: Object): void {
            this.group_openid = obj["group_openid"];
            this.bid = obj["bid"];
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
            this.lblName.text = "" + window["hexToDec"](obj["group_name"]);
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("本月贡献 <font color=#ffffff>" + obj["contribution"] + "</font>");
            this.lblMember.text = obj["member_num"] + "人";
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
            this.btnIcon.x = this.lblName.x + len * 16 + 10;
            RES.getResByUrl(obj["group_face"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.btnIcon.setText(obj["group_level"]);
        }
        private load_end(s:egret.Texture):void{
            this.bmpIcon.source=s;
        }
        public clear(): void {
//            this.bmpIcon.clear();
        }
    }
}