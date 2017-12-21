module rankGroup {
	/**
	 *
	 * @author 群排行
	 *
	 */
	export class RankGroupUI extends eui.Component{
        private rtnBtn:eui.Image;
        private lblTitle:eui.Label;
    	private scroll1:eui.Scroller;
    	private groupData:eui.Group;
    	private arr:Array<RankGroupItem>=[];
        private arr1: Array<RankGroupItem1> = [];
        private arr2: Array<RankGroupItem2> = [];
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/rankGroup/RankGroupUISkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
            }
            this.scroll1.height=this.stage.stageHeight-95;
		    this.rtnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
//		    this.groupData.cacheAsBitmap=true;
		}
        public setData(arr: Array<Object>):void{
//            arr.push(arr[0]); arr.push(arr[0]); arr.push(arr[0]); arr.push(arr[0]);
            var _y:number=0;
            for(var i: number = 0;i < arr.length;i++) {
                switch(i){
                    case 0:
                        var item:RankGroupItem=RankGroupItem.produce();
                        this.groupData.addChild(item);
                        this.arr.push(item);
                        item.setData(arr[i],i+1);
                        item.y = _y;
                        _y+=(2+300);
                    break;
                    case 1:
                        var item1: RankGroupItem1 = RankGroupItem1.produce();
                        this.groupData.addChild(item1);
                        this.arr1.push(item1);
                        item1.setData(arr[i],i + 1);
                        item1.y = _y;
                        _y += (2+234);
                    break;
                    case 2:
                        var item1:RankGroupItem1=RankGroupItem1.produce();
                        this.groupData.addChild(item1);
                        this.arr1.push(item1);
                        item1.setData(arr[i],i + 1);
                        item1.y = _y;
                        _y += (2+234);
                    break;
                    default:
                        var item2:RankGroupItem2=RankGroupItem2.produce();
                        this.groupData.addChild(item2);
                        this.arr2.push(item2);
                        item2.setData(arr[i],i + 1);
                        item2.y=_y;
                        _y += (2+133);
                    break;
                }
            }
		}
		public clear():void{
		    while(this.arr.length>0){
		        var item:RankGroupItem=this.arr.pop();
		        RankGroupItem.reclaim(item);
		        if(item.parent){
		            item.parent.removeChild(item);
		        }
		    }
            while(this.arr1.length > 0) {
                var item1: RankGroupItem1 = this.arr1.pop();
                RankGroupItem1.reclaim(item1);
                if(item1.parent) {
                    item1.parent.removeChild(item1);
                }
            }
            while(this.arr2.length > 0) {
                var item2: RankGroupItem2 = this.arr2.pop();
                RankGroupItem2.reclaim(item2);
                if(item2.parent) {
                    item2.parent.removeChild(item2);
                }
            }
		}
		public close():void{
		    GameApp.Manager.controllerManager.rankGroupController.hide();
            GameApp.Manager.controllerManager.taskController.show();
		}
	}
}
