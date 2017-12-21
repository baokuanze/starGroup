module monthTie {
	/**
	 *
	 * @author 
	 *
	 */
	export class MonthTie_HeatTable_Item extends eui.Component{
        private lable_rankImgNumber:eui.Label; //显示第几名；
        private img_starIcon:eui.Image;//图标
        private lable_heat:eui.Label;// 热度
        private lable_starName:eui.Label;
        
        private img_itemBgWhite:eui.Image; // 白色
        private img_itemBgGray:eui.Image;//灰色
        
    	
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/monthTie/MonthTie_HeatTable_ItemSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_rankImgNumber.fontFamily = "Heiti SC";
                this.lable_heat.fontFamily = "Heiti SC";
            }  
        }
        public setData(obj:Object,str:number): void {
            var randIcon = str%2;
            if(randIcon ==0){
                this.img_itemBgWhite.visible = false;
                this.img_itemBgGray.visible = true;
            }else{
                this.img_itemBgWhite.visible = true;
                this.img_itemBgGray.visible = false;
            }
            this.lable_rankImgNumber.text = str + "";
            this.lable_starName.text = window["hexToDec"](obj["name"]);
            this.lable_heat.text ="热度：" + window["hexToDec"](obj["month_hot"])
            RES.getResByUrl(obj["head_img"],this.load_Icon,this,RES.ResourceItem.TYPE_IMAGE);
        }
        
        public load_Icon(source: egret.Texture){
             this.img_starIcon.texture = source;
             this.img_starIcon.width = 94;
             this.img_starIcon.height =94;
        }   

	}
}
