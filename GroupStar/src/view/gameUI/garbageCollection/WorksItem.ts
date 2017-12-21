module garbageCollection {
	/**
	 *
	 * @author 
	 *
	 */
	export class WorksItem  extends eui.Component {
        public rect_bg:eui.Rect;
        public lable_titleName:eui.Label;
        private colorArr: Array<number> = [0x565865,0x37565,0x87c49b,0x199be6,0xf58ebd,0xf76864,0xf5b316];

		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/garbageCollection/WorksItemSkin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_titleName.fontFamily = "Heiti SC";
            }
        }
        
        public setData(name:string,index:number):void{
            this.lable_titleName.text =  name;
            this.lable_titleName.textColor = this.colorArr[index];
            
            if(Tools.getInstance().isIphone() && (!window["isChina"](name))){
                var length = name.length;
                var width1 = this.lable_titleName.width
                var width = width1 + length * 2.5
                this.rect_bg.width = width;
            }else{
                var width = this.lable_titleName.width;
                this.rect_bg.width = width + 25; 
            }
          
            this.rect_bg.strokeColor = this.colorArr[index];
        }
       public clear():void{
       }
	}
}
