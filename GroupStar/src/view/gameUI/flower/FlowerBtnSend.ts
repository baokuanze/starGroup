module flower {
	/**
	 *
	 * @author 
	 *
	 */
	export class FlowerBtnSend extends eui.Button{
        private rectBack:eui.Rect;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/flower/FlowerBtnSendSkin.exml";
		}
		public setState(state:number):void{
    		switch(state){
                case 0:
                    this.rectBack.fillColor = 0xA0A2A3;
                break;
                case 1:
                    this.rectBack.fillColor = 0x3EBCF3;
                    break;
    		}
		   
		}
	}
}
