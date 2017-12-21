module task {
	/**
	 *
	 * @author 
	 *
	 */
    export class AggregationManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        private type: number;
        public aggregation:task.AggregationIcon1;
        private num:number;

        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }

        public show(type:number,num:number): void {
            this.type=type;
            this.num = num;
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
        }

        
        private initUI(): void {
            console.log("进入下一个界面")
            if(!this.aggregation){
                this.aggregation = new task.AggregationIcon1();
            }
             this.aggregation.type=this.type;
             this.BottomUIStage.addChild(this.aggregation);
             this.aggregation.addUpImg(); //添加大图片；
             if(this.num == 2){
                this.aggregation.upTriceIcon();  //集结中会调用这个
             }
        }
        
        public hide(): void {
            if(this.aggregation.parent) {
                this.BottomUIStage.removeChild(this.aggregation);
                this.aggregation.clear();
            }
        }
        private loading(): void {
            var self = this;
            this.initUI();
        }
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
	}
}
