module fansRecruit {
	/**
	 *
	 * @author 
	 *
	 */
	export class FansRecruitController {
        public constructor() {
        }
        public show(): void {
            GameApp.Manager.viewManager.fansRecruitManager.show();
        }

        public hide(): void {
            GameApp.Manager.viewManager.fansRecruitManager.hide();
        }
	}
}
