module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
	export class AwardPerson extends eui.Component{
        private img_icon:eui.Image;
        private lb_name:eui.Label;
        private lb_userId:eui.Label;
		public constructor() {
    		super();
            this.skinName = 'src/view/gameUI/buyTicketActive/AwardPersonSkin.exml';
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lb_name.fontFamily = "Heiti SC";
                this.lb_userId.fontFamily = "Heiti SC";
            }
        }
        public setData(data){
            this.lb_name.text = window["hexToDec"](data['user_name']);
            this.lb_userId.text = "ID:"+ data['user_id'];
            RES.getResByUrl(data["user_pic"],this.load_end0,this,RES.ResourceItem.TYPE_IMAGE);
        }
        
        public load_end0(source: egret.Texture){
            this.img_icon.texture = source
        }
	}
}
