module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
	export class BuyTicketManager extends common.BaseView{
        private viewManager: view.ViewManager
        private BuyTicket: BuyTicket;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(): void {
            this.initUI();
        }
        private initUI(): void {
            var self: BuyTicketManager = this;
            if(!this.BuyTicket) {
                this.BuyTicket = new buyTicketActive.BuyTicket();
            }
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid +"1"+"0"+ "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ "user_id": GameApp.Manager.dataManager.uid,type:1,index:0,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    self.BuyTicket.setDataHot(obj);
                }
            },true,this)
            this.BottomUIStage.addChild(this.BuyTicket);
        }

        public hide(): void {
            if(this.BuyTicket.parent) {
                this.BottomUIStage.removeChild(this.BuyTicket);
                this.BuyTicket.clear();
            }
        }
	}
}
