module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
	export class Zfdy10 extends eui.Component{
        private img_bg:eui.Image;
        private img_rabbit1:eui.Image;
        private img_rabbit2: eui.Image;
        private img_rabbit3: eui.Image;
        private group_rabit: eui.Group;
        private static zfdy10: Zfdy10;

        private bmpTextBack: eui.Image;
        private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private lblText: eui.Label;
        private groupHead: eui.Group;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/zfdy/zfBag/Zfdy10Skin.exml";
		}
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy10) {
                this.zfdy10 = new Zfdy10();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy10);
            this.zfdy10.setData(obj,star);
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.img_bg.scaleY = 0;this.img_bg.scaleX = 0; 
            this.img_bg.alpha = 0;
//            this.img_rabbit1.alpha = 0;this.img_rabbit2.alpha = 0;this.img_rabbit3.alpha = 0;
            this.img_rabbit1.scaleX = 0;this.img_rabbit1.scaleY = 0;
            this.img_rabbit2.scaleX = 0; this.img_rabbit2.scaleY = 0;
            this.img_rabbit3.scaleX = 0; this.img_rabbit3.scaleY = 0;
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
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1,scaleY: 1 },1000);
            egret.Tween.get(this.bmpHead2).wait(800).to({ scaleX: 1,scaleY: 1 },1000);
            
            egret.Tween.get(this.img_bg).wait(0).to({ scaleX: 1,scaleY: 1,alpha:1},800);
            egret.Tween.get(this.group_rabit).wait(850).to({x:51},2000,egret.Ease.sineIn);
            
            egret.Tween.get(this.img_rabbit2).wait(2880 + 200).to({ scaleX: 1,scaleY: 1},800,egret.Ease.bounceOut)
            egret.Tween.get(this.img_rabbit3).wait(2960 + 400).to({ scaleX: 1,scaleY: 1 },800,egret.Ease.bounceOut);
            egret.Tween.get(this.img_rabbit1).wait(3040 + 600).to({ scaleX: 1,scaleY: 1 },800,egret.Ease.bounceOut);
           
            egret.Tween.get(this).wait(5000).call(this.close);
            this.addHead(obj);
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
        public close(): void {
            this.clear();
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
        public clear(): void {
            this.group_rabit.x = 667;
            this.img_rabbit1.x = 152 ;this.img_rabbit1.y = 345;
            this.img_rabbit2.x = 309;this.img_rabbit2.y = 261;
            this.img_rabbit3.x = 491;this.img_rabbit3.y = 330; 
            this.img_rabbit1.scaleX = 0; this.img_rabbit1.scaleY = 0;
            this.img_rabbit2.scaleX = 0; this.img_rabbit2.scaleY = 0;
            this.img_rabbit3.scaleX = 0; this.img_rabbit3.scaleY = 0;
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
                var item: ZfdyHeadItem = <ZfdyHeadItem>this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if(item.parent)
                    item.parent.removeChild(item);
                ZfdyHeadItem.reclaim(item);
            }
        }
	}
}
