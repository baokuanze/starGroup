module system {
	/**
	 *
	 * @author 
	 *
	 */
	export class TipText extends eui.Component{

        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): TipText {
            if(TipText.cacheDict[mtype] == null) {
                TipText.cacheDict[mtype] = [];
            }
            var dict: TipText[] = TipText.cacheDict[mtype];
            var theFighter: TipText;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new TipText();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: TipText,mtype: string = "1"): void {
            if(TipText.cacheDict[mtype] == null) {
                TipText.cacheDict[mtype] = [];
            }
            var dict: TipText[] = TipText.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private lblText:eui.Label;
        
    	public constructor() {
    		super();
            this.skinName = "src/view/gameUI/system/TipTextSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
		}
		public open(txt:string,wait:number=500,clear:number=500):void{
            GameApp.Manager.viewManager.TopUIStage.addChild(this);
		    this.lblText.text=txt;
		    this.x=(750-394)/2;
		    this.y=500;
		    this.alpha=1;
            egret.Tween.get(this).wait(wait).to({ y: 400,alpha: 0 },clear).call(function(){
    		     this.close();
    		    },this);
		}
		public close():void{
    		TipText.reclaim(this);
		}
		private clear():void{
            this.lblText.text = "";
            this.parent.removeChild(this);
		}
	}
}
