module system {
	/**
	 *
	 * @author 
	 *
	 */
	export class TipText1 extends eui.Label{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1"): TipText1 {
            if(TipText1.cacheDict[mtype] == null) {
                TipText1.cacheDict[mtype] = [];
            }
            var dict: TipText1[] = TipText1.cacheDict[mtype];
            var theFighter: TipText1;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new TipText1();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: TipText1,mtype: string = "1"): void {
            if(TipText1.cacheDict[mtype] == null) {
                TipText1.cacheDict[mtype] = [];
            }
            var dict: TipText1[] = TipText1.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private _size:number=24;
		public constructor() {
    		super();
    		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
		}
		private init():void{
            if(Tools.getInstance().isIphone()) {
                this.fontFamily = "Heiti SC";
            }else{
                this.fontFamily="Heiti";
            }
		}
		public setData(str:string,_size:number=24,_color:number=0xffffff):void{
            this.size = _size;
            this.textColor=_color;
		    this.text=str;
		}
		private clear():void{
		    this.text="";
		    this.alpha=1;
		}
	}
}
