module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
	export class ZfHeadItem extends eui.Group{
    	private icon:module.BaseCircleImage;
    	private bmpBack:eui.Image;
		public constructor() {
    		super();
    		this.icon=new module.BaseCircleImage();
    		this.icon.x=16;this.icon.y=16;
    		this.bmpBack=new eui.Image();
    		this.width=152;this.height=152;
    		
            this.addChild(this.bmpBack);
            this.addChild(this.icon);
            this.anchorOffsetX = 152 / 2; this.anchorOffsetY = 152 / 2;
		}
		public setData(backurl:string,pic:string):void{
    		this.bmpBack.source=backurl;
		    this.icon.setData(pic,122);
		}
		public setQunIcon():void{
            var q: eui.Image = new eui.Image("zfdy_7");
            q.x=86;q.y=100;this.addChild(q);
		}
	}
}
