module rankStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankStarController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.rankStarManager.show();
        }
        public hide(): void {
            GameApp.Manager.viewManager.rankStarManager.hide();
        }
	}
}
