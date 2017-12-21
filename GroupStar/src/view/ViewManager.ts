module view {
    /**
    *
    * @author 
    *
    */
    export class ViewManager {
        private manager: Manager;
        public backGround: module.BaseEuiImage;
        //自适应事件对象        
        private resizeEventArray = new Object();
        //游戏舞台层
        private UIStage: eui.UILayer ;
        //游戏底层UI层
        public BottomUIStage: eui.Group;
        //游戏特效层
        public GameEffect: eui.Group;
        //游戏TopUI层
        public TopUIStage: eui.Group;
        //游戏garbage层
        public garbageStage:eui.Group;
        //加载视图
        public loading: loader.Loading;
        //主UI管理类
        public gameMainManager: mainUI.GameMainManager;
        //主UI
        public gameMainUI: mainUI.GameMainUI;
        //明星排行
        public rankStarManager:rankStar.RankStarManager;
        //群贡献月榜
        public rankGroupContributionManager:rankGroupContribution.RankGroupContributionManager;
        //个人贡献月榜
        public rankUserContributionManager:rankUserContribution.RankUserContributionManager;
        //支付页面
        public payManager:pay.PayManager;
        //明星入驻页面
        public starPageManager:starPage.StarPageManager;
        //任务页面
        public taskManager:task.TaskManager;
        //群排行
        public rankGroupManager:rankGroup.RankGroupManager;
//        public alertManager: aler.AlertManager;
        //粉丝团招募页面
        public fansRecruitManager:fansRecruit.FansRecruitManager;
        //上传页面
        public uploadManager:upload.UploadManager;
        public newStarManager:newstar.NewStarManager;
        //周推送
        public weekPushManage:weekPush.WeekPushManage;
        //星粉TV
        public starFanTVManager:starfanstv.StarFansTVManager;
        //月绑定
        public monthTieManager:monthTie.MonthTieManager;
        //签到
        public sign:signIn.SignInManager;
        //   粉丝集结
        public aggregation: task.AggregationManager;
        //群管理
        public groupManager: groupManagement.GroupManager;
        //群管理中的审计
        public groupManagerAudit: groupManagement.GroupManagementAuditManager;
        //直播间
        public liveChatRoomManager:live.LiveChatRoomManager;
        //明星头条
        public headLinesManager:headLines.HeadlinesManager;
        //明星头条明细
        public headLinesItemInfoManager: headLines.HeadLineItemInfoManager;
        //作品收集
        public garbageCollectionManager:garbageCollection.GarbageCollectionManager;
        //首次登陆排行
        public topRankGroupManager: TopScreenOfGroupRank.TopGroupRankManager;
        //转盘
        public sweepsTasksManager:sweepsTasks.SweepsTasksManager;
        //羽泉购票
        public buyTicketActiveManager:buyTicketActive.BuyTicketManager;
     
        
        private uicloseCall: Function;
        private scope: any;
        public constructor(manager:Manager) {
            this.manager = manager;
            this.viewInit(); 
            this.loading = new view.loader.Loading(this);
            this.gameMainManager = new mainUI.GameMainManager(this);
            this.rankStarManager=new rankStar.RankStarManager(this);
            this.payManager=new pay.PayManager(this);
            this.starPageManager=new starPage.StarPageManager(this);
            this.taskManager=new task.TaskManager(this);
            this.rankGroupManager=new rankGroup.RankGroupManager(this);
            this.rankGroupContributionManager=new rankGroupContribution.RankGroupContributionManager(this);
            this.rankUserContributionManager=new rankUserContribution.RankUserContributionManager(this);
            this.fansRecruitManager=new fansRecruit.FansRecruitManager(this);
            this.uploadManager=new upload.UploadManager(this);
            this.newStarManager=new newstar.NewStarManager(this);
            this.weekPushManage = new weekPush.WeekPushManage(this);
            this.starFanTVManager=new starfanstv.StarFansTVManager(this);
            this.monthTieManager = new monthTie.MonthTieManager(this);
            this.sign = new signIn.SignInManager(this);
            this.aggregation = new task.AggregationManager(this);
            this.groupManager = new groupManagement.GroupManager(this);
            this.groupManagerAudit = new groupManagement.GroupManagementAuditManager(this);
            this.liveChatRoomManager=new live.LiveChatRoomManager(this);
            this.headLinesManager = new headLines.HeadlinesManager(this);
            this.headLinesItemInfoManager = new headLines.HeadLineItemInfoManager(this);
            this.garbageCollectionManager = new garbageCollection.GarbageCollectionManager(this);
//            this.topRankGroupManager = new TopScreenOfGroupRank.TopGroupRankManager(this);
            this.sweepsTasksManager = new sweepsTasks.SweepsTasksManager(this);
            this.buyTicketActiveManager = new buyTicketActive.BuyTicketManager(this);
//            this.alertManager = new aler.AlertManager(this);
        }
        public setUIClose(call:Function,scope:any,bo:boolean=true): void { 
            if(this.uicloseCall&&bo) { 
                this.uicloseCall.call(this.scope);
                this.uicloseCall = null;
            }
            this.uicloseCall = call;
            this.scope = scope;
        } 
        
        public update(ct:number): void {
            this.gameMainUI.update(ct);
            if(live.LiveTalkChat._instance){
                live.LiveTalkChat.getInstance().update(ct);
            }
//            if(this.liveChatRoomManager.liveChatRoomUI)
//                this.liveChatRoomManager.liveChatRoomUI.liveTalkChat.update(ct);
//            this.user.update(ct);
        }
        public showBackGroup():void{
            this.backGround.visible=true;
        }
        public hideBackGroup():void{
            this.backGround.visible=false;
        }
        public viewInit(): void { 
            this.UIStage = new eui.UILayer(); 
            this.backGround = new module.BaseEuiImage();
            this.BottomUIStage = new eui.Group();
            this.GameEffect = new eui.Group();
            this.TopUIStage = new eui.Group();
            this.garbageStage = new eui.Group();
            this.gameMainUI = new mainUI.GameMainUI();
          
            
                  
            this.UIStage.addChild(this.backGround);
            this.UIStage.addChild(this.BottomUIStage);
            this.UIStage.addChild(this.GameEffect);
            this.UIStage.addChild(this.TopUIStage);
            this.UIStage.addChild(this.garbageStage);
            this.manager.stage.addChild(this.UIStage);
//            this.backGround.loadPic("resource/assets/game/public/p_background.jpg");
//            this.backGround.loadPic(this.manager.dataManager.back_img); //.source="p_background_jpg";
//            this.backGround.y=-50;
            this.GameEffect.touchChildren = false;
            this.GameEffect.touchEnabled = false;
            
            //舞台尺寸变化监听
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
        }
        public setBackgroundY(y:number=0):void{
            this.backGround.y=y;
        }
        private onResize(): void { 
            for(var key in this.resizeEventArray) {
                    var e = this.resizeEventArray[key];
                e.event.call(e.scope);
            }
        }
        /**
        *    添加舞台自适应事件
        **/
        public addStageResizeEvent(eventName:string,event:Function,scope): void { 
            if(typeof event == "function")
                this.resizeEventArray[eventName] = {
                event:event,
                scope:scope
            };
        }
                   
        /**
        *    删除舞台自适应事件
        **/ 
        public removeStageResizeEvent(eventName:string): void { 
            delete this.resizeEventArray[eventName];
        }
        
        /**
        *    点击效果方法
        **/ 
        public clickEffect(clickObject:any,callback?:Function,scope?:any): void { 
            if(clickObject._cantClick) return;
            clickObject._cantClick = true;
            egret.Tween.get(clickObject)
            .to({ "scaleX": 1.1,"scaleY": 1.1 },100)
            //            .to({ "scaleX": .9,"scaleY": .9 },100)
            //            .to({ "scaleX": 1.1,"scaleY": 1.1 },100)
            .to({ "scaleX": 1,"scaleY": 1 },100)
            .call(function() {
                clickObject._cantClick = false;
                if(callback && scope)callback.call(scope);
            }); 
        }
                
        /**
        *    点击事件添加
        **/ 
        public clickProxy(clickObject:any,clieckEvent:Function,scope:any): void { 
            var self = this;
            clickObject.addEventListener(egret.TouchEvent.TOUCH_TAP,function() { 
                self.clickEffect(clickObject,clieckEvent,scope);
            },scope);
        }
        /**
        * 遮罩
        */ 
        private jsonMask: egret.Shape; 
        public maskJsonStage(al:number=0.01): void
        {
            if(!this.jsonMask){
                this.jsonMask = new egret.Shape();
                this.jsonMask .graphics.beginFill( 0x000000, 1 );
                this.jsonMask.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight);
                this.jsonMask .graphics.endFill();
                this.jsonMask.alpha = al;
                this.jsonMask.touchEnabled = true;
            }
            this.TopUIStage.addChild( this.jsonMask );
        }
        //取消遮罩    
        public clearJsonMask(): void
        { 
            if ( this.jsonMask && this.jsonMask.parent )
            { 
                this.TopUIStage.removeChild( this.jsonMask );
            }
        }
        /**
         * 遮罩
         */ 
        private mask: egret.Shape; 
        private maskImg:eui.Image;
        public maskStage(al:number=0.01,loadmask:boolean=false): void
        {
            if(!this.mask){
                this.mask = new egret.Shape();
                this.mask.graphics.beginFill( 0x000000, 1 );
                this.mask.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight);
                this.mask.graphics.endFill();
                this.mask.touchEnabled = true;
            }
            this.mask.alpha = al;
//            this.TopUIStage.addChild( this.mask );
            this.TopUIStage.addChild(this.mask);
            if(loadmask) {
                if(!this.maskImg) {
                    this.maskImg = new eui.Image("p_jiazai");
                    this.maskImg.touchEnabled = false;
                    this.maskImg.anchorOffsetX = 98 / 2;
                    this.maskImg.anchorOffsetY = 96 / 2;
                    this.maskImg.x = (750) / 2;
                    this.maskImg.y = egret.MainContext.instance.stage.stageHeight / 2;
                }
//                this.TopUIStage.addChild(this.maskImg);
//                this.garbageStage.visible = true;
                this.TopUIStage.addChild(this.maskImg);
                egret.Tween.removeTweens(this.maskImg);
                egret.Tween.get(this.maskImg,{loop:true}).to({rotation:360},1000);
            }
        }
         //取消遮罩    
        public clearMask(): void
        { 
//            console.log("清除遮照");
            if ( this.mask && this.mask.parent )
            { 
//                this.TopUIStage.removeChild( this.mask );
//                console.log("mask");
                this.TopUIStage.removeChild(this.mask);
            }
            if(this.maskImg&&this.maskImg.parent){
//                console.log("maskImg");
                egret.Tween.removeTweens(this.maskImg);
                this.maskImg.parent.removeChild(this.maskImg);
            }
        }
        
        
          /**
         * 遮罩
         */
        private mask2: egret.Shape;
        private maskImg2: eui.Image;
        public maskStage2(al: number = 0.01,loadmask: boolean = false): void {
            if(!this.mask2) {
                this.mask2 = new egret.Shape();
                this.mask2.graphics.beginFill(0x000000,1);
                this.mask2.graphics.drawRect(0,0,egret.MainContext.instance.stage.stageWidth,egret.MainContext.instance.stage.stageHeight);
                this.mask2.graphics.endFill();
                this.mask2.touchEnabled = true;
            }
            this.mask2.alpha = al;
            this.garbageStage.addChild(this.mask2);
            if(loadmask) {
                if(!this.maskImg2) {
                    this.maskImg2 = new eui.Image("p_jiazai");
                    this.maskImg2.touchEnabled = false;
                    this.maskImg2.anchorOffsetX = 98 / 2;
                    this.maskImg2.anchorOffsetY = 96 / 2;
                    this.maskImg2.x = (750) / 2;
                    this.maskImg2.y = egret.MainContext.instance.stage.stageHeight / 2;
                }
                //                this.TopUIStage.addChild(this.maskImg);
                //                this.garbageStage.visible = true;
                this.garbageStage.addChild(this.maskImg2);
                egret.Tween.removeTweens(this.maskImg2);
                egret.Tween.get(this.maskImg2,{ loop: true }).to({ rotation: 360 },1000);
            }
        }
        //取消遮罩    
        public clearMask2(): void {
//            console.log("清除遮照");
            if(this.mask2 && this.mask2.parent) {
                //                this.TopUIStage.removeChild( this.mask );
//                console.log("mask");
                this.garbageStage.removeChild(this.mask2);
            }
            if(this.maskImg2 && this.maskImg2.parent) {
//                console.log("maskImg");
                egret.Tween.removeTweens(this.maskImg2);
                this.maskImg2.parent.removeChild(this.maskImg2);
            }
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //文字提示动画
        public labelAnimation(str: string,y1: number = 0,x1: number = 0,fx: string = "up"): void {
            var self = this;
            var label: eui.Label = new eui.Label();
            label.textColor = 0xff7a2a;
            label.fontFamily = Tools.getInstance().isIphone() ? "Heiti SC" : "SimHei";
            if(!x1) {
                label.width = 620;
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.text = str;
                label.anchorOffsetX = label.width/2;
                label.anchorOffsetY = 10;
                this.TopUIStage.addChild(label);
                label.x= egret.MainContext.instance.stage.stageWidth / 2;
            } else {
                label.text = str;
                this.TopUIStage.addChild(label);
                label.x = x1;
            }
   
            //            label.x = this.stage.stageWidth/2;
            //            label.y = ( this.stage.stageHeight - label.height ) *2/ 3;
            
            if(!y1) y1 = (egret.MainContext.instance.stage.height - label.height) * 2 / 3 - 100;
            label.y = y1;
            if(fx == "up") {
                egret.Tween.get(label).to({ y: y1 },1000).to({ y: y1 - 50,alpha: 0 },600).call(function() {
                    self.TopUIStage.removeChild(label);
                });
            } else {
                egret.Tween.get(label).to({ y: y1 },1000).to({ y: y1 + 50,alpha: 0 },600).call(function() {
                    self.TopUIStage.removeChild(label);
                });
            }
        }
        private setLoading: number;
        private loadingIcon:eui.UILayer;
        public createLoading(): void
        { 
            return;
//            var self = this;
//            this.maskJsonStage();
//            if(!this.loadingIcon){
////                this.loadingIcon = new egret.gui.UIAsset("loading_png");
////                this.loadingIcon.anchorX = .5;
////                this.loadingIcon.anchorY = .5;
//                this.loadingIcon.x = egret.MainContext.instance.stage.stageWidth / 2;
//                this.loadingIcon.y = egret.MainContext.instance.stage.stageHeight / 2;
//            }
//            this.UIStage.addChild(this.loadingIcon);
//            this.setLoading = setInterval( function () { 
//                    self.loadingIcon.rotation +=250; 
//                },100);
        }
        public removeLoading(): void
        { 
            this.clearJsonMask();
            clearInterval(this.setLoading);
            if(this.loadingIcon && this.loadingIcon.parent)this.UIStage.removeChild(this.loadingIcon);
        }
        private txtloadingimg: eui.Label;
        public createLoadingImg():void{
            this.maskStage(.5);
            if(!this.txtloadingimg){
                this.txtloadingimg = new eui.Label;
                this.txtloadingimg.size = 26;
                this.txtloadingimg.fontFamily = "SimHei";
                this.txtloadingimg.textColor = 0xffffff;
                this.txtloadingimg.text = "正在读取明星资源包";
            }
            this.UIStage.addChild(this.txtloadingimg); 
            this.txtloadingimg.validateNow();
            this.txtloadingimg.x = (egret.MainContext.instance.stage.stageWidth - this.txtloadingimg.width) / 2;
            this.txtloadingimg.y = 200; //this.stage.stageHeight / 2-50;
        }
        public removeLoadingimg():void{
            this.clearMask();
            if(this.txtloadingimg&&this.txtloadingimg.parent){
                this.UIStage.removeChild(this.txtloadingimg);
            }
        }
    }
}
