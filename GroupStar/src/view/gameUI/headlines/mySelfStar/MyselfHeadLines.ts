module mySelfStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class MyselfHeadLines extends eui.Component{
        private img_personIcon:eui.Image;
        private img_starIco:eui.Image;
        private userId:number;
        private lable_name:eui.Label;
        private lable_ticNumber:eui.Label;
        private lable_null:eui.Label;//暂无
        private bid:string;
        private group_openid:string;
    	
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): MyselfHeadLines {
            if(MyselfHeadLines.cacheDict[mtype] == null) {
                MyselfHeadLines.cacheDict[mtype] = [];
            }
            var dict: MyselfHeadLines[] = MyselfHeadLines.cacheDict[mtype];
            var theFighter: MyselfHeadLines;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new MyselfHeadLines();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: MyselfHeadLines,mtype: string = "1"): void {
            if(MyselfHeadLines.cacheDict[mtype] == null) {
                MyselfHeadLines.cacheDict[mtype] = [];
            }
            var dict: MyselfHeadLines[] = MyselfHeadLines.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }

        public constructor() {
            super();
            this.skinName = "src/view/gameUI/headlines/mySelfStar/MyselfHeadLinesSkin.exml";
        }
        

        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()){
                this.lable_name.fontFamily = "Heiti SC";
                this.lable_ticNumber.fontFamily = "Heiti SC";
            }
            this.img_personIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e: egret.Event) {
                var self: MyselfHeadLines = this;
                if(this.userId > 0)
                    userPanel.UserPanel.getInstance().open(this.userId,self.bid,self.group_openid);
                e.stopPropagation();
            },this);
        }

        public setData(obj: Object): void {
            console.log("-------");
            this.lable_null.visible = false;
            this.userId = obj["user_id"];
            this.bid = obj["bid"]
            this.group_openid = obj["group_openid"]
            var te = window["hexToDec"](obj["user_name"])
            if(te.length>=4){
                var cutDownTitle = te.substring(0,4);
                this.lable_name.text = cutDownTitle + "..";
            }else{
                this.lable_name.text = te;
            }
            this.lable_ticNumber.text = obj["votes"] + "票";
            RES.getResByUrl(obj["user_pic"],this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
        }

        public load_personIcon(source: egret.Texture): void {
            this.img_starIco.texture = source;
        }

        public clear(): void {
            this.lable_null.visible = true;
            this.img_starIco.source = null;
            this.img_starIco.source = "j_imgButton";;
            this.lable_name.text = "";
            this.lable_ticNumber.text = "";
        }
	}
}
