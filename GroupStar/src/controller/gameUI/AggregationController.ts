module aggregation {
	/**
	 *
	 * @author 
	 *
	 */
	export class AggregationController {
		public constructor() {
		}
        public show(type:number,num:number): void {
            GameApp.Manager.viewManager.aggregation.show(type,num);
        }

        public hide(): void {
            GameApp.Manager.viewManager.aggregation.hide();
        }
	}
}
