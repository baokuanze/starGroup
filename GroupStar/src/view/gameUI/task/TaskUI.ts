module task {
	/**
	 *
	 * @author 
	 *
	 */
	export class TaskUI extends eui.Component{
        private btnSelf:eui.Image;
    	private obj:Object;
    	private scroll1:eui.Scroller;
    	private groupData:eui.Group;
        private groupTop:eui.Group;
        private groupBottom:eui.Group;
        private groupMRT:eui.Group;
        private iconNow: TaskIcon;
        private iconNext: TaskIcon;
        
        private lbl3: eui.Label;
        private lbl4:eui.Label;
        private lbl5: eui.Label;
        private lbl7: eui.Label;
        private lbl8: eui.Label;
        private lbl9: eui.Label;
        private lbl10: eui.Label;
        private lbl11: eui.Label;
        private lbl12: eui.Label;
        private lbl16: eui.Label;
        //private lbl17: eui.Label;
        private lblExp:eui.Label;
        private lblSignNum:eui.Label;
        private lblJjState:eui.Label;
        private lblGiftNum:eui.Label;
        private lblGroupName: eui.Label;
        
        
        private pro1:eui.ProgressBar;
        
        private btn1: eui.Rect; //btn1
        private btn2:eui.Rect;
        private btn3:eui.Rect;
        private btnClose: eui.Image;
        
        private rectTip: eui.Rect;
        private groupR: eui.Group;
        private lblr1: eui.Label;
        private groupRdata: eui.Group;
        private btnClose2: eui.Image;
        private groupRTip: eui.Group;
        
        private groupTip1:eui.Group;
        private groupTip2:eui.Group;
        private groupTip3:eui.Group;
        
        private groupOne:eui.Group;
        //private btnTaskManager:eui.Rect;
        private btn_publish:eui.Image;
        private btn_shenYue:eui.Image;
        private btn_guangLi:eui.Image;
        
        private lable_publish:eui.Label;
        private lable_shenYue:eui.Label;
        private lable_guangLi:eui.Label;
        private lable_qunTitle:eui.Label;
        
        private lblGroupBook:eui.Label;
        private btnGroupBook:eui.Label;
        private rect_1:eui.Rect;
        private group_book:eui.Group;
        
        //public signIn:SignIn;//签到
//        public aggregation:AggregationIcon1;//集结
//        public giftCf:GiftCf;//众筹
        private taskOpenArr:Array<TaskOpen>=[];
        private state:string="1";
        
        public disHavaTask:number = 0;   //用于充值时
        //繁星守护
        public group_puyLove:eui.Group;
        private lable_starDes:eui.Label;
        private lable_buy:eui.Label;
        private lable_xuangroup:eui.Label;
        private btn_Xuangroup:eui.Image;
        public static isCanByLiBao:boolean = false;
        public static stars_guard_valid: boolean = false;
        public  xuanGrop:groupXuan.TaskGroupXuan;
        private lable_joinGroup:eui.Label;
        private btn_joinGroup:eui.Image;
        private group_join:eui.Group; 
        private group_xuanqun:eui.Group;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/TaskUISkin.exml";
            this.iconNow = new TaskIcon();
            this.iconNext = new TaskIcon();
            this.xuanGrop = new groupXuan.TaskGroupXuan();
//            this.signIn = new SignIn();
//            this.aggregation=new AggregationIcon1();
//            this.giftCf=new GiftCf();
      
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
                this.lblr1.fontFamily="Heiti SC";
                this.lblExp.fontFamily = "Heiti SC";
                this.lblSignNum.fontFamily = "Heiti SC";
                this.lblJjState.fontFamily = "Heiti SC";
                this.lblGiftNum.fontFamily = "Heiti SC";
                this.lblGroupName.fontFamily = "Heiti SC";
                this.lable_publish.fontFamily = "Heiti SC";
                this.lable_shenYue.fontFamily = "Heiti SC";
                this.lable_guangLi.fontFamily = "Heiti SC";
                this.lable_qunTitle.fontFamily = "Heiti SC";
                this.lblGroupBook.fontFamily="Heiti SC";
                this.lable_starDes.fontFamily = "Heiti SC";
                this.lable_buy.fontFamily = "Heiti SC";
                this.lable_xuangroup.fontFamily = "Heiti SC";
                this.lable_joinGroup.fontFamily = "Heiti SC";
            }  
            
            this.lable_starDes.textFlow = (new egret.HtmlTextParser).parser("繁星特惠福利" + "<font color = 0xff0000>[1元真爱礼包30钻]</font>")
            this.scroll1.height = this.stage.stageHeight;
//            this.groupBottom.addChild(this.signIn);
            this.groupData.addChildAt(this.iconNow,3);
            this.groupData.addChildAt(this.iconNext,3);
            this.iconNow.x = 55; this.iconNow.y = 130;
            this.iconNext.x = 580; this.iconNext.y = 130;
//            this.groupTab1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.forwardMain,this);
//            this.btnGroupRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnGroupRank_tap,this);
//            this.btnGXRank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnGXRank_tap,this);
            this.btnClose2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close2,this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn1_tap,this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn2_tap,this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btn3_tap,this);
//            this.btnTaskManager.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
//                GameApp.Manager.controllerManager.groupManagerController.show();
//                GameApp.Manager.controllerManager.taskController.hide();
//                },this);
            this.btn_publish.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                GameApp.Manager.controllerManager.groupManagerController.show("发布任务");
                GameApp.Manager.controllerManager.taskController.hide();
                GameApp.Manager.viewManager.groupManager.hostManager.task_publish();
            },this);
            
            this.btn_shenYue.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                GameApp.Manager.controllerManager.groupManagerController.show("审阅任务");
                GameApp.Manager.controllerManager.taskController.hide();
                GameApp.Manager.viewManager.groupManager.hostManager.task_shenYue();
            },this);
            
            this.btn_guangLi.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                GameApp.Manager.controllerManager.groupManagerController.show("管理任务");
                GameApp.Manager.controllerManager.taskController.hide();
                GameApp.Manager.viewManager.groupManager.hostManager.task_guangLi();
            },this);
            
            this.btn_joinGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                aler.AlertPanel.getInstance().show("更改入驻明星","只能更改一次且本群贡献清零，请谨慎使用","取消","确定",function(data){
                        if(data=="ok"){
                            GameApp.Manager.controllerManager.taskController.hide();
                            GameApp.Manager.viewManager.starPageManager.show(1);
                        }
                    },this);
                },this)
            
            this.btnSelf.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e: egret.Event) {
                userPanel.UserPanel.getInstance().open(GameApp.Manager.dataManager.uid,GameApp.Manager.dataManager.bid,GameApp.Manager.dataManager.group_openid);
                e.stopPropagation();
            },this);
            this.btnGroupBook.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.taskController.hide();
                system.GroupBookUI.getInstance().show();
            },this);
            var self: TaskUI = this;
            this.group_puyLove.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                if(TaskUI.isCanByLiBao){
                    pay.PayUI.getInstance().btn8_tap();
                }else{
                    system.TipText.produce().open("一天只能买一次",800,500);
                }
            },this);
                
            this.btn_Xuangroup.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                self.xuanGrop.setData();
                self.addChild(self.xuanGrop);
            },this);
        }
        
        public static changeCanBuy():void{
            this.isCanByLiBao = true;
        }
        
        public static changePosOfTask():void{
            this.stars_guard_valid = true;
        }
        
        
        public setData(obj:Object):void{
            if(GameApp.Manager.dataManager.resetState == 1){
                this.group_join.visible = false
            } else if(GameApp.Manager.dataManager.resetState == 0){
                this.group_join.visible = true;
            }
            
            this.disHavaTask = 1;
            this.obj=obj;
            var data1 = obj["groupInfo"];
            this.lblGroupName.text = window["hexToDec"](data1["group_name"]);
            this.iconNow.setText(data1["level"]);
            this.iconNext.setText(data1["level"] + 1);
            this.lblExp.text = data1["exp"] + "/" + data1["need_exp"] + "";
            this.pro1.value = (data1["exp"] / data1["need_exp"]) * 100;
            this.lblSignNum.text = "每日签到(" + obj["signedUserCount"]+ "/" + data1["member_num"]+")";
            this.jjstate();
            this.setGiftCfPro();
            this.setTaskOpen();
            this.setCelebrity();//名人堂
            
            var vote:number = 355
            var h1:number = 95;
            var h2:number = 172;
            var h3:number = 98;
            this.groupOne.y = vote;
            this.groupBottom.y = vote;
            if(TaskUI.isCanByLiBao){
                this.groupOne.y += h1;
                this.groupBottom.y += h1;
                if(GameApp.Manager.dataManager.is_owner){
                    this.groupBottom.y += h2;
                    if(TaskUI.stars_guard_valid || GameApp.Manager.dataManager.resetState==0){
                        this.groupBottom.y += h3;
                        if(TaskUI.stars_guard_valid ){
                            this.group_xuanqun.visible = true;
                        }
                    }
                }
            }else{
                if(GameApp.Manager.dataManager.is_owner){
                    this.groupBottom.y += h2;
                    if(TaskUI.stars_guard_valid || GameApp.Manager.dataManager.resetState == 0){
                        this.groupBottom.y += h3;
                        if(TaskUI.stars_guard_valid) {
                            this.group_xuanqun.visible = true;
                        }
                    }
                }            
            }
            
            if(GameApp.Manager.dataManager.is_owner){
                this.group_book.visible = true
            }else{
                this.group_book.visible = false;
            }
            
        }
        
        public changeLiBaoPos():void{
            TaskUI.isCanByLiBao = false;
            if(GameApp.Manager.dataManager.is_owner){
                this.groupOne.y = 356;
                this.groupBottom.y = 630;
                this.group_xuanqun.visible = true;
            }else{
                this.groupBottom.y = 355;
            }
        } 
        
        public reSetAllPos():void{
            this.groupBottom.y = 769;
            this.groupOne.y = 486;
        }
        
        private setCelebrity():void{
            this.clearMRT();
            var arr: Array<Object> = this.obj["celebrityArray"];
            if(arr) {
                for(var i: number = 0;i < arr.length;i++) {
                    var obj: Object = arr[i];
                    var item: TaskHallofFame = TaskHallofFame.produce();
//                    item.y = (364 + 155) + 1 + i * 155;
                    this.groupMRT.addChild(item);
                    switch(i){
                        case 0: case 1: case 2: item.setData(obj,i + 1);break;
                        default: item.setData(obj);break;
                    }
               
                }
            }
        }
        private setTaskOpen():void{
            this.clearTaskOpen();
            var arr: Array<Object> = this.obj["openTaskArray"];
            if(arr){
                for(var i:number=0;i<arr.length;i++){
                    var obj:Object=arr[i];
                    var item:TaskOpen=TaskOpen.produce();
                    item.y=(322+160)+1+i*160;
                    this.groupBottom.addChild(item);
                    item.setData(obj,1);
                    this.taskOpenArr.push(item);
                }
            }
            var arr1: Array<Object> = this.obj["extensionTaskArray"];
            if(arr1) {
                for(var i: number = 0;i < arr1.length;i++) {
                    var obj: Object = arr1[i];
                    var item: TaskOpen = TaskOpen.produce();
                    item.y = (322 + 160) + 1 + (i+arr.length) * 160;
                    this.groupBottom.addChild(item);
                    item.setData(obj,2);
                    this.taskOpenArr.push(item);
                }
            }
        }
        public setGiftCfPro():void{
            this.lblGiftNum.text = window["hexToDec"](GiftCf.obj["current"]["info"]["name"])+"(进度"+parseInt((GiftCf.obj["current"]["info"]["num"] / GiftCf.obj["current"]["info"]["need_num"]) * 100 + "") + "%)";
            this.lbl5.text = "" + GameApp.Manager.dataManager.star_name + "+" + GiftCf.obj["current"]["info"]["star_hot"] + "热度,本群+" + GiftCf.obj["current"]["info"]["group_exp"] + "经验";
        }
        public groupMass():void{//接受服务器数据
//            clearInterval(this.timeVar);
            this.jjstate();
        }
        private task_time: number;
        private task_timeJilu: number;
        private timeVar:any;
        
        private jjstate():void{
            if(this.timeVar){
                clearInterval(this.timeVar);
            }
            if(AggregationIcon1.Allobj["date"] > 0) {//冷却中
                var self:TaskUI=this;
                this.task_time = AggregationIcon1.Allobj["date"];
                this.task_timeJilu = new Date().getTime();
                var djs: number = this.task_time - (this.task_timeJilu - AggregationIcon1.crrentTime);
                if(djs > 0) {//可以倒计时
                    this.timeVar = setInterval(function() {
                        var NowTime = new Date().getTime();
                        var t: number = djs - (NowTime - self.task_timeJilu);
                        self.lblJjState.textFlow = (new egret.HtmlTextParser).parser("粉丝集结号 (<font color=#ff0000>不可集结 " + Tools.getInstance().formatTime2(t)+"</font>)");
                        if(t <= 0) {
                            clearInterval(self.timeVar);
                            self.lblJjState.text = "粉丝集结号(发起集结)";
                            AggregationIcon1.Allobj["date"]=0;
                        }
                    },980,this);
                    self.lblJjState.textFlow = (new egret.HtmlTextParser).parser("粉丝集结号 (<font color=#ff0000>不可集结 " + Tools.getInstance().formatTime2(djs) + "</font>)");
                }
            } else {//可集结
                if(AggregationIcon1.Allobj && AggregationIcon1.Allobj["time"]){
                    this.lblJjState.text = "粉丝集结号(集结中)";
                }else{
                    this.lblJjState.text = "粉丝集结号(发起集结)";
                }
            }
        }
        private help(e:egret.Event):void{
            var obj:Object=e.data;
            if(obj["state"] == "open") {
                switch(obj["type"]+"") {
                    case "1":
                        this.groupTip1.visible=true;
                        console.log('open1');
                        break;
                    case "3":
                        this.groupTip3.visible = true;
                        console.log('open3');
                        break;
                }
            }else{
                switch(obj["type"]+"") {
                    case "1":
                        this.groupTip1.visible = false;
                        console.log('close1');
                        break;
                    case "3":
                        this.groupTip3.visible = false;
                        console.log('close3');
                        break;
                }
            }
        }
        private signOK(e:egret.Event):void{
            console.log('签到成功:',e.data);
            var obj:Object=e.data;
            var self: TaskUI = this;
            var addJY: number = this.obj["signInfo"]["each_sign_group_exp"];
            this.lblSignNum.text = this.obj["signedUserArray"].length + "/" + this.obj["groupInfo"]["member_num"];
            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
            GameApp.Manager.viewManager.gameMainUI.setLucky();
            if(this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"] >= this.obj["groupInfo"]["need_exp"]) {//升级
                this.lblExp.text = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"] - this.obj["groupInfo"]["need_exp"]) + "/" + this.obj["groupInfo"]["next_exp"] + "";
                this.pro1.slideDuration = 0;
                this.pro1.value = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"] - this.obj["groupInfo"]["need_exp"]) / this.obj["groupInfo"]["next_exp"] * 100;
                this.obj["groupInfo"]["level"]=this.obj["groupInfo"]["level"]+1;
                this.iconNow.setText(this.obj["groupInfo"]["level"] );
                this.iconNext.setText(this.obj["groupInfo"]["level"] + 1);
                this.obj["groupInfo"]["exp"] = (this.obj["groupInfo"]["exp"] + addJY - this.obj["groupInfo"]["need_exp"]);
                this.obj["groupInfo"]["need_exp"] = this.obj["groupInfo"]["next_exp"];
                setTimeout(function() {
                    self.pro1.slideDuration = 1500;
                },this);
            } else {
                this.lblExp.text = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"]) + "/" + this.obj["groupInfo"]["need_exp"] + "";
                this.pro1.value = (this.obj["groupInfo"]["exp"] + addJY + obj["add_group_exp"]) / this.obj["groupInfo"]["need_exp"] * 100;
                this.obj["groupInfo"]["exp"] = (this.obj["groupInfo"]["exp"] + addJY);
            }
        }
        public addGroupExp(obj:Object):void{
            var self: TaskUI = this;
            if(obj["group_exp"]<this.obj["groupInfo"]["exp"]){
                this.pro1.slideDuration = 0;
                setTimeout(function() {
                    self.pro1.slideDuration = 1500;
                },this);
            }
            this.obj["groupInfo"]["exp"] = obj["group_exp"];
            this.obj["groupInfo"]["level"] = obj["group_level"];
            this.obj["groupInfo"]["need_exp"] = obj["group_need_exp"];
            this.obj["groupInfo"]["next_exp"] = obj["group_next_exp"];
            this.lblExp.text = (this.obj["groupInfo"]["exp"]) + "/" + this.obj["groupInfo"]["need_exp"] + "";
            this.pro1.value = (this.obj["groupInfo"]["exp"] ) / this.obj["groupInfo"]["need_exp"] * 100;
            this.iconNow.setText(this.obj["groupInfo"]["level"]);
            this.iconNext.setText(this.obj["groupInfo"]["level"] + 1);
        }
        public btn1_tap(): void {//x:28,279,529
            GameApp.Manager.controllerManager.taskController.hide();
            GameApp.Manager.controllerManager.signController.show(1);
        }
        public btn2_tap(e:egret.Event): void {
            console.log(AggregationIcon1.Allobj,"点击");
            if(AggregationIcon1.Allobj["date"] > 0) {//冷却中
                return;
            } else {//可集结  发起集结
                if(AggregationIcon1.Allobj["time"]){  //1可以集结 2集结中
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(1,2);
                }else{
                    GameApp.Manager.controllerManager.taskController.hide();
                    GameApp.Manager.controllerManager.aggregationController.show(1,1);
                }
            }
        }
        public btn3_tap(): void {
            GameApp.Manager.viewManager.taskManager.giftCfManager.show(1);
            GameApp.Manager.controllerManager.taskController.hide();
        }
        private btnGroupRank_tap():void{
            GameApp.Manager.controllerManager.rankGroupController.show();
            GameApp.Manager.controllerManager.taskController.hide();
        }
        private btnGXRank_tap():void{
            GameApp.Manager.controllerManager.rankGroupContributionController.show(1);
            GameApp.Manager.controllerManager.taskController.hide();
        }
        private load_end(s:egret.Texture):void{
        }
        public getStringLen(str): string {
            var len = 0;
            var newStr = '';
            for(var i = 0;i < str.length;i++) {
                var length = str.charCodeAt(i);
                if(length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
                if(len < 84) {
                    newStr += str[i];
                }
            }
            return newStr;
        }
        public clear():void{
            this.scroll1.viewport.scrollV = 0;
            clearInterval(this.timeVar);
            this.clearTaskOpen();
           this.clearMRT();
        }
        private clearTaskOpen():void{
            while(this.taskOpenArr.length > 0) {
                var item: TaskOpen = this.taskOpenArr.pop();
                TaskOpen.reclaim(item);
                if(item.parent)
                    item.parent.removeChild(item);
            }
        }
        private clearMRT():void{
            while(this.groupMRT.numElements > 0) {
                var item1: TaskHallofFame = <TaskHallofFame>this.groupMRT.getElementAt(this.groupMRT.numElements - 1);
                TaskHallofFame.reclaim(item1);
                if(item1.parent)
                    item1.parent.removeChild(item1);
            }
        }
        private forwardMain(e:egret.Event):void{
            this.close();
        }
        public close():void{
            this.pro1.value = 0;
            this.groupOne.y =355;
            this.groupBottom.y=355;
            this.groupTip1.visible=false;
            this.groupTip3.visible=false;
            this.close2();
            GameApp.Manager.controllerManager.gameMainController.show();
            GameApp.Manager.controllerManager.taskController.hide();
        }
        private close2(): void {
            this.groupR.visible = false;
            this.rectTip.visible = false;
        }
	}
}
