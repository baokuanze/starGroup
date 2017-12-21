module rankGroup {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankGroupController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.rankGroupManager.show();
        }
        public hide(): void {
            GameApp.Manager.viewManager.rankGroupManager.hide();
        }
	}
}
