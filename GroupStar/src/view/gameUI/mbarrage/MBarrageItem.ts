module mbarrage {
	/**
	 *
	 * @author 
	 *
	 */
    export class MBarrageItem extends eui.Component {
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): MBarrageItem {
            if(MBarrageItem.cacheDict[mtype] == null) {
                MBarrageItem.cacheDict[mtype] = [];
            }
            var dict: MBarrageItem[] = MBarrageItem.cacheDict[mtype];
            var theFighter: MBarrageItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new MBarrageItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: MBarrageItem,mtype: string = "1"): void {
            if(MBarrageItem.cacheDict[mtype] == null) {
                MBarrageItem.cacheDict[mtype] = [];
            }
            var dict: MBarrageItem[] = MBarrageItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private type: number = 1;
        private uid: number;
        private _w:number = 0;
        public gift_id: number = 0;
        public intimate_level: number = 0;
        private lblTitle: eui.Label;
        private lblName: eui.Label;
        private lblName1: eui.Label;
        private lblDesc: eui.Label;
        private lblDesc1: eui.Label;
        private bmpIcon: eui.Image;
        private bmpTitleBack: eui.Image;
        private bmpBuluo:eui.Image;
        private group_openid:number=0;
        private group_medal:eui.Group;//勋章
        
        private colorArr: Array<number> = [0x565865,0x37565,0x87c49b,0x199be6,0xf58ebd,0xf76864,0xf5b316];
        
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/mbarrage/MBarrageItemSkin.exml";
        }
        public childrenCreated(): void {
            this.bmpIcon.visible = false;
            this.bmpBuluo.visible=false;
            if(Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
                this.lblDesc1.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:Event) {
                switch(this.type){
                    case 1:case 6:case 7:
                        userPanel.UserPanel.getInstance().open(this.uid,GameApp.Manager.dataManager.bid_save,this.group_openid + "");
                    break;
                }
                e.stopPropagation();
            },this);
        }
        public setData(obj: Object): void {//intimate_lv:亲密等级
            this.uid =obj["uid"];
            this.gift_id = obj["id"];
            this.intimate_level = obj["intimate_level"];
            this.type = obj["type"];
            this.group_openid=obj["group_openid"]?obj["group_openid"]:0;
            var newName = "";
            switch(this.type) { //助威
                case 1:
//                    this.lblName.x =96;
//                    this.lblName1.x = 97;
                    this.group_medal.x = 96;
                    this.bmpIcon.visible = false;
                    this.lblTitle.visible = true;
                    this.bmpTitleBack.visible =true;
                    this.bmpBuluo.visible=false;
                    var temP:string ="";
                    if(obj["guard"]){
                        if(obj["guard"]["faith_guard"] == 1){
                            var img = new eui.Image();
                            img.source = "u_m1";
//                            console.log(img,"source");
                            img.width = 30;
                            img.height = 45 * (30/ 46);
                            this.group_medal.addChild(img);
                        }
                        if(obj["guard"]["angel_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m2";
                            img.width = 30;
                            img.height = 48 * (30/73);
                            this.group_medal.addChild(img);
                        }
                        if(obj["guard"]["stars_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m3";
                            img.width = 30;
                            img.height = 51 * (30 / 53);
                            this.group_medal.addChild(img);
                        }
                    }
                    this.lblName.x = this.group_medal.x + this.group_medal.width + 2;
                    this.lblName1.x = this.lblName.x + 1;
                    
                    
                    if(obj["worksDrop"]){
                        var colour = this.colorArr[obj["worksDrop"]["colour"]];
                        temP = "点亮了<font color=" + colour +">《" + obj["worksDrop"]["name"] + "》</font>";
                    }
//                    this.bmpIcon.source = "p_gift" + this.gift_id;
                    this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
                    this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
                    newName = window["hexToDec"](obj["user_name"]);
                    var addlen: number = 0;
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("<font color=#FF6479>送出了" +                        data.DataManager.getGiftName(this.gift_id) + "</font>" + temP);
                    this.lblDesc1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>送出了" +                        data.DataManager.getGiftName(this.gift_id) + "</font>" + temP);
                    if(Tools.getInstance().isIphone()) {
                        this.lblName.text = newName;
                        this.lblName1.text=newName;
                        this.validateNow();
                        addlen = window["Emoji"]["emojiLength"](newName) * 20;
                            
                        this.lblDesc.x =this.lblName.x + this.lblName.textWidth + addlen + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    } else {
                        this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                        this.lblName1.text = this.lblName.text;
                        this.validateNow();
                        this.lblDesc.x = this.lblName.x +                        this.lblName.textWidth + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    this.bmpIcon.x = this.lblDesc.textWidth + this.lblDesc.x + 10;
                break;
                case 2: //入驻
                    this.lblName.x = 21;
                    this.lblName1.x = 22;
                    this.bmpIcon.visible = false;
                    this.lblTitle.visible = false;
                    this.bmpTitleBack.visible = false;
                    this.bmpBuluo.visible = false;
                    newName = "欢迎Q群[" + window["hexToDec"](obj["group_name"]) + "]入驻";
                    var addlen: number = 0;
                    this.lblDesc.text = "" + GameApp.Manager.dataManager.star_name + "的超级粉丝团！";
                    this.lblDesc1.text = this.lblDesc.text;
                    if(Tools.getInstance().isIphone()) {
                        this.lblName.text = newName;
                        this.lblName1.text = newName;
                        this.validateNow();
                        addlen = window["Emoji"]["emojiLength"](newName) * 20;
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + addlen + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    } else {
                        this.lblName.text = window["Emoji"]["emojiReplace"](newName);
                        this.lblName1.text = this.lblName.text;
                        this.validateNow();
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    this.bmpIcon.x = this.lblDesc.textWidth + this.lblDesc.x + 10;
                    break;
                case 3://众筹成功
                    this.lblName.x = 21;
                    this.lblName1.x = 22;
                    this.bmpIcon.visible = false;
                    this.lblTitle.visible = false;
                    this.bmpTitleBack.visible = false;
                    this.bmpBuluo.visible = false;
                    newName = "恭喜Q群[" + window["hexToDec"](obj["group_name"]) + "";
                    var addlen: number = 0;
                    this.lblDesc.text = "]完成礼物众筹!";
                    this.lblDesc1.text = this.lblDesc.text;
                    if(Tools.getInstance().isIphone()) {
                        this.lblName.text = newName;
                        this.lblName1.text = newName;
                        this.validateNow();
                        addlen = window["Emoji"]["emojiLength"](newName) * 20;
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + addlen + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    } else {
                        this.lblName.text = window["Emoji"]["emojiReplace"](newName);
                        this.lblName1.text = this.lblName.text;
                        this.validateNow();
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    this.bmpIcon.x = this.lblDesc.textWidth + this.lblDesc.x + 10;
                    break;
                case 4://集结
                    this.lblName.x = 21;
                    this.lblName1.x = 22;
                    this.bmpIcon.visible = false;
                    this.lblTitle.visible = false;
                    this.bmpTitleBack.visible = false;
                    this.bmpBuluo.visible = false;
                    newName = "恭喜Q群[" + window["hexToDec"](obj["group_name"]) + "";
                    var addlen: number = 0;
                    this.lblDesc.text = "]完成集结任务!";
                    this.lblDesc1.text = this.lblDesc.text;
                    if(Tools.getInstance().isIphone()) {
                        this.lblName.text = newName;
                        this.lblName1.text = newName;
                        this.validateNow();
                        addlen = window["Emoji"]["emojiLength"](newName) * 20;
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + addlen + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    } else {
                        this.lblName.text = window["Emoji"]["emojiReplace"](newName);
                        this.lblName1.text = this.lblName.text;
                        this.validateNow();
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    this.bmpIcon.x = this.lblDesc.textWidth + this.lblDesc.x + 10;
                break;
                case 5://部落送礼
                    this.lblName.x = 96;
                    this.lblName1.x = 97;
                    this.bmpIcon.visible = true;
                    this.lblTitle.visible = false;
                    this.bmpTitleBack.visible = false;
                    this.bmpBuluo.visible = true;
                    this.bmpIcon.source = "p_gift" + this.gift_id;
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
                case 6://签到
                    this.lblName.x = 96;
                    if(obj["guard"]) {
                        if(obj["guard"]["faith_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m1";
                            img.width = 30;
                            img.height = 45 * (30 / 46);
                            this.group_medal.addChild(img);
                        }
                        if(obj["guard"]["angel_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m2";
                            img.width = 30;
                            img.height = 48 * (30 / 73);
                            this.group_medal.addChild(img);
                        }
                        if(obj["guard"]["stars_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m3";
                            img.width = 30;
                            img.height = 51 * (30 / 53);
                            this.group_medal.addChild(img);
                        }
                    }
                    this.lblName.x = this.group_medal.x + this.group_medal.width + 2;
                    this.lblName1.x = this.lblName.x + 1;
                    this.bmpIcon.visible = false;
                    this.lblTitle.visible = true;
                    this.bmpTitleBack.visible = true;
                    this.bmpBuluo.visible = false;
//                    this.bmpIcon.source = "p_gift" + this.gift_id;
                    this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
                    this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
                    newName = window["hexToDec"](obj["user_name"]);
                    var addlen: number = 0;
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("<font color=#ffffff>今日签到</font>");
                    this.lblDesc1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>今日签到</font>");
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
                case 7://个人众筹钻
//                    this.lblName.x = 96;
//                    this.lblName1.x = 97;
                    this.lblName.x = 96;
                    if(obj["guard"]) {
                        if(obj["guard"]["faith_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m1";
//                            console.log(img,"source");
                            img.width = 30;
                            img.height = 45 * (30 / 46);
                            this.group_medal.addChild(img);
                        }
                        if(obj["guard"]["angel_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m2";
                            img.width = 30;
                            img.height = 48 * (30 / 73);
                            this.group_medal.addChild(img);
                        }
                        if(obj["guard"]["stars_guard"] == 1) {
                            var img = new eui.Image();
                            img.source = "u_m3";
                            img.width = 30;
                            img.height = 51 * (30 / 53);
                            this.group_medal.addChild(img);
                        }
                    }
                    this.lblName.x = this.group_medal.x + this.group_medal.width + 2;
                    this.lblName1.x = this.lblName.x + 1;
                    
                    this.bmpIcon.visible = false;
                    this.lblTitle.visible = true;
                    this.bmpTitleBack.visible = true;
                    this.bmpBuluo.visible = false;
                    //                    this.bmpIcon.source = "p_gift" + this.gift_id;
                    this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
                    this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
                    newName = window["hexToDec"](obj["user_name"]);
                    var addlen: number = 0;
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("<font color=#ffffff>众筹贡献"+obj["cost"]+"钻</font>");
                    this.lblDesc1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>众筹贡献" + obj["cost"] +"钻</font>");
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
        public getStringLen(str): string {
            //            var len = 0;
            //            var newStr =             '';
            //            for(var i = 0;i < str.length;i++) {
            //                var length = str.charCodeAt(i);
            //                if(length >= 0 && length <= 128) {
            //                    len += 1;
            //                }
            //                else {
            //                    len += 2;
            //                }
            //                if(len < 12) {
            //                    newStr += str[i];
            //         }else{
        //                    newStr += '...';
        //                    return         newStr;
        //                }
        //            }
        //            return newStr;
        return str;
    }
        private clear(): void {
            this.bmpIcon.visible = true;
            this.lblTitle.visible = true;
            this.bmpTitleBack.visible = true;
            this.bmpBuluo.visible = false;
            
            this.lblTitle.text = "";
            this.lblDesc.text = "";
            this.lblDesc1.text = "";
            this.bmpIcon.source = null;
            while(this.group_medal.numElements>0){
                var item = this.group_medal.getElementAt(this.group_medal.numElements - 1);
                if(item.parent){
                    item.parent.removeChild(item);
                }
            }
        }
    }
}
