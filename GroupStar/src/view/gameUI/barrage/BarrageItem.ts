module barrage {
	/**
	 *
	 * @author 
	 *
	 */
	export class BarrageItem extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): BarrageItem {
            if(BarrageItem.cacheDict[mtype] == null) {
                BarrageItem.cacheDict[mtype] = [];
            }
            var dict: BarrageItem[] = BarrageItem.cacheDict[mtype];
            var theFighter: BarrageItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new BarrageItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: BarrageItem,mtype: string = "1"): void {
            if(BarrageItem.cacheDict[mtype] == null) {
                BarrageItem.cacheDict[mtype] = [];
            }
            var dict: BarrageItem[] = BarrageItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	private bmpIcon:eui.Image;
    	private bmpGift:eui.Image;
        private bmpNum:eui.BitmapLabel;
    	private lblName:eui.Label;
    	private lblDesc:eui.Label;
    	public state:number=0;//0:弹幕在最左面 1:弹幕移动中 2:弹幕移动完毕 3:消失ing
        public pid:number=0;//管理类中的pointArr id
        public uid:number=0;
        public giftId:number=0;
        public group_medal:eui.Group;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/barrage/BarrageItemSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }
            var cirback: egret.Shape = Tools.getInstance().getCricleMask(6 + 92 / 2,4 + 92 / 2,96,this);
            this.addChildAt(cirback,1);
            var iconMask: egret.Shape = Tools.getInstance().getCricleMask(6 + 92 / 2,4 + 92 / 2,92,this);
    		this.bmpIcon.mask=iconMask;
		    this.bmpGift.x=0;
            this.bmpNum.visible = false;
		}
		public setData(obj:Object):void{
    		var self:BarrageItem=this;
    		///////赋值属性
    		this.uid=obj["uid"];
    		this.giftId=obj["id"];
            this.lblName.text = this.getStringLen(window["hexToDec"](obj["user_name"]));
            
            if(obj["guard"]) {
                if(obj["guard"]["faith_guard"] == 1) {
                    var img = new eui.Image();
                    img.source = "u_m1";
//                    console.log(img,"source");
                    img.width = 30;
                    img.height = 45 * (30 / 46);
                    this.group_medal.addChild(img);
                }
                if(obj["guard"]["angel_guard"] == 1) {
                    var img = new eui.Image();
                    img.source = "u_m2";
                    img.width = 30;
                    img.height = 48 * (30 / 73);
                    this.group_medal.addChild(img);
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("热度+8" + "<font color=0xff0000>(+1)</font>");
                }
                if(obj["guard"]["stars_guard"] == 1) {
                    var img = new eui.Image();
                    img.source = "u_m3";
                    img.width = 30;
                    img.height = 51 * (30 / 53);
                    this.group_medal.addChild(img);
                }
            } 
            this.group_medal.x = this.lblName.x + this.lblName.width + 8;
            
            if(this.giftId+""=="11"){
                this.bmpGift.source = "p1_zhuwei";    
            }else{
                this.bmpGift.source = "p_gift" + this.giftId + "";
            }
            
//            this.lblDesc.text = "送出了"+data.DataManager.getGiftName(this.giftId);
            
            
            if(obj["click"]>0){
                this.bmpNum.text = "x"+obj["click"]+"";
            }
            RES.getResByUrl(obj["user_pic"],this.onCompFun,this,RES.ResourceItem.TYPE_IMAGE);
            ///////////开始动画
    		this.x=-600;
            switch(this.state) {
                case 0:
                    self.state = 1;
                    egret.Tween.get(this.bmpGift).to({ x: 360 },250,egret.Ease.backIn);
                    egret.Tween.get(self).to({ x: 20 },200).call(function() {
                        self.state = 2;
                        self.bmpNum.visible = true;
                        self.fontEase();
                    },this).wait(2000).call(function() {
                        self.END();
                    },this);
                    
                    break;
            }
            if(this.uid==GameApp.Manager.dataManager.uid){
                flower.FlowerUI.getInstance().setLianji(obj["click"]);
            }
		}
        public getStringLen(str): string {
            var len = 0;
            var newStr = '';
            for(var i = 0;i < str.length;i++) {
                var length = str.charCodeAt(i);
                if(length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
                if(len < 13) {
                    newStr += str[i];
                } else {
                    newStr += '...';
                    return newStr;
                }
            }
            return newStr;
        }
        public resetData(obj:Object):void{
            this.bmpGift.x = 360;
            this.x=20;
            if(obj["click"] > 0) {
                this.bmpNum.text = "x" + obj["click"] + "";
            }
            if(this.uid == GameApp.Manager.dataManager.uid) {
                flower.FlowerUI.getInstance().setLianji(obj["click"]);
            }
            this.fontEase();
            var self: BarrageItem = this;
            switch(this.state) {
                case 2:
                    egret.Tween.removeTweens(this);
                    egret.Tween.get(this).wait(2000).call(function() {
                        self.END();
                    },this);
                    break;
            }
		}
		private fontEase():void{
            egret.Tween.get(this.bmpNum).to({ scaleX: 1.8,scaleY: 1.8 },80).to({ scaleX: 1,scaleY: 1 },150,egret.Ease.backOut)
		}
        private onCompFun(source: egret.Texture): void {
            console.log('source:'+source);
            this.bmpIcon.texture = source;
        }
		private END():void{
    		this.state=3;
    		egret.Tween.get(this).to({y:this.y-50,alpha:0},200).call(function(){
                this.dispatchEventWith("END",false,this);
    		},this);
		}
		public clear():void{
		    this.state=0;
            this.bmpGift.x = 0;
            this.bmpNum.visible = false;
            this.alpha=1;
            while(this.group_medal.numElements>0){
                var item = this.group_medal.getElementAt(this.group_medal.numElements - 1);
                if(item.parent){
                    item.parent.removeChild(item);
                }
            }
            this.lblDesc.text = "热度+8";
		}
	}
}
