module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
	export class BtnBuluo extends eui.Component{
    	public lbltxt:eui.Label;
    	public lbltxt1:eui.Label;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/mainUI/BtnBuluoSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lbltxt.fontFamily = "Heiti SC";
                this.lbltxt1.fontFamily = "Heiti SC";
            }
		}
		public setData(str:string):void{
    		var self:BtnBuluo=this;
		    this.lbltxt.text=str;
		  
		    setTimeout(function(){
                self.lbltxt1.x = self.lbltxt.x + 1;
                self.lbltxt1.y = self.lbltxt.y + 1;    
                self.lbltxt1.text = str;
    		    },500,this);
		    
		}
	}
}
