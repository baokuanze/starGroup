module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
	export class AlertBuyTicket extends eui.Component{
        private lb2:eui.Label;
        private btn_close:eui.Rect;
        private srco:eui.Scroller;
        private groupData:eui.Group
        private img_close:eui.Image;
        private AlertContent:buyTicketActive.AlertContent;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/buyTicketActive/AlertBuyTicketSkin.exml";
            this.AlertContent = new buyTicketActive.AlertContent();
            this.AlertContent.x = 0;
            this.AlertContent.y = 0;
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lb2.fontFamily = "Heiti SC";
            }
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
        }
        
        public setData(){
            this.AlertContent.setData();
            this.groupData.addChild(this.AlertContent);
        }
        
        public close(){
            while(this.groupData.numElements>0){
                var item: AlertContent =<AlertContent>this.groupData.getElementAt(this.groupData.numElements - 1);
                if(item.parent){
                    item.clear();
                    item.parent.removeChild(item);
                }
            }
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
	}
}
