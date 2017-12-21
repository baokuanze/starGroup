module containmoney {
	/**
	 *
	 * @author 
	 *
	 */
	export class ContainmoneyUI {
        private static _instance: ContainmoneyUI;
        public static getInstance(): ContainmoneyUI {
            if(!this._instance) {
                this._instance = new ContainmoneyUI();
            }
            return this._instance;
        }
    	private arrPoint:Array<Object>;
        private redPackets:Array<string>=[];
        private arr: Array<ContainMoneyItem> = [];
		public constructor() {
//    		this.init();
		}
//		private init():void{
//		    this.arrPoint=[
//                { id: 1, x: 523,y: 793 ,num:0},
//                { id: 2, x: 451,y: 707,num: 0},
//                { id: 3, x: 40,y: 828,num: 0},
//                { id: 4, x: 163,y: 725,num: 0},
//                { id: 5,x: 544,y: 610,num: 0},
//                { id: 6, x: 220,y: 584,num: 0},
//                { id: 7, x: 40,y: 614,num: 0},
//                { id: 8, x: 619,y: 499,num: 0},
//                { id: 9, x: 111,y: 468,num: 0},
//                { id: 10, x: 533,y: 350,num: 0},
//                { id: 11, x: 200,y: 327,num: 0},
//                { id: 12,x: 42,y: 332,num: 0},
//		    ];
//		}
//		private getPointObj(n:number=0):Object{
//		    var ret:Object;
//		    for(var i in this.arrPoint){
//		        var item:Object=this.arrPoint[i];
//		        if(item["num"]==n){
//		            ret=item;
//		            break;
//		        }
//		    }
//		    if(!ret){
//		        ret=this.getPointObj(n+1);
//		    }
//		    return ret;
//		}
//        private getPointObjById(pointId:number): Object {
//            var ret: Object;
//            for(var i in this.arrPoint) {
//                var item: Object = this.arrPoint[i];
//                if(item["id"] == pointId) {
//                    ret = item;
//                    break;
//                }
//            }
//            return ret;
//        }
        public saveRedPackets(arr:Array<string>):void{
            this.removeAll();
            if(GameApp.Manager.dataManager.visitor==0){
                this.redPackets=arr;
                this.addRedPackets();
            }
        }
        public saveActivePackets(str:string):void{
            this.redPackets.push(str);
            this.addRedPackets();
        }
        public addRedPackets():void{
            if(this.redPackets&&this.redPackets.length>0){
//                console.log('初始化红包initdata',this.redPackets);
                if(!containmoney.ContainmoneyOpen.getInstance().parent){
                    var key:string=this.redPackets.shift();
                    this.open(key);
                }
//                for(var i in this.redPackets){
//                    var obj: Object = this.redPackets[i];
//                    this.open(obj);
//                }
            }
        }
        public onMsg(obj:Object):void{
            if(obj["key"]){
                if(GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI && GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.parent){
                    
                }else{
                    if(GameApp.Manager.dataManager.visitor == 0) {
                        this.redPackets.push(obj["key"]);
                        this.addRedPackets();
                    }
                }
            }
            GameApp.Manager.viewManager.gameMainUI.mainUI.mbarrageUI.add(obj);
            switch(obj["type"]+""){
                case "6":
                    signIn.SignInManager.setData(obj);
                break;
                case "7":break;
                default:
                    notice.Notice.getInstance().setData(obj);
                break;
            }
        }
		public open(key:string):void{
//		    var item:ContainMoneyItem=ContainMoneyItem.produce();
//            item.open(obj["key"],obj["point"]["id"],obj["point"]["x"],obj["point"]["y"]);
//		    item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.item_tap,this);
//            this.arr.push(item);
    		containmoney.ContainmoneyOpen.getInstance().setData(key);
		}
        public removeAll():void{
            this.delArr();
		}
//		private item_tap(e:egret.Event):void{
//		    var item:ContainMoneyItem=e.currentTarget;
//		    if(item){
//                ContainmoneyOpen.getInstance().setData(item.key);
//		    }
//		    var pointObj:Object=this.getPointObjById(item.pointId);
//            pointObj["num"] = pointObj["num"]-1;
//            item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.item_tap,this);
//            this.delByKey(item.key);
//            ContainMoneyItem.reclaim(item);
//            item.close();
//		}
		
//		private delByKey(key:string):void{
//            for(var i: number = this.arr.length - 1;i >= 0;i--){
//                var item: ContainMoneyItem = this.arr[i];
//                if(item.key==key){
//                    this.arr.splice(i,1);
//                    break;
//                }
//		    }
//            for(var j: number = this.redPackets.length - 1;j >= 0;j--) {
//                var o:Object = this.redPackets[j];
//                if(o["key"] == key) {
//                    this.redPackets.splice(j,1);
//                    break;
//                }
//            }
//		}
		private delArr():void{
//            for(var i: number = this.arr.length - 1;i >= 0;i--) {
//                var item: ContainMoneyItem = this.arr[i];
//                item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.item_tap,this);
//                ContainMoneyItem.reclaim(item);
//                item.close();
//            }
            this.arr = [];
//            for(var j in this.arrPoint) {
//                var item1: Object = this.arrPoint[j];
//                item1["num"] = 0;
//            }
		}
	}
}
