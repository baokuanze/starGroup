module system {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupBookUI extends eui.Component{
        private static _instance: GroupBookUI;
        public static getInstance(): GroupBookUI {
            if(!this._instance) {   //每次进来new一次 避免UI上出现从上一个人的信息跳过来
                this._instance = new GroupBookUI();
            }
            return this._instance;
        }
        private scorll1:eui.Scroller;
    	private lblTitle:eui.Label;
        private lbl1: eui.Label;
        private lbl2: eui.Label;
        private lbl3: eui.Label;
        private lbl4: eui.Label;
        private lbl5: eui.Label;
        private lbl6: eui.Label;
        private lbl7: eui.Label;
        private lbl8: eui.Label;
        private lbl9: eui.Label;
        private lbl10: eui.Label;
        private lbl11: eui.Label;
        private lbl12: eui.Label;
        private btnJoin1: eui.Rect;
        private btnJoin2: eui.Rect;
        private btnBtn:eui.Image;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/system/GroupBookSkin.exml";
		}
		public childrenCreated():void{
    		this.scorll1.height=this.stage.stageHeight;
            if(Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
                this.lbl12.fontFamily = "Heiti SC";
            }
            this.lbl3.textFlow = (new egret.HtmlTextParser).parser("加官方群主QQ群：<font color=#316BE9>201758241（点击加群）</font>");
            this.lbl2.textFlow = (new egret.HtmlTextParser).parser("关注部落：<font color=#316BE9>点击访问官方部落</font>");
            this.btnJoin1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.join1_tap,this);
            this.btnJoin2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.join2_tap,this);
            this.btnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
		}
		
        private join1_tap():void{
            location.href = "http://buluo.qq.com/p/barindex.html?bid=312564";
        }
        private join2_tap(): void {
            system.GroupJoin.join("2970C88E2D2E0EDE54E8D57E14268B03");
        }
		public show():void{
		    GameApp.Manager.viewManager.BottomUIStage.addChild(this);
		}
		public close():void{
            GameApp.Manager.viewManager.BottomUIStage.removeChild(this);
            GameApp.Manager.controllerManager.taskController.show();
		}
	}
}
