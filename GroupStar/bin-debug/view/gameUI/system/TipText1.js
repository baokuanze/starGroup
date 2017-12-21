var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var TipText1 = (function (_super) {
        __extends(TipText1, _super);
        function TipText1() {
            _super.call(this);
            this._size = 24;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var d = __define,c=TipText1,p=c.prototype;
        /**生產*/
        TipText1.produce = function (mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (TipText1.cacheDict[mtype] == null) {
                TipText1.cacheDict[mtype] = [];
            }
            var dict = TipText1.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new TipText1();
            }
            return theFighter;
        };
        /**回收*/
        TipText1.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (TipText1.cacheDict[mtype] == null) {
                TipText1.cacheDict[mtype] = [];
            }
            var dict = TipText1.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.init = function () {
            if (Tools.getInstance().isIphone()) {
                this.fontFamily = "Heiti SC";
            }
            else {
                this.fontFamily = "Heiti";
            }
        };
        p.setData = function (str, _size, _color) {
            if (_size === void 0) { _size = 24; }
            if (_color === void 0) { _color = 0xffffff; }
            this.size = _size;
            this.textColor = _color;
            this.text = str;
        };
        p.clear = function () {
            this.text = "";
            this.alpha = 1;
        };
        TipText1.cacheDict = {};
        return TipText1;
    }(eui.Label));
    system.TipText1 = TipText1;
    egret.registerClass(TipText1,'system.TipText1');
})(system || (system = {}));
