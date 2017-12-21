module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
	export class Zfdy7 extends eui.Component {
    	
        private img_twoDog:eui.Image;
        private img_light:eui.Image;
        private bmpTextBack:eui.Image;
        private probar:eui.ProgressBar;
    	
    	private groupHead: eui.Group;
    	private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private lblText:eui.Label;
        private static zfdy7: Zfdy7;
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy7) {
                this.zfdy7 = new Zfdy7();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy7);
            this.zfdy7.setData(obj,star);
        }
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/zfdy/Zfdy7Skin.exml";
           
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_twoDog.scaleX = 0; this.img_twoDog.scaleY = 0;
            this.img_light.alpha = 0;
            this.probar.value = 0;
        }
        public setData(obj: Object,star:Object):void{
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
            egret.Tween.get(this.bmpHead2).wait(600).to({ scaleX: 1,scaleY: 1 },800);
            egret.Tween.get(this.img_twoDog).wait(0).to({ scaleX: 1,scaleY: 1 },800,egret.Ease.bounceOut);
            egret.Tween.get(this.img_light).wait(800).to({ alpha: 1 },1000);
            this.initProgressBar();
            this.addHead(obj);
            egret.Tween.get(this).wait(4000).call(this.close);

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
            var self: Zfdy7 = this;
            egret.Tween.get(this.probar).wait(1000).to({value:100 },2000).call(function() {
                egret.Tween.removeTweens(self.probar);
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
        public clear(): void {
            this.img_twoDog.scaleX = 0; this.img_twoDog.scaleY = 0;
            this.img_light.alpha = 0;
            if(this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if(this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            this.clearHead();
            this.probar.value = 0;
        }
        
        public close(): void {
            this.clear();
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
	}
}
