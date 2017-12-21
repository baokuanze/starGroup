module monthTie {
	/**
	 *
	 * @author 
	 *
	 */
	export class MonthTie_FansTable_Item extends eui.Component{
        private lable_fansNumber:eui.Label;
        private img_starIcon:eui.Image;
        private lable_fansClubName:eui.Label;
        private lable_fansName:eui.Label;
        
        private img_grayBg:eui.Image; //灰色背景
        private img_whiteBg:eui.Image;  //白色背景
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/monthTie/MonthTie_FansTable_ItemSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_fansNumber.fontFamily = "Heiti SC";
                this.lable_fansClubName.fontFamily = "Heiti SC";
                this.lable_fansName.fontFamily = "Heiti SC";
            }
        }
        public setData(obj: Object,str: number): void {
            var randIcon = str % 2;
            if(randIcon == 0) {
                this.img_whiteBg.visible = false;
                this.img_grayBg.visible = true;
            } else {
                this.img_whiteBg.visible = true;
                this.img_grayBg.visible = false;
            }
            
            this.lable_fansNumber.text = str + "";
            this.lable_fansClubName.text = window["hexToDec"](obj["group_name"]);
            this.lable_fansName.text = window["hexToDec"](obj["star_name"]);
            RES.getResByUrl(obj["group_face"],this.load_Icon,this,RES.ResourceItem.TYPE_IMAGE);
        }
        
        public load_Icon(source:egret.Texture):void{
            this.img_starIcon.texture = source;
            this.img_starIcon.width = 72;
            this.img_starIcon.height = 72;
            
        }
	}
}
