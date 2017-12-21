module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskOpen extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): TaskOpen {
            if(TaskOpen.cacheDict[mtype] == null) {
                TaskOpen.cacheDict[mtype] = [];
            }
            var dict: TaskOpen[] = TaskOpen.cacheDict[mtype];
            var theFighter: TaskOpen;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new TaskOpen();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: TaskOpen,mtype: string = "1"): void {
            if(TaskOpen.cacheDict[mtype] == null) {
                TaskOpen.cacheDict[mtype] = [];
            }
            var dict: TaskOpen[] = TaskOpen.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        public type:number=0;//1:普通任务 2:支线任务
        public obj:Object;
        public tid:number=0;
        private lblName:eui.Label;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/task/TaskOpenSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		}
		private tap():void{
    		switch(this.type){
    		    case 1:
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.viewManager.taskManager.taskOpenManager.show(this.tid);
    		    break;
                case 2:
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.viewManager.taskManager.taskOpenManager.show(this.tid,this.obj);
                break;
    		}
            
		}
		public setData(obj:Object,type:number):void{
    		this.type=type;
    		this.obj=obj;
    		this.obj["type"]=type;
    		switch(this.type){
    		    case 1:
                    this.tid = obj['open_task_id'];
                    this.lblName.text = window["hexToDec"](obj["title"]) + "(" + obj["finish_count"] + "/" + obj["member_num"] + ")";    
    		    break;
    		    case 2:
    		        this.tid=obj["extension_task_id"];
                    this.lblName.text = window["hexToDec"](obj["title"]);
    		    break;
    		}
            
//            if(obj["each_reward_group_exp"]) {
//                this.lblDesc.text = "每人完成后,群经验+" + obj["each_reward_group_exp"];
//            }
		}
		private clear():void{
		    this.lblName.text="";
		}
	}
}
