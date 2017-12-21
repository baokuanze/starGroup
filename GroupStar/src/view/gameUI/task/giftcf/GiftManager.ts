module task {
	/**
	 *
	 * @author 
	 *
	 */
    export class GiftManager extends common.BaseView {
        private viewManager: view.ViewManager;
        public giftCf: GiftCf;
        public obj: Object;
        public testObj: Object;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
        }
        public show(type:number): void {
            var self = this;
            if(!this.giftCf) {
                this.giftCf = new GiftCf();
            }
            this.giftCf.type=type;
            this.BottomUIStage.addChild(this.giftCf);
            this.giftCf.show();
        }
        public hide(): void {
            if(this.giftCf) {
                this.giftCf.parent.removeChild(this.giftCf);
                this.giftCf.clear();
            }
        }
    }
}
