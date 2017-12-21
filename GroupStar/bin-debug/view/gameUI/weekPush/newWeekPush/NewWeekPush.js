var newWeekPush;
(function (newWeekPush) {
    /**
     *
     * @author
     *
     */
    var NewWeekPush = (function (_super) {
        __extends(NewWeekPush, _super);
        function NewWeekPush() {
            _super.call(this);
            this.honorArr = [];
            this.skinName = "src/view/gameUI/weekPush/newWeekPush/NewWeekPushSkin.exml";
        }
        var d = __define,c=NewWeekPush,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_weekTime.fontFamily = "Heiti SC";
                this.lable_weekTitle.fontFamily = "Heiti SC";
                this.lable_rankNumber.fontFamily = "Heiti SC";
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_contribution.fontFamily = "Heiti SC";
                this.lable_thisWeekHonor.fontFamily = "Heiti SC";
                this.lable_go.fontFamily = "Heiti SC";
                this.lable_superTeam.fontFamily = "Heiti SC";
                this.lable_time.fontFamily = "Heiti SC";
                this.lable_title.fontFamily = "Heiti SC";
            }
            this.scr1.height = this.stage.stageHeight;
            this.rect_goGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var self = this;
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + self.bid + self.wts + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getWeeklyNewEnter", { user_id: GameApp.Manager.dataManager.uid, bid: self.bid, wts: self.wts, sign: sign }, function (obj) {
                }, true, this);
                //                GameApp.Manager.dataManager.topEnter = 2;
                GameApp.Manager.controllerManager.weekPushController.hide();
                GameApp.Manager.controllerManager.start(this.bid);
            }, this);
            //this.lable_title.textFlow = (new egret.HtmlTextParser).parser("9月9日—9月12日，每日签到奖励" + "<font color= #FCFE14 size= 32><b>钻石翻倍</b></font>" + "!");
        };
        p.setData = function (obj) {
            this.obj = obj;
            this.bid = obj["bid"];
            GameApp.Manager.dataManager.bid = obj["bid"];
            this.wts = obj["time"];
            //            var data = new Date(obj["time"]);
            //            this.lable_weekTime.text = Tools.getInstance().getTime(data);
            this.lable_starName.text = window["hexToDec"](obj["star_name"]);
            this.lable_rankNumber.text = "No." + obj["rank"];
            RES.getResByUrl(obj["head_img"], this.setStarIcon, this, RES.ResourceItem.TYPE_IMAGE);
            if (obj["contribution_list"]) {
                for (var i = 0; i < obj["contribution_list"].length; i++) {
                    var item = new newWeekPush.NewWeekPushContributionItem();
                    item.setData(obj["contribution_list"][i], i + 1);
                    item.x = 0;
                    item.y = i * 142;
                    this.group_center.addChild(item);
                }
            }
            this.group_button.y = this.group_center.y + this.group_center.height + 100;
            if (obj["honor_info"]) {
                if (obj["honor_info"]["mass_best"] && obj["honor_info"]["mass_best"]["num"] != 0) {
                    this.honorArr.push("mass_best"); //集结
                }
                if (obj["honor_info"]["crowdfunding_best"] && obj["honor_info"]["crowdfunding_best"]["num"] != 0) {
                    this.honorArr.push("crowdfunding_best"); //众筹
                }
                if (obj["honor_info"]["sign_best"] && obj["honor_info"]["sign_best"]["num"] != 0) {
                    this.honorArr.push("sign_best");
                }
            }
            var len = this.honorArr.length;
            var cha = (750 - (len * 214)) / (len + 1);
            for (var j = 0; j < this.honorArr.length; j++) {
                var honor = new newWeekPush.NewWeekPushHonor();
                honor.setData(this.obj, this.honorArr[j]);
                honor.x = cha + j * 214 + j * cha;
                honor.y = 0;
                this.group_hohorItem.addChild(honor);
            }
        };
        p.setStarIcon = function (source) {
            this.img_starIcon.texture = source;
        };
        p.clear = function () {
            this.lable_weekTime.text = "";
            this.lable_weekTitle.text = "";
            this.lable_rankNumber.text = "";
            this.lable_starName.text = "";
            this.img_starIcon.source = "";
            while (this.group_center.numElements > 0) {
                var item = this.group_center.getElementAt(this.group_center.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while (this.group_hohorItem.numElements > 0) {
                var item1 = this.group_hohorItem.getElementAt(this.group_hohorItem.numElements - 1);
                if (item1.parent) {
                    item1.parent.removeChild(item1);
                }
            }
        };
        return NewWeekPush;
    }(eui.Component));
    newWeekPush.NewWeekPush = NewWeekPush;
    egret.registerClass(NewWeekPush,'newWeekPush.NewWeekPush');
})(newWeekPush || (newWeekPush = {}));
