module controller.loader {
	/**
	 *
	 * @author 
	 *
	 */
	export class LoadStar {
        public reload: boolean = true;
        private loadNum: number = 0;
        private loadTotal: number = 2;
        private starurl: string;
        private nexturl: string;
        private fun: Function;
        private scope: any;
        private static _intance: LoadStar;
        public static RES: Object = {
            "star": {
                "starimg": egret.Texture,
                "nextimg":egret.Texture
            }
        };
		public constructor() {
    		
		}
        public static getInstance(): LoadStar {
            if(!this._intance){
                this._intance = new LoadStar();
            }
            return this._intance;
        }
        public load(starurl:string,nexturl:string,fun:Function,scope:any):void{
            this.starurl = starurl;
            this.nexturl = nexturl;
            this.fun = fun;
            this.scope = scope;
            this.startLoad();
		}
        public getImg(starurl: string,nexturl: string,ui:eui.Image):void{
            if(this.starurl != starurl && starurl){
                this.starurl = starurl;
                this.nexturl = nexturl;
                RES.getResByUrl(this.starurl,function(source: egret.Texture) {
                    ui.source = source;
                    controller.loader.LoadStar.RES["star"]["starimg"] = source;
                    RES.getResByUrl(starurl,this.onCompFun1,this);
                },this);
            }else{
                if(!ui.source){
                    ui.source = controller.loader.LoadStar.RES["star"]["starimg"];
                }
            }
        }
        public getNext(starurl:string,nexturl: string,ui:eui.Image):void{
            if(this.starurl != starurl && starurl) {
                this.starurl = starurl;
                this.nexturl = nexturl;
                RES.getResByUrl(this.nexturl,function(source: egret.Texture) {
                    ui.source = source;
                    controller.loader.LoadStar.RES["star"]["nextimg"] = source;
                    RES.getResByUrl(starurl,this.onCompFun2,this);
                },this);
            } else {
                if(!ui.source) {
                    ui.source = controller.loader.LoadStar.RES["star"]["nextimg"];
                }
            }
        }
		private startLoad():void{
//            GameApp.Manager.viewManager.createLoadingImg();
            RES.getResByUrl(this.starurl,this.onCompFun,this);
		}
        private onCompFun(source: egret.Texture): void {
            controller.loader.LoadStar.RES["star"]["starimg"] = source;
            RES.getResByUrl(this.nexturl,this.onCompFun1,this);
            this.fun.call(this.scope,source);
        }
        private onCompFun1(source: egret.Texture): void {
            controller.loader.LoadStar.RES["star"]["nextimg"] = source;
//            GameApp.Manager.viewManager.removeLoadingimg();
            this.reload = false;
        }
        private onCompFun2(source: egret.Texture): void {
            controller.loader.LoadStar.RES["star"]["starimg"] = source;
        }
	}
}
