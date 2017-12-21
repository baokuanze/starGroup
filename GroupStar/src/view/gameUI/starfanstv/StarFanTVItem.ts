module starfanstv {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarFanTVItem extends eui.Component{
    	private video:egret.Video;
    	private btnPlay:eui.Image;
    	private btnFS:eui.Image;
    	private lblTime:eui.Label;
    	private lblTitle:eui.Label;
    	private bmpBack:eui.Image;
    	private obj:Object;
    	public TVid:string="";
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/starfanstv/StarFansTVItemSkin.exml";
            
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblTime.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
            }
		}
		private createVideo():void{
            this.video = new egret.Video();
            this.video.x = 0;
            this.video.y = 0;
            this.video.width = 750;
            this.video.height = 300;
            this.video.fullscreen = false;
//            this.video.poster =  this.obj["front_cover"];
            this.addChildAt(this.video,0);
            this.video.load(this.obj["video"]);
            //监听视频加载完成
            this.video.once(egret.Event.COMPLETE,this.onLoad,this);
            //监听视频加载失败
            this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
		}
		public setData(obj:Object):void{
    		this.obj=obj;
            this.TVid=obj["id"];
            this.lblTime.text=Tools.getInstance().formatTime3(obj["time"]);
            this.lblTitle.text = window["hexToDec"](obj["title"]);
            RES.getResByUrl(obj["front_cover"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.createVideo();
            
		}
        private load_end(source: egret.Texture):void{
            this.bmpBack.source=source;
		}
        private onLoad(e: egret.Event) {
            //监听按钮行为，当按下时调用播放函数。
            this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.play,this);
        }
        private onLoadErr(e: egret.Event) {
            console.log("video load error happened");
        }
        public play(e: egret.TouchEvent) {
            this.video.position=0;
            this.video.play();
        }
	}
}
