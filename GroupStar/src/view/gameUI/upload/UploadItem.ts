module upload {
	/**
	 *
	 * @author 
	 *
	 */
	export class UploadItem extends eui.Component{
        private static cacheDict: Object = {}; 
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): UploadItem {
            if(UploadItem.cacheDict[mtype] == null) {
                UploadItem.cacheDict[mtype] = [];
            }
            var dict: UploadItem[] = UploadItem.cacheDict[mtype];
            var theFighter: UploadItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new UploadItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: UploadItem,mtype: string = "1"): void {
            if(UploadItem.cacheDict[mtype] == null) {
                UploadItem.cacheDict[mtype] = [];
            }
            var dict: UploadItem[] = UploadItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        public obj:Object;
        private bmpBack:eui.Image;
        private lblName:eui.Label;
        private lblHot:eui.Label;
        public votes:number=0;
        public uid:number=-1;
        private bmpIcon:module.BaseCircleImage;
        private btnSend:eui.Image;
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/upload/UploadItemSkin.exml";
            this.bmpIcon=new module.BaseCircleImage();
        }
        public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblHot.fontFamily = "Heiti SC";
            }
            this.bmpIcon.x=15;this.bmpIcon.y=279;
            this.addChild(this.bmpIcon);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.send_tap,this);
            this.bmpBack.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.viewManager.uploadManager.uploadUI.disLarge(this.obj["img"],this.obj["upload_user_pic"],window["hexToDec"](this.obj["upload_user_name"]),window["hexToDec"](this.obj["upload_group_name"]));
            },this);
        }
        private send_tap(): void {//给第一名投票
            if(GameApp.Manager.dataManager.lucystar > 0) {
                var ep: egret.Point = this.localToGlobal(this.lblHot.x,this.lblHot.y);
                GameApp.Manager.viewManager.uploadManager.uploadUI._tx = ep.x + 50;
                GameApp.Manager.viewManager.uploadManager.uploadUI._ty = ep.y;
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + this.uid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starImagesVote",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,id: this.uid,sign: sign },function(obj: Object) {
                    this.starImagesVoteCall(obj);
                },true,this);
            } else {
                aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                    if(data == "ok") {
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.uploadController.hide,0);
                    }
                },this);
            }
        }
        private starImagesVoteCall(data: Object): void {
            switch(data["st"]) {
                case 1: 
                    this.lblHot.text = data["votes"];
                    this.votes = data["votes"];
                    this.obj["votes"]=this.votes;
                    GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                    flower.FlowerUI.getInstance().setLucky();
                    GameApp.Manager.viewManager.uploadManager.uploadUI.startip();
                    egret.Tween.get(this).wait(1000).call(function(){
                        GameApp.Manager.viewManager.uploadManager.uploadUI.item_send(this.parent.getChildIndex(this),data["votes"]);      
                        },this);
                  
                    break;
                case -1:
                    aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                        if(data == "ok") {
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.uploadController.hide,0);
                        }
                    },this);
                break;
            }
        }
        public setObj(obj:Object):void{
            this.obj=obj;
        }
		public setData(obj:Object):void{
    		this.obj=obj;
    		this.uid=obj["id"];
            this.lblName.text = Tools.getInstance().getStringLen(window["hexToDec"](obj["upload_user_name"]),11);
            this.lblHot.text = obj["votes"];
            this.votes=obj["votes"];
            RES.getResByUrl(obj["thumbnail_img"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.bmpIcon.setData(obj["upload_user_pic"],26,0,0,1);
		}
        private load_end(source: egret.Texture): void {
            this.bmpBack.texture = source;
            if(source.textureWidth / source.textureHeight > 221 / 355) {
                this.bmpBack.scaleX = this.bmpBack.scaleY =  221/source.textureWidth;
            } else {
                this.bmpBack.scaleX = this.bmpBack.scaleY = 355/source.textureHeight;
            }
        }
		public clear():void{
    		this.obj=null;
    		this.uid=-1;
		    this.lblName.text="";
		    this.lblHot.text="";
		    this.bmpBack.source=null;
		    this.bmpIcon.clear();
		}
	}
}
