module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskController {
		public constructor() {
		}
        public show(dispage:number=-1): void {
            GameApp.Manager.viewManager.taskManager.show(dispage);
        }

        public hide(): void {
            GameApp.Manager.viewManager.taskManager.hide();
        }
	}
}
