module upload {
	/**
	 *
	 * @author 
	 *
	 */
	export class Upload extends eui.Component{
    	private scroll1:eui.Scroller;
        private groupData:eui.Group;
        private groupRight:eui.Group;
        private btnUpload:eui.Rect;
        private lbl0:eui.Label;
        private lbl1: eui.Label;
        private lbl2: eui.Label;
        private lbl3: eui.Label;
        private lbl4: eui.Label;
        private lbl5: eui.Label;
        private lbl6: eui.Label;
        private bmpIcon:module.BaseCircleImage;
        private btnLevel:eui.Button;
        private lblHot:eui.Label;
        private bmpHeadImg:eui.Image;
        private btnSend:eui.Image;
        private obj:Object;
        private uid:number=0;
        private votes:number=0;
        private btnBack:eui.Image;
        private current:Object;
        
        private groupTip:eui.Group;
        private bmpTX:eui.Image;
        
        private groupLarge:eui.Group;
        private groupLargeButtom:eui.Group;
        private bmpLarge:eui.Image;
        private lblLargeName:eui.Label;
        private lblLargeGroupName:eui.Label;
        private bmpLargeIcon:module.BaseCircleImage;
        
        public _tx:number=0;
        public _ty:number=0;
        
        private disNum: number = 9;
        private index: number = 0;
        private arr: Array<UploadItem> = [];
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/upload/UploadSkin.exml";
            this.bmpIcon = new module.BaseCircleImage();
            this.bmpIcon.x=132;this.bmpIcon.y=56;
		}
		public childrenCreated():void{
    		this.scroll1.height=egret.MainContext.instance.stage.stageHeight-100;
            this.groupTip.visible = false;
            this.bmpTX.visible=false;
    		this.groupRight.addChild(this.bmpIcon);
    		this.bmpLargeIcon=new module.BaseCircleImage();
    		this.bmpLargeIcon.x=50;this.bmpLargeIcon.y=10;
    		this.groupLargeButtom.addChild(this.bmpLargeIcon);
    		this.groupLargeButtom.y=this.stage.stageHeight-100;
            if(Tools.getInstance().isIphone()) {
                this.lbl0.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lblHot.fontFamily = "Heiti SC";
                this.lblLargeName.fontFamily="Heiti SC";
                this.lblLargeGroupName.fontFamily = "Heiti SC";
            }
		    this.btnUpload.addEventListener(egret.TouchEvent.TOUCH_TAP,this.upload,this);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.send_tap,this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.bmpHeadImg.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                this.disLarge(this.current["img"],this.current["upload_user_pic"],window["hexToDec"](this.current["upload_user_name"]),window["hexToDec"](this.current["upload_group_name"]));
                },this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.change,this);
		}
        public change(): void {
//            if(this.scroll1.viewport && this.arr.length > 0) {
//                var last: UploadItem = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
//                var next: UploadItem = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
//                if(this.index < this.arr.length / this.disNum - 1) {
//                    if(this.scroll1.viewport.scrollV >= next.y - (this.scroll1.height - 587)) {
//                        this.index++;
//                        this.dis();
//                    }
//                }
//                if(this.index > 0) {
//                    if(this.scroll1.viewport.scrollV < last.y + 587) {
//                        this.index--;
//                        this.dis();
//                    }
//                }
//            }
            var last: UploadItem = this.index == 0 ? this.arr[0] : this.arr[(this.index) * 9 - 9];
            var next: UploadItem = (this.index + 1) * 9 >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * 9];
            if(this.index < this.arr.length / 9 - 1) {
                console.log(this.scroll1.viewport.scrollV + " "+ (last.y ) + " " + next.y +" "+ (this.scroll1.height-587));
                if(this.scroll1.viewport.scrollV >= next.y - (this.scroll1.height - 587)) {
                    console.log('+++');
                    this.index++;
                    this.dis();
                }
            }
            if(this.index > 0) {
                if(this.scroll1.viewport.scrollV < last.y + 587) {
                    console.log('----');
                    this.index--;
                    this.dis();
                }
            }
        }
        private dis(): void {
            var min: number = this.index == 0 ? 0 : this.index * 9 - 9;
            var max: number = (this.index + 1) * 9;
            for(var i: number = this.arr.length-1;i >=0;i--) {
                var item: UploadItem = this.arr[i];
                if(i >= min && i < max) {
                    this.groupData.addChild(item);
                    if(item.uid==-1){
                        item.setData(item.obj);
                    }
                } else {
                    if(item.parent) {
                        item.parent.removeChild(item);
                    }
                }
            }
        }
        public disLarge(url: string,upload_user_pic: string,upload_user_name: string,upload_group_name:string):void{
		    console.log(url);
            RES.getResByUrl(url,this.loadlarge_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.lblLargeName.text=upload_user_name;
            this.lblLargeGroupName.text="所属群:"+upload_group_name;
            this.bmpLargeIcon.setData(upload_user_pic,80,0,0,2);
            this.startx();
		}
        private loadlarge_end(source: egret.Texture):void{
            this.bmpLarge.source=source;
            this.groupLarge.visible=true;
            this.endtx();
            this.groupTip.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addLargeLis,this);
        }
        private addLargeLis():void{
            this.groupLarge.visible = false;
            this.bmpLarge.source = null;
            this.bmpLargeIcon.clear();
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.addLargeLis,this);
        }
		private upload():void{
//            data.UpLoadFile.getInstance().doSelect();
            selectImageUpload(this.selectedHandler,this);
		}
        private selectedHandler(thisRef: any,imgURL: string,file: Blob,k:string,image:any,w:any,h:any): void {
//            thisRef.startx();
//            RES.getResByUrl(imgURL,thisRef.compFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
            UploadDesc.getInstance().open(imgURL,k,image,w,h);
        }
        private compFunc(texture: egret.Texture): void {
//            UploadDesc.getInstance().open(texture);
//            var self:Upload=this;
//            var base64str = texture.toDataURL("image/jpeg");//使用默认texture尺寸
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid +GameApp.Manager.dataManager.bid+ GameApp.Manager.dataManager.group_openid + "&");
//            socketio.IoConnect.getInstance().upload(2,{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,imgData: base64str },function(obj: Object) {
//                if(obj["st"] == 1) {
//                    aler.AlertPanel1.getInstance().show("","提交成功","确定",function() {
//                        self.groupTip.visible = false;
//                    },this);
//                } else {
//                    aler.AlertPanel1.getInstance().show("","提交失败","确定",function() {
//                        self.groupTip.visible = false;
//                    },this);
//                }
//                self.endtx();
//            },this);
        }
        private send_tap():void{//给第一名投票
            if(GameApp.Manager.dataManager.lucystar>0){
                var ep:egret.Point=this.lblHot.parent.localToGlobal(this.lblHot.x,this.lblHot.y);
                this._tx=ep.x+50;
                this._ty=ep.y;
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + this.current["id"]+ "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starImagesVote",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,id: this.current["id"],sign: sign },function(obj: Object) {
                    this.starImagesVoteCall(obj);
                },true,this);
            }else{
                aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                    if(data == "ok") {
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.uploadController.hide,0);
                    }
                },this);
            }
        }
        private starImagesVoteCall(data:Object):void{
            switch(data["st"]){
                case 1: 
                    this.lblHot.text = data["votes"];
                    this.votes = data["votes"];
                    GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                    flower.FlowerUI.getInstance().setLucky();
                   this.startip();
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
        public item_send(index:number,votes:number):void{
            if(index==0){
                if(this.votes<votes){
                    var del: UploadItem = <UploadItem>this.groupData.getElementAt(0);
                    var item1: UploadItem = UploadItem.produce();
                    this.groupData.addChildAt(item1,0);
                    item1.setData(this.current);
                    this.current=del.obj;
                    this.setD();
                    if(del.parent){
                        del.parent.removeChild(del);
                        UploadItem.reclaim(del);
                    }
                }
            }else{
                var item:UploadItem=<UploadItem>this.groupData.getElementAt(index-1);
                var add: UploadItem = <UploadItem>this.groupData.getElementAt(index);
                if(item.votes<votes){
                    this.groupData.removeChildAt(index);
                    this.groupData.addChildAt(add,index-1);
                }
            }
        }
        public startip():void{
            var tip: system.TipText1 = system.TipText1.produce("1");
            tip.x = this._tx; tip.y = this._ty;
            tip.setData("+1",28,0x00ff00);
            this.addChild(tip);
            egret.Tween.get(tip).wait(500).to({ y: tip.y - 50,alpha: 0 },500).call(function() {
                system.TipText1.reclaim(tip);
                if(tip.parent) {
                    tip.parent.removeChild(tip);
                }
            },this);
        }
        private startx():void{
            this.groupTip.visible=true;
            this.bmpTX.visible=true;
//            this.scroll1.height=1492;
            egret.Tween.get(this.bmpTX,{loop:true}).to({rotation:360},1000);
        }
        private endtx():void{
            this.bmpTX.visible = false;
            egret.Tween.removeTweens(this.bmpTX);
        }
		public setData(obj:Object):void{
    		this.obj=obj;
            var _x: number = 20,_y: number = 0;
            var n: number = 0;
            for(var i: number = 0;i < obj["img_list"].length;i++){
                var current: Object = obj["img_list"][i];
                if(i==0){
                    this.current = obj["img_list"][0];
//                    this.setD();
                }else{
                    var item: UploadItem = UploadItem.produce();
//                    this.groupData.addChild(item);
//                    item.setData(current);
                    item.setObj(obj["img_list"][i]);
                    item.x = 0 + (n % 3) * (224 + 20);
                    item.y = _y * (358 + 20);
                    n++;
                    if(n % 3 == 0) {
                        _y++;
                    }
                    this.arr.push(item);
                }
            }
//            for(var i: number = this.groupData.numElements - 1;i>=0;i--){
//                var item:UploadItem=<UploadItem>this.groupData.getElementAt(i);
//                item.setData(obj["img_list"][i+1]);
//            }
            this.dis();
            this.setD();
            this.groupData.height = Math.ceil((obj["img_list"].length-1)/3)*(358+30);
		}
		private setD():void{
            this.lblHot.text = this.current["votes"];
            this.votes = this.current["votes"];
            this.bmpIcon.setData(this.current["upload_user_pic"],102,0,0,2);
            this.lbl2.text = Tools.getInstance().getStringLen(window["hexToDec"](this.current["upload_user_name"]),15);
            this.lbl3.text = "(" + window["hexToDec"](this.current["upload_group_name"]) + ")";
            this.btnLevel.icon = data.DataManager.getintimateIcon(this.current["intimate_level"]);
            this.btnLevel.label = data.DataManager.getintimateLevel(this.current["intimate_level"]) + "";
            RES.getResByUrl(this.current["thumbnail_img"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            if(GameApp.Manager.dataManager.back_img != this.current["img"]){
                GameApp.Manager.dataManager.back_img = this.current["img"] ;
                GameApp.Manager.viewManager.backGround.loadPic(this.current["img"]);
            }
		}
        private load_end(source: egret.Texture): void {
            this.bmpHeadImg.texture = source;
            if(source.textureWidth/source.textureHeight>326/523){
                this.bmpHeadImg.scaleX=this.bmpHeadImg.scaleY = 326/source.textureWidth;
            }else{
                this.bmpHeadImg.scaleX = this.bmpHeadImg.scaleY =  523/source.textureHeight;
            }
        }
		public clear():void{
		    while(this.groupData.numElements>0){
		        var item:UploadItem=<UploadItem>this.groupData.getElementAt(this.groupData.numElements-1);
		        UploadItem.reclaim(item);
		        if(item.parent)
    		        item.parent.removeChild(item);
		    }
		    this.lblHot.text="";
		    this.lbl2.text="";
		    this.lbl3.text="";
		    this.arr=[];
            this.scroll1.viewport.scrollV = 0;
		}
		private close():void{
    		this.bmpTX.visible=false;
    		this.groupTip.visible=false;
		    GameApp.Manager.controllerManager.uploadController.hide();
		    GameApp.Manager.controllerManager.rankStarController.show();
		}
	}
}
