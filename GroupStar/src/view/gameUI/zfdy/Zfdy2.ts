module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
    export class Zfdy2 extends eui.Component {
        private bmpTextBack: eui.Image;
        private bmpIcon1: eui.Image;
        private groupText: eui.Group;
        private lblText: eui.Label;
        private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private bmpl1:eui.Image;
        private bmpl2:eui.Image;
        private bmpl3: eui.Image;
        private bmpt1: eui.Image;
        private bmpr1: eui.Image;
        private bmpr2: eui.Image;
        private bmpr3: eui.Image;
        private groupHead: eui.Group;
        private arr:Array<eui.Image>=[];
        private point:Array<Object>=[
            { bx: 275,by: 295,ex: 89,ey: 189 },
            { bx: 283,by: 372,ex: 97,ey: 318 },
            { bx: 284,by: 466,ex: 88,ey: 440 },
            { bx: 394,by: 289,ex: 532,ey: 146 },
            { bx: 493,by: 282,ex: 666,ey: 243 },
            { bx: 522,by: 362,ex: 697,ey: 356 },
            { bx: 459,by: 470,ex: 630,ey: 510 },
        ];
        private static zfdy2: Zfdy2;
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy2) {
                this.zfdy2 = new Zfdy2();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy2);
            this.zfdy2.setData(obj,star);
       
        }
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/zfdy/Zfdy2Skin.exml";
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.arr.push(this.bmpl1,this.bmpl2,this.bmpl3,this.bmpt1,this.bmpr1,this.bmpr2,this.bmpr3);
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
            egret.Tween.get(this.bmpHead1).wait(0).to({ scaleX: 1,scaleY: 1 },600);
            egret.Tween.get(this.bmpHead2).wait(400).to({ scaleX: 1,scaleY: 1 },600);
            egret.Tween.get(this.bmpIcon1).wait(0).to({ scaleX: 1,scaleY: 1 },1200,egret.Ease.bounceOut);
  
            for(var i: number = 0;i < this.arr.length;i++) {
                var xin:eui.Image=this.arr[i];
                egret.Tween.get(xin).wait(800).to({ visible: true },0).to({ x: this.point[i]["ex"] },400,egret.Ease.sineOut).to({ visible: false },0);
                egret.Tween.get(xin).wait(800).to({ visible: true },0).to({ y: this.point[i]["ey"] },400,egret.Ease.sineOut).to({visible:false},0);
                egret.Tween.get(xin).wait(950).to({alpha:0.1},250);
            }
            egret.Tween.get(this).wait(2200).call(this.close);
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
            for(var i:number=0;i<this.arr.length;i++){
                this.arr[i].visible=false;
                this.arr[i].alpha=1;
                this.arr[i].x=this.point[i]["bx"];
                this.arr[i].y = this.point[i]["by"];
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

