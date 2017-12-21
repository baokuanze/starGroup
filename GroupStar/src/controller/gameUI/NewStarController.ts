module newstar {
	/**
	 *
	 * @author 
	 *
	 */
	export class NewStarController {
		public constructor() {
		}
        public show(): void {
            GameApp.Manager.viewManager.newStarManager.show();
        }
        public hide(): void {
            GameApp.Manager.viewManager.newStarManager.hide();
        }
        public showSerach(serach_name?:string):void{
            GameApp.Manager.viewManager.newStarManager.showSerach(serach_name);
        }
        public hideSerach():void{
            GameApp.Manager.viewManager.newStarManager.hideSerach();
        }
	}
}
