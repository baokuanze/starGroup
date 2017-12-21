var userPanel;
(function (userPanel) {
    /**
     *
     * @author
     *
     */
    var UserPaise = (function (_super) {
        __extends(UserPaise, _super);
        function UserPaise() {
            _super.call(this);
            this.paiseCount = 0;
            this.totalPaiseCount = 0;
            this.count = 0;
            this._times = 0;
            this.times = 0;
            this.skinName = "src/view/gameUI/userPanel/UserPaiseSkin.exml";
        }
        var d = __define,c=UserPaise,p=c.prototype;
        p.childrenCreated = function () {
            var self = this;
            if (Tools.getInstance().isIphone()) {
                this.lable_parise.fontFamily = "Heiti SC";
                this.lable_pariseCount.fontFamily = "Heiti SC";
            }
            this.rect_push.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.img_pariseAn.visible = false;
                self.img_pariseLiang.visible = true;
                var sign = new md5().hex_md5(self.bid + self.target_user_id + self.source_user_id + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/praiseUser", { bid: self.bid, target_user_id: self.target_user_id, source_user_id: self.source_user_id, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.addPariseIcon();
                        self.closetick();
                        self.lable_pariseCount.text = self.allObj["praise"].length + 1 + "";
                        // 滚动时
                        var imag_hand = system.Image1.produce();
                        imag_hand.x = self.img_pariseAn.x;
                        imag_hand.y = self.img_pariseAn.y;
                        self.addChild(imag_hand);
                        imag_hand.setData("hand");
                        egret.Tween.get(imag_hand).to({ y: imag_hand.y - 80 }, 550).to({ alpha: 0 }, 300).call(function () {
                            system.Image1.reclaim(imag_hand);
                            if (imag_hand.parent) {
                                imag_hand.parent.removeChild(imag_hand);
                            }
                        }, this);
                    }
                });
            }, this);
        };
        p.setData = function (obj, uid, bid, group_openid) {
            this.allObj = obj;
            this.bid = bid;
            this.target_user_id = uid;
            this.source_user_id = GameApp.Manager.dataManager.uid;
            this.totalPaiseCount = obj["praise"].length;
            this.count = obj["praise"].length;
            if (this.count > 0) {
                if (this.count < 5) {
                    this.times = 500;
                }
                else if (this.count < 10) {
                    this.times = 800;
                }
                else if (this.count < 50) {
                    this.times = 1500;
                }
                else {
                    this.times = 2000;
                }
                egret.Ticker.getInstance().register(this.tick, this);
            }
            else {
                this.lable_pariseCount.text = "0";
            }
            if (uid == GameApp.Manager.dataManager.uid) {
                this.img_pariseAn.visible = false;
                this.img_pariseLiang.visible = true;
                this.lable_parise.text = "赞过我的人";
                for (var i in obj["praise"]) {
                    var pariseIcon = userPanel.UserPaiseIcon.produce();
                    this.group_parisePerson.addChild(pariseIcon);
                    pariseIcon.setData(obj["praise"][i]["user_pic"]);
                }
                this.rect_push.touchEnabled = false;
            }
            else {
                this.lable_parise.text = "赞过TA的人";
                for (var i in obj["praise"]) {
                    if (GameApp.Manager.dataManager.uid == obj["praise"][i]["user_id"]) {
                        this.img_pariseAn.visible = false;
                        this.img_pariseLiang.visible = true;
                    }
                    var pariseIcon = userPanel.UserPaiseIcon.produce();
                    this.group_parisePerson.addChild(pariseIcon);
                    pariseIcon.setData(obj["praise"][i]["user_pic"]);
                }
                this.rect_push.touchEnabled = true;
            }
        };
        p.tick = function (ct) {
            this._times += ct;
            this.lable_pariseCount.text = parseInt(this.count * (this._times / this.times) + "") + "";
            if (this._times >= this.times) {
                this.lable_pariseCount.text = this.count + "";
                this.count = 0;
                this._times = 0;
                egret.Ticker.getInstance().unregister(this.tick, this);
            }
        };
        p.closetick = function () {
            egret.Ticker.getInstance().unregister(this.tick, this);
        };
        p.clear = function () {
            egret.Ticker.getInstance().unregister(this.tick, this);
            this.paiseCount = 0;
            this.totalPaiseCount = 0;
            this.lable_pariseCount.text = "0";
            this.scroll.viewport.scrollH = 0;
            this.img_pariseAn.visible = true;
            this.img_pariseLiang.visible = false;
            while (this.group_parisePerson.numElements > 0) {
                var iteme = this.group_parisePerson.getElementAt(this.group_parisePerson.numElements - 1);
                userPanel.UserPaiseIcon.reclaim(iteme);
                if (iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
        };
        p.addPariseIcon = function () {
            var pariseIcon = userPanel.UserPaiseIcon.produce();
            this.group_parisePerson.addChildAt(pariseIcon, 0);
            pariseIcon.setData(GameApp.Manager.dataManager.user_pic);
        };
        return UserPaise;
    }(eui.Component));
    userPanel.UserPaise = UserPaise;
    egret.registerClass(UserPaise,'userPanel.UserPaise');
})(userPanel || (userPanel = {}));
