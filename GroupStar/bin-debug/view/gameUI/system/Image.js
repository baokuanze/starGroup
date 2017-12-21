var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var Image1 = (function (_super) {
        __extends(Image1, _super);
        function Image1() {
            _super.call(this);
        }
        var d = __define,c=Image1,p=c.prototype;
        /**生產*/
        Image1.produce = function (mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (Image1.cacheDict[mtype] == null) {
                Image1.cacheDict[mtype] = [];
            }
            var dict = Image1.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new Image1();
            }
            return theFighter;
        };
        /**回收*/
        Image1.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (Image1.cacheDict[mtype] == null) {
                Image1.cacheDict[mtype] = [];
            }
            var dict = Image1.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.setData = function (str) {
            if (str == "hand") {
                this.source = "p1_parseLiang";
            }
            if (str == "yuan") {
                this.source = "j_imgButton";
            }
        };
        p.clear = function () {
            this.source = null;
            this.alpha = 1;
        };
        //        private hand:eui.Image;
        Image1.cacheDict = {};
        return Image1;
    }(eui.Image));
    system.Image1 = Image1;
    egret.registerClass(Image1,'system.Image1');
})(system || (system = {}));
