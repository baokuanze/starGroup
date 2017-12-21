var follow;
(function (follow) {
    /**
     *
     * @author
     *
     */
    var Follow = (function (_super) {
        __extends(Follow, _super);
        function Follow() {
            _super.call(this);
            this.skinName = "src/view/gameUI/follow/FollowSkin.exml";
        }
        var d = __define,c=Follow,p=c.prototype;
        p.childrenCreated = function () {
            var self = this;
            this.img_btnFllower.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.folloerAction(1);
            }, this);
            this.img_btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.folloerAction(0);
                if (self.parent) {
                    self.parent.removeChild(self);
                }
            }, this);
            this.img_btnFllower.y = (this.stage.stageHeight - this.img_btnFllower.height) / 2;
            this.img_btnClose.y = this.img_btnFllower.y + 20;
        };
        p.folloerAction = function (act) {
            var self = this;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + act + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/handleFollow", { user_id: GameApp.Manager.dataManager.uid, operate: act, sign: sign }, function (obj) {
                if (obj["st"] == 1 && obj["data"]["redirect"] == 1 && obj["data"]["url"]) {
                    location.href = obj["data"]["url"];
                }
                else {
                    if (self.parent) {
                        self.parent.removeChild(self);
                    }
                }
            }, true, self);
        };
        return Follow;
    }(eui.Component));
    follow.Follow = Follow;
    egret.registerClass(Follow,'follow.Follow');
})(follow || (follow = {}));
