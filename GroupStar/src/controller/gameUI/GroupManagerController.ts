module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagerController {
        public constructor() {
        }
        public show(str:string): void {
            GameApp.Manager.viewManager.groupManager.show(str);
        }

        public hide(): void {
            GameApp.Manager.viewManager.groupManager.hide();
        }
	}
}
