module headLines {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeadLinesItem extends eui.Component{
        public star_name:string;
        private rect_next: eui.Rect; //进入详情页的按钮
        private lable_title:eui.Label;
        private img_pic:eui.Image;  // 图片
        public lable_count:eui.Label;// 票数
        public rect_btnDing:eui.Rect; //点击顶
        public img_icon:eui.Image;
        public headline_id:number;
        private img_typeIcon:eui.Image;//类型
        private lable_type:eui.Label;//类型
        public lable_Bitrank:eui.BitmapLabel;//排名;
        public img_rank:eui.Image;
        public group_starIcon:eui.Group;//添加头片；
        public btn_ding:eui.Image;
        
        private bid:string;
        public obj:Object;
      
        private n:number;//具体一项
        private votes:number;
        
        
        
        private static cacheDict: Object = {};
        public static produce(mtype: string = "1",index: number = 0): HeadLinesItem {
            if(HeadLinesItem.cacheDict[mtype] == null) {
                HeadLinesItem.cacheDict[mtype] = [];
            }
            var dict: HeadLinesItem[] = HeadLinesItem.cacheDict[mtype];
            var theFighter: HeadLinesItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new HeadLinesItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: HeadLinesItem,mtype: string = "1"): void {
            if(HeadLinesItem.cacheDict[mtype] == null) {
                HeadLinesItem.cacheDict[mtype] = [];
            }
            var dict: HeadLinesItem[] = HeadLinesItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/headlines/HeadLinesItemSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_title.fontFamily = "Heiti SC";
                this.lable_count.fontFamily = "Heiti SC";
            }
            this.rect_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.comeToItemInfo,this);
            this.rect_btnDing.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchUp,this)
//            this.img_icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goToThemSelf,this)
        }
        
        public goToThemSelf(e:egret.Event):void{
            socketio.IoConnect.getInstance().disconnect();//断开连接
            GameApp.Manager.controllerManager.start(this.bid);
            GameApp.Manager.controllerManager.headLinesController.hide();
        }
        
        
        public setData(obj:Object,i:number){
            var self: HeadLinesItem = this;
            this.bid = obj["bid"];
            this.obj = obj;
            this.headline_id = obj["headline_id"];
            this.star_name = window["hexToDec"](obj["star_name"]);
            RES.getResByUrl(obj["poster"],this.addStarImg,this);
            RES.getResByUrl(obj["head_img"],this.addIcoImg,this);
            
            this.lable_type.text = window["hexToDec"](obj["type"]);
            if(this.lable_type.text == "单曲" || this.lable_type.text == "专辑" || this.lable_type.text == "歌曲" ){
                this.img_typeIcon.source = "hl_music";
            } else if(this.lable_type.text == "电影"){
                this.img_typeIcon.source = "hl_movie";
            } else if(this.lable_type.text == "电视剧"){
                this.img_typeIcon.source = "hl_tv";
            }
            if(i ==1){
                this.img_rank.source = "n1";
            }else if(i==2){
                this.img_rank.source = "n2";
            }else if(i==3){
                this.img_rank.source = "n3";
            }else {
                this.lable_Bitrank.text = "n" + i;
            }
            

          
            var str: string = window["hexToDec"](obj["title"])
            if(str.length >=13){
                var cutDownTitle = str.substring(0,13);
                this.lable_title.text = cutDownTitle + "...";
            }else{
                this.lable_title.text = str;
            }
            this.lable_count.text = "票数 " + obj['votes'];
            if(obj["star_array"] && obj["star_array"].length>0){
                for(var i: number = 0;i < obj["star_array"].length; i++){
                    var icon = mySelfStar.StarIcon.produce();
                    this.group_starIcon.addChild(icon);
                    icon.setData(obj["star_array"][i],68,68,68,68);
                }
            }
        }
        
        public addStarImg(source:egret.Texture):void{
            this.img_pic.texture = source;
        }
        public addIcoImg(source: egret.Texture): void {
            this.img_icon.texture = source;
        }
        
        public touchUp(e:egret.Event):void{
            var self: HeadLinesItem = this;
            if(GameApp.Manager.dataManager.lucystar >= 10) {
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + ""+ GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "" + this.headline_id + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/headLineVote",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,"group_openid": GameApp.Manager.dataManager.group_openid,"headline_id": this.headline_id,sign: sign  },function(obj: Object) {
                    if(obj["st"] == 1) {
                        self.obj["votes"] = self.obj["votes"] + 1;
                        self.lable_count.text = "票数 " +self.obj["votes"];
                        GameApp.Manager.dataManager.lucystar = obj["data"]["lucky_star"];
                        flower.FlowerUI.getInstance().setLucky();
                        self.dispatchEventWith('votesUPItem',false,this);
                    }
                },true,this)
            } else {
                aler.AlertPanel.getInstance().show("温馨提示","钻石不足","取消","充值",function(data: string) {
                    if(data == "ok") {
                        GameApp.Manager.controllerManager.headLinesController.hide()
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide,0);
                    }
                },this);
            }
        }
        
        
        public comeToItemInfo(e:egret.Event):void{
//            GameApp.Manager.viewManager.headLinesManager.headLines.scor1.viewport.scrollV = 0;
            GameApp.Manager.controllerManager.headLinesController.hide();
            GameApp.Manager.controllerManager.headLineItemInforController.show(this.headline_id +"",this.star_name,HeadLines.ts);
        }
        
        public clear():void{
            this.lable_title.text = "";
            this.lable_count.text = "";
            this.img_icon.source = null;
            this.img_rank.source = null;
            this.img_pic.source = null;
            this.img_pic.texture = null;
            this.lable_Bitrank.text = "";
            
            while(this.group_starIcon.numElements > 0) {
                var item: mySelfStar.StarIcon = <mySelfStar.StarIcon>this.group_starIcon.getElementAt(this.group_starIcon.numElements - 1);
                mySelfStar.StarIcon.reclaim(item);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
        }
	}
}
