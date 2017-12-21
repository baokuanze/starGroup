module mySelfStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class MySelfHeadLinesItem extends eui.Component {
        private static cacheDict: Object = {};
        public static produce(mtype: string = "1",index: number = 0): MySelfHeadLinesItem {
            if(MySelfHeadLinesItem.cacheDict[mtype] == null) {
                MySelfHeadLinesItem.cacheDict[mtype] = [];
            }
            var dict: MySelfHeadLinesItem[] = MySelfHeadLinesItem.cacheDict[mtype];
            var theFighter: MySelfHeadLinesItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new MySelfHeadLinesItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: MySelfHeadLinesItem,mtype: string = "1"): void {
            if(MySelfHeadLinesItem.cacheDict[mtype] == null) {
                MySelfHeadLinesItem.cacheDict[mtype] = [];
            }
            var dict: MySelfHeadLinesItem[] = MySelfHeadLinesItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        public lable_time:eui.Label;//显示时间;
        public lable_pro:eui.Label;
        public rect_button:eui.Rect;
        public time:number;
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/headlines/mySelfStar/MyselfHeadLinesItemSkin.exml";
        }
        public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lable_time.fontFamily = "Heiti SC";
                this.lable_pro.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeTime,this);
        }
       
        public setData(time:number,dis:number):void{
           this.time  = time;
           this.lable_time.text = Tools.getInstance().getTime6(time);
            if(dis == 1){
                this.lable_pro.visible = false;
                this.lable_time.textColor = 0x14b8f6
            }else{
                this.lable_time.textColor = 0xb4b4b4;
                this.lable_pro.visible = true;
                this.lable_pro.textColor = 0xb4b4b4;
            } 
        }
        public changeTime(e:egret.Event):void{
            console.log("------change")
            var self: MySelfHeadLinesItem = this;
            self.dispatchEventWith('click',false,this);
        }
        
        public clear():void{
            this.lable_time.text = "";
        }
	}
}
