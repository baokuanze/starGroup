module rankGroupContribution {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankGroupContributionController {
		public constructor() {
		}
        public show(type:number): void {
            GameApp.Manager.viewManager.rankGroupContributionManager.show(type);
        }

        public hide(): void {
            GameApp.Manager.viewManager.rankGroupContributionManager.hide();
        }
	}
}
