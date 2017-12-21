module Publish {
	/**
	 *
	 * @author 
	 *
	 */
	export class NewPublish extends eui.Component {
        private lb1:eui.Label;
        private lb2:eui.Label;
        private lb3:eui.Label;
        private scro:eui.Scroller;
        private btn_close:eui.Rect;
        private groupData:eui.Group;
        private Part1:Publish.Part1;
        private img_close:eui.Image;
		public constructor() {
    		super();
            this.skinName = 'src/view/gameUI/system/Publish/NewPublishSkin.exml';
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
            }
            this.Part1 = new Publish.Part1();
            this.Part1.x = 0;this.Part1.y = 0;
            this.groupData.addChild(this.Part1);
            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                var self: NewPublish = this;
                if(self.parent) {
                    self.parent.removeChild(self);
                }
            },this)
            
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var self:NewPublish = this;
                    if(self.parent){
                        self.parent.removeChild(self);
                    }
                },this)
        }
        public setData() {
            
        }
	}
}
