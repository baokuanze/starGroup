module barrage {
	/**
	 *
	 * @author 弹幕管理类
	 *
	 */
	export class BarrageMananger {
    	private mainUI:mainUI.MainUI;
        private itemArr:Array<BarrageItem>=[];
        private pointArr:Array<Object>=[
            { id: 1, x: 20,y: 360,bo: true },
            { id: 2, x: 20,y: 240,bo: true },
            { id: 3, x: 20,y: 120,bo: true },
            { id: 4,x: 20,y: 0,bo: true }
        ];
		public constructor(mainUI:mainUI.MainUI) {
    		this.mainUI=mainUI;
		}
		public add(obj:Object):void{
    		if(obj["click"]>0&&obj["id"]!=1){
                var item: BarrageItem=this.getItemByUidGiftId(obj["uid"],obj["id"]);
                if(item){
                    item.resetData(obj);
                }else{
                    var point:Object=this.getPoint();
                    if(point) {
                        point["bo"] = false;
                        item = BarrageItem.produce();
                        if(GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI && GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.parent){
                            GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.addChild(item);
                            item.y = point["y"]+250;
                        }else{
                            this.mainUI.addChild(item);
                            item.y = point["y"];
                        }
               
                        item.setData(obj);
                        item.pid = point["id"];
                        item.addEventListener("END",this.itemEnd,this);
                        this.itemArr.push(item);
                    }
                }
    		}
		}
		private itemEnd(e:egret.Event):void{
    		var item:BarrageItem=e.data;
		    var point:Object=this.getPointById(item.pid);
		    point["bo"]=true;
		    for(var i:number=this.itemArr.length-1;i>=0;i--){
		        if(item==this.itemArr[i]){
		            this.itemArr.splice(i,1);
		            break;
		        }
		    }
            if(item.parent) {
                item.parent.removeChild(item);
            }
		    BarrageItem.reclaim(item);
		   
		}
		private getItemByUidGiftId(uid:number,giftid:number):BarrageItem{
		    var ret:BarrageItem;
		    for(var i in this.itemArr){
		        var item:BarrageItem=this.itemArr[i];
		        if(item.state!=3){
		            if(item.uid==uid&&item.giftId==giftid){
		                ret=item;
		                break;
		            }
		        }
		    }
		    return ret;
		}
		private getPoint():Object{
    		var ret:Object=null;
		    for(var i in this.pointArr){
		        var obj:Object=this.pointArr[i];
		        if(obj["bo"]==true){
		            ret=obj;
		            break;
		        }
		    }
		    return ret;
		}
		private getPointById(pid:number):Object{
            var ret: Object = null;
            for(var i in this.pointArr) {
                var obj: Object = this.pointArr[i];
                if(obj["id"]==pid) {
                    ret = obj;
                    break;
                }
            }
            return ret;
		}
	}
}
