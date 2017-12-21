module headLineItemInforation {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeadLineItemInfoController {
		public constructor() {
		}
        public show(headline_id:string,name:string,ts:number): void {
            GameApp.Manager.viewManager.headLinesItemInfoManager.show(headline_id,name,ts);
        }
        public hide(): void {
            GameApp.Manager.viewManager.headLinesItemInfoManager.hide();
        }
	}
}
