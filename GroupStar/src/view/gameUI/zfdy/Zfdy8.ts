module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
	export class Zfdy8 extends eui.Component{
        private img_bg8:eui.Image;
        private img_leftWineGlass:eui.Image;
        private img_rightWineGlass:eui.Image;
        private img_star:eui.Image;
        private img_star1:eui.Image;
        private img_star2:eui.Image;
        private static zfdy8: Zfdy8;
        
        private bmpTextBack:eui.Image;
        private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private lblText:eui.Label;
        private groupHead:eui.Group;
        private pro:eui.ProgressBar
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy8) {
                this.zfdy8 = new Zfdy8();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy8);
            this.zfdy8.setData(obj,star);
        }
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/zfdy/Zfdy8Skin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_bg8.scaleX = 0; this.img_bg8.scaleY = 0;
            this.img_star.scaleY = 0; this.img_star.scaleX = 0;
            this.img_star1.scaleY = 0; this.img_star1.scaleX = 0;
            this.img_star2.scaleY = 0; this.img_star2.scaleX = 0;
        }
		
        public setData(obj: Object,star: Object):void{
            this.bmpHead1 = new ZfHeadItem();
            this.bmpHead2 = new ZfHeadItem();
            this.bmpHead1.x = 232; this.bmpHead1.y = 510;
            this.bmpHead2.x = 518; this.bmpHead2.y = 510;
            this.lblText.textFlow = (new egret.HtmlTextParser).parser("<font color=#ffe533>" + window["hexToDec"](obj["group_name"]) + "</font>送给" + GameApp.Manager.dataManager.star_name + "<font color=#ffe533>" + window["hexToDec"](obj["name"]) + "</font>");
            this.bmpHead1.setData("zfdy_5",obj["group_face"]);
            this.bmpHead1.setQunIcon();
            this.bmpHead2.setData("zfdy_6",star["head_img"]);
            this.addChild(this.bmpHead1);
            this.addChild(this.bmpHead2);
            this.bmpHead1.scaleX = this.bmpHead1.scaleY = 0;
            this.bmpHead2.scaleX = this.bmpHead2.scaleY = 0;
            this.bmpTextBack.width = this.lblText.textWidth + 163;
            
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1,scaleY: 1 },800);
            egret.Tween.get(this.bmpHead2).wait(600).to({ scaleX:1,scaleY: 1 },800);
            egret.Tween.get(this.img_bg8).wait(0).to({ scaleX: 1,scaleY: 1 },800,egret.Ease.bounceOut);
            egret.Tween.get(this.img_leftWineGlass).wait(800).to({ x: 185 },1000);
            egret.Tween.get(this.img_rightWineGlass).wait(800).to({ x: 350},1000);
            egret.Tween.get(this.img_star).wait(1800).to({scaleX: 1,scaleY: 1},1000);
            egret.Tween.get(this.img_star1).wait(2000).to({ scaleX: 1,scaleY: 1 },1000);
            egret.Tween.get(this.img_star2).wait(3000).to({ scaleX: 1,scaleY: 1 },1000);
            egret.Tween.get(this).wait(5000).call(this.close);
            this.addHead(obj);
            this.initProgressBar();
		}
		
        private addHead(obj: Object): void {
            var arr: Array<Object> = obj["top_user"];
            for(var i: number = 0;i < arr.length;i++) {
                var item: ZfdyHeadItem = ZfdyHeadItem.produce();
                item.bid = obj["bid"];
                item.group_openid = obj["group_openid"];
                this.groupHead.addChild(item);
                item.setData(arr[i],i + 1);
            }
        }
		
        public initProgressBar(): void {
            var self: Zfdy8 = this;
            egret.Tween.get(this.pro).wait(1000).to({ value: 100 },2000).call(function() {
                egret.Tween.removeTweens(self.pro);
            });
        }
        
        private clearHead(): void {
            while(this.groupHead.numElements > 0) {
                var item: ZfdyHeadItem = <ZfdyHeadItem>this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if(item.parent)
                    item.parent.removeChild(item);
                ZfdyHeadItem.reclaim(item);
            }
        }
		
        public close():void{
            this.clear();
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
        public clear():void{
            this.img_bg8.scaleX = 0; this.img_bg8.scaleY = 0;
            this.img_leftWineGlass.x = -268; this.img_rightWineGlass.x = 803;
            this.img_star.scaleX = 0;this.img_star.scaleY = 0
            this.img_star1.scaleX = 0; this.img_star1.scaleY = 0
            this.img_star2.scaleX = 0; this.img_star2.scaleY = 0
            if(this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if(this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.clearHead();
            this.pro.value = 0;
        }
	}
}
