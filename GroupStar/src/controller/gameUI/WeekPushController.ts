module weekPush {
	/**
	 *
	 * @author 
	 *
	 */
	export class WeekPushController {
		public constructor() {
        }
        public show(): void {
            GameApp.Manager.viewManager.weekPushManage.show();
        }
        public hide(): void {
            GameApp.Manager.viewManager.weekPushManage.hide();
        }
	}
}
