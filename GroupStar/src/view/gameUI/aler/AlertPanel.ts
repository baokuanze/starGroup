module aler {
	/**
	 *
	 * @author 
	 *
	 */
	export class AlertPanel extends eui.Component{
        private static _instance: AlertPanel;
        public static getInstance(): AlertPanel {
            if(!this._instance) {
                this._instance = new AlertPanel();
            }
            return this._instance;
        }
        private lblTitle:eui.Label;
        private lblDesc:eui.Label;
        private lbl1:eui.Label;
        private lbl2:eui.Label;
        private btn1:eui.Rect;
        private btn2:eui.Rect;
//        private firstButton: eui.Button;
//        private secondButton:eui.Button;
//        private closeButton: eui.Button;
//        private contentDisplay: eui.Label;
//        private titleDisplay: eui.Label;
        private callBack:Function;
        private scope: any;
         /**
         * 确定取消弹窗
         */ 
		public constructor() {
            super(  );
            this.skinName = "src/view/gameUI/aler/alertPanelSkin.exml";
		}
        public childrenCreated(): void
        {
            if(Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
            }
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn1_tap,this);
            this.btn2.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn2_tap, this );
            this.y = (this.stage.stageHeight - this.height) / 2;
            this.x =(this.stage.stageWidth-this.width)/2;
        }
        public show(title?: string,desc?: string,str1?: string,str2?: string,closeHander?: Function,scope?: any): void
        {
            GameApp.Manager.viewManager.maskStage(.4);
            GameApp.Manager.viewManager.TopUIStage.addChild( this );
            this.callBack = closeHander;
            this.scope = scope;
            this.lblTitle.text = title ? title : "温馨提示";
            this.lblDesc.text = desc ? desc : "";
            this.lbl1.text = str1 ? str1 : "取消";
            this.lbl2.text = str2 ? str2 : "确认";
        }
        private btn1_tap():void{
            this.close();
            if(this.callBack) { 
                if(this.scope) {
                    this.callBack.call(this.scope,"fail");
                } else {
                    this.callBack.call(this,"fail");
                }
            }
        }
        private btn2_tap(): void
        {
            this.close();
            if(this.callBack) {
                if(this.scope) {
                    this.callBack.call(this.scope,"ok");
                } else {
                    this.callBack.call(this,"ok");
                }
            }
        }
        private close():void{
            GameApp.Manager.viewManager.clearMask();
            if(this.parent) {
                this.parent.removeChild(this);
            }
        }
        private clear(): void
        { 
        }
	}
}
