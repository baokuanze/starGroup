var userPanel;
(function (userPanel) {
    /**
     *
     * @author
     *
     */
    var UserPaiseIcon = (function (_super) {
        __extends(UserPaiseIcon, _super);
        function UserPaiseIcon() {
            _super.call(this);
            this.skinName = "src/view/gameUI/userPanel/UserPaiseIconSkin.exml";
        }
        var d = __define,c=UserPaiseIcon,p=c.prototype;
        UserPaiseIcon.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (UserPaiseIcon.cacheDict[mtype] == null) {
                UserPaiseIcon.cacheDict[mtype] = [];
            }
            var dict = UserPaiseIcon.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new UserPaiseIcon();
            }
            return theFighter;
        };
        /**回收*/
        UserPaiseIcon.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (UserPaiseIcon.cacheDict[mtype] == null) {
                UserPaiseIcon.cacheDict[mtype] = [];
            }
            var dict = UserPaiseIcon.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.setData = function (pic) {
            RES.getResByUrl(pic, this.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_personIcon = function (source) {
            this.img_paiseIcon.texture = source;
        };
        p.clear = function () {
            this.img_paiseIcon.texture = null;
        };
        UserPaiseIcon.cacheDict = {};
        return UserPaiseIcon;
    }(eui.Component));
    userPanel.UserPaiseIcon = UserPaiseIcon;
    egret.registerClass(UserPaiseIcon,'userPanel.UserPaiseIcon');
})(userPanel || (userPanel = {}));
