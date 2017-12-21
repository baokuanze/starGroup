module signIn {
	/**
	 *
	 * @author 
	 *
	 */
	export class signInController {
        public constructor() {
        }
        public show(type:number): void {
            GameApp.Manager.viewManager.sign.show(type);
        }

        public hide(): void {
            GameApp.Manager.viewManager.sign.hide();
        }
	}
}
