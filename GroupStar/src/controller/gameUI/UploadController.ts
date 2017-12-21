module upload {
	/**
	 *
	 * @author 
	 *
	 */
	export class UploadController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.uploadManager.show();
        }
        public hide(): void {
            GameApp.Manager.viewManager.uploadManager.hide();
        }
	}
}
