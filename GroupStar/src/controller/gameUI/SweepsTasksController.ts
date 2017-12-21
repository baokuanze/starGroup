module sweepsTasks {
	/**
	 *
	 * @author 
	 *
	 */
	export class SweepsTasksController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.sweepsTasksManager.show();
        }

        public hide(): void {
            GameApp.Manager.viewManager.sweepsTasksManager.hide();
        }
	}
}
