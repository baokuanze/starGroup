var mySelfStar;
(function (mySelfStar) {
    /**
     *
     * @author
     *
     */
    var StarIcon = (function (_super) {
        __extends(StarIcon, _super);
        function StarIcon() {
            _super.call(this);
            this.skinName = "src/view/gameUI/headlines/mySelfStar/StarIconSkin.exml";
        }
        var d = __define,c=StarIcon,p=c.prototype;
        StarIcon.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (StarIcon.cacheDict[mtype] == null) {
                StarIcon.cacheDict[mtype] = [];
            }
            var dict = StarIcon.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new StarIcon();
            }
            return theFighter;
        };
        /**回收*/
        StarIcon.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (StarIcon.cacheDict[mtype] == null) {
                StarIcon.cacheDict[mtype] = [];
            }
            var dict = StarIcon.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            //            this.btn_icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goTo,this);
        };
        p.goTo = function (e) {
            //            socketio.IoConnect.getInstance().disconnect();//断开连接
            //            GameApp.Manager.controllerManager.start(this.bid);
            //            GameApp.Manager.controllerManager.headLinesController.hide(); 
        };
        p.setData = function (obj, btn_width, btn_height, icon_width, icon_height) {
            this.btn_icon.width = btn_width;
            this.btn_icon.height = btn_height;
            this.img_icon.width = icon_width;
            this.img_icon.height = icon_height;
            RES.getResByUrl(obj["head_img"], this.onCompFun, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.onCompFun = function (source) {
            this.img_icon.texture = source;
        };
        p.clear = function () {
            this.img_icon.texture = null;
        };
        StarIcon.cacheDict = {};
        return StarIcon;
    }(eui.Component));
    mySelfStar.StarIcon = StarIcon;
    egret.registerClass(StarIcon,'mySelfStar.StarIcon');
})(mySelfStar || (mySelfStar = {}));
