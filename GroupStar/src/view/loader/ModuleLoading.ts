module view.loader {
	/**
	 *
	 * @author 
	 *
	 */
	export class ModuleLoading extends eui.Component{
        private bmpIcon:eui.Rect;
		public constructor() {
    		super();
            this.skinName = "src/view/loader/ModuleLoadingSkin.exml"
		}
		public show():void{
//		    egret.Tween.get(this.bmpIcon,{loop:true}).to({rotation:360},1000);
		}
		public clear():void{
//		    egret.Tween.removeTweens(this.bmpIcon);
		}
	}
}
