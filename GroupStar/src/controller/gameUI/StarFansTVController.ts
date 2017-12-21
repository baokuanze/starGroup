module starfanstv {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarFansTVController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.starFanTVManager.show();
        } 

        public hide(): void {
            GameApp.Manager.viewManager.starFanTVManager.hide();
        }
	}
}
