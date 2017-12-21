module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
	export class BuyTicketController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.buyTicketActiveManager.show();
        }

        public hide(): void {
            GameApp.Manager.viewManager.buyTicketActiveManager.hide();
        }
	}
}
