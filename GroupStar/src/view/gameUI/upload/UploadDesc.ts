module upload {
	/**
	 *
	 * @author 
	 *
	 */
	export class UploadDesc extends eui.Component{
        private static _instance: UploadDesc;
        public static getInstance(): UploadDesc {
            if(!this._instance) {   
                this._instance = new UploadDesc();
            }
            return this._instance;
        }
    	private lbl1:eui.Label;
    	private btnSC:eui.Rect;
    	private btnBack:eui.Image;
    	private groupData:eui.Group;
        private bmpImg:eui.Image;
        
        private groupTip: eui.Group;
        private bmpTX: eui.Image;
        private image:any;
        private w:any;
        private h:any;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/upload/UploadDescSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
            }
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.bmpImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.bmp_begin,this);
            this.bmpImg.addEventListener(egret.TouchEvent.TOUCH_END,this.bmp_end,this);
            this.btnSC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.drawtofile,this);
		}
		private drawtofile():void{
    		var self:UploadDesc=this;
            var imgW: number = 224,imgH: number = 358;
            var sx: number = ((141 - this.bmpImg.x) / this.bmpImg.scaleX)/this.bmpImg.width*this.w;
            var sy: number = ((130-this.bmpImg.y)/this.bmpImg.scaleX)/this.bmpImg.height*this.h;
            var swidth: number =this.w*(468/(this.bmpImg.width*this.bmpImg.scaleX));
            var sheight: number = this.h*(833/(this.bmpImg.height*this.bmpImg.scaleX));
    		var x:number=0,y:number=0;
            var width: number = 468 ;
            var height: number = 833 ;
//            console.log('---:'+sx+" "+sy+" "+swidth+" "+sheight+" "+468/this.bmpImg.scaleX);
            setSmallImg(this.drawtosmall,this,this.image,468 / this.bmpImg.scaleX,833 / this.bmpImg.scaleX,imgW,imgH,sx,sy,swidth,sheight,x,y,width,height);
    		self.startx();
		}
        private drawtosmall(thisRef: any,largeImgURL:string,smallImgURL: string):void{
            RES.getResByUrl(largeImgURL,thisRef.largecompFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(smallImgURL,thisRef.smallcompFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
		}
		private largebase64:string="";
        private smallbase64: string = "";
		private largecompFunc(s:egret.Texture):void{
            this.largebase64 = s.toDataURL("image/jpeg");
            if(this.largebase64&&this.smallbase64){
                this.send();
            }
		}
        private smallcompFunc(s:egret.Texture):void{
            this.smallbase64 = s.toDataURL("image/jpeg");
            if(this.largebase64 && this.smallbase64) {
                this.send();
            }
        }
        private send():void{
            var self:UploadDesc=this;
            //            var base64str = this.bmpImg.texture.toDataURL("image/jpeg",new egret.Rectangle(141-this.bmpImg.x,130-this.bmpImg.y,750,1334));
//            console.log('发送');
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid +GameApp.Manager.dataManager.bid+ GameApp.Manager.dataManager.group_openid + "&");
            socketio.IoConnect.getInstance().upload(2,{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,imgData: {largeImg:this.largebase64,smallImg:this.smallbase64} },function(obj: Object) {
//                console.log('接受',obj);
                if(obj["st"] == 1) {
                    aler.AlertPanel1.getInstance().show("","提交成功","确定",function() {
                        self.groupTip.visible = false;
                        self.close();
                    },this);
                } else {
                    aler.AlertPanel1.getInstance().show("","提交失败","确定",function() {
                        self.groupTip.visible = false;
                        self.close();
                    },this);
                }
                self.endtx();
            },this);
        }
        private startx(): void {
            this.groupTip.visible = true;
            this.bmpTX.visible = true;
            //            this.scroll1.height=1492;
            egret.Tween.get(this.bmpTX,{ loop: true }).to({ rotation: 360 },1000);
        }
        private endtx(): void {
            this.bmpTX.visible = false;
            egret.Tween.removeTweens(this.bmpTX);
        }
		private bmptap:boolean=false;
		private touchX:number=0;
		private touchY:number=0;
		private bmpX:number=141;
		private bmpY:number=130;
		private k:string='';
		private bmp_begin(e:egret.TouchEvent):void{
		    this.bmptap=true;
		    this.touchX = e.stageX;
            this.touchY = e.stageY;
            console.log(this.touchX+" "+this.touchY);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.bmp_move,this);
		}
		private bmp_move(e:egret.TouchEvent):void{
		    if(this.bmptap){
    		    this.bmpImg.x=this.bmpX+(e.stageX-this.touchX);
                this.bmpImg.y = this.bmpY + (e.stageY - this.touchY);
		    }
		}
        private bmp_end(e: egret.Event):void{
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.bmp_move,this);
            this.bmptap=false;
            switch(this.k){
                case 'height':
                    this.bmpImg.y = 130; 
                    if(this.bmpImg.x>=141){
                        this.bmpImg.x=141;
                    }else if(this.bmpImg.x<141+468-this.bmpImg.width*this.bmpImg.scaleX){
                        this.bmpImg.x = 141+468 - this.bmpImg.width * this.bmpImg.scaleX;
                    }
                break;
                default:
                    this.bmpImg.x = 141; 
                    if(this.bmpImg.y >= 130) {
                        this.bmpImg.y = 130;
                    } else if(this.bmpImg.y < 130 + 833 - this.bmpImg.height * this.bmpImg.scaleY) {
                        this.bmpImg.y = 130 + 833 - this.bmpImg.height * this.bmpImg.scaleY;
                    }
                break;
            }
            this.bmpX = this.bmpImg.x;
            this.bmpY = this.bmpImg.y;
        }
		public open(imgUrl:string,k:string,image:any,w:any,h:any):void{
            RES.getResByUrl(imgUrl,this.compFunc,this,RES.ResourceItem.TYPE_IMAGE);
		    GameApp.Manager.viewManager.BottomUIStage.addChild(this);
		    GameApp.Manager.controllerManager.uploadController.hide();
		    this.k=k;
		    this.w=w;this.h=h;
		    this.image=image;
		}
		private compFunc(bmp:egret.Texture):void{
            this.bmpImg.source = bmp;
            console.log(this.k+" "+this.bmpImg.width+" "+this.bmpImg.height);
            switch(this.k){
                case 'width':
                    this.bmpImg.scaleX = this.bmpImg.scaleY = 468 / this.bmpImg.width;
                break;
                case 'height': 
                    this.bmpImg.scaleX = this.bmpImg.scaleY = 833 / this.bmpImg.height;
                break;
                default:
                    this.bmpImg.scaleX = this.bmpImg.scaleY = 468 / this.bmpImg.width;
                break;
            }
		}
		public close():void{
    		this.smallbase64="";
    		this.largebase64="";
    		this.bmpImg.source=null
    		this.bmpImg.scaleX=this.bmpImg.scaleY=1;
    		this.bmpImg.x=141;this.bmpImg.y=130;
		    GameApp.Manager.viewManager.BottomUIStage.removeChild(this);
		    GameApp.Manager.controllerManager.uploadController.show();
		}
	}
}
