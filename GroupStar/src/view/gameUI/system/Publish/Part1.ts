module Publish {
	/**
	 *
	 * @author 
	 *
	 */
	export class Part1 extends eui.Component{
        private lb0: eui.Label;
        private lb1:eui.Label;
        private lb2: eui.Label;
        private lb3: eui.Label;
        private lb4: eui.Label;
        private lb5: eui.Label;
        private lb6: eui.Label;
        private lb7: eui.Label;
        private lb8: eui.Label;
        private lb10:eui.Label;
        private lb12: eui.Label;
        private lb13: eui.Label;
		public constructor() {
    		super();
            this.skinName = 'src/view/gameUI/system/Publish/part1Skin.exml';
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lb0.fontFamily = "Heiti SC";
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
                this.lb4.fontFamily = "Heiti SC";
                this.lb5.fontFamily = "Heiti SC";
                this.lb6.fontFamily = "Heiti SC";
                this.lb7.fontFamily = "Heiti SC";
                this.lb8.fontFamily = "Heiti SC";
                this.lb10.fontFamily = "Heiti SC";
                this.lb12.fontFamily = "Heiti SC";
                this.lb13.fontFamily = "Heiti SC";
            }
        }
	}
}
