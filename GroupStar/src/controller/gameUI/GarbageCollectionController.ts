module garbageCollection {
	/**
	 *
	 * @author 
	 *
	 */
	export class GarbageCollectionController {
		public constructor() {
		}
        public show(uid:number,bid:string,type:number): void {
            GameApp.Manager.viewManager.garbageCollectionManager.show(uid,bid,type);
        }

        public hide(): void {
            GameApp.Manager.viewManager.garbageCollectionManager.hide();
        }
	}
}
