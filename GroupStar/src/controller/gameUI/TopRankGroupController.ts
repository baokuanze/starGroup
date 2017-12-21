module topRank {
	/**
	 *
	 * @author 
	 *
	 */
	export class TopRankGroupController {
		public constructor() {
		}
        
		public show(): void {
            GameApp.Manager.viewManager.topRankGroupManager.show();
        }

        public hide(): void {
            GameApp.Manager.viewManager.topRankGroupManager.hide();
        }
	}
}
