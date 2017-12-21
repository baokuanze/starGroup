module rankStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankStarUI extends eui.Component{
    	private btnClose:eui.Image;
    	private scroll1:eui.Scroller;
    	private groupData:eui.Group;
        private groupButtom:eui.Group;
        private txt1:eui.Label;
        
        private btn_Fx:eui.Image;
        
        private disNum:number=10;  //显示的条数
        private index: number = 0;  //显示的区域
        private arr:Array<RankStarItem>=[]; //所有的数
        
        private group_hostStarInfo:eui.Group; // 最上边的图片
       // img_starIcon
        private img_starIcon:eui.Image;
        private lable_RankNum:eui.Label;
        private lable_Name:eui.Label;
        private lable_hotNumber:eui.Label;
        private btn_buLuo:eui.Image;
        private btn_pic:eui.Image;
        private group_ZC:eui.Group;
        
        private scroll2:eui.Scroller;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/rankStar/RankStarUISkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC";
                this.lable_RankNum.fontFamily = "Heiti SC";
                this.lable_Name.fontFamily = "Heiti SC";
                this.lable_hotNumber.fontFamily = "Heiti SC";
            }
		    this.scroll1.height=egret.MainContext.instance.stage.stageHeight;
    		this.groupButtom.y=egret.MainContext.instance.stage.stageHeight-80;
		    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.change,this);
            this.btn_Fx.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starRankShare",
                    { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                        system.Share.share(obj,function(n: number) {
                            if(n == 1)
                                system.TipText.produce().open("发送成功");
                        });
                    },true,this);
            },this);
            this.btn_buLuo.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                location.href = "http://buluo.qq.com/p/barindex.html?bid=" + GameApp.Manager.dataManager.bid;
                },this);
            this.btn_pic.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.rankStarController.hide();
                GameApp.Manager.controllerManager.uploadController.show();
                },this);
		}
        public change(): void {
            if(this.scroll1.viewport&&this.arr.length>0){
                var last: RankStarItem = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next: RankStarItem = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
                if(this.index < this.arr.length / this.disNum - 1) {
                    if(this.scroll1.viewport.scrollV >= next.y - (this.scroll1.height-615)) {
                        this.index++;
                        this.dis();
                    }
                }
                if(this.index > 0) {
                    if(this.scroll1.viewport.scrollV < last.y+615) {
                        this.index--;
                        this.dis();
                    }
                }
            }
        }
        private dis(): void {
            var min: number = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
            var max: number = (this.index + 1) * this.disNum;
            for(var i: number = 0;i < this.arr.length;i++) {
                var item: RankStarItem = this.arr[i];
                if(i >= min && i < max) {
                    this.groupData.addChild(item);
                } else {
                    if(item.parent) {
                        item.parent.removeChild(item);
                    }
                }
            }
        }
		public setData(arr:Array<Object>,obj:Object):void{
//    		if(GameApp.Manager.dataManager.visitor>0){
//    		    this.btn_pic.visible=false;
//    		}else{
//                this.btn_pic.visible = true;
//    		}
            this.scroll1.viewport.scrollV = 0;
    		this.index=0;
    		if(this.groupData.numElements>0)
    		this.groupData.removeChildren();
    		var i:number=0;
		    for(i=0;i<arr.length;i++){
		        var item:RankStarItem=RankStarItem.produce()
		        this.groupData.addChild(item);
		        this.arr.push(item);
                item.y = i * 180;
		    }
            for(i = arr.length-1;i >=0;i--) {
                var item: RankStarItem =<RankStarItem>this.groupData.getElementAt(i);
                item.setData(arr[i]);
            }
            this.dis();
            
            this.lable_RankNum.text = window["hexToDec"](obj["rank"]);
            this.lable_Name.text = window["hexToDec"](obj["name"]);
            this.lable_hotNumber.text = window["hexToDec"](obj["hot"]);
            RES.getResByUrl(obj["head_img"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            
            var num = obj["crowdfunding"].length;
            for(var i:number = 0;i<num;i++){
                var zc = new mainUI.MainZcItem()
                this.group_ZC.addChild(zc);
                zc.setData(obj["crowdfunding"][i],{head_img:obj["head_img"]})
            }
		}
		
        public load_end(source:egret.Texture):void{
            this.img_starIcon.texture = source;
        }
		
		public clear():void{
            this.scroll1.viewport.scrollV=0;
    		this.arr=[];
            while(this.groupData.numElements > 0) {
                var item: RankStarItem = <RankStarItem>this.groupData.getElementAt(this.groupData.numElements - 1);
                RankStarItem.reclaim(item);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
            
            while(this.group_ZC.numElements > 0) {
                var it: mainUI.MainZcItem = <mainUI.MainZcItem>this.group_ZC.getElementAt(this.group_ZC.numElements - 1);
                this.group_ZC.removeChildren();
            }
            
		}
		public close():void{
		    GameApp.Manager.controllerManager.gameMainController.show();
		    GameApp.Manager.controllerManager.rankStarController.hide();
		}
	}
}
