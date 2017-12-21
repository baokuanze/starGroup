module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskIcon extends eui.Button{
//    	private lbl1:eui.Label;
//    	private rectBack:eui.Rect;
    	private bmp1:eui.Image;
    	private bmp2:eui.Image;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/TaskIconSkin.exml";
		}
		public childrenCreated():void{
		}
		public setText(level:number):void{
            this.bmp1.source = "t_icon" + Math.ceil(level / 9);
            this.bmp2.source = "t_fst" + data.DataManager.getGroupLevelByLevel(level);
//		    this.lbl1.text=data.DataManager.getGroupNameByLevel(level);
//		    this.rectBack.fillColor=data.DataManager.getGroupColorByLevel(level);
		}
	}
}
