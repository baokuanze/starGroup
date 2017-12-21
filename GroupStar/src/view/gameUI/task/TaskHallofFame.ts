module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskHallofFame extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): TaskHallofFame {
            if(TaskHallofFame.cacheDict[mtype] == null) {
                TaskHallofFame.cacheDict[mtype] = [];
            }
            var dict: TaskHallofFame[] = TaskHallofFame.cacheDict[mtype];
            var theFighter: TaskHallofFame;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new TaskHallofFame();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: TaskHallofFame,mtype: string = "1"): void {
            if(TaskHallofFame.cacheDict[mtype] == null) {
                TaskHallofFame.cacheDict[mtype] = [];
            }
            var dict: TaskHallofFame[] = TaskHallofFame.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        public uid:number=0;
    	private bmpIcon:eui.Image;
        private bmpRank:eui.Image;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/task/TaskHallofFameSkin.exml";
		}
		public childrenCreated():void{
		    this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		}
		private tap(e:egret.Event):void{
            userPanel.UserPanel.getInstance().open(this.uid,GameApp.Manager.dataManager.bid_save,GameApp.Manager.dataManager.group_openid + "");
            e.stopPropagation();
		}
		public setData(obj:Object,rank:number=-1):void{
    		this.uid=obj["user_id"];
    		if(rank>0){
                this.bmpRank.source ="p1_r"+rank;
                this.bmpRank.visible=true;
    		}else{
    		    this.bmpRank.visible=false;
    		}
            RES.getResByUrl(obj["user_pic"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
		}
		private load_end(s:egret.Texture):void{
		    this.bmpIcon.source=s;
		}
		private clear():void{
		    this.bmpIcon.source=null;
		}
	}
}
