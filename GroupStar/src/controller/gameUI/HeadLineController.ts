module headLine {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeadLineController {
		public constructor() {
		}
        public show(type:number,ts:number,come:number): void {
            GameApp.Manager.viewManager.headLinesManager.show(type,ts,come);
        }
        public hide(): void {
            GameApp.Manager.viewManager.headLinesManager.hide();
        }
	}
}
