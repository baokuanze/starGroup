var view;
(function (view) {
    /**
    *
    * @author
    *
    */
    var ViewManager = (function () {
        function ViewManager(manager) {
            //自适应事件对象        
            this.resizeEventArray = new Object();
            this.manager = manager;
            this.viewInit();
            this.loading = new view.loader.Loading(this);
            this.gameMainManager = new mainUI.GameMainManager(this);
            this.rankStarManager = new rankStar.RankStarManager(this);
            this.payManager = new pay.PayManager(this);
            this.starPageManager = new starPage.StarPageManager(this);
            this.taskManager = new task.TaskManager(this);
            this.rankGroupManager = new rankGroup.RankGroupManager(this);
            this.rankGroupContributionManager = new rankGroupContribution.RankGroupContributionManager(this);
            this.rankUserContributionManager = new rankUserContribution.RankUserContributionManager(this);
            this.fansRecruitManager = new fansRecruit.FansRecruitManager(this);
            this.uploadManager = new upload.UploadManager(this);
            this.newStarManager = new newstar.NewStarManager(this);
            this.weekPushManage = new weekPush.WeekPushManage(this);
            this.starFanTVManager = new starfanstv.StarFansTVManager(this);
            this.monthTieManager = new monthTie.MonthTieManager(this);
            this.sign = new signIn.SignInManager(this);
            this.aggregation = new task.AggregationManager(this);
            this.groupManager = new groupManagement.GroupManager(this);
            this.groupManagerAudit = new groupManagement.GroupManagementAuditManager(this);
            this.liveChatRoomManager = new live.LiveChatRoomManager(this);
            this.headLinesManager = new headLines.HeadlinesManager(this);
            this.headLinesItemInfoManager = new headLines.HeadLineItemInfoManager(this);
            this.garbageCollectionManager = new garbageCollection.GarbageCollectionManager(this);
            //            this.topRankGroupManager = new TopScreenOfGroupRank.TopGroupRankManager(this);
            this.sweepsTasksManager = new sweepsTasks.SweepsTasksManager(this);
            this.buyTicketActiveManager = new buyTicketActive.BuyTicketManager(this);
            //            this.alertManager = new aler.AlertManager(this);
        }
        var d = __define,c=ViewManager,p=c.prototype;
        p.setUIClose = function (call, scope, bo) {
            if (bo === void 0) { bo = true; }
            if (this.uicloseCall && bo) {
                this.uicloseCall.call(this.scope);
                this.uicloseCall = null;
            }
            this.uicloseCall = call;
            this.scope = scope;
        };
        p.update = function (ct) {
            this.gameMainUI.update(ct);
            if (live.LiveTalkChat._instance) {
                live.LiveTalkChat.getInstance().update(ct);
            }
            //            if(this.liveChatRoomManager.liveChatRoomUI)
            //                this.liveChatRoomManager.liveChatRoomUI.liveTalkChat.update(ct);
            //            this.user.update(ct);
        };
        p.showBackGroup = function () {
            this.backGround.visible = true;
        };
        p.hideBackGroup = function () {
            this.backGround.visible = false;
        };
        p.viewInit = function () {
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
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        };
        p.setBackgroundY = function (y) {
            if (y === void 0) { y = 0; }
            this.backGround.y = y;
        };
        p.onResize = function () {
            for (var key in this.resizeEventArray) {
                var e = this.resizeEventArray[key];
                e.event.call(e.scope);
            }
        };
        /**
        *    添加舞台自适应事件
        **/
        p.addStageResizeEvent = function (eventName, event, scope) {
            if (typeof event == "function")
                this.resizeEventArray[eventName] = {
                    event: event,
                    scope: scope
                };
        };
        /**
        *    删除舞台自适应事件
        **/
        p.removeStageResizeEvent = function (eventName) {
            delete this.resizeEventArray[eventName];
        };
        /**
        *    点击效果方法
        **/
        p.clickEffect = function (clickObject, callback, scope) {
            if (clickObject._cantClick)
                return;
            clickObject._cantClick = true;
            egret.Tween.get(clickObject)
                .to({ "scaleX": 1.1, "scaleY": 1.1 }, 100)
                .to({ "scaleX": 1, "scaleY": 1 }, 100)
                .call(function () {
                clickObject._cantClick = false;
                if (callback && scope)
                    callback.call(scope);
            });
        };
        /**
        *    点击事件添加
        **/
        p.clickProxy = function (clickObject, clieckEvent, scope) {
            var self = this;
            clickObject.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.clickEffect(clickObject, clieckEvent, scope);
            }, scope);
        };
        p.maskJsonStage = function (al) {
            if (al === void 0) { al = 0.01; }
            if (!this.jsonMask) {
                this.jsonMask = new egret.Shape();
                this.jsonMask.graphics.beginFill(0x000000, 1);
                this.jsonMask.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
                this.jsonMask.graphics.endFill();
                this.jsonMask.alpha = al;
                this.jsonMask.touchEnabled = true;
            }
            this.TopUIStage.addChild(this.jsonMask);
        };
        //取消遮罩    
        p.clearJsonMask = function () {
            if (this.jsonMask && this.jsonMask.parent) {
                this.TopUIStage.removeChild(this.jsonMask);
            }
        };
        p.maskStage = function (al, loadmask) {
            if (al === void 0) { al = 0.01; }
            if (loadmask === void 0) { loadmask = false; }
            if (!this.mask) {
                this.mask = new egret.Shape();
                this.mask.graphics.beginFill(0x000000, 1);
                this.mask.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
                this.mask.graphics.endFill();
                this.mask.touchEnabled = true;
            }
            this.mask.alpha = al;
            //            this.TopUIStage.addChild( this.mask );
            this.TopUIStage.addChild(this.mask);
            if (loadmask) {
                if (!this.maskImg) {
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
                egret.Tween.get(this.maskImg, { loop: true }).to({ rotation: 360 }, 1000);
            }
        };
        //取消遮罩    
        p.clearMask = function () {
            //            console.log("清除遮照");
            if (this.mask && this.mask.parent) {
                //                this.TopUIStage.removeChild( this.mask );
                //                console.log("mask");
                this.TopUIStage.removeChild(this.mask);
            }
            if (this.maskImg && this.maskImg.parent) {
                //                console.log("maskImg");
                egret.Tween.removeTweens(this.maskImg);
                this.maskImg.parent.removeChild(this.maskImg);
            }
        };
        p.maskStage2 = function (al, loadmask) {
            if (al === void 0) { al = 0.01; }
            if (loadmask === void 0) { loadmask = false; }
            if (!this.mask2) {
                this.mask2 = new egret.Shape();
                this.mask2.graphics.beginFill(0x000000, 1);
                this.mask2.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
                this.mask2.graphics.endFill();
                this.mask2.touchEnabled = true;
            }
            this.mask2.alpha = al;
            this.garbageStage.addChild(this.mask2);
            if (loadmask) {
                if (!this.maskImg2) {
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
                egret.Tween.get(this.maskImg2, { loop: true }).to({ rotation: 360 }, 1000);
            }
        };
        //取消遮罩    
        p.clearMask2 = function () {
            //            console.log("清除遮照");
            if (this.mask2 && this.mask2.parent) {
                //                this.TopUIStage.removeChild( this.mask );
                //                console.log("mask");
                this.garbageStage.removeChild(this.mask2);
            }
            if (this.maskImg2 && this.maskImg2.parent) {
                //                console.log("maskImg");
                egret.Tween.removeTweens(this.maskImg2);
                this.maskImg2.parent.removeChild(this.maskImg2);
            }
        };
        //文字提示动画
        p.labelAnimation = function (str, y1, x1, fx) {
            if (y1 === void 0) { y1 = 0; }
            if (x1 === void 0) { x1 = 0; }
            if (fx === void 0) { fx = "up"; }
            var self = this;
            var label = new eui.Label();
            label.textColor = 0xff7a2a;
            label.fontFamily = Tools.getInstance().isIphone() ? "Heiti SC" : "SimHei";
            if (!x1) {
                label.width = 620;
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.text = str;
                label.anchorOffsetX = label.width / 2;
                label.anchorOffsetY = 10;
                this.TopUIStage.addChild(label);
                label.x = egret.MainContext.instance.stage.stageWidth / 2;
            }
            else {
                label.text = str;
                this.TopUIStage.addChild(label);
                label.x = x1;
            }
            //            label.x = this.stage.stageWidth/2;
            //            label.y = ( this.stage.stageHeight - label.height ) *2/ 3;
            if (!y1)
                y1 = (egret.MainContext.instance.stage.height - label.height) * 2 / 3 - 100;
            label.y = y1;
            if (fx == "up") {
                egret.Tween.get(label).to({ y: y1 }, 1000).to({ y: y1 - 50, alpha: 0 }, 600).call(function () {
                    self.TopUIStage.removeChild(label);
                });
            }
            else {
                egret.Tween.get(label).to({ y: y1 }, 1000).to({ y: y1 + 50, alpha: 0 }, 600).call(function () {
                    self.TopUIStage.removeChild(label);
                });
            }
        };
        p.createLoading = function () {
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
        };
        p.removeLoading = function () {
            this.clearJsonMask();
            clearInterval(this.setLoading);
            if (this.loadingIcon && this.loadingIcon.parent)
                this.UIStage.removeChild(this.loadingIcon);
        };
        p.createLoadingImg = function () {
            this.maskStage(.5);
            if (!this.txtloadingimg) {
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
        };
        p.removeLoadingimg = function () {
            this.clearMask();
            if (this.txtloadingimg && this.txtloadingimg.parent) {
                this.UIStage.removeChild(this.txtloadingimg);
            }
        };
        return ViewManager;
    }());
    view.ViewManager = ViewManager;
    egret.registerClass(ViewManager,'view.ViewManager');
})(view || (view = {}));
