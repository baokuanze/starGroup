module garbageCollection {
	/**
	 *
	 * @author 
	 *
	 */
	export class GarbageCollectionManager extends common.BaseView{
        private loaded = false;
        public obj: Object;
        private viewManager: view.ViewManager;
        public garbageCollection: garbageCollection.GarbageCollection;
        
        public bid:string;
        public uid:number;
        public type:number;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        public show(uid:number,bid:string,type:number): void {
            this.uid = uid;
            this.bid = bid;
            this.type = type;
            
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
        }
        private initUI(): void {
            var self: GarbageCollectionManager = this;
            if(!this.garbageCollection) {
                this.garbageCollection = new garbageCollection.GarbageCollection();
            }
            GameApp.Manager.viewManager.garbageStage.addChild(this.garbageCollection);
            GameApp.Manager.viewManager.garbageStage.visible = true;
             var sign: string = new md5().hex_md5(""+GameApp.Manager.dataManager.uid + this.uid +  this.bid + "&");
             Util.sendJson1(GameApp.Manager.dataManager.IP + "/getUserStarWorks",{ user_id: GameApp.Manager.dataManager.uid,target_user_id: this.uid,bid:this.bid,sign: sign },function(obj: Object) {
              
                if(obj["st"] == 1){
                    this.garbageCollection.setData(obj,this.bid,this.uid,this.type);
                }
            },true,this)
                
        }
        public hide(): void {
            if(this.garbageCollection.parent) {
                this.garbageCollection.parent.removeChild(this.garbageCollection);
                this.garbageCollection.clear();
            }
            GameApp.Manager.viewManager.garbageStage.visible = false;
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
