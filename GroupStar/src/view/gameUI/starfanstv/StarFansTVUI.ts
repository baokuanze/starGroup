module starfanstv {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarFansTVUI extends eui.Component{
    	private scroll1:eui.Scroller;
        private groupData:eui.Group;
    	private btnClose:eui.Image;
        private txt1:eui.Label;
    	private bo:boolean=false;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/starfanstv/StarFansTVUISkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC";
            }
		    this.scroll1.height=this.stage.stageHeight-120;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
		}
        public setData(arr: Array<Object>):void{
            if(!this.bo){
                this.bo=true;
    		    for(var i in arr){
                    var item: StarFanTVItem = new StarFanTVItem();
                    this.groupData.addChild(item);
                    item.setData(arr[i]);
    		    }
		    }
		}
		public clear():void{
		    
		}
        public close(): void {
            GameApp.Manager.controllerManager.gameMainController.show();
            GameApp.Manager.controllerManager.starFansTVController.hide();
        }
	}
}
