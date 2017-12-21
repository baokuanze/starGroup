module view.loader {
    /**
     *
     * @author 
     *
     */
    export class MainLoading extends eui.Component {
//        private progress: egret.gui.ProgressBar;
//        private lblDesc: egret.gui.Label;
//        private bmpG: egret.gui.UIAsset;
        private lblText: eui.Label;
        public constructor() {
            super();
            this.skinName = "src/view/loader/MainLoadingSkin.exml"; //ztc.view.loader.mainLoadingSkin; 
        }
        
        public childrenCreated(): void
        {
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
//            this.bmpG.anchorX = 0.5;
//            this.bmpG.anchorY = 0.5;
        }
        public error(str:string):void{
            this.lblText.text=""+str;
        }
        public setProgress(current,total): void {
//            if(this.progress)
//            this.progress.value = (current / total) * 100;
//            if(this.bmpG) {
//                this.bmpG.x = (current / total) * 444;
//            }
//            if(this.lblText)
            this.lblText.text=""+parseInt(current/total*100+"")+"%"
        }
        public setLoadingName(str:string): void { 
//            this.lblDesc.text = str;
            
        }
        public resetProgress(): void
        { 
//            if(this.progress)
//            this.progress.value = 0;
//            if(this.bmpG)
//                this.bmpG.x = 0;
        }
        public start(): void { 
//            this.setTx();
        }
        public clear():void{
            
        }
        public end(): void { 
//            egret.Tween.removeTweens(this.bmpG);
        }
        private setTx(): void { 
//            egret.Tween.get(this.bmpG,{ loop: true }).to({ rotation: 360 },500);
        }
    }
}