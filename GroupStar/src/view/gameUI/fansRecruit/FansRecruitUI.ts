module fansRecruit {
	/**
	 *
	 * @author 
	 *
	 */
    export class FansRecruitUI extends eui.Component{
        private chakan:eui.Label;
        private lbl1:eui.Label;
        private rtnBtn:eui.Image;
        private scroller:eui.Scroller;
        private scroGroup:eui.Group;
        private data:Object;
        private lastItem:FansRecruitItem;
        private currentGroup:number = 1; //当前数据默认第一组
        private bid:string;
        private bo:boolean=false;
        
        private disNum: number = 6;
        private index: number = 0;
        private arr: Array<FansRecruitItem> = [];
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/fansRecruit/FansRecruitUISkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.chakan.fontFamily = "Heiti SC";
                this.lbl1.fontFamily="Heiti SC";
            }
            this.scroller.bounces=false;
            this.scroller.height=this.stage.stageHeight-105;
            this.rtnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.scroller.addEventListener(eui.UIEvent.CHANGE_END,this.change,this);
            this.lbl1.visible=false;
        }
        public change(): void {
            //console.log(this.scroller.viewport)
            if(this.scroGroup.numElements>0){
                var value =  this.lastItem.y-this.scroller.height+this.lastItem.height;
                if(this.scroller.viewport&&this.scroller.viewport.scrollV>=value){
                    //console.log('22')
                    //this.setData(this.data);
                    this.ajaxPost();
                }
            }
        }
        public ajaxPost():void{
            var self =this;
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid_save+ (this.currentGroup+1) + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starFansGroups",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid_save,page: (this.currentGroup + 1),sign: sign },function(obj: Object) {
                    
                 if(obj['st']==1&&obj['groups'].length>0){
                     self.bo=false;
                     self.setData(obj);
                     self.currentGroup++;
                 }
                 
            },true,this);
        }
        public setData(obj: Object): void {
            this.data = obj;
            if(obj['groups'].length>0){
                for(var i=0;i<obj['groups'].length;i++){
                    var item = new FansRecruitItem();
                    item.setData(obj['groups'][i]);
                    this.scroGroup.addChild(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.item_tap,this);
                    if(i==obj['groups'].length-1){
                        this.lastItem = item;
                    }
                }
            }else{
                this.lbl1.visible=true;
            }
        }
        private item_tap(e:egret.Event):void{
            var item:FansRecruitItem=e.currentTarget;
            system.GroupJoin.join(item.obj["group_openid"]);
        }
        public close():void{
            this.lbl1.visible=false;
//            this.scroGroup.removeChildren();
            for(var i:number=this.scroGroup.numElements-1;i>=0;i--){
                var item:FansRecruitItem=<FansRecruitItem>this.scroGroup.getElementAt(i);
                item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.item_tap,this);
                item.parent.removeChild(item);
            }
             //GameApp.Manager.controllerManager.gameMainController.show();
             GameApp.Manager.controllerManager.fansRecruitController.hide();
        }
	}
}
