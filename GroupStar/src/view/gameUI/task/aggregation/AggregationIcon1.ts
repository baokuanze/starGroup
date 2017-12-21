module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class AggregationIcon1 extends eui.Component{
        public type:number=0;
        private lable_time:eui.Label;
        private lable_personCount:eui.Label;
        private lable_contribute:eui.Label;
        private lable_hZQY:eui.Label;
        private btn_jHZ:eui.Image;
        private img_startImg:eui.Image;
        public group_icon:eui.Group;
        public group_up:eui.Group;
        public static Allobj: Object; //所有数据
        public static crrentTime:number = 0; //更新的时间
        public static isChange:boolean = false;
        private task_timeJilu:number = 0; //记录时间
        private timeVar:number = 0;// 倒计时
        private btn_comeBack:eui.Image;
        public aggregationUp: aggregation.AggregationIconUp;
        private static img_buttonIcon:string;//最地下的图片；
        private iconCount:number; //人数;
        private Myself: aggregation.AggregationIcon;//自己的
        private isHer:Boolean = false;//判断自己还在不在；
        private img0: eui.Image;
        private img1: eui.Image;
        private img2: eui.Image;
        private img3: eui.Image;
        private img4: eui.Image;
        private img5: eui.Image;
        private img6: eui.Image;
        private img7: eui.Image;
        private img8: eui.Image;
        private img9: eui.Image;
        private btn_startJijie:eui.Rect; //发起集结
        private lable_jijie:eui.Label;
        
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/aggregation/AggregationIcon1Skin.exml";
		}
		
        public childrenCreated(): void {
            var self:AggregationIcon1 = this;
            if(Tools.getInstance().isIphone()) {
                this.lable_time.fontFamily = "Heiti SC";
                this.lable_personCount.fontFamily = "Heiti SC";
                this.lable_contribute.fontFamily = "Heiti SC";
                this.lable_hZQY.fontFamily = "Heiti SC";
                this.lable_jijie.fontFamily = "Heiti SC";
             }
            
            this.btn_startJijie.addEventListener(egret.TouchEvent.TOUCH_TAP,this.starJi,this); //发起集结
            this.btn_jHZ.addEventListener(egret.TouchEvent.TOUCH_TAP,this.zhqy,this);
            this.btn_comeBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.comeToHost,this);
            this.img0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchOneImg,this);
            this.img1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchtwoImg,this);
            this.img2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchthreeImg,this);
            this.img3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchffourImg,this);
            this.img4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchfiveImg,this);
            this.img5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchsixImg,this);
            this.img6.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchsevenImg,this);
            this.img7.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toucheightImg,this);
            this.img8.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchfnineImg,this);
            this.img9.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchtenImg,this);
            this.lable_contribute.textFlow = (new egret.HtmlTextParser).parser("集结成功，群经验+100,在线玩家" + "<font color= #ff0000 size= 32>+10</font>"+"钻");
         }
         
        public touchOneImg(e:egret.Event):void{
            this.changPOs(0);
            this.updateHostImg(0);
       }
        public touchtwoImg(e: egret.Event):void{
           this.changPOs(1);
           this.updateHostImg(1);
        }
        public touchthreeImg(e: egret.Event):void{
            this.changPOs(2);
            this.updateHostImg(2);
        }
        public touchffourImg(e: egret.Event): void {
            this.changPOs(3);
            this.updateHostImg(3);
        }
        public touchfiveImg(e: egret.Event): void {
            this.changPOs(4);
            this.updateHostImg(4);
        }

        public touchsixImg(e: egret.Event): void {
            this.changPOs(5);
            this.updateHostImg(5);
        }
        public touchsevenImg(e: egret.Event): void {
            this.changPOs(6);
            this.updateHostImg(6);
        }
        public toucheightImg(e: egret.Event): void {
            this.changPOs(7);
            this.updateHostImg(7);
        }
        public touchfnineImg(e: egret.Event): void {
            this.changPOs(8);
            this.updateHostImg(8);
           
        }
        public touchtenImg(e: egret.Event): void {
            this.changPOs(9);
            this.updateHostImg(9);
        }

        
        public changPOs(num:number):void{
            var img = this.group_icon.getElementAt(num);
            var mySelfIcon = this.getMyselfIcon();
            this.Myself = mySelfIcon;
            mySelfIcon.x = img.x;
            mySelfIcon.y = img.y;
        }
        
       public getMyselfIcon():aggregation.AggregationIcon{
           var num = this.group_up.numElements;
           for(var i:number = 0;i<num; i++){
               var item = <aggregation.AggregationIcon>this.group_up.getElementAt(i);
               if(item.userId == GameApp.Manager.dataManager.uid ){
                   return item;
              }
           }
       }
         
        public static setData(obj: Object): void {    //初始化数据；
            this.Allobj = obj;
            this.img_buttonIcon = obj["star_img"];
            AggregationIcon1.activeObject();
        }
        
        public static updateChangeValue(obj: Object): void {  //后端每次push过来的值
           this.Allobj = obj
//           console.log("后端每次push",obj);
           AggregationIcon1.activeObject();
           this.img_buttonIcon = obj["star_img"]?obj["star_img"]:this.img_buttonIcon;
         
           if(AggregationIcon1.isChange){
               AggregationIcon1.isChange = false;
               GameApp.Manager.viewManager.aggregation.aggregation.upTriceIcon();          
           }
           
           if(GameApp.Manager.viewManager.aggregation.aggregation){
             GameApp.Manager.viewManager.aggregation.aggregation.showAgger();
             GameApp.Manager.viewManager.aggregation.aggregation.isHer = false;
           }
           task.TaskManager.groupMass();
        }
        
        public upTriceIcon():void{
            
            if(!GameApp.Manager.viewManager.aggregation.aggregation.Myself) {
                GameApp.Manager.viewManager.aggregation.aggregation.showAgger();
                console.log("false");
                this.isHer = false;
            } else {
                this.isHer = true;
                console.log("true");
                var groupUp = GameApp.Manager.viewManager.aggregation.aggregation.group_up;
                while(groupUp.numElements > 0) {
                    var item: aggregation.AggregationIcon = <aggregation.AggregationIcon>groupUp.getElementAt(groupUp.numElements - 1);
                    if(item.userId == this.Myself.userId) { //自己保留
                        groupUp.removeChild(this.Myself);
                    } else { //别的删除；
                        aggregation.AggregationIcon.reclaim(item);
                        if(item.parent) {
                            item.parent.removeChild(item);
                        }
                    }
                }
                GameApp.Manager.viewManager.aggregation.aggregation.showAgger();
            }
        }
        
        public static activeObject(): void {//接受服务器数据 处理本地时间数据
            this.crrentTime = new Date().getTime();
                console.log("type",this.Allobj);
            if(this.Allobj["type"] && this.Allobj["type"] == 2) {
//                console.log("type",this.Allobj);
//                if(this.Allobj["times"] > 1 && this.Allobj["times"] <= 10 ){
//                    aler.AlertPanel1.getInstance().show("恭喜！本群集结成功！","本群经验+100，钻石+10","确定");
////                    aler.AlertPanel1.getInstance().lblTitle.size = 25
//                } else if(this.Allobj["times"] > 10 && this.Allobj["times"] <= 20){
//                    aler.AlertPanel1.getInstance().show("今日参与集结次数超过10次，钻石奖励减半","本群经验+100，钻石+5","确定");
////                    aler.AlertPanel1.getInstance().lblTitle.size = 28;
//                } else if(this.Allobj["times"] > 20 ) {
//                    aler.AlertPanel1.getInstance().show("今日参与集结次数超过20次，不再获得钻石奖励","本群经验+100","确定");
////                    aler.AlertPanel1.getInstance().lblTitle.size = 25;
//                }
            }
        }
        
        public addUpImg():void{
          
            this.aggregationUp = new aggregation.AggregationIconUp();
            this.aggregationUp.x = 157; this.aggregationUp.y = 254;
            this.addChild(this.aggregationUp);
        }
        
        //显示数据
        public showAgger():void{
            var self: AggregationIcon1 = this;
            var obj: Object = AggregationIcon1.Allobj; 
            if(!AggregationIcon1.isChange) {
                AggregationIcon1.isChange = true;
                switch(obj["type"]) {
                    case 1:
//                        console.log("==++++====+++====+++====+++====")
                        this.lable_jijie.visible = false;
                        this.btn_startJijie.visible = false;
                        this.lable_time.visible = true;
                        this.lable_personCount.visible = true;
                    
                        if(!obj["user_list"]){
                            return;
                        }
                        this.lable_personCount.text = "在线人数" + obj["user_list"].length + "/" + "10";
                        var count = obj["user_list"].length;
                        if(count>= 9){
                           this.iconCount = 9
                        }else{
                           this.iconCount = count;
                        }
                        self.task_timeJilu = new Date().getTime();
                        var djs: number = obj["time"] - (this.task_timeJilu - AggregationIcon1.crrentTime);
                        clearInterval(self.timeVar);
                        self.timeVar = setInterval(function() {
                            var NowTime = new Date().getTime();
                            var t = djs - (NowTime - self.task_timeJilu);
                            self.lable_time.text = "还差"  + Tools.getInstance().formatTime4(t) + "结束";
                            if(t <= 0) {
                                clearInterval(self.timeVar);
                            }
                        },980);
                        self.lable_time.text = "还差" + Tools.getInstance().formatTime4(djs) + "结束";
                       
                        if(!this.isHer){       // 自己都不在的情况
                            console.log("false");
                            var num = this.aggregationUp.group_iconFM.numElements;
                            for(var i: number = 0;i < num;i++) {
                                this.aggregationUp.group_iconFM.getElementAt(i).visible = true;
                            }
    
                            while(this.group_up.numElements > 0) {
                                var item: aggregation.AggregationIcon = <aggregation.AggregationIcon>this.group_up.getElementAt(this.group_up.numElements - 1);
                                aggregation.AggregationIcon.reclaim(item);
                                if(item.parent) {
                                    this.group_up.removeChild(item);
                                }
                            }
                           
                            for(var i: number = 0;i < obj["user_list"].length;i++) {
                                var item = aggregation.AggregationIcon.produce();
                                item.x = this.group_icon.getChildAt(i).x;
                                item.y = this.group_icon.getChildAt(i).y;
                                this.group_up.addChild(item);
                                item.Index=i;
                                var icon = this.aggregationUp.group_iconFM.getChildAt(i);
                                icon.visible = false;
                                item.setData(obj["user_list"][i]);
                                if(obj["user_list"][i]["user_id"]==GameApp.Manager.dataManager.uid){
                                    this.Myself=item;
                                }
                            }
                    }


                    if(this.isHer){  //自己还在情况
                        console.log("showAgger  true");
                        var num = this.aggregationUp.group_iconFM.numElements;
                        for(var i:number = 0;i<num;i++){
                            this.aggregationUp.group_iconFM.getElementAt(i).visible = true;
                        }
                        
                        var i:number=0;var n:number=0;
                        var bo:boolean=true
                        while(bo){
                            var it = obj["user_list"][i];
                            if(it["user_id"]!= this.Myself.userId){  
                                if(n==this.Myself.Index){
                                        n++;
                                        console.log('n++le:'+n);
//                                    }
                                }
                                var item = aggregation.AggregationIcon.produce();
                                item.x = this.group_icon.getChildAt(n).x;
                                item.y = this.group_icon.getChildAt(n).y;
                                this.group_up.addChild(item);
                                item.Index = n;
                                var icon = this.aggregationUp.group_iconFM.getChildAt(n);
                                icon.visible = false;
                                item.setData(it);
                                console.log('n='+n);
                                n++;
                            }else{  
                                console.log('添加自己'+this.Myself.Index);
                                this.group_up.addChild(this.Myself);
                                this.Myself.x = this.group_icon.getChildAt(this.Myself.Index).x;
                                this.Myself.y = this.group_icon.getChildAt(this.Myself.Index).y;
                                var icon = this.aggregationUp.group_iconFM.getChildAt(this.Myself.Index);
                                icon.visible = false;
                                if(this.Myself.Index<=i){
                                    n++;
                                }
                            }
                            i++;
                            if(i == obj["user_list"].length) {
                                bo=false; break;
                            }
                        }
                    }
                        RES.getResByUrl(task.AggregationIcon1.img_buttonIcon,self.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
                        break;
                    //成功
                    case 2:
                     //加群经验
                        if(GameApp.Manager.viewManager.taskManager.taskUI)
                            GameApp.Manager.viewManager.taskManager.taskUI.addGroupExp(obj);
                        clearInterval(this.timeVar);
                        this.clear();
                        AggregationIcon1.Allobj["type"] = -1;
                        this.close();
                        break;
                    //失败
                    case 3:
                        clearInterval(this.timeVar);
                        this.clear();
                        AggregationIcon1.Allobj["type"] = -1;
                        this.close();
                        break;
                }    
            }
        }
        
        public load_personIcon(souce:egret.Texture):void{
            this.img_startImg.texture = souce;
            this.img_startImg.width = 436;
            this.img_startImg.height = 702;
        }
        
        
        public updateHostImg(t:number):void{

           var myself = this.getMyselfIcon(); 
           var index:number = myself.Index;
           this.aggregationUp.group_iconFM.getElementAt(index).visible = true; //原来的
           this.aggregationUp.group_iconFM.getElementAt(t).visible = false; //现在的
           myself.Index = t;
           
        }
        
        
        
        public clear():void{
            this.img_startImg.texture = null;  //中间大的图片删除
            this.removeChild(this.aggregationUp); // 最上面的图片删除
            this.Myself = null;                 //
            AggregationIcon1.isChange = false;
            this.isHer = false;
            while(this.group_up.numElements > 0) {
                var item: aggregation.AggregationIcon = <aggregation.AggregationIcon>this.group_up.getElementAt(this.group_up.numElements - 1);
                aggregation.AggregationIcon.reclaim(item);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
        }
        
        public starJi(e:egret.Event):void{
            
            socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendjijie,{},function(data: Object) {
            },this);

            GameApp.Manager.viewManager.aggregation.aggregation.upTriceIcon();
            this.lable_jijie.visible = false;
            this.btn_startJijie.visible = false;
            this.lable_time.visible = true;
            this.lable_personCount.visible = true;
            
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
//            Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriendsForMass",
//                { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,count: this.iconCount,sign: sign },function(obj: Object) {
//                    system.Share.share(obj,function(n: number) {
//                        if(n == 1){
//                            system.TipText.produce().open("发送成功");
//                        }
//                    });
//                },true,this);
        }
        
        
        public zhqy(e:egret.Event):void{
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriendsForMass",
                { user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,count:this.iconCount, sign: sign },function(obj: Object) {
                    system.Share.share(obj,function(n: number) {
                        if(n == 1)
                            system.TipText.produce().open("发送成功");
                    });
                },true,this);
        }
           
        
        public comeToHost(e:egret.Event):void{
           this.close();
        }
        private close():void{
            this.lable_jijie.visible = true;
            this.btn_startJijie.visible = true;
            this.lable_time.visible = false;
            this.lable_personCount.text = "";
            this.lable_personCount.visible = false;
            
            if(this.type==0){
                GameApp.Manager.controllerManager.aggregationController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            }else{
                GameApp.Manager.controllerManager.aggregationController.hide();
                GameApp.Manager.controllerManager.taskController.show();
            }
            
        }
	}
}
