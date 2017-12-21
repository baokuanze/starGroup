module module {
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseEuiImage extends eui.Image{
    	private anX:number=0;
    	private anY:number=0;
    	private isAnX:boolean=false;
        private url: string;
        private isLoad: boolean = false;
        private fun:Function;
        private scope:any;
        public data:Object;
		public constructor(source?:string|egret.Texture) {
    		super(source);
		}
        public loadPic(url:string,anX?:number,anY?:number,fun?:Function,scope?:any):void{
//            console.log("正常-----------------------------------");
            this.url = url;
            this.anX=anX;
            this.anY=anY;
            if(anX>0||anY>0){
                this.isAnX=true;
            }
            this.fun=fun;
            this.scope=scope;
            if(this.url){
                this.isLoad = true;
                RES.getResByUrl(this.url,this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            }
		}
        private load_end(source: egret.Texture): void {
            this.texture = source;
            if(this.fun){
//                console.log("函数存在");
                this.fun.call(this.scope);
            }
            if(this.isAnX){
                this.anchorOffsetX = source._sourceWidth * this.anX;
                this.anchorOffsetY = source._sourceHeight * this.anY;
            }
        }
	}
}
