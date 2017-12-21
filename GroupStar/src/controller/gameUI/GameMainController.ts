module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameMainController {
		public constructor() {
		}
        public showMain():void{
            GameApp.Manager.viewManager.gameMainManager.showMain();
        }
        public show(): void
        { 
            GameApp.Manager.viewManager.gameMainManager.show();
        }
        public showTask():void{
            
            GameApp.Manager.controllerManager.taskController.show();
        }
        public hide(): void
        { 
            GameApp.Manager.viewManager.gameMainManager.hide();
        }
        
	}
}
