module zfBag {
	/**
	 *
	 * @author 
	 *
	 */
	export class Zfdy12 extends eui.Component{
        private static zfdy12: Zfdy12;
        private lblText:eui.Label;
        private bmpTextBack:eui.Image;
        private groupHead:eui.Group;    
        private bmpHead1: zfdy.ZfHeadItem;
        private bmpHead2: zfdy.ZfHeadItem;
        private img_bg:eui.Image;
        private img_bottom:eui.Image;
        private img_sunlight:eui.Image;
        private img_snow1:eui.Image;
        private img_snow2: eui.Image;
        private img_snow3: eui.Image;
        
		public constructor() {
    		super();
            this.skinName ='src/view/gameUI/zfdy/zfBag/Zfdy12Skin.exml';
		}
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy12) {
                this.zfdy12 = new Zfdy12();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy12);
            this.zfdy12.setData(obj,star);
        }

        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_bg.alpha = 0;
            this.img_bottom.alpha = 0;
            this.img_snow1.alpha = 0;
            this.img_snow2.alpha = 0;
            this.img_snow3.alpha = 0;
        }
        
        public setData(obj,star){
            this.bmpHead1 = new zfdy.ZfHeadItem();
            this.bmpHead2 = new zfdy.ZfHeadItem();
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
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1,scaleY: 1 },1000);
            egret.Tween.get(this.bmpHead2).wait(800).to({ scaleX: 1,scaleY: 1 },1000);
            egret.Tween.get(this.img_bg).wait(0).to({alpha:1},1000);
            egret.Tween.get(this.img_bottom).wait(0).to({alpha:1},1000);
            egret.Tween.get(this).wait(1500).to({factor:90}).to({factor:160},5000);
            egret.Tween.get(this.img_snow1).wait(1200).to({ alpha: 1 },300).to({ y: 487 },4000).to({ alpha: 0 },100);
            egret.Tween.get(this.img_snow2).wait(1500).to({ alpha: 1 },300).to({ y: 518 },4000).to({alpha:0},100);
            egret.Tween.get(this.img_snow3).wait(1800).to({ alpha: 1 },300).to({ y: 504 },4000).to({ alpha: 0 },100);
            this.addHead(obj);
            egret.Tween.get(this).wait(7000).call(this.close);
        }
        public get factor():number {
            return 0;
        }
        
        public set factor(value: number) {
            this.img_sunlight.x = 355 + 200*Math.sin(value*(Math.PI/180));
            this.img_sunlight.y = 519 + 200*Math.cos(value*(Math.PI/180));
        }
        
        
        
        public close(): void {
            this.img_snow1.y = 171; this.img_snow1.x = 392;
            this.img_snow2.y = 235; this.img_snow2.x = 161;
            this.img_snow3.y = 88; this.img_snow3.x = 269;
            this.img_sunlight.x = 556;this.img_sunlight.y = 519;
            this.img_bg.alpha = 0;
            this.img_bottom.alpha = 0;
            this.img_snow1.alpha = 0;
            this.img_snow2.alpha = 0;
            this.img_snow3.alpha = 0;
            this.clear();
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
        
        private addHead(obj: Object): void {
            var arr: Array<Object> = obj["top_user"];
            for(var i: number = 0;i < arr.length;i++) {
                var item: zfdy.ZfdyHeadItem = zfdy.ZfdyHeadItem.produce();
                item.bid = obj["bid"];
                item.group_openid = obj["group_openid"];
                this.groupHead.addChild(item);
                item.setData(arr[i],i + 1);
            }
        }
        
        private clear(){
            if(this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if(this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.clearHead();
        }
        
        private clearHead(): void {
            while(this.groupHead.numElements > 0) {
                var item: zfdy.ZfdyHeadItem = <zfdy.ZfdyHeadItem>this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if(item.parent)
                    item.parent.removeChild(item);
                zfdy.ZfdyHeadItem.reclaim(item);
            }
        }
	}
}
