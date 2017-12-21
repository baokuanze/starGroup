module monthTie {
	/**
	 *
	 * @author 
	 *
	 */
	export class MonthTie_StarTable_Item extends eui.Component{
        private lable_starNumber:eui.Label;
        private img_starIcon:eui.Image;
        private lable_starName:eui.Label;
        private lable_ClubName:eui.Label;
        
        private img_whiteBg:eui.Image; //背景图片白色
        private img_grayBg:eui.Image;//灰色背景
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/monthTie/MonthIie_StarTable_ItemSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_starNumber.fontFamily = "Heiti SC";
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_ClubName.fontFamily = "Heiti SC";
            }
        }
        public setData(obj: Object,str:number): void {
            var randIcon = str % 2;
            if(randIcon == 0) {
                this.img_whiteBg.visible = false;
                this.img_grayBg.visible = true;
            } else {
                this.img_whiteBg.visible = true;
                this.img_grayBg.visible = false;
            }

            this.lable_starNumber.text = str + "";
            this.lable_starName.text = window["hexToDec"](obj["user_name"]);
            this.lable_ClubName.text = window["hexToDec"](obj["group_name"]);;
            RES.getResByUrl(obj["user_pic"],this.load_Icon,this,RES.ResourceItem.TYPE_IMAGE);
        }
        public load_Icon(source:egret.Texture):void{
            this.img_starIcon.texture = source;
            this.img_starIcon.width = 77;
            this.img_starIcon.height = 77;
        }
	}
}
