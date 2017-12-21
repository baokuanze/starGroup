module containmoney {
	/**
	 *
	 * @author 
	 *
	 */
	export class ContainMoneyItem extends eui.Image{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): ContainMoneyItem {
            if(ContainMoneyItem.cacheDict[mtype] == null) {
                ContainMoneyItem.cacheDict[mtype] = [];
            }
            var dict: ContainMoneyItem[] = ContainMoneyItem.cacheDict[mtype];
            var theFighter: ContainMoneyItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new ContainMoneyItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: ContainMoneyItem,mtype: string = "1"): void {
            if(ContainMoneyItem.cacheDict[mtype] == null) {
                ContainMoneyItem.cacheDict[mtype] = [];
            }
            var dict: ContainMoneyItem[] = ContainMoneyItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }    	
        public key: string;
        public pointId:number=0;
		public constructor() {
    		super();
            this.source ="p_hongbao";
            this.width=61;this.height=85;
		}
        public open(key:string,pid:number,x:number,y:number):void{
            this.key = key;
		    this.pointId=pid;
		    this.x=x;
		    this.y=y;
//		    GameApp.Manager.viewManager.BottomUIStage.addChild(this);
		    if(GameApp.Manager.viewManager.gameMainUI.mainUI){
		        GameApp.Manager.viewManager.gameMainUI.mainUI.addChildAt(this,flower.FlowerUI.getInstance().getMainUIIndex());    
		    }
		}
		public close():void{
//            GameApp.Manager.viewManager.BottomUIStage.removeChild(this);
            GameApp.Manager.viewManager.gameMainUI.mainUI.removeChild(this);
		}
		private clear():void{
            this.key = "";
            this.pointId = 0;
		}
	}
}
