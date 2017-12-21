/**
*
* @author
*
*/
var Manager = (function () {
    //    public bid: string = "";
    //    public bar_info: Object;
    function Manager(_stage) {
        this.uid = "2";
        this.updateLoop = false;
        this.pauseTime = 0;
        this.bb = "版本:1.1.09";
        this.stage = _stage;
        this.controllerManager = new controller.ControllerManager(); //控制器
        this.dataManager = new data.DataManager(); //数据
        this.dataManager.back_img = Tools.getInstance().getUrlAttribute("img");
        this.viewManager = new view.ViewManager(this); //视图管理器
        this.lastTime = egret.getTimer();
    }
    var d = __define,c=Manager,p=c.prototype;
    /**
    *     游戏入口方法
    */
    p.start = function () {
        GameApp.Manager.dataManager.uid = parseInt(Tools.getInstance().getUrlAttribute("user_id"));
        GameApp.Manager.dataManager.bid = Tools.getInstance().getUrlAttribute("bid");
        GameApp.Manager.dataManager.group_openid = Tools.getInstance().getUrlAttribute("group_openid");
        GameApp.Manager.dataManager.wts = Tools.getInstance().getUrlAttribute("wts");
        GameApp.Manager.dataManager.mts = Tools.getInstance().getUrlAttribute("mts");
        GameApp.Manager.dataManager.is_owner = Tools.getInstance().getUrlAttribute("is_owner") == "1" ? true : false;
        GameApp.Manager.dataManager.starRankShare = Tools.getInstance().getUrlAttribute("starRankShare");
        GameApp.Manager.dataManager.inviteGroupFriends = Tools.getInstance().getUrlAttribute("inviteGroupFriends");
        GameApp.Manager.dataManager.inviteGroupFriendsForMass = Tools.getInstance().getUrlAttribute("inviteGroupFriendsForMass");
        GameApp.Manager.dataManager.inviteGroupFriendsForCrowdfunding = Tools.getInstance().getUrlAttribute("inviteGroupFriendsForCrowdfunding");
        GameApp.Manager.dataManager.shareUserStarWorksUserId = Tools.getInstance().getUrlAttribute("shareUserStarWorksUserId");
        //加载图片
        var self = this;
        this.controllerManager.loader.preloading(function () {
            if (GameApp.Manager.dataManager.mts) {
                self.controllerManager.monthTieController.show(GameApp.Manager.dataManager.mts);
            }
            else if (GameApp.Manager.dataManager.wts) {
                self.controllerManager.weekPushController.show();
            }
            else {
                self.startGame(); //主游戏
            }
        }, this);
    };
    /*
        登陆游戏
    */
    p.startGame = function () {
        var self = this;
        if (GameApp.Manager.dataManager.bid) {
            self.controllerManager.start(); //调用控制器界面
        }
        else {
            self.viewManager.starPageManager.show(); //没有明星选择入住明星
        }
    };
    p.update = function () {
        var nowTime = egret.getTimer();
        var ct = nowTime - this.lastTime;
        this.lastTime = nowTime;
        //        if(this.updateLoop) {
        this.viewManager.update(ct);
        //        } else { 
        //            //            this.pauseTime -= ct;
        //            //            if(this.pauseTime<=0) { 
        //            //                this.pauseTime = 0;
        //            //                this.updateLoop = true;
        //            //            }
        //        }
    };
    p.pause = function (time) {
        this.updateLoop = false;
        this.pauseTime = time;
    };
    return Manager;
}());
egret.registerClass(Manager,'Manager');
