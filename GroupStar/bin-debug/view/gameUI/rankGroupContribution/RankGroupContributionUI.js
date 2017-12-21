var rankGroupContribution;
(function (rankGroupContribution) {
    /**
     *
     * @author
     *
     */
    var RankGroupContributionUI = (function (_super) {
        __extends(RankGroupContributionUI, _super);
        function RankGroupContributionUI() {
            _super.call(this);
            this.gxrankArr = [];
            this.gxrank1Arr = [];
            this.bo = false;
            this.currentGroup = 0; //当前数据默认第一组
            this.disNum = 10;
            this.index = 0;
            this.arr = [];
            this.send = false;
            this.skinName = "src/view/gameUI/rankGroupContribution/RankGroupContributionUISkin.exml";
        }
        var d = __define,c=RankGroupContributionUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC";
            }
            this.scroll1.height = egret.MainContext.instance.stage.stageHeight - 100;
            this.groupBottom.y = egret.MainContext.instance.stage.stageHeight - 152;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE, this.change, this);
        };
        RankGroupContributionUI.groupsArr = function (obj) {
            rankGroupContribution.RankGroupContributionUI.xunGroupArr = obj["valid"];
        };
        RankGroupContributionUI.addxuanGroups = function (obj) {
            rankGroupContribution.RankGroupContributionUI.xunGroupArr.push(obj);
        };
        p.change = function () {
            if (this.scroll1.viewport && this.arr.length > 0) {
                var last = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
                //                console.log(this.scroll1.viewport.scrollV + " " + (last.y) + " " + (next.y - this.scroll1.height));
                if (this.scroll1.viewport.scrollV >= next.y - this.scroll1.height) {
                    if (this.index < this.arr.length / this.disNum - 1) {
                        this.index++;
                        this.dis();
                    }
                    else {
                        this.ajaxPost();
                    }
                }
                if (this.scroll1.viewport.scrollV < last.y) {
                    if (this.index > 0) {
                        this.index--;
                        this.dis();
                    }
                }
            }
        };
        p.ajaxPost = function () {
            if (!this.send) {
                this.send = true;
                var self = this;
                this.currentGroup++;
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.bid_save + "&");
                Util.sendJson1("http://sf.xintiao100.com" + "/getGroupContributionRankList", { bid: GameApp.Manager.dataManager.bid_save, index: this.currentGroup, sign: sign }, function (obj) {
                    self.send = false;
                    if (obj['st'] == 1) {
                        self.add(obj);
                    }
                }, true, this);
            }
        };
        p.dis = function () {
            var min = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
            var max = (this.index + 1) * this.disNum;
            //           console.log("index:" + this.index + " 显示 min:" + min + " max:" + max);
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
                if (i >= min && i < max) {
                    this.groupData.addChild(item);
                }
                else {
                    if (item.parent) {
                        item.parent.removeChild(item);
                    }
                }
            }
        };
        p.setData = function (_obj) {
            var self = this;
            var obj = _obj["data"];
            this.add(_obj);
            var len = rankGroupContribution.RankGroupContributionUI.xunGroupArr.length;
            if (len > 0) {
                self.r = self.r || 2;
                self.next = self.next || 0;
                if (!self.xuanGroup && !self.xuanGroup1) {
                    self.xuanGroup = new groupXuan.GroupXuan();
                    self.xuanGroup.x = 0;
                    self.xuanGroup.y = 100;
                    self.scroll1.y = 260;
                    self.xuanGroup.setData(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]);
                    self.addChild(self.xuanGroup);
                    self.next += 1;
                    if (self.next >= len) {
                        self.next = 0;
                    }
                }
                self.timer = new egret.Timer(3000, 0);
                self.timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    var len1 = rankGroupContribution.RankGroupContributionUI.xunGroupArr.length;
                    if (len1 > 0) {
                        var time = new Date().getTime();
                        if (rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next] && time > rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]['end_time']) {
                            rankGroupContribution.RankGroupContributionUI.xunGroupArr.splice(self.next, 1);
                        }
                        else {
                            if (len1 != 1) {
                                if (self.r == 2) {
                                    self.xuanGroup1 = new groupXuan.GroupXuan();
                                    self.xuanGroup1.x = 750;
                                    self.xuanGroup1.y = 100;
                                    self.xuanGroup1.setData(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]);
                                    self.addChild(self.xuanGroup1);
                                    self.next += 1;
                                    if (self.next >= len1) {
                                        self.next = 0;
                                    }
                                    egret.Tween.get(self.xuanGroup).to({ x: -750 }, 1000).call(function () {
                                        if (self.xuanGroup.parent) {
                                            self.xuanGroup.parent.removeChild(self.xuanGroup);
                                            self.xuanGroup = null;
                                        }
                                    });
                                    egret.Tween.get(self.xuanGroup1).to({ x: 0 }, 1000).call(function () { });
                                    self.r = 1;
                                }
                                else {
                                    self.xuanGroup = new groupXuan.GroupXuan();
                                    self.xuanGroup.x = 750;
                                    self.xuanGroup.y = 100;
                                    self.xuanGroup.setData(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]);
                                    self.addChild(self.xuanGroup);
                                    self.next += 1;
                                    if (self.next >= len1) {
                                        self.next = 0;
                                    }
                                    egret.Tween.get(self.xuanGroup1).to({ x: -750 }, 1000).call(function () {
                                        if (self.xuanGroup1.parent) {
                                            self.xuanGroup1.parent.removeChild(self.xuanGroup1);
                                            self.xuanGroup1 = null;
                                        }
                                    });
                                    egret.Tween.get(self.xuanGroup).to({ x: 0 }, 1000).call(function () { });
                                    self.r = 2;
                                }
                            }
                        }
                    }
                    else {
                        self.timer.stop();
                        if (self.r == 2) {
                            if (self.xuanGroup.parent) {
                                self.xuanGroup.parent.removeChild(self.xuanGroup);
                            }
                        }
                        else {
                            if (self.xuanGroup1.parent) {
                                self.xuanGroup1.parent.removeChild(self.xuanGroup1);
                            }
                        }
                        self.scroll1.y = 100;
                    }
                }, self);
                self.timer.start();
            }
            else {
                self.scroll1.y = 100;
            }
        };
        p.add = function (_obj) {
            var obj = _obj["data"];
            //            console.log('add:',obj);
            var arrL = this.arr.length;
            for (var i = 0; i < obj["list"].length; i++) {
                var obj1 = obj["list"][i];
                if (obj1["group_openid"] == GameApp.Manager.dataManager.group_openid) {
                    var item1 = rankGroupContribution.RankGroupItem1.produce();
                    this.groupData.addChild(item1);
                    item1.y = (arrL * 125) + i * (125);
                    //                    item1.setData(obj1);
                    this.arr.push(item1);
                    this.gxrank1Arr.push(item1);
                }
                else {
                    var item = rankGroupContribution.RankGroupItem.produce();
                    this.groupData.addChild(item);
                    item.y = (arrL * 125) + i * (125);
                    //                    item.setData(obj1);
                    this.arr.push(item);
                    this.gxrankArr.push(item);
                }
            }
            for (var i = this.arr.length - 1; i >= arrL; i--) {
                var obj1 = obj["list"][i - arrL];
                console.log(i);
                if (obj1["group_openid"] == GameApp.Manager.dataManager.group_openid) {
                    var item1 = this.arr[i];
                    item1.setData(obj1);
                }
                else {
                    var item = this.arr[i];
                    item.setData(obj1);
                }
            }
            this.dis();
        };
        p.clear = function () {
            while (this.gxrankArr.length > 0) {
                var item = this.gxrankArr.pop();
                rankGroupContribution.RankGroupItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while (this.gxrank1Arr.length > 0) {
                var item1 = this.gxrank1Arr.pop();
                rankGroupContribution.RankGroupItem1.reclaim(item1);
                if (item1.parent) {
                    item1.parent.removeChild(item1);
                }
            }
            this.gxrankArr = [];
            this.gxrank1Arr = [];
            this.arr = [];
            this.currentGroup = 0;
            this.groupData.scrollV = 0;
            this.index = 0;
        };
        p.close = function () {
            if (this.type == 0) {
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else {
                GameApp.Manager.controllerManager.taskController.show();
            }
            if (this.timer) {
                this.timer.stop();
            }
            GameApp.Manager.controllerManager.rankGroupContributionController.hide();
        };
        RankGroupContributionUI.xunGroupArr = [];
        return RankGroupContributionUI;
    }(eui.Component));
    rankGroupContribution.RankGroupContributionUI = RankGroupContributionUI;
    egret.registerClass(RankGroupContributionUI,'rankGroupContribution.RankGroupContributionUI');
})(rankGroupContribution || (rankGroupContribution = {}));
