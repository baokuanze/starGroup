module monthTie {
	/**
	 *
	 * @author 
	 *
	 */
	export class MonthTieMonth extends eui.Component{
        private img_imgBg:eui.Image;
        private static cacheDict: Object = {};
        private index:number;
        private mts:string;
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): MonthTieMonth {
            if(MonthTieMonth.cacheDict[mtype] == null) {
                MonthTieMonth.cacheDict[mtype] = [];
            }
            var dict: MonthTieMonth[] = MonthTieMonth.cacheDict[mtype];
            var theFighter: MonthTieMonth;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new MonthTieMonth();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: MonthTieMonth,mtype: string = "1"): void {
            if(MonthTieMonth.cacheDict[mtype] == null) {
                MonthTieMonth.cacheDict[mtype] = [];
            }
            var dict: MonthTieMonth[] = MonthTieMonth.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	
        public lable_YearAndMonth:eui.Label;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/monthTie/MonthTieMonthSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_YearAndMonth.fontFamily = "Heiti SC";
            }
        }
        public setData(str:string,index:number,mtsNumber:string):void{
            this.lable_YearAndMonth.text = str;
            this.img_imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchOtherImg,this);
            this.index = index
            this.mts = mtsNumber;
        }
        
        public clear():void{
      
        }

        public touchOtherImg(e:egret.Event):void{
            GameApp.Manager.viewManager.monthTieManager.monthTie.isChange = true;
            
            if(this.index == 0){ //消失
                var num = GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.numElements;
                for(var i = num - 1;i > 0;i--) {
                    var iteme: monthTie.MonthTieMonth = <monthTie.MonthTieMonth>GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.getElementAt(i);
                    monthTie.MonthTieMonth.reclaim(iteme);
                    if(iteme.parent) {
                        iteme.parent.removeChild(iteme);
                    }
                }
                GameApp.Manager.viewManager.monthTieManager.monthTie.img_buttonImg.y = 315;
                GameApp.Manager.viewManager.monthTieManager.monthTie.btn_drop.scaleY = 1;
               return;
            }
            
            var num = GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.numElements;
            for(var i = num -1 ;i >= 0;i--) {
                var iteme: monthTie.MonthTieMonth = <monthTie.MonthTieMonth>GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.getElementAt(i);
                monthTie.MonthTieMonth.reclaim(iteme);
                if(iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
            
            GameApp.Manager.viewManager.monthTieManager.monthTie.img_buttonImg.y = 315;
            GameApp.Manager.viewManager.monthTieManager.monthTie.btn_drop.scaleY = 1;
            
            GameApp.Manager.controllerManager.monthTieController.hide();
            GameApp.Manager.controllerManager.monthTieController.show(this.mts,"main");
            
            var monthTiemonth = monthTie.MonthTieMonth.produce();
            GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.addChildAt(monthTiemonth,0);
            monthTiemonth.setData(this.lable_YearAndMonth.text,0,GameApp.Manager.viewManager.monthTieManager.monthTie.allObj["ts_list"][this.index]);
        }
	}
}
