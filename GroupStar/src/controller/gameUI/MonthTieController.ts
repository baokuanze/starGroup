module monthTie {
	/**
	 *
	 * @author 
	 *
	 */
	export class MonthTieController {
        public constructor() {
        }
        public show(str:string,type?:string): void {
            GameApp.Manager.viewManager.monthTieManager.show(str,type);
        }
        public hide(): void {
            GameApp.Manager.viewManager.monthTieManager.hide();
        }
	}
}
