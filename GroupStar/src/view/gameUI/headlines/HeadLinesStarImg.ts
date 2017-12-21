module headLines {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeadLinesStarImg extends eui.Component{
        public img_pic:eui.Image;
		public constructor() {
    		super()
            this.skinName = "src/view/gameUI/headlines/HeadLinesStarImgSkin.exml";
		}
		public setData(str:string){
            RES.getResByUrl(str,this.setImg,this);
		}
		
        public setImg(source:egret.Texture):void{
            var wid = source["textureWidth"];
            var hig = source["textureHeight"];
            var bit = 698/wid;
            this.img_pic.width = 698;
            this.img_pic.height = hig * bit;
            this.img_pic.texture = source;
        }
	}
}
