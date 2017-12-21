var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var SignPersonIcon = (function (_super) {
        __extends(SignPersonIcon, _super);
        function SignPersonIcon() {
            _super.call(this);
            this.num = 0;
            this.skinName = "src/view/gameUI/task/signIn/signPersonIconSkin.exml";
        }
        var d = __define,c=SignPersonIcon,p=c.prototype;
        /**生產*/
        SignPersonIcon.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (SignPersonIcon.cacheDict[mtype] == null) {
                SignPersonIcon.cacheDict[mtype] = [];
            }
            var dict = SignPersonIcon.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new SignPersonIcon();
            }
            return theFighter;
        };
        /**回收*/
        SignPersonIcon.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (SignPersonIcon.cacheDict[mtype] == null) {
                SignPersonIcon.cacheDict[mtype] = [];
            }
            var dict = SignPersonIcon.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            this.img_personIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (this.uid1 > 0)
                    console.log("点击里面");
                console.log(this.uid1, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid);
                userPanel.UserPanel.getInstance().open(this.uid1, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid);
                e.stopPropagation();
            }, this);
        };
        //设置别人的参数。
        p.setData = function (obj) {
            RES.getResByUrl(obj["user_pic"], this.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.uid1 = obj["user_id"];
            this.userId = obj["user_id"];
        };
        //把自己填加上用的；
        p.setData1 = function (obj) {
            RES.getResByUrl(obj["user_pic"], this.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.userId = obj["user_id"];
            this.uid1 = obj["uid"];
        };
        p.load_personIcon = function (source) {
            this.img_personIcon.texture = source;
            this.img_personIcon.width = 85;
            this.img_personIcon.height = 85;
        };
        p.clear = function () {
            this.img_personIcon.texture = null;
        };
        SignPersonIcon.cacheDict = {};
        return SignPersonIcon;
    }(eui.Component));
    task.SignPersonIcon = SignPersonIcon;
    egret.registerClass(SignPersonIcon,'task.SignPersonIcon');
})(task || (task = {}));
