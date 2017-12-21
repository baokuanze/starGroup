module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
	export class BtnMain extends eui.Button{
    	private lblText:eui.Label;
    	private lblNum:eui.BitmapLabel;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/mainUI/BtnMainSkin.exml";
            this.cacheAsBitmap=true;
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
		}
		public setData(src:string,txt:string):void{
		    this.icon="p_"+src+"";
		    this.lblText.text=txt;
		}
		public setNum(txt1:string):void{
            if(txt1) {
                this.lblNum.visible = true;
                this.lblNum.text = txt1;
            } else {
                this.lblNum.visible = false;
            }
		}
	}
}
