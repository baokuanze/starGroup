module rankUserContribution {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankUserContributionController {
		public constructor() {
		}
        public show(bid:string,group_openid:string): void {
            GameApp.Manager.viewManager.rankUserContributionManager.show(bid,group_openid);
        }

        public hide(): void {
            GameApp.Manager.viewManager.rankUserContributionManager.hide();
        }
	}
}
