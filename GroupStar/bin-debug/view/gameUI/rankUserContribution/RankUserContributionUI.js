var rankUserContribution;
(function (rankUserContribution) {
    /**
     *
     * @author
     *
     */
    var RankUserContributionUI = (function (_super) {
        __extends(RankUserContributionUI, _super);
        function RankUserContributionUI() {
            _super.call(this);
            this.gxrankArr = [];
            this.gxrank1Arr = [];
            this.currentGroup = 0; //当前数据默认第一组
            this.disNum = 10;
            this.index = 0;
            this.arr = [];
            this.send = false;
            this.skinName = "src/view/gameUI/rankUserContribution/RankUserContributionUISkin.exml";
        }
        var d = __define,c=RankUserContributionUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC";
            }
            this.scroll1.height = egret.MainContext.instance.stage.stageHeight - 100;
            this.groupBottom.y = egret.MainContext.instance.stage.stageHeight - 152;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE, this.change, this);
        };
        p.change = function () {
            if (this.scroll1.viewport && this.arr.length > 0) {
                var last = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
                console.log(this.scroll1.viewport.scrollV + " " + (last.y) + " " + (next.y - this.scroll1.height));
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
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + this.bid + this.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupUserContributionRankList", { user_id: GameApp.Manager.dataManager.uid, bid: this.bid, group_openid: this.group_openid, index: this.currentGroup, sign: sign }, function (obj) {
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
            console.log("index:" + this.index + " 显示 min:" + min + " max:" + max);
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
                if (i >= min && i < max) {
                    this.groupData.addChild(item);
                    console.log('add' + i);
                }
                else {
                    if (item.parent) {
                        item.parent.removeChild(item);
                        console.log('删除' + i);
                    }
                }
            }
        };
        p.setData = function (_obj) {
            var obj = _obj["data"];
            //            var selfItem: RankUserContributionItem1 = RankUserContributionItem1.produce();
            //            this.groupBottom.addChild(selfItem);
            //            selfItem.setData(obj["self"]);
            //            selfItem.y = 2;
            this.add(_obj);
        };
        p.add = function (_obj) {
            var obj = _obj["data"];
            console.log('add:', obj);
            var arrL = this.arr.length;
            for (var i = 0; i < obj["list"].length; i++) {
                var obj1 = obj["list"][i];
                var item = rankUserContribution.RankUserContributionItem.produce();
                this.groupData.addChild(item);
                item.y = (arrL * 125) + i * (125);
                item.bid = this.bid;
                item.group_openid = this.group_openid;
                item.setData(obj1);
                this.arr.push(item);
                this.gxrankArr.push(item);
            }
            this.dis();
        };
        p.clear = function () {
            this.arr = [];
            while (this.gxrankArr.length > 0) {
                var item = this.gxrankArr.pop();
                rankUserContribution.RankUserContributionItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            this.gxrankArr = [];
        };
        p.close = function () {
            GameApp.Manager.controllerManager.rankGroupContributionController.show(-1);
            GameApp.Manager.controllerManager.rankuserContributionController.hide();
        };
        return RankUserContributionUI;
    }(eui.Component));
    rankUserContribution.RankUserContributionUI = RankUserContributionUI;
    egret.registerClass(RankUserContributionUI,'rankUserContribution.RankUserContributionUI');
})(rankUserContribution || (rankUserContribution = {}));
