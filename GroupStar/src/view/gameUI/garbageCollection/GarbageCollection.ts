module garbageCollection {
	/**
	 *
	 * @author  //收集界面 
	 *
	 */
	export class GarbageCollection extends eui.Component{
        private img_bg:eui.Image;  //背景图片
        private scro:eui.Scroller;
        private img_ico:eui.Image;//人物的图片
        private lable_title:eui.Label;//标题
        
        private group_music:eui.Group;
        private lable_number:eui.Label;
        private group_musicItem:eui.Group;
        
        private group_TV:eui.Group;
        private lable_TvNumber:eui.Label;
        private group_TvItem:eui.Group;
        
        private group_Movie:eui.Group;
        private lable_MovieNumber: eui.Label;
        private group_MovieItem: eui.Group;
        private lable_NoWorks:eui.Label;
     
        
        private btn_Fx:eui.Image;
        private btnClose:eui.Image;
        
        private itemArr: Array<garbageCollection.WorksItem> = [];
        private lable_lookMoreMusic:eui.Label;
        private n:number = 0;  //看自己情况
        private jilu:number = 0;
        private isLookMore:Boolean = false;
        private musicHeiArr:Array < string >= [];
       
        private itemTvArr: Array<garbageCollection.WorksItem> = [];
        private v: number = 0;
        private jiluTv:number = 0;
        private tvHeiArr:Array<string> = [];
       
        private movieHeiArr: Array<string> = []
        private itemMovieArr: Array<garbageCollection.WorksItem> = [];
        private jiluMovie:number = 0
        private o: number = 0;
        
        private lable_lookMoreMovie:eui.Label;
        private lable_lookMoreTv:eui.Label;
        
        private uid:number = 0;
        public type:number;
        private obj:Object;
        private groupkMoreMusic:eui.Group;//
        private groupkMoreTv:eui.Group;
        private groupkMoreMovie:eui.Group;
        
        private totalOffY:number = 0;
        
        
        //全部黑情况
    	public constructor() {
    		super();
            this.skinName = "src/view/gameUI/garbageCollection/GarbageCollectionSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_title.fontFamily = "Heiti SC";
                this.lable_number.fontFamily = "Heiti SC";
                this.lable_TvNumber.fontFamily = "Heiti SC";
                this.lable_MovieNumber.fontFamily = "Heiti SC";
                this.lable_lookMoreMusic.fontFamily = "Heiti SC";
                this.lable_lookMoreTv.fontFamily = "Heiti SC";
                this.lable_lookMoreMovie.fontFamily = "Heiti SC";
                this.lable_NoWorks.fontFamily = "Heiti SC";
            }
            this.btn_Fx.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share,this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.CloseItem,this);
            this.groupkMoreMusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.lookMoreMusicWorks,this);
            this.groupkMoreTv.addEventListener(egret.TouchEvent.TOUCH_TAP,this.lookMoreTVWorks,this);
            this.groupkMoreMovie.addEventListener(egret.TouchEvent.TOUCH_TAP,this.lookMoreMovieWorks,this);
        }
        
       public lookMoreMusicWorks(e:egret.Event):void{
           var length1 = this.itemArr.length;
           this.n = this.n -1;
//           console.log(this.jilu,"jilu",length1,'length',this.musicHeiArr.length,"heiLength");
           for(var i: number = this.jilu;i < this.musicHeiArr.length ;i++){
                var itmHeit = new garbageCollection.WorksItem();
                itmHeit.setData(this.musicHeiArr[i],0);
                this.itemArr.push(itmHeit);
                this.group_musicItem.addChild(itmHeit);
                itmHeit.x = this.itemArr[length1 -1 + i - this.jilu].x + this.itemArr[length1 -1 + i - this.jilu].width + 20;
                itmHeit.y = this.n * 55;
//                console.log(itmHeit.x,itmHeit.y,"xy")
                if(itmHeit.x + itmHeit.width > 690) {
                    this.n += 1
                    itmHeit.x = 0;
                    itmHeit.y = this.n * 55;
                }
            }
           this.groupkMoreMusic.visible = false;
           
           if(this.obj["starWorks"]["2"] && !this.obj["starWorks"]["3"]){
               this.group_TV.y = this.group_music.y + this.group_music.height + 85 + 40;
           }else if(!this.obj["starWorks"]["2"] && this.obj["starWorks"]["3"]){
               this.group_Movie.y = this.group_music.y + this.group_music.height + 85 + 40;
           }else if(this.obj["starWorks"]["2"] && this.obj["starWorks"]["3"]) {
               this.group_TV.y = this.group_music.y + this.group_music.height + 85 + 40;
               this.group_Movie.y = this.group_TV.y + this.group_TV.height + 85;
           }else if(!this.obj["starWorks"]["2"] && !this.obj["starWorks"]["3"]){
          
           }
            
       }
       
       
       public lookMoreTVWorks(e: egret.Event): void {
           
           var hength1 = this.itemTvArr.length;
           this.v = this.v - 1;
//           console.log(this.jiluTv,"juluTv",this.tvHeiArr.length,"length",this.v,"v");
           for(var i: number = this.jiluTv;i < this.tvHeiArr.length;i++) {
               var itmHeit = new garbageCollection.WorksItem();
               itmHeit.setData(this.tvHeiArr[i],0);
               this.itemTvArr.push(itmHeit);
               this.group_TvItem.addChild(itmHeit);
               itmHeit.x = this.itemTvArr[hength1 - 1 + i - this.jiluTv].x + this.itemTvArr[hength1 - 1 + i - this.jiluTv].width + 20;
               itmHeit.y = this.v * 55;
               if(itmHeit.x + itmHeit.width > 690) {
                   this.v += 1
                   itmHeit.x = 0;
                   itmHeit.y = this.v * 55;
               }
           }
           
           if(this.obj["starWorks"]["3"]){
               this.group_Movie.y = this.group_TV.y + this.group_TV.height + 85 + 40;
           }else{
               
           }
           this.groupkMoreTv.y = this.group_TvItem.y + this.group_TvItem.height + 5
           this.groupkMoreTv.visible = false;
       }
       
       public lookMoreMovieWorks(e: egret.Event): void {
           var hength1 = this.itemMovieArr.length;  // 已经发了多少个
           this.o = this.o - 1;
//           console.log(this.o,this.jiluMovie,"o");
           
           for(var i: number = this.jiluMovie;i < this.movieHeiArr.length;i++) {
               var itmHeit = new garbageCollection.WorksItem();
               itmHeit.setData(this.movieHeiArr[i],0);
               this.itemMovieArr.push(itmHeit);
               this.group_MovieItem.addChild(itmHeit);
               itmHeit.x = this.itemMovieArr[hength1 - 1 + i - this.jiluMovie].x + this.itemMovieArr[hength1 - 1 + i - this.jiluMovie].width + 20;
               itmHeit.y = this.o * 55;
               if(itmHeit.x + itmHeit.width > 690) {
                   this.o += 1
                   itmHeit.x = 0;
                   itmHeit.y = this.o * 55;
               }
           }
           this.groupkMoreMovie.visible = false;
           this.groupkMoreMovie.y = this.group_MovieItem.y + this.group_MovieItem.height + 5;
       }
       
       
       //分享；
       private share(e:egret.Event):void{
           var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid+  "&");
           Util.sendJson1(GameApp.Manager.dataManager.IP + "/shareUserStarWorks",
               { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(obj: Object) {
                   system.Share.share(obj,function(n: number) {
                       if(n == 1)
                           system.TipText.produce().open("发送成功");
                   });
               },true,this);
        }
      
        public setData(obj:Object,bid:string,uid:number,type:number):void{
            this.uid = uid;
            this.type = type;
            this.obj = obj;
            if(this.uid == GameApp.Manager.dataManager.uid) {
                this.btn_Fx.visible = true;
            }

            this.scro.height = this.stage.stageHeight;
            var starname = window["hexToDec"](obj["star_name"]);
            this.lable_title.textFlow = (new egret.HtmlTextParser).parser(window["hexToDec"](obj["user_name"]) + " " + "<font color= #f5b316>" + "点亮的 " + "</font>" + starname +"的作品");
            var cirback: egret.Shape = Tools.getInstance().getCricleMask(this.img_ico.x + 144 / 2,this.img_ico.y + 144 / 2,this.img_ico.width,this.img_ico.parent);
            this.img_ico.mask = cirback;
            RES.getResByUrl(obj["user_pic"],this.addHeadImg,this,RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["star_img"],this.addBgImg,this,RES.ResourceItem.TYPE_IMAGE);
            
            //不是自己的话
            if(this.uid != GameApp.Manager.dataManager.uid){
                if((obj["starWorks"]["1"] && obj["starWorks"]["1"]["get"].length > 0) || (obj["starWorks"]["2"] && obj["starWorks"]["2"]["get"].length > 0) || (obj["starWorks"]["3"] && obj["starWorks"]["3"]["get"].length > 0)){
                    this.addLightWorks(obj);
                }else{
                    this.lable_NoWorks.visible = true;
                }
            }else{
                var offY = 0;
                if(obj["starWorks"]["1"]) {
                    var anNumber = obj["starWorks"]["1"]["not_get"] ? obj["starWorks"]["1"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["1"]["get"].length;
                    this.lable_number.text = obj["starWorks"]["1"]["get"].length + "/" + totalNumber;
                    
                    this.group_music.visible = true;
                    this.addWorks(obj["starWorks"]["1"]["get"],0,this.itemArr,obj["starWorks"]["1"]["not_get"] ? obj["starWorks"]["1"]["not_get"] : [],this.group_musicItem,this.groupkMoreMusic,0,1);   //看自己情况  
                    this.musicHeiArr = obj["starWorks"]["1"]["not_get"];
                    offY += this.group_music.y + this.group_music.height + 40;
                 }
                if(obj["starWorks"]["2"]) {
                    this.group_TV.visible = true;
                    var anNumber = obj["starWorks"]["2"]["not_get"] ? obj["starWorks"]["2"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["2"]["get"].length;
                    this.lable_TvNumber.text = obj["starWorks"]["2"]["get"].length + "/" + totalNumber;
                    this.addWorks(obj["starWorks"]["2"]["get"],0,this.itemTvArr,obj["starWorks"]["2"]["not_get"] ? obj["starWorks"]["2"]["not_get"] : [],this.group_TvItem,this.groupkMoreTv,0,2);   //看自己情况
                    
                    this.group_TV.y = offY|| 428;
                   
                    if(offY == 0) {
                        offY += this.group_TV.y + this.group_TV.height + 40;
                    } else {
                        offY += this.group_TV.height + 40;
                    }
                    this.tvHeiArr = obj["starWorks"]["2"]["not_get"];
                   }
                if(obj["starWorks"]["3"]) {
                    this.group_Movie.visible = true;
                    var anNumber = obj["starWorks"]["3"]["not_get"] ? obj["starWorks"]["3"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["3"]["get"].length;
                    this.lable_MovieNumber.text = obj["starWorks"]["3"]["get"].length + "/" + totalNumber;
                    
                    this.group_Movie.y = offY|| 428;
                    this.addWorks(obj["starWorks"]["3"]["get"],0,this.itemMovieArr,obj["starWorks"]["3"]["not_get"] ? obj["starWorks"]["3"]["not_get"] : [],this.group_MovieItem,this.groupkMoreMovie,0,3);   //看自己情况
                    this.movieHeiArr = obj["starWorks"]["3"]["not_get"];
                }
            }
        }
        
        public addLightWorks(obj: Object): void {
//            console.log("看别的明星");
            var offX: number = 0; var offY: number = 0;
            
            if(obj["starWorks"]["1"] && obj["starWorks"]["1"]["get"].length != 0){
               
                    this.group_music.visible = true;
                    var anNumber = obj["starWorks"]["1"]["not_get"] ? obj["starWorks"]["1"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["1"]["get"].length;

                    this.lable_number.text = obj["starWorks"]["1"]["get"].length + "/" + totalNumber;
                    this.addWorks(obj["starWorks"]["1"]["get"],0,this.itemArr,[],this.group_musicItem,this.groupkMoreMusic,0,1);   //看自己情况
                   
                    this.groupkMoreMusic.visible = false
                  
                    this.musicHeiArr = obj["starWorks"]["1"]["not_get"];
                    offY += this.group_music.y + this.group_music.height + 60;
                
            }
//            console.log("2-1")
            if(obj["starWorks"]["2"] && obj["starWorks"]["2"]["get"].length != 0){
//                console.log("2-2")
                    this.group_TV.visible = true;
                    var anNumber = obj["starWorks"]["2"]["not_get"] ? obj["starWorks"]["2"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["2"]["get"].length;
                    this.lable_TvNumber.text = obj["starWorks"]["2"]["get"].length + "/" + totalNumber;
                    
                    this.addWorks(obj["starWorks"]["2"]["get"],0,this.itemTvArr,[],this.group_TvItem,this.groupkMoreTv,0,2);   //看自己情况
                    this.groupkMoreTv.visible = false;
                    this.tvHeiArr = obj["starWorks"]["2"]["not_get"];
                    this.group_TV.y = offY || 428;
                    if(offY == 0){
                        offY += this.group_TV.y + this.group_TV.height + 60;
                    }else{
                        offY += this.group_TV.height + 60;
                    }
                   
            }
            

            if(obj["starWorks"]["3"] && obj["starWorks"]["3"]["get"].length != 0){
//                    console.log("3");
                    this.group_Movie.visible = true;
                    var anNumber = obj["starWorks"]["3"]["not_get"] ? obj["starWorks"]["3"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["3"]["get"].length;
                    this.lable_MovieNumber.text = obj["starWorks"]["3"]["get"].length + "/" + totalNumber;
                    this.group_Movie.y = offY || 428;
                    this.addWorks(obj["starWorks"]["3"]["get"],0,this.itemMovieArr,[],this.group_MovieItem,this.groupkMoreMovie,0,3);   //看自己情况
                    this.groupkMoreMovie.visible = false;
                    this.movieHeiArr = obj["starWorks"]["3"]["not_get"];
            }
        }
        
        public addWorks(title: Array<Object>,n:number,itemArr: Array<garbageCollection.WorksItem>,hei: Array<string>,group_Item:eui.Group,lable_lookMore:eui.Group,julu:number,type:number): void {
            var length11 = title.length;
            //亮的数组
            for(var i: number = 0;i < title.length;i++) {
                var itm =  new garbageCollection.WorksItem();
                itm.setData(title[i]["name"],title[i]["colour"]);
                itemArr.push(itm);
                if(i == 0) {
                    itm.x = 0;
                    itm.y = 0;
                } else {
                    itm.x = itemArr[i - 1].x + itemArr[i - 1].width + 20;
                    itm.y = n * 55;
                    if(itm.x + itm.width > 690) {
                        n += 1
                      //  console.log(n,"第几个")
                        itm.x = 0;
                        itm.y = n * 55;
                    }
                }
                group_Item.addChild(itm);
                lable_lookMore.y = group_Item.y + group_Item.height + 10;
            }
              //没有亮的时候。n = 0 length11 = 0;
            if(n <= 3) { //亮度小于4的时候显示5行后面补灰色
//                console.log("TVheilength",hei.length)
                for(var j: number = 0;j < hei.length; j++) {
                    var itmHeit = new garbageCollection.WorksItem();
                    itmHeit.setData(hei[j],0);
                    itemArr.push(itmHeit);
                   // console.log("TVheilength",hei.length)
                    if(length11 == 0) {      //没有亮度的时候
                        if(j == 0) {
                            itmHeit.x = 0;
                            itmHeit.y = 0;
                        } else {
                            itmHeit.x = itemArr[j - 1].x + itemArr[j - 1].width + 20;
                            itmHeit.y = n * 55;
                            if(itmHeit.x + itmHeit.width > 690) {
                                n += 1
                                if(n > 4) {
                                    julu = j;
                                    lable_lookMore.visible = true;
                                    break;
                                } else if(n <= 4) {
                                    itmHeit.x = 0;
                                    itmHeit.y = n * 55;
                                    lable_lookMore.visible = false;
                                }
                            }
                        }
                        group_Item.addChild(itmHeit);
                        lable_lookMore.y = group_Item.y + group_Item.height + 10;
                        
                  } else {   //不等于0的情况  有亮有暗的情况
//                        console.log("TVheilength",hei.length)
                    itmHeit.x = itemArr[length11 - 1 + j].x + itemArr[length11 - 1 + j].width + 20;
                    itmHeit.y = n * 55;
//                        console.log(itmHeit.x,itmHeit.y,'heixy')
                    if(itmHeit.x + itmHeit.width > 690) {
                        n += 1
//                        console.log(n,"uuiiiii")
                        if(n >4) {
                            julu = j;
//                            this.isLookMore = true;
                            if(j == hei.length - 1){
                                lable_lookMore.visible = false;
                            }else{
                                lable_lookMore.visible = true;
                            }
//                            console.log(this.jilu,",<3");
                            break;
                        } else if(n <= 4) {
                            itmHeit.x = 0;
                            itmHeit.y = n * 55;
                            lable_lookMore.visible = false;
                        }
                    }
                    group_Item.addChild(itmHeit);
                    lable_lookMore.y = group_Item.y + group_Item.height + 10;
                }
              }
            } else { //亮度大于4的时候显示全部亮度
//                console.log(this.jilu,"n333333333");
                var temp: number = 0;
                for(var t: number = 0;t < hei.length;t++) {
                    var itmHeit = new garbageCollection.WorksItem();
                    itmHeit.setData(hei[t],0);
                   // console.log(hei[t],t);
                    itemArr.push(itmHeit);
                    itmHeit.x = itemArr[length11 - 1 + t].x + itemArr[length11 - 1 + t].width + 20;
                    itmHeit.y = n* 55;
                    if(itmHeit.x + itmHeit.width > 690) {
                        n += 1
                        temp += 1;
                        if(temp > 2) {
                            julu = t;
                            if(j == hei.length - 1) {
                                lable_lookMore.visible = false;
                            } else {
                                lable_lookMore.visible = true;
                            }
//                            console.log(this.jilu,">3");
                            break;
                        } else {
                            itmHeit.x = 0;
                            itmHeit.y = n * 55;
                        }
                    }
                    group_Item.addChild(itmHeit);
                    lable_lookMore.y = group_Item.y + group_Item.height + 10;
                }
            }
            
            if(type == 1){
                this.n = n;
                this.jilu = julu;
            }else if(type == 2){
                this.v = n;
                this.jiluTv = julu;
            } else if(type == 3){
                this.o = n;
                this.jiluMovie = julu;
            }
            
        }

        
        public addHeadImg(source:egret.Texture):void{
            this.img_ico.texture = source;
        }
        public addBgImg(source: egret.Texture): void {
            this.img_bg.alpha = 0.1;
            this.img_bg.texture = source;
        }
        
        public clear():void{
            
            this.scro.viewport.scrollV = 0;
            this.itemArr = [];
            this.n = 0;
            this.jilu = 0; this.isLookMore = false;
            this.lable_number.text = "0/0"    
            

            this.itemTvArr = [];
            this.v = 0;
            this.jiluTv = 0;
            this.lable_TvNumber.text = "0/0";

            this.itemMovieArr = [];
            this.o = 0;
            this.jiluMovie = 0
            this.lable_MovieNumber.text = "0/0";
            this.group_music.visible = false;
            this.group_music.y = 428;
            this.group_TV.visible = false;
            this.group_TV.y = 428;
            this.group_Movie.visible = false;
            this.group_Movie.y = 428;
            
            this.groupkMoreMusic.visible = false;
            this.groupkMoreTv.visible = false;
            this.groupkMoreMovie.visible = false;
            this.lable_NoWorks.visible = false;
            
            this.img_bg.texture = null;
            this.img_ico.texture = null;
            this.btn_Fx.visible = false;
            
            while(this.group_musicItem.numElements > 0) {
                var item: garbageCollection.WorksItem = <garbageCollection.WorksItem>this.group_musicItem.getElementAt(this.group_musicItem.numElements - 1);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while(this.group_TvItem.numElements > 0) {
                var tvItem: garbageCollection.WorksItem = <garbageCollection.WorksItem>this.group_TvItem.getElementAt(this.group_TvItem.numElements - 1);
                if(tvItem.parent) {
                    tvItem.parent.removeChild(tvItem);
                }
            }

            while(this.group_MovieItem.numElements > 0) {
                var moveItem: garbageCollection.WorksItem = <garbageCollection.WorksItem>this.group_MovieItem.getElementAt(this.group_MovieItem.numElements - 1);
                if(moveItem.parent) {
                    moveItem.parent.removeChild(moveItem);
                }
            }
            if(this.type == 2){
                GameApp.Manager.controllerManager.gameMainController.show();
            }else if(this.type == 1){
            }
            this.type = 1;
            GameApp.Manager.viewManager.garbageStage.removeChild(this);
        }
        
        private CloseItem(e: egret.Event): void {
            GameApp.Manager.controllerManager.gabageController.hide();
        }
	}
}
