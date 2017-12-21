module sweepsTasks {
	/**
	 *
	 * @author 
	 *
	 */
    export class SweepsTasksManager extends common.BaseView {
        public obj: Object;
        private viewManager: view.ViewManager
        private sweepsTasks:SweepsTasks;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
		}
        public show(): void {
            this.initUI();
        }
        private initUI(): void {
            var self: SweepsTasksManager = this;
            if(!this.sweepsTasks) {
                this.sweepsTasks = new sweepsTasks.SweepsTasks();
            }
            self.sweepsTasks.setData();
            this.BottomUIStage.addChild(this.sweepsTasks);
        }

        public hide(): void {
            if(this.sweepsTasks.parent) {
                this.BottomUIStage.removeChild(this.sweepsTasks);
                this.sweepsTasks.clear();
            }
        }
	}
}
