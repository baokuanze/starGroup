module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class GiftCfBtn extends eui.Component{
    	private lbl1:eui.Label;
    	private lblNum:eui.Label;
    	private bmpBack:eui.Rect;
    	private type:number=0;
		public constructor(type:number) {
    		super();
            this.skinName ="src/view/gameUI/task/giftcf/GiftCfBtnSkin.exml";
            this.type=type;
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }  
            switch(this.type){
                case 1: this.lblNum.text = "1"; this.bmpBack.fillColor = 0x4AD486;break;
                case 2: this.lblNum.text = "59"; this.bmpBack.fillColor = 0x3ABEC0; break;
                case 3: this.lblNum.text = "99"; this.bmpBack.fillColor = 0xFFA350; break;
                case 4: this.lblNum.text = "999"; this.bmpBack.fillColor = 0xF08166; break;
            }
		}
	}
}
