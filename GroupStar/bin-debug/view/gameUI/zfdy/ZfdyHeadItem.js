var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var ZfdyHeadItem = (function (_super) {
        __extends(ZfdyHeadItem, _super);
        function ZfdyHeadItem() {
            _super.call(this);
            this.group_openid = "";
            this.bid = "";
            this.uid = 0;
            this.skinName = "src/view/gameUI/zfdy/ZfdyHeadSkin.exml";
            this.bmpHead = new module.BaseCircleImage();
        }
        var d = __define,c=ZfdyHeadItem,p=c.prototype;
        //private rankValueGroup:eui.Group;
        /**生產*/
        ZfdyHeadItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (ZfdyHeadItem.cacheDict[mtype] == null) {
                ZfdyHeadItem.cacheDict[mtype] = [];
            }
            var dict = ZfdyHeadItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new ZfdyHeadItem();
            }
            return theFighter;
        };
        /**回收*/
        ZfdyHeadItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (ZfdyHeadItem.cacheDict[mtype] == null) {
                ZfdyHeadItem.cacheDict[mtype] = [];
            }
            var dict = ZfdyHeadItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            this.addChildAt(this.bmpHead, 0);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        p.tap = function (e) {
            userPanel.UserPanel.getInstance().open(this.uid, this.bid, this.group_openid);
            e.stopPropagation();
        };
        p.setData = function (obj, rank) {
            this.uid = obj["user_id"];
            this.bmpRank.source = "p1_r" + rank;
            //            RES.getResByUrl(obj["user_pic"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            this.bmpHead.setData(obj["user_pic"], 84, 0, 0, 0);
        };
        p.load_end = function (s) {
            //		    this.bmpHead.source=s;
        };
        p.clear = function () {
            //		    this.bmpHead.source=null;
            this.bmpHead.clear();
            this.bmpRank.source = null;
        };
        ZfdyHeadItem.cacheDict = {};
        return ZfdyHeadItem;
    }(eui.Component));
    zfdy.ZfdyHeadItem = ZfdyHeadItem;
    egret.registerClass(ZfdyHeadItem,'zfdy.ZfdyHeadItem');
})(zfdy || (zfdy = {}));
