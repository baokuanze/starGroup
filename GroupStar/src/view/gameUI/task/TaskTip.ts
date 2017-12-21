module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskTip extends eui.Component{
    	private lbl1:eui.Label;
    	private lbl2:eui.Label;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/TaskTipSkin.exml";
		}
		public show(num:number=10):void{
    		this.alpha=1;
    		this.lbl2.text="钻石"+num;
		    egret.Tween.get(this).wait(1500).to({alpha:0},500).call(this.close);    
		}
		private close():void{
		    if(this.parent){
		        this.parent.removeChild(this);
		    }
		}
	}
}
