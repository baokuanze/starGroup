module rankGroupContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankGroupItem extends eui.Component {
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): RankGroupItem {
            if(RankGroupItem.cacheDict[mtype] == null) {
                RankGroupItem.cacheDict[mtype] = [];
            }
            var dict: RankGroupItem[] = RankGroupItem.cacheDict[mtype];
            var theFighter: RankGroupItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new RankGroupItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: RankGroupItem,mtype: string = "1"): void {
            if(RankGroupItem.cacheDict[mtype] == null) {
                RankGroupItem.cacheDict[mtype] = [];
            }
            var dict: RankGroupItem[] = RankGroupItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private lblRank: eui.Label;
        private lblName: eui.Label;
        private lblMember:eui.Label;
        private lblGX: eui.Label;
        private btnIcon: task.TaskIcon;
        private bmpIcon:eui.Image;
        private bmpRank:eui.Image;
        private group_openid: string = "";
        public bid: string = "";
        private btnJoin:eui.Image;
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/rankGroupContribution/RankGroupConItemSkin.exml";
            this.btnIcon = new task.TaskIcon();
            this.btnIcon.scaleX = this.btnIcon.scaleY = .8;
        }
        public childrenCreated(): void {
            var self:RankGroupItem=this;
            this.addChild(this.btnIcon);
            this.btnIcon.x = 428; this.btnIcon.y = 30;
            this.addChildAt(this.bmpIcon,2);
            if(Tools.getInstance().isIphone()) {
                this.lblRank.fontFamily = "Heiti SC";
                this.lblName.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblMember.fontFamily = "Heiti SC";
//                this.btnJoin.visible=false;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                system.GroupJoin.join(self.group_openid);
            },this);
        }
        private tap(e: egret.Event): void {
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
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("本月贡献 <font color=#EDBE28>" + obj["contribution"] + "</font>");
            this.lblMember.text=obj["member_num"]+"人";
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
            this.btnIcon.x = this.lblName.x + len * 15 + 5;
            RES.getResByUrl(obj["group_face"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.btnIcon.setText(obj["group_level"]);
        }
        private load_end(s: egret.Texture): void {
            this.bmpIcon.source = s;
        }
        public clear(): void {
//            this.bmpIcon.clear();
        }
    }
}
