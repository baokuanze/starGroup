var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var AggregationIcon1 = (function (_super) {
        __extends(AggregationIcon1, _super);
        function AggregationIcon1() {
            _super.call(this);
            this.type = 0;
            this.task_timeJilu = 0; //记录时间
            this.timeVar = 0; // 倒计时
            this.isHer = false; //判断自己还在不在；
            this.skinName = "src/view/gameUI/task/aggregation/AggregationIcon1Skin.exml";
        }
        var d = __define,c=AggregationIcon1,p=c.prototype;
        p.childrenCreated = function () {
            var self = this;
            if (Tools.getInstance().isIphone()) {
                this.lable_time.fontFamily = "Heiti SC";
                this.lable_personCount.fontFamily = "Heiti SC";
                this.lable_contribute.fontFamily = "Heiti SC";
                this.lable_hZQY.fontFamily = "Heiti SC";
                this.lable_jijie.fontFamily = "Heiti SC";
            }
            this.btn_startJijie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.starJi, this); //发起集结
            this.btn_jHZ.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zhqy, this);
            this.btn_comeBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comeToHost, this);
            this.img0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOneImg, this);
            this.img1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtwoImg, this);
            this.img2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchthreeImg, this);
            this.img3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchffourImg, this);
            this.img4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchfiveImg, this);
            this.img5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchsixImg, this);
            this.img6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchsevenImg, this);
            this.img7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toucheightImg, this);
            this.img8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchfnineImg, this);
            this.img9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtenImg, this);
            this.lable_contribute.textFlow = (new egret.HtmlTextParser).parser("集结成功，群经验+100,在线玩家" + "<font color= #ff0000 size= 32>+10</font>" + "钻");
        };
        p.touchOneImg = function (e) {
            this.changPOs(0);
            this.updateHostImg(0);
        };
        p.touchtwoImg = function (e) {
            this.changPOs(1);
            this.updateHostImg(1);
        };
        p.touchthreeImg = function (e) {
            this.changPOs(2);
            this.updateHostImg(2);
        };
        p.touchffourImg = function (e) {
            this.changPOs(3);
            this.updateHostImg(3);
        };
        p.touchfiveImg = function (e) {
            this.changPOs(4);
            this.updateHostImg(4);
        };
        p.touchsixImg = function (e) {
            this.changPOs(5);
            this.updateHostImg(5);
        };
        p.touchsevenImg = function (e) {
            this.changPOs(6);
            this.updateHostImg(6);
        };
        p.toucheightImg = function (e) {
            this.changPOs(7);
            this.updateHostImg(7);
        };
        p.touchfnineImg = function (e) {
            this.changPOs(8);
            this.updateHostImg(8);
        };
        p.touchtenImg = function (e) {
            this.changPOs(9);
            this.updateHostImg(9);
        };
        p.changPOs = function (num) {
            var img = this.group_icon.getElementAt(num);
            var mySelfIcon = this.getMyselfIcon();
            this.Myself = mySelfIcon;
            mySelfIcon.x = img.x;
            mySelfIcon.y = img.y;
        };
        p.getMyselfIcon = function () {
            var num = this.group_up.numElements;
            for (var i = 0; i < num; i++) {
                var item = this.group_up.getElementAt(i);
                if (item.userId == GameApp.Manager.dataManager.uid) {
                    return item;
                }
            }
        };
        AggregationIcon1.setData = function (obj) {
            this.Allobj = obj;
            this.img_buttonIcon = obj["star_img"];
            AggregationIcon1.activeObject();
        };
        AggregationIcon1.updateChangeValue = function (obj) {
            this.Allobj = obj;
            //           console.log("后端每次push",obj);
            AggregationIcon1.activeObject();
            this.img_buttonIcon = obj["star_img"] ? obj["star_img"] : this.img_buttonIcon;
            if (AggregationIcon1.isChange) {
                AggregationIcon1.isChange = false;
                GameApp.Manager.viewManager.aggregation.aggregation.upTriceIcon();
            }
            if (GameApp.Manager.viewManager.aggregation.aggregation) {
                GameApp.Manager.viewManager.aggregation.aggregation.showAgger();
                GameApp.Manager.viewManager.aggregation.aggregation.isHer = false;
            }
            task.TaskManager.groupMass();
        };
        p.upTriceIcon = function () {
            if (!GameApp.Manager.viewManager.aggregation.aggregation.Myself) {
                GameApp.Manager.viewManager.aggregation.aggregation.showAgger();
                console.log("false");
                this.isHer = false;
            }
            else {
                this.isHer = true;
                console.log("true");
                var groupUp = GameApp.Manager.viewManager.aggregation.aggregation.group_up;
                while (groupUp.numElements > 0) {
                    var item = groupUp.getElementAt(groupUp.numElements - 1);
                    if (item.userId == this.Myself.userId) {
                        groupUp.removeChild(this.Myself);
                    }
                    else {
                        aggregation.AggregationIcon.reclaim(item);
                        if (item.parent) {
                            item.parent.removeChild(item);
                        }
                    }
                }
                GameApp.Manager.viewManager.aggregation.aggregation.showAgger();
            }
        };
        AggregationIcon1.activeObject = function () {
            this.crrentTime = new Date().getTime();
            console.log("type", this.Allobj);
            if (this.Allobj["type"] && this.Allobj["type"] == 2) {
            }
        };
        p.addUpImg = function () {
            this.aggregationUp = new aggregation.AggregationIconUp();
            this.aggregationUp.x = 157;
            this.aggregationUp.y = 254;
            this.addChild(this.aggregationUp);
        };
        //显示数据
        p.showAgger = function () {
            var self = this;
            var obj = AggregationIcon1.Allobj;
            if (!AggregationIcon1.isChange) {
                AggregationIcon1.isChange = true;
                switch (obj["type"]) {
                    case 1:
                        //                        console.log("==++++====+++====+++====+++====")
                        this.lable_jijie.visible = false;
                        this.btn_startJijie.visible = false;
                        this.lable_time.visible = true;
                        this.lable_personCount.visible = true;
                        if (!obj["user_list"]) {
                            return;
                        }
                        this.lable_personCount.text = "在线人数" + obj["user_list"].length + "/" + "10";
                        var count = obj["user_list"].length;
                        if (count >= 9) {
                            this.iconCount = 9;
                        }
                        else {
                            this.iconCount = count;
                        }
                        self.task_timeJilu = new Date().getTime();
                        var djs = obj["time"] - (this.task_timeJilu - AggregationIcon1.crrentTime);
                        clearInterval(self.timeVar);
                        self.timeVar = setInterval(function () {
                            var NowTime = new Date().getTime();
                            var t = djs - (NowTime - self.task_timeJilu);
                            self.lable_time.text = "还差" + Tools.getInstance().formatTime4(t) + "结束";
                            if (t <= 0) {
                                clearInterval(self.timeVar);
                            }
                        }, 980);
                        self.lable_time.text = "还差" + Tools.getInstance().formatTime4(djs) + "结束";
                        if (!this.isHer) {
                            console.log("false");
                            var num = this.aggregationUp.group_iconFM.numElements;
                            for (var i = 0; i < num; i++) {
                                this.aggregationUp.group_iconFM.getElementAt(i).visible = true;
                            }
                            while (this.group_up.numElements > 0) {
                                var item = this.group_up.getElementAt(this.group_up.numElements - 1);
                                aggregation.AggregationIcon.reclaim(item);
                                if (item.parent) {
                                    this.group_up.removeChild(item);
                                }
                            }
                            for (var i = 0; i < obj["user_list"].length; i++) {
                                var item = aggregation.AggregationIcon.produce();
                                item.x = this.group_icon.getChildAt(i).x;
                                item.y = this.group_icon.getChildAt(i).y;
                                this.group_up.addChild(item);
                                item.Index = i;
                                var icon = this.aggregationUp.group_iconFM.getChildAt(i);
                                icon.visible = false;
                                item.setData(obj["user_list"][i]);
                                if (obj["user_list"][i]["user_id"] == GameApp.Manager.dataManager.uid) {
                                    this.Myself = item;
                                }
                            }
                        }
                        if (this.isHer) {
                            console.log("showAgger  true");
                            var num = this.aggregationUp.group_iconFM.numElements;
                            for (var i = 0; i < num; i++) {
                                this.aggregationUp.group_iconFM.getElementAt(i).visible = true;
                            }
                            var i = 0;
                            var n = 0;
                            var bo = true;
                            while (bo) {
                                var it = obj["user_list"][i];
                                if (it["user_id"] != this.Myself.userId) {
                                    if (n == this.Myself.Index) {
                                        n++;
                                        console.log('n++le:' + n);
                                    }
                                    var item = aggregation.AggregationIcon.produce();
                                    item.x = this.group_icon.getChildAt(n).x;
                                    item.y = this.group_icon.getChildAt(n).y;
                                    this.group_up.addChild(item);
                                    item.Index = n;
                                    var icon = this.aggregationUp.group_iconFM.getChildAt(n);
                                    icon.visible = false;
                                    item.setData(it);
                                    console.log('n=' + n);
                                    n++;
                                }
                                else {
                                    console.log('添加自己' + this.Myself.Index);
                                    this.group_up.addChild(this.Myself);
                                    this.Myself.x = this.group_icon.getChildAt(this.Myself.Index).x;
                                    this.Myself.y = this.group_icon.getChildAt(this.Myself.Index).y;
                                    var icon = this.aggregationUp.group_iconFM.getChildAt(this.Myself.Index);
                                    icon.visible = false;
                                    if (this.Myself.Index <= i) {
                                        n++;
                                    }
                                }
                                i++;
                                if (i == obj["user_list"].length) {
                                    bo = false;
                                    break;
                                }
                            }
                        }
                        RES.getResByUrl(task.AggregationIcon1.img_buttonIcon, self.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
                        break;
                    //成功
                    case 2:
                        //加群经验
                        if (GameApp.Manager.viewManager.taskManager.taskUI)
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
        };
        p.load_personIcon = function (souce) {
            this.img_startImg.texture = souce;
            this.img_startImg.width = 436;
            this.img_startImg.height = 702;
        };
        p.updateHostImg = function (t) {
            var myself = this.getMyselfIcon();
            var index = myself.Index;
            this.aggregationUp.group_iconFM.getElementAt(index).visible = true; //原来的
            this.aggregationUp.group_iconFM.getElementAt(t).visible = false; //现在的
            myself.Index = t;
        };
        p.clear = function () {
            this.img_startImg.texture = null; //中间大的图片删除
            this.removeChild(this.aggregationUp); // 最上面的图片删除
            this.Myself = null; //
            AggregationIcon1.isChange = false;
            this.isHer = false;
            while (this.group_up.numElements > 0) {
                var item = this.group_up.getElementAt(this.group_up.numElements - 1);
                aggregation.AggregationIcon.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        };
        p.starJi = function (e) {
            socketio.IoConnect.getInstance().sendMessage(data.PomeloData.sendjijie, {}, function (data) {
            }, this);
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
        };
        p.zhqy = function (e) {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriendsForMass", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, count: this.iconCount, sign: sign }, function (obj) {
                system.Share.share(obj, function (n) {
                    if (n == 1)
                        system.TipText.produce().open("发送成功");
                });
            }, true, this);
        };
        p.comeToHost = function (e) {
            this.close();
        };
        p.close = function () {
            this.lable_jijie.visible = true;
            this.btn_startJijie.visible = true;
            this.lable_time.visible = false;
            this.lable_personCount.text = "";
            this.lable_personCount.visible = false;
            if (this.type == 0) {
                GameApp.Manager.controllerManager.aggregationController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else {
                GameApp.Manager.controllerManager.aggregationController.hide();
                GameApp.Manager.controllerManager.taskController.show();
            }
        };
        AggregationIcon1.crrentTime = 0; //更新的时间
        AggregationIcon1.isChange = false;
        return AggregationIcon1;
    }(eui.Component));
    task.AggregationIcon1 = AggregationIcon1;
    egret.registerClass(AggregationIcon1,'task.AggregationIcon1');
})(task || (task = {}));
