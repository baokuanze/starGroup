module live {
	/**
	 *
	 * @author 
	 *
	 */
	export class LiveTalkChatItem extends eui.Component{
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): LiveTalkChatItem {
            if(LiveTalkChatItem.cacheDict[mtype] == null) {
                LiveTalkChatItem.cacheDict[mtype] = [];
            }
            var dict: LiveTalkChatItem[] = LiveTalkChatItem.cacheDict[mtype];
            var theFighter: LiveTalkChatItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new LiveTalkChatItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: LiveTalkChatItem,mtype: string = "1"): void {
            if(LiveTalkChatItem.cacheDict[mtype] == null) {
                LiveTalkChatItem.cacheDict[mtype] = [];
            }
            var dict: LiveTalkChatItem[] = LiveTalkChatItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private type: number = 1;
        private uid: number;
        private _w: number = 0;
        public gift_id: number = 0;
        public intimate_level: number = 0;
        private lblTitle: eui.Label;
        private lblName: eui.Label;
        private lblName1: eui.Label;
        private lblTalk: eui.Label;
        private lblTalk1: eui.Label;
        private lblDesc: eui.Label;
        private lblDesc1: eui.Label;
        private bmpIcon: eui.Image;
        private bmpTitleBack: eui.Image;
        private bmpBuluo: eui.Image;
        private group_openid: number = 0;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/liveChatRoom/LiveChatItemSkin.exml";
		}
        public childrenCreated(): void {
            if(this.lblTalk.parent) {
                this.lblTalk.parent.removeChild(this.lblTalk);
            }
            if(this.lblTalk1.parent) {
                this.lblTalk1.parent.removeChild(this.lblTalk1);
            }
            if(this.lblDesc.parent) {
                this.lblDesc.parent.removeChild(this.lblDesc);
            }
            if(this.lblDesc1.parent) {
                this.lblDesc1.parent.removeChild(this.lblDesc1);
            }

            if(this.lblName.parent) {
                this.lblName.parent.removeChild(this.lblName);
            }
            if(this.lblName1.parent) {
                this.lblName1.parent.removeChild(this.lblName1);
            }
            this.bmpIcon.visible = false;
            this.bmpBuluo.visible = false;
            if(Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
                this.lblDesc1.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e: Event) {
                switch(this.type) {
                    case 1: case 6: case 7:
//                        userPanel.UserPanel.getInstance().open(this.uid,GameApp.Manager.dataManager.bid_save,this.group_openid + "");
                        break;
                }
                e.stopPropagation();
            },this);
        }
        public getHeight():number{
            var ret=0;
            switch(this.type){
                case 1:ret=32;break;
                case 19:ret=this.lblTalk.textHeight;break;
            }
            return ret;
        }
        public setData(obj:Object):void{
            switch(obj["type"]) {
                case 1: 
                    this.gift(obj);
                break;
                case 19:
                    this.talk(obj);
                break;
            }
        }
        public gift(obj: Object):void{
            this.addChild(this.lblName1);
            this.addChild(this.lblName);
            this.addChild(this.lblDesc1);
            this.addChild(this.lblDesc);
          
            this.uid = obj["uid"];
            this.gift_id = obj["id"];
            this.intimate_level = obj["intimate_level"];
            this.type = obj["type"];
            this.group_openid = obj["group_openid"] ? obj["group_openid"] : 0;
            var newName = "";
            switch(this.type) {
                case 1:
                    this.lblName.x = 96;
                    this.lblName1.x = 97;
                    this.bmpIcon.visible = true;
                    this.lblTitle.visible = true;
                    this.bmpTitleBack.visible = true;
                    this.bmpBuluo.visible = false;

                                        this.bmpIcon.source = "p_gift" + this.gift_id;
                    this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
                    this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
                    newName = window["hexToDec"](obj["user_name"]);
                    var addlen: number = 0;
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("<font color=#FF6479>送出了" +                        data.DataManager.getGiftName(this.gift_id) + "</font>");
                    this.lblDesc1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>送出了" +                        data.DataManager.getGiftName(this.gift_id) + "</font>");
                    if(Tools.getInstance().isIphone()) {
                        this.lblName.text = newName;
                        this.lblName1.text = newName;
                        this.validateNow();
                        addlen = window["Emoji"]["emojiLength"](newName) * 20;
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + addlen + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    } else {
                        this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                        this.lblName1.text = this.lblName.text;
                        this.validateNow();
                        this.lblDesc.x = this.lblName.x +                            this.lblName.textWidth + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    this.bmpIcon.x = this.lblDesc.textWidth + this.lblDesc.x + 10;
                    break;
            }
        }
        public talk(obj:Object):void{
            this.addChild(this.lblTalk1);
            this.addChild(this.lblTalk);
            this.uid = obj["uid"];
            this.gift_id = obj["id"];
            this.intimate_level = obj["intimate_level"];
            this.type = obj["type"];
            this.group_openid = obj["group_openid"] ? obj["group_openid"] : 0;
            var newName = "";
            this.lblName.x = 96;
            this.lblName1.x = 97;
            this.bmpIcon.visible = false;
            this.lblTitle.visible = true;
            this.bmpTitleBack.visible = true;
            this.bmpBuluo.visible = false;
            this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
            this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
            newName = window["hexToDec"](obj["user_name"]);
            var addlen: number = 0;
            
            if(Tools.getInstance().isIphone()) {
                var num:number = window["Emoji"]["emojiLength"](newName) ;
                this.lblTalk.textFlow = (new egret.HtmlTextParser).parser(newName + this.addKongge(num) + ": "+ "<font color=#ffffff>" +                    window["hexToDec"](obj["message"]) + "</font>");
                this.lblTalk1.textFlow = (new egret.HtmlTextParser).parser(newName + this.addKongge(num) + ": " + "<font color=#000000>" +                    window["hexToDec"](obj["message"]) + "</font>");
                this.validateNow();
            } else {
                this.lblTalk.textFlow = (new egret.HtmlTextParser).parser(newName + ": <font color=#ffffff>" + window["Emoji"]["emojiReplace"](window["hexToDec"](obj["message"]))+"</font>");
                this.lblTalk1.textFlow = (new egret.HtmlTextParser).parser(newName + ": <font color=#000000>" + window["Emoji"]["emojiReplace"](window["hexToDec"](obj["message"])) + "</font>");
                this.validateNow();
            }
            this.height = this.lblTalk.textHeight+2;
        }
        private addKongge(num:number):string{
            var ret:string="";
            switch(num){
                case 1: ret = "  "; break;
                case 2: ret = "    "; break;
                case 3: ret = "      "; break;
                case 4: ret = "        "; break;
                case 5: ret = "          "; break;
                case 6: ret = "            "; break;
                case 7: ret=  "              ";break;
                case 8: ret = "                "; break;
            }
            return ret;
        }
        public getStringLen(str): string {
            return str;
        }
        private clear(): void {
            if(this.lblTalk.parent) {
                this.lblTalk.parent.removeChild(this.lblTalk);
            }
            if(this.lblTalk1.parent) {
                this.lblTalk1.parent.removeChild(this.lblTalk1);
            }
            if(this.lblDesc.parent) {
                this.lblDesc.parent.removeChild(this.lblDesc);
            }
            if(this.lblDesc1.parent) {
                this.lblDesc1.parent.removeChild(this.lblDesc1);
            }

            if(this.lblName.parent) {
                this.lblName.parent.removeChild(this.lblName);
            }
            if(this.lblName1.parent) {
                this.lblName1.parent.removeChild(this.lblName1);
            }
            this.height=32;
            this.bmpIcon.visible = true;
            this.lblTitle.visible = true;
            this.bmpTitleBack.visible = true;
            this.bmpBuluo.visible = false;

            this.lblTitle.text = "";
            this.lblDesc.text = "";
            this.lblDesc1.text = "";
            this.bmpIcon.source = null;
        }
	}
}
