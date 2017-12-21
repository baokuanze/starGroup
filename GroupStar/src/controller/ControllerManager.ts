
module controller {
	/**
	 *
	 * @author 
	 * 
	 */
    export class ControllerManager {
        //  public util:controller.Util;//通用逻辑库
        private firstlogin:boolean=false;
        private obj:Object;
        public gameMainController: mainUI.GameMainController;
        public taskController: task.TaskController;
        public rankStarController:rankStar.RankStarController;
        public payController:pay.PayController;
        public loader: loader.LoaderManager;
        public fansRecruitController:fansRecruit.FansRecruitController;
        public rankGroupController:rankGroup.RankGroupController;
        public rankGroupContributionController:rankGroupContribution.RankGroupContributionController;
        public rankuserContributionController:rankUserContribution.RankUserContributionController;
        public uploadController:upload.UploadController;
        public newStarController:newstar.NewStarController;
        public weekPushController:weekPush.WeekPushController;
        public starFansTVController:starfanstv.StarFansTVController;
        public monthTieController:monthTie.MonthTieController;
        public signController:signIn.signInController;
        public aggregationController: aggregation.AggregationController
        public groupManagerController: groupManagement.GroupManagerController;
        public groupManagerAuditController: groupManagementAudit.GroupManagementAuditController;
        public headLinesController:headLine.HeadLineController;
        public headLineItemInforController: headLineItemInforation.HeadLineItemInfoController;
        public gabageController:garbageCollection.GarbageCollectionController;
        public topGroupRankController: topRank.TopRankGroupController;
        public sweepsTasksController:sweepsTasks.SweepsTasksController;
        public buyTicketActiveController: buyTicketActive.BuyTicketController;
        
        
        public constructor() {
            this.loader = new loader.LoaderManager();
            this.gameMainController = new mainUI.GameMainController();
            this.taskController = new task.TaskController();
            this.rankStarController=new rankStar.RankStarController();
            this.payController=new pay.PayController();
            this.fansRecruitController=new fansRecruit.FansRecruitController();
            this.rankGroupController=new rankGroup.RankGroupController();
            this.rankGroupContributionController=new rankGroupContribution.RankGroupContributionController();
            this.rankuserContributionController=new rankUserContribution.RankUserContributionController();
            this.uploadController=new upload.UploadController();
            this.newStarController=new newstar.NewStarController();
            this.weekPushController=new weekPush.WeekPushController();
            this.starFansTVController=new starfanstv.StarFansTVController();
            this.monthTieController=new monthTie.MonthTieController();
            this.signController = new signIn.signInController();
            this.aggregationController = new aggregation.AggregationController();
            this.groupManagerController = new groupManagement.GroupManagerController();
            this.groupManagerAuditController = new groupManagementAudit.GroupManagementAuditController();
            this.headLinesController = new headLine.HeadLineController();
            this.headLineItemInforController = new headLineItemInforation.HeadLineItemInfoController();
            this.gabageController = new garbageCollection.GarbageCollectionController();
            this.topGroupRankController = new topRank.TopRankGroupController();
            this.sweepsTasksController = new sweepsTasks.SweepsTasksController();
            this.buyTicketActiveController = new buyTicketActive.BuyTicketController();
            window["contro"] = this;

        }
        //此处要修改
        private loadPicMask(n:number):void{
            if(n==0){
                GameApp.Manager.viewManager.maskStage2(.4,true);
            }else{
                if(GameApp.Manager.dataManager.entenVisiter == 1){
                    GameApp.Manager.controllerManager.gameMainController.hide();
//                    GameApp.Manager.controllerManager.topGroupRankController.hide();
                } else if(GameApp.Manager.dataManager.entenVisiter == 2){
                    GameApp.Manager.controllerManager.gameMainController.hide();
                    GameApp.Manager.controllerManager.rankStarController.hide();
                }
                GameApp.Manager.viewManager.clearMask2();
            }
        }
        
        private index:number = 1;
        public start(_bid: string = null):void{
            var self:ControllerManager=this;
            GameApp.Manager.updateLoop = true;
                this.loader.mainLoading(["public"],function() {
                    var bid: string = GameApp.Manager.dataManager.bid_save = _bid ? _bid : GameApp.Manager.dataManager.bid;
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + bid + GameApp.Manager.dataManager.group_openid + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/mainPage",{ user_id: GameApp.Manager.dataManager.uid,bid: bid,group_openid: GameApp.Manager.dataManager.group_openid,reset: GameApp.Manager.dataManager.reset,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            self.obj=obj;
                            GameApp.Manager.dataManager.visitor = obj["visitor"];
                            GameApp.Manager.dataManager.level = obj["star_level"];
                            GameApp.Manager.dataManager.mts = obj["monthly_ts"];//月磅
                            GameApp.Manager.dataManager.star_name = window["hexToDec"](obj["star_name"]);
                            GameApp.Manager.dataManager.user_name = window["hexToDec"](obj["user_name"]);
                            GameApp.Manager.dataManager.user_pic = obj["user_pic"] ? obj["user_pic"] : GameApp.Manager.dataManager.user_pic;
                            GameApp.Manager.dataManager.exp = obj["exp"];
                            GameApp.Manager.dataManager.need_exp = obj["need_exp"];
                            GameApp.Manager.dataManager.nowImg = obj["img"];
                            GameApp.Manager.dataManager.shadow_img = obj["shadow_img"];
                            GameApp.Manager.dataManager.head_img = obj["head_img"];
                            GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
                            GameApp.Manager.dataManager.egg_cd = obj["egg_cd"];
                            GameApp.Manager.dataManager.egg_time = new Date().getTime();
                            GameApp.Manager.dataManager.heart_num = obj["heart_num"];
                            GameApp.Manager.dataManager.appid = obj["appid"];
                            GameApp.Manager.dataManager.monthly_ts = obj["monthly_ts"];
                            GameApp.Manager.dataManager.isFollower = obj["follow"];
                            GameApp.Manager.dataManager.time_limited_activity_free = obj['time_limited_activity_free'];
                            GameApp.Manager.dataManager.buluo = obj['buluo'];
                            GameApp.Manager.dataManager.haiquan = obj['haiquan'];
//                            if(obj['haiquan'] == 1){
//                                GameApp.Manager.dataManager.showHaiQuan = true;
//                            }else{
//                                GameApp.Manager.dataManager.showHaiQuan = false;
//                            }
                            flower.FlowerUI.getInstance().initData(obj["gift"]);
                            if(GameApp.Manager.dataManager.visitor==0){
                                GameApp.Manager.dataManager.resetState = obj["resetState"];
                            }
                            
                            
                            if(!self.firstlogin){
                                socketio.IoConnect.getInstance().initPomelo(bid,GameApp.Manager.dataManager.uid,self.pomeloOK,self);
                            }else{
                                socketio.IoConnect.getInstance().initPomelo(bid,GameApp.Manager.dataManager.uid);
                                self.gameMainController.show();
                                GameApp.Manager.viewManager.gameMainManager.initData(obj);
                            }
                            if(GameApp.Manager.dataManager.visitor == 0) { 
                                GameApp.Manager.viewManager.backGround.loadPic(GameApp.Manager.dataManager.back_img,0,0,function(){
                                    GameApp.Manager.viewManager.clearMask2();
                                },this);
                                if(GameApp.Manager.dataManager.entenVisiter == 2) {
                                    GameApp.Manager.controllerManager.rankStarController.hide();
                                } else if(GameApp.Manager.dataManager.entenVisiter == 1) {
//                                    GameApp.Manager.controllerManager.topGroupRankController.hide();
                                }
                                
                            } else {  //访客
                                self.loadPicMask(0);
                                GameApp.Manager.viewManager.backGround.loadPic(obj["img"],0,0,function() {
                                    self.loadPicMask(1);
                                },this);
                            }
                            GameApp.Manager.controllerManager.loader.errorLoader("正在连接...");
                        } else {
                            console.log("注册失败:" + obj["st"]);
                            GameApp.Manager.controllerManager.loader.errorLoader('加载失败 st:'+obj['st']);
                        }
                    },true,this);
                },this);
        }
        
        private pomeloOK():void{
            this.gameMainController.show();
            GameApp.Manager.viewManager.gameMainManager.initData(this.obj);
            this.goUIModule();
            GameApp.Manager.controllerManager.loader.endLoader();
        }
        private goUIModule():void{      //分享出去从这进来。
            if(GameApp.Manager.dataManager.starRankShare) {
//                GameApp.Manager.controllerManager.topGroupRankController.hide();
//                GameApp.Manager.dataManager.topEnter == 2;
                GameApp.Manager.dataManager.starRankShare = null;
                setTimeout(GameApp.Manager.viewManager.gameMainUI.mainUI.rankStar_tap,0)
          
            } else if(GameApp.Manager.dataManager.inviteGroupFriends){
//                GameApp.Manager.controllerManager.topGroupRankController.hide();
//                GameApp.Manager.dataManager.topEnter == 2;
                GameApp.Manager.dataManager.inviteGroupFriends=null;
                setTimeout(GameApp.Manager.viewManager.gameMainUI.mainUI.qiandao_tap,0);
            
            } else if(GameApp.Manager.dataManager.inviteGroupFriendsForMass) {
//                GameApp.Manager.controllerManager.topGroupRankController.hide();
//                GameApp.Manager.dataManager.topEnter == 2;
                GameApp.Manager.dataManager.inviteGroupFriendsForMass = null;
                setTimeout(function(){
                    GameApp.Manager.viewManager.gameMainUI.mainUI.jijie_tap(null);
                },0);
            }
            else if(GameApp.Manager.dataManager.inviteGroupFriendsForCrowdfunding) {
//                GameApp.Manager.controllerManager.topGroupRankController.hide();
//                GameApp.Manager.dataManager.topEnter == 2;
                GameApp.Manager.dataManager.inviteGroupFriendsForCrowdfunding = null;
                setTimeout(GameApp.Manager.viewManager.gameMainUI.mainUI.zhongchou_tap,0);
            }
            else if(GameApp.Manager.dataManager.shareUserStarWorksUserId){
//                GameApp.Manager.controllerManager.topGroupRankController.hide();
//                GameApp.Manager.dataManager.topEnter == 2;
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.gabageController.show(parseInt(GameApp.Manager.dataManager.shareUserStarWorksUserId),GameApp.Manager.dataManager.bid,2);
            } else if(GameApp.Manager.dataManager.shareTimeLimitedActivity){
                GameApp.Manager.controllerManager.gameMainController.hide();
                GameApp.Manager.controllerManager.sweepsTasksController.show();
            }
        }
        private onPostComplete(event: egret.Event) {
            setTimeout(function(){
                GameApp.Manager.viewManager.labelAnimation("成功");
            },2000)
          
            var request = <egret.HttpRequest>event.currentTarget;
            console.log("post data : ",request.response);
            this.gameMainController.show(); 
        }
        private onPostIOError(event: egret.IOErrorEvent): void {

            setTimeout(function() {
                var str:string="";
                for(var i in event){
                    str+=i+":"+event[i]+"    ";
                }
                GameApp.Manager.viewManager.labelAnimation("失败:"+str);
            },2000)
            console.log("post error : " + event);
        }
        private onPostProgress(event: egret.ProgressEvent): void {
            setTimeout(function() {
                GameApp.Manager.viewManager.labelAnimation("进度");
            },100)
         
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }
//        public startGame(obj: Object): void {
//            var self = this;
//            this.loader.mainLoading(["public","barrage"],function() { },this);
//            //            this.loader.loadRes(function() {
//            GameApp.Manager.bar_info = obj;
//            var openid: string = Tools.getInstance().getUrlAttribute("appid");
//            var sign: string = new md5().hex_md5(GameApp.Manager.bar_info["bid"] + "" + GameApp.Manager.bar_info["is_follow"] + "" + GameApp.Manager.bar_info["openid"] + GameApp.Manager.bar_info["openkey"] + GameApp.Manager.bar_info["pf"] + encodeURIComponent(GameApp.Manager.bar_info["user_pic"]) + GameApp.Manager.bar_info["user_vipno"] + "&");
//            //                Util.sendJsonp("http://115.159.111.137/t","callback",{name:""},function(obj:Object) { 
//            //                    console.log("jsonp name:"+data["name"]);
//            //                    },this);
//            this.gameMainController.show(); 
//            GameApp.Manager.updateLoop = true;
//            Util.sendJson1(GameApp.Manager.dataManager.IP + "/pushInfo",{ "openid": GameApp.Manager.bar_info["openid"],"openkey": GameApp.Manager.bar_info["openkey"],"bid": GameApp.Manager.bar_info["bid"],"star_charm_count": GameApp.Manager.bar_info["star_charm_count"],"user_vipno": GameApp.Manager.bar_info["user_vipno"],"user_pic": encodeURIComponent(GameApp.Manager.bar_info["user_pic"] + ""),"user_name": window["decToHex"](GameApp.Manager.bar_info["user_name"]),"name": decodeURI(GameApp.Manager.bar_info["name"]),"is_follow": GameApp.Manager.bar_info["is_follow"] + "","fans": GameApp.Manager.bar_info["fans"],"pf": GameApp.Manager.bar_info["pf"],"sign": sign },function(obj: Object) {
//                if(obj["st"] == 1) {
//                    GameApp.Manager.dataManager.appId = GameApp.Manager.bar_info["bid"];
//                    GameApp.Manager.dataManager.uid = obj["user_id"];
//                    socketio.IoConnect.getInstance().initPomelo(GameApp.Manager.bar_info["bid"],GameApp.Manager.dataManager.uid);
//                    GameApp.Manager.dataManager.level = obj["level"];
//                    GameApp.Manager.dataManager.exp = obj["exp"];
//                    GameApp.Manager.dataManager.need_exp = obj["need_exp"];
//                    GameApp.Manager.dataManager.nowImg = obj["img"];
//                    GameApp.Manager.dataManager.shadow_img = obj["shadow_img"];
//                    GameApp.Manager.dataManager.lucystar = obj["lucky_star"];
//                    GameApp.Manager.dataManager.egg_cd = obj["egg_cd"];
//                    GameApp.Manager.dataManager.egg_time = new Date().getTime();
//                    GameApp.Manager.dataManager.heart_num = obj["heart_num"];
//                    GameApp.Manager.dataManager.appid = obj["appid"];
//                    flower.FlowerUI.getInstance().initData(obj["gift"]);
//                    GameApp.Manager.viewManager.gameMainManager.initData(obj);
//                } else {
//                    console.log("注册失败:" + obj["st"]);
//                }
//            },true,this);           
//        }
        public PomeloOK(): void {
        }
        public startGameData(): void {

        }
        public setData(obj: Object): void {
            GameApp.Manager.viewManager.loading.remove();
            var self = this;
            GameApp.Manager.updateLoop = true;
        }

    }
}
