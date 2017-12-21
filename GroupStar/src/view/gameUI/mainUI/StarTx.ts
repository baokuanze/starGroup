module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarTx extends eui.Group{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): StarTx {
            if(StarTx.cacheDict[mtype] == null) {
                StarTx.cacheDict[mtype] = [];
            }
            var dict: StarTx[] = StarTx.cacheDict[mtype];
            var theFighter: StarTx;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new StarTx();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: StarTx,mtype: string = "1"): void {
            if(StarTx.cacheDict[mtype] == null) {
                StarTx.cacheDict[mtype] = [];
            }
            var dict: StarTx[] = StarTx.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private bmpBack:eui.Image;
        private bmpIcon:module.BaseCircleImage;
		public constructor() {
    		super();
//            this.skinName = "src/view/gameUI/mainUI/startxSkin.exml";
    		this.bmpBack = new eui.Image("p_startx");
    		this.bmpIcon = new module.BaseCircleImage();
    		this.bmpIcon.x=117/2;
    		this.bmpIcon.y=117/2;
    		this.addChild(this.bmpBack);
    		this.addChild(this.bmpIcon);
    		this.bmpBack.anchorOffsetX=117/2;
            this.bmpBack.anchorOffsetY = 117/2;
            this.bmpBack.x=117/2;
            this.bmpBack.y=117/2;
            this.anchorOffsetX=117/2;
            this.anchorOffsetY=117/2;
            this.touchEnabled=false;
            this.touchChildren=false;
		}
		public setData(pic:string):void{
    		this.alpha=.2;
    		this.scaleX=this.scaleY=.3;
		    this.bmpBack.rotation=Math.random()*360;
		    this.bmpIcon.setData(pic,55,.5,.5);
		    egret.Tween.get(this).to({alpha:.8,scaleX:1,scaleY:1},800).to({alpha:0},400).call(function(){
		        StarTx.reclaim(this);
		        if(this.parent){
		            this.parent.removeChild(this);
		        }
		    },this);
		}
		private clear():void{
		    this.bmpIcon.clear();
		    this.bmpBack.rotation=0;
		}
	}
}
