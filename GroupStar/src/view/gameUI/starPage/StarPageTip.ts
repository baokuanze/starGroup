module starPage {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarPageTip extends eui.Component{
    	private lbl0:eui.Label;
        private lblStarName:eui.EditableText;
        private btnSerach:eui.Image;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/starPage/StarPageTipSkin.exml";
		}
		public childrenCreated():void{
    		var self:StarPageTip=this;
            if(Tools.getInstance().isIphone()) {
                this.lbl0.fontFamily = "Heiti SC";
                this.lblStarName.fontFamily="Heiti SC";
            }
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_IN,function() {
                if(self.lblStarName.text == "请输入明星姓名或组合全称") {
                    self.lblStarName.text = "";
                    self.lblStarName.textColor = 0x14b8f6;
                }
            },this);
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_OUT,function() {
                if(self.lblStarName.text == "") {
                    self.lblStarName.text = "请输入明星姓名或组合全称";
                    self.lblStarName.textColor = 0xbcd5df;
                }
                this.btn_tap();
            },this);
//            this.btnSerach.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn_tap,this);
		}
		private btn_tap():void{
    		console.log('starpagetipserach'+this.lblStarName.text);
            if(this.lblStarName.text != "" && this.lblStarName.text !="请输入明星姓名或组合全称"){
                GameApp.Manager.controllerManager.newStarController.showSerach(this.lblStarName.text);
		        GameApp.Manager.viewManager.starPageManager.hide();
		    }
		}
		public clear():void{
            this.lblStarName.textColor = 0xbcd5df;
            this.lblStarName.text = "请输入明星姓名或组合全称";
		}
	}
}
