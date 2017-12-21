module newstar {
	/**
	 *
	 * @author 
	 *
	 */
	export class NewStarCheckBoxItem extends eui.Component{
        private lbl1:eui.Label;
        private bmpS:eui.Image;
        public isSelect:boolean=false;
        public key:number=0;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/newstar/NewStarCheckBoxItemSkin.exml";
            this.touchEnabled=true;
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
            }
		    this.bmpS.visible=false;
		    this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		}
		public tap():void{
		    if(!this.isSelect){
		        this.isSelect=true;
		        this.bmpS.visible=true;
		    }else{
		        this.isSelect=false;
		        this.bmpS.visible=false;
		    }
		}
		public setData(txt:string,key:number):void{
		    this.lbl1.text=txt;
		    this.key=key;
		}
	}
}
