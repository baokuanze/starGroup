module notice {
	/**
	 *
	 * @author 
	 *
	 */
	export class Notice extends eui.Group{
        private static _instance: Notice;
        public static getInstance(): Notice {
            if(!this._instance) {
                this._instance = new Notice();
            }
            return this._instance;
        }
        private bmpBack: eui.Rect;
        private group1: eui.Group;
        private bmpIcon: module.BaseCircleImage;
        private lblText: eui.Label;
		public constructor() {
            super();
            this.init();
            this.touchEnabled=false;
            this.touchChildren=false;
		}
		private init():void{
            this.bmpBack = new eui.Rect();
            this.bmpBack.width = 750; this.bmpBack.height = 140;
            this.bmpBack.fillColor = 0x000000;
            this.bmpBack.alpha = .5;
            this.addChild(this.bmpBack);
            this.group1 = new eui.Group();
//            this.bmpIcon = new eui.Image();
//            this.bmpIcon.width = 92; this.bmpIcon.height = 92;
//            this.bmpIcon.y = 20;
            this.bmpIcon=new module.BaseCircleImage();
            this.bmpIcon.y=20;
            this.group1.addChild(this.bmpIcon);
            this.lblText = new eui.Label();
            if(Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }else{
                this.lblText.fontFamily = "黑体";
            }
            this.lblText.size = 40;
            this.lblText.x = 100; this.lblText.y = 46;
            this.lblText.textColor=0xffffff;
            this.group1.addChild(this.lblText);
            this.group1.x = 750;
            this.addChild(this.group1);
		}
		public setData(obj:Object):void{
            console.log('进入公告',obj,"3333333");
    		if(!this.parent){
//                GameApp.Manager.viewManager.UIStage.addElement(this);
                GameApp.Manager.stage.addChild(this);
                console.log('添加公告');
    		}
    		var str:string="";
    		switch(obj["type"]){
    		    case 1:
                    str = "<font color=#ffcc00>" + window["hexToDec"](obj["user_name"]) + "</font>发放真爱红包，大家快抢吧！";
                    this.bmpIcon.setData(obj["user_pic"],92,0,0,2);
    		    break;
    		    case 2:
//                    str = "欢迎Q群[<font color=#ffcc00>" + window["hexToDec"](obj["group_name"]) + "</font>]入驻超级粉丝团!";
                    str = "Q群[<font color=#ffcc00>" + window["hexToDec"](obj["group_name"]) +"</font>]成功入驻"+GameApp.Manager.dataManager.star_name+"的超级粉丝团，发放红包福利！"
                    this.bmpIcon.setData(obj["group_face"],92,0,0,2);
    		    break;
    		    case 3://众筹成功
//                    【群头像】【群名称】群众筹礼物成功，为【明星名】送出【礼物名】
                    str = "Q群[<font color=#ffcc00>" + window["hexToDec"](obj["group_name"]) + "</font>]众筹礼物成功,为" + GameApp.Manager.dataManager.star_name + "送出[<font color=#ff0000>" + window["hexToDec"](obj["crowdfunding_name"])+"</font>]"
                    this.bmpIcon.setData(obj["group_face"],92,0,0,2);
    		    break;
                case 4://集结成功
                    //        【群头像】Q群[xxxxx]为【xxxx】集结成功！展现了强大的粉丝实力！
                    str = "Q群[<font color=#ffcc00>" + window["hexToDec"](obj["group_name"]) + "</font>]为" + GameApp.Manager.dataManager.star_name + "集结成功!展现了强大的粉丝实力!";
                    this.bmpIcon.setData(obj["group_face"],92,0,0,2);
                    break;
    		}
            this.lblText.textFlow = (new egret.HtmlTextParser).parser(str);
//            RES.getResByUrl(obj["pic"],this.onCompFun,this,RES.ResourceItem.TYPE_IMAGE);
            
            this.move();
		}
		private move():void{
            this.group1.x = 750;
//            this.lblText.text = "";
//            this.bmpIcon.clear();
            egret.Tween.removeTweens(this.group1);
            egret.Tween.get(this.group1).to({x:-(this.lblText.textWidth+this.lblText.x)},10000).call(function(){
                this.end();
            },this);
		}
		private end():void{
		    if(this.parent){
                GameApp.Manager.stage.removeChild(this);
		    }
            this.group1.x = 750;
            this.lblText.text = "";
            this.bmpIcon.clear();
		}
//        private onCompFun(source: egret.Texture): void {
//            var img: egret.Bitmap = new egret.Bitmap(source);
//            img.width = 92; img.height = 92;
//            this.bmpIcon.source = Tools.getInstance().getCricleBitbmp(img,"yuan_92_png");
//        }
	}
}
