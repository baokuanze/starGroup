module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class GiftCfItem1 extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): GiftCfItem1 {
            if(GiftCfItem1.cacheDict[mtype] == null) {
                GiftCfItem1.cacheDict[mtype] = [];
            }
            var dict: GiftCfItem1[] = GiftCfItem1.cacheDict[mtype];
            var theFighter: GiftCfItem1;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new GiftCfItem1();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: GiftCfItem1,mtype: string = "1"): void {
            if(GiftCfItem1.cacheDict[mtype] == null) {
                GiftCfItem1.cacheDict[mtype] = [];
            }
            var dict: GiftCfItem1[] = GiftCfItem1.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	private groupData:eui.Group;
    	private bmpIcon:eui.Image;
    	private lblTitle:eui.Label;
    	private lblGX:eui.Label;
    	private lblNum:eui.Label;
    	private lbl1:eui.Label;
    	private lbl2:eui.Label;
    	private rectCon:eui.Rect;
    	private bmpCon:eui.Image;
    	private state:string="close";
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/task/giftcf/GiftCfItem1Skin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblGX.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }  
            if(this.groupData.parent) {
                this.removeChild(this.groupData);
            }
            this.rectCon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rectCon_tap,this);
		}
		private rectCon_tap():void{
		    if(this.state=="open"){
		        this.state="close";
		    }else{
		        this.state="open";
		    }
		    this.showlist();
		}
		public setData(obj:Object):void{
            var info: Object = obj["info"];
            var userArray: Array<Object> = obj["userArray"];
            this.lblTitle.text = window["hexToDec"](info["name"]);
            this.lblGX.textFlow = (new egret.HtmlTextParser).parser("贡献<font color=#e88319>" + info["need_num"]+"</font>颗钻石");
            this.lblNum.text = userArray.length+"";
            for(var i: number = 0;i < userArray.length;i++) {
                var item: GiftCfItem = GiftCfItem.produce();
                this.groupData.addChild(item);
                item.setData(userArray[i],i + 1);
            }
		    this.showlist();
            RES.getResByUrl(obj["pic"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
		}
        private load_end(s: egret.Texture): void {
            this.bmpIcon.source = s;
        }
		private showlist():void{
		    if(this.state=="open"){
		        this.addChild(this.groupData);
		    }else{
		        if(this.groupData.parent){
		            this.removeChild(this.groupData);
		        }
		    }
		}
		public clear():void{
    		this.bmpIcon.source=null;
            while(this.groupData.numElements > 0) {
                var item: GiftCfItem = <GiftCfItem>this.groupData.getElementAt(this.groupData.numElements - 1);
                GiftCfItem.reclaim(item);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
		}
	}
}
