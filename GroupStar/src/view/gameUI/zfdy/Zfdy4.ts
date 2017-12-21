module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
    export class Zfdy4 extends eui.Component {
        private bmpTextBack: eui.Image;
        private bmpIcon1: eui.Image;
        private groupText: eui.Group;
        private lblText: eui.Label;
        private bmpHead1: ZfHeadItem;
        private bmpHead2: ZfHeadItem;
        private bmpXing1: eui.Image;
        private bmpXing2: eui.Image;
        private bmpXing3: eui.Image;
        private bmpTx:eui.Image;
        private groupHead: eui.Group;
        private static zfdy4: Zfdy4;
        public static open(obj: Object,star: Object): void {
            if(!this.zfdy4) {
                this.zfdy4 = new Zfdy4();
            }
            GameApp.Manager.viewManager.TopUIStage.addChild(this.zfdy4);
            this.zfdy4.setData(obj,star);

        }
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/zfdy/Zfdy4Skin.exml";
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
            this.bmpXing1.scaleX=this.bmpXing1.scaleY=0;
            this.bmpXing2.scaleX = this.bmpXing2.scaleY = 0;
            this.bmpXing3.scaleX = this.bmpXing3.scaleY = 0;
            this.bmpTx.visible = false;
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
            egret.Tween.get(this.bmpXing1).to({ scaleX: 1,scaleY: 1 },300,egret.Ease.bounceOut);
            egret.Tween.get(this.bmpXing2).wait(150).to({ scaleX: 1,scaleY: 1 },300,egret.Ease.bounceOut);
            egret.Tween.get(this.bmpXing3).wait(300).to({ scaleX: 1,scaleY: 1 },300,egret.Ease.bounceOut);
            egret.Tween.get(this.bmpHead1).wait(600).to({ scaleX: 1,scaleY: 1 },600);
            egret.Tween.get(this.bmpHead2).wait(1000).to({ scaleX: 1,scaleY: 1 },600);
            egret.Tween.get(this.bmpIcon1).wait(600).to({ scaleX: 1,scaleY: 1 },1200,egret.Ease.bounceOut);
            
            egret.Tween.get(this).wait(3200).call(this.close);
            
            egret.Ticker.getInstance().register(this.tx,this);
            this.nmaxtime=1800;
            this.bmpTx.source ="zfdy_4_tx1";
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
        private ntime:number=0;
        private nmaxtime:number=100;
        private nIndex:number=0;
        private tx(ct:number):void{
            this.ntime+=ct;
            if(this.ntime >= this.nmaxtime){
                if(this.nIndex == 7) {
                    this.ntime = 0;
                    this.nIndex=0;
                    egret.Ticker.getInstance().unregister(this.tx,this);
                    this.bmpTx.visible = false;
                }else{
                    this.ntime=0;
                    this.nIndex++;
                    this.bmpTx.visible=true;
                    this.bmpTx.source ="zfdy_4_tx"+this.nIndex;
                    this.nmaxtime=100;
                    console.log(this.nIndex);
                }
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
            this.bmpXing1.scaleX = this.bmpXing1.scaleY = 0;
            this.bmpXing2.scaleX = this.bmpXing2.scaleY = 0;
            this.bmpXing3.scaleX = this.bmpXing3.scaleY = 0;
            this.bmpTx.source=null;
            this.ntime=0;this.nIndex=0;this.bmpTx.visible=false;
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

