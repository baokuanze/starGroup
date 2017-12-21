var zfdy;
(function (zfdy) {
    /**
     *
     * @author
     *
     */
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection() {
            _super.call(this);
            this.pid = -1;
            this.colorArr = [0X565865, 0Xa37565, 0X87c49b, 0X199be6, 0Xf58ebd, 0Xf76864, 0Xf5b316];
            this.skinName = "src/view/gameUI/zfdy/CollectionSkin.exml";
        }
        var d = __define,c=Collection,p=c.prototype;
        Collection.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (Collection.cacheDict[mtype] == null) {
                Collection.cacheDict[mtype] = [];
            }
            var dict = Collection.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new Collection();
            }
            return theFighter;
        };
        /**回收*/
        Collection.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (Collection.cacheDict[mtype] == null) {
                Collection.cacheDict[mtype] = [];
            }
            var dict = Collection.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_work.fontFamily = "Heiti SC";
                this.lable_starNameWork.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (obj, star_name) {
            if (obj["type"] == 1) {
                this.img_Icon.source = "gc_BigMusic";
            }
            else if (obj['type'] == 2) {
                this.img_Icon.source = "gc_BigTv";
            }
            else if (obj['type'] == 3) {
                this.img_Icon.source = 'gc_BigMovie';
            }
            var self = this;
            this.lable_starNameWork.text = star_name;
            if (obj['name'].length > 10) {
                var str = window["hexToDec"](obj["name"]);
                var str1 = str.substr(0, 10);
                this.lable_work.text = str1;
            }
            else {
                this.lable_work.text = window["hexToDec"](obj["name"]);
            }
            var index = parseInt(obj["colour"]);
            this.lable_work.textColor = this.colorArr[index];
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.sineOut);
            egret.Tween.get(this).wait(1400).to({ alpha: 0 }, 700).call(function () {
                self.dispatchEventWith("END", false, this);
            });
        };
        p.clear = function () {
            this.alpha = 1;
            this.lable_starNameWork.text = "";
            this.lable_work.text = "";
            this.img_Icon.source = "";
        };
        Collection.cacheDict = {};
        return Collection;
    }(eui.Component));
    zfdy.Collection = Collection;
    egret.registerClass(Collection,'zfdy.Collection');
})(zfdy || (zfdy = {}));
