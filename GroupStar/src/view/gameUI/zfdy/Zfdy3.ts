module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
    export class Zfdy3 extends eui.Component {
        private bmpTextBack: eui.Image;
        private bmpIcon1: eui.Image;
        private groupText: eui.Group;
        private lblText: eui.Label;
        private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private arr: Array<eui.Image> = [];
        private bmp1:eui.Image;
        private bmp2: eui.Image;
        private bmp3: eui.Image;
        private bmp4: eui.Image;
        private bmp5: eui.Image;
        private bmp6: eui.Image;
        private bmp7: eui.Image;
        private bmp8: eui.Image;
        private bmp9: eui.Image;
        private bmp10: eui.Image;
        private groupHead: eui.Group;
        private static zfdy3: Zfdy3;
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy3) {
                this.zfdy3 = new Zfdy3();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy3);
            this.zfdy3.setData(obj,star);

        }
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/zfdy/Zfdy3Skin.exml";
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.arr.push(this.bmp1,this.bmp2,this.bmp3,this.bmp4,this.bmp5,this.bmp6,this.bmp7,this.bmp8,this.bmp9,this.bmp10);
            for(var i: number = 0;i < this.arr.length;i++) {
                var xin: eui.Image = this.arr[i];
//                xin.scaleX=xin.scaleY=0;
                xin.alpha=0;
            }
        }
        public setData(obj: Object,star: Object): void {
//            console.log("obj:",obj);
//            console.log("star:",star);
            this.bmpHead1 = new ZfHeadItem();
            this.bmpHead2 = new ZfHeadItem();
            this.bmpHead1.x = 232; this.bmpHead1.y = 510;
            this.bmpHead2.x = 518; this.bmpHead2.y = 510;
            this.bmpIcon1.scaleX = 0; this.bmpIcon1.scaleY = 0;
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
            egret.Tween.get(this.bmpIcon1).wait(0).to({ scaleX: 1,scaleY: 1 },800,egret.Ease.bounceOut);
            for(var i: number = 0;i < this.arr.length;i++) {
                var xin: eui.Image = this.arr[i];
                egret.Tween.get(xin).wait(800 + i * 180).to({ visible: true },0).to({ alpha:1 },250);
            }
            egret.Tween.get(this).wait(3200).call(this.close);
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
        private clearHead(): void {
            while(this.groupHead.numElements > 0) {
                var item: ZfdyHeadItem = <ZfdyHeadItem>this.groupHead.getElementAt(this.groupHead.numElements - 1);
                if(item.parent)
                    item.parent.removeChild(item);
                ZfdyHeadItem.reclaim(item);
            }
        }
        public clear(): void {
            if(this.bmpHead1.parent) {
                this.bmpHead1.parent.removeChild(this.bmpHead1);
                this.bmpHead1 = null;
            }
            if(this.bmpHead2.parent) {
                this.bmpHead2.parent.removeChild(this.bmpHead2);
                this.bmpHead2 = null;
            }
            for(var i: number = 0;i < this.arr.length;i++) {
                var xin: eui.Image = this.arr[i];
//                xin.scaleX = xin.scaleY = 0;
                xin.visible=false;
                xin.alpha=0;
            }
            this.clearHead();
        }
        public close(): void {
            this.clear();
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}
