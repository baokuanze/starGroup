module mainUI {
	/**
	 *
	 * @author 众筹显示
	 *
	 */
	export class MainZcItem extends eui.Group{
    	private backImg:eui.Image;
    	private headImg:eui.Image;
    	private headback:egret.Shape;
    	public obj:Object;
    	public star:Object;
		public constructor() {
    		super();
    		this.backImg=new eui.Image();
    		this.headImg=new eui.Image();
    		this.addChild(this.backImg);
    		this.headback=Tools.getInstance().getSp(24,24,0,0,0xffffff);
    		this.addChild(this.headback);
			this.addChild(this.headImg);
            this.headImg.width = 20; this.headImg.height = 20;
			this.headback.x=53;this.headback.y=50;
            this.headImg.x = 54; this.headImg.y = 51;
    		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		}
		private tap():void{
    		GameApp.Manager.viewManager.gameMainUI.mainUI.disZC(this.obj,this.star);
		}
        public remlis():void{
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
        }
		public setData(obj:Object,star:Object):void{
		    this.obj=obj;this.star=star;
            RES.getResByUrl(obj["icon"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["group_face"],this.load_end1,this,RES.ResourceItem.TYPE_IMAGE);
		}
		private load_end(s:egret.Texture):void{
		    this.backImg.source=s;
		}
        private load_end1(s: egret.Texture): void {
            this.headImg.source = s;
        }
		public clear():void{
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
		}
	}
}
