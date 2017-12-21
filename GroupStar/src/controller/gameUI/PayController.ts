module pay {
	/**
	 *
	 * @author 
	 *
	 */
	export class PayController {
		public constructor() {
		}
        public show(callback:Function,type:number,isByModal?:any): void {
            GameApp.Manager.viewManager.payManager.show(callback,type,isByModal);
        }
        public hide(): void {
            GameApp.Manager.viewManager.payManager.hide();
        }
	}
}
