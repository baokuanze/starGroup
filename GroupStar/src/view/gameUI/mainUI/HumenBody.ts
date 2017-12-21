module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
	export class HumenBody extends eui.Group{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): HumenBody {
            if(HumenBody.cacheDict[mtype] == null) {
                HumenBody.cacheDict[mtype] = [];
            }
            var dict: HumenBody[] = HumenBody.cacheDict[mtype];
            var theFighter: HumenBody;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new HumenBody();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: HumenBody,mtype: string = "1"): void {
            if(HumenBody.cacheDict[mtype] == null) {
                HumenBody.cacheDict[mtype] = [];
            }
            var dict: HumenBody[] = HumenBody.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	public uid:number=0;
        public url: string;
        private isLoad: boolean = false;
        private humen: eui.Image;
        public level: number = 0;
        public star_index: number = 0;
        private _sc: number = 1;
		public constructor() {
            super();
            this.humen = new eui.Image();
            this.addChild(this.humen);
            this.touchEnabled = true;
            this.scaleX=this.scaleY=GameApp.sc;
//            var sp:egret.Shape=Tools.getInstance().getCricleMask(-2,-2,5,this);
//            this.anchorX = .5; this.anchorY = 1;
		}
		public setScale(sc:number):void{
            this._sc = sc;
		}
		public set sc(sc:number){
            this._sc = sc;
            this.humen.scaleX = sc;
            this.humen.scaleY = sc;
		}
		public get sc():number{
            return this._sc;
		}
		public setData(url:string,level:number):void{
            this.setImg(url);
            this.level = level;
		}
		public resetData(obj:Object):void{
            this.isLoad = true;
            this.url = obj["path"];
            this.uid=obj["id"];
		}
        private setImg(url:string):void{
            if(this.url != url)
                this.isLoad = true;
            this.url = url;
        }
        public load(): void {
            if(this.isLoad) {
                this.isLoad = false;
                RES.getResByUrl(this.url,this.load_end,this);
            }
        }
        private load_end(source: egret.Texture): void { 
            this.humen.source = source;
            this.humen.anchorOffsetX = source._sourceWidth * .5;
            this.humen.anchorOffsetY = source._sourceHeight * 1;
            this.y = source._sourceHeight;
//            GameApp.Manager.viewManager.gameMainManager.humenUI.anchorOffsetY = source._sourceHeight * 1;
        }
        private clear():void{
            this.humen.source=null;
            this.isLoad=true;
            this.url="";
            this._sc=0;
        }
	}
}
