module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
    export class Zfdy5 extends eui.Component {
        private bmpTextBack: eui.Image;
        private bmpIcon1: eui.Image;
        private bmpIcon2: eui.Image;
        private bmpIcon3: eui.Image;
        private lblText: eui.Label;
        private groupHead: eui.Group;
        private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private img1:eui.Image;
        private img2: eui.Image;
        private img3: eui.Image;
        private img4: eui.Image;
        private img5: eui.Image;
        private img6: eui.Image;
        private img7: eui.Image;
        private img8: eui.Image;
        private imgarr:Array<eui.Image>=[];
        private static zfdy5: Zfdy5;
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy5) {
                this.zfdy5 = new Zfdy5();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy5);
            this.zfdy5.setData(obj,star);

        }
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/zfdy/Zfdy5Skin.exml";
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.bmpIcon2.alpha = 0;
            this.bmpIcon3.alpha = 0;
            this.imgarr=[this.img1,this.img2,this.img3,this.img4,this.img5,this.img6,this.img7,this.img8];
            for(var i in this.imgarr){
                var bmp:eui.Image=this.imgarr[i];
                bmp.scaleX=bmp.scaleY=0;
            }
        }
        public setData(obj: Object,star: Object): void {
            //    		console.log("obj:",obj);
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
            egret.Tween.get(this.bmpIcon2).wait(800).to({ alpha: 1},400);
            egret.Tween.get(this.bmpIcon3).wait(800).to({ alpha: 1 },400);
            var n:number=1000;
            for(var i:number=this.imgarr.length-1;i>=0;i--){
                var index:number=parseInt(Tools.getInstance().getRandomByNum(0,this.imgarr.length)+"");
                var sx: number = Tools.getInstance().getRandomByNum(.5,1)
                var bmp:eui.Image=this.imgarr[index];
                console.log(bmp+" "+index);
                egret.Tween.get(bmp).wait(n).to({ scaleX: sx,scaleY: sx },300,egret.Ease.bounceOut);
                this.imgarr.splice(index,1);
                n+=200;
            }
            egret.Tween.get(this).wait(2800).call(this.close);
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
            this.imgarr = [this.img1,this.img2,this.img3,this.img4,this.img5,this.img6,this.img7,this.img8];
            for(var i in this.imgarr) {
                var bmp: eui.Image = this.imgarr[i];
                bmp.scaleX = bmp.scaleY = 0;
            }
            this.bmpIcon2.alpha = 0;
            this.bmpIcon3.alpha = 0;
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
