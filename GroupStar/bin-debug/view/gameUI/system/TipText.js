var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var TipText = (function (_super) {
        __extends(TipText, _super);
        function TipText() {
            _super.call(this);
            this.skinName = "src/view/gameUI/system/TipTextSkin.exml";
        }
        var d = __define,c=TipText,p=c.prototype;
        /**生產*/
        TipText.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (TipText.cacheDict[mtype] == null) {
                TipText.cacheDict[mtype] = [];
            }
            var dict = TipText.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new TipText();
            }
            return theFighter;
        };
        /**回收*/
        TipText.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (TipText.cacheDict[mtype] == null) {
                TipText.cacheDict[mtype] = [];
            }
            var dict = TipText.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblText.fontFamily = "Heiti SC";
            }
        };
        p.open = function (txt, wait, clear) {
            if (wait === void 0) { wait = 500; }
            if (clear === void 0) { clear = 500; }
            GameApp.Manager.viewManager.TopUIStage.addChild(this);
            this.lblText.text = txt;
            this.x = (750 - 394) / 2;
            this.y = 500;
            this.alpha = 1;
            egret.Tween.get(this).wait(wait).to({ y: 400, alpha: 0 }, clear).call(function () {
                this.close();
            }, this);
        };
        p.close = function () {
            TipText.reclaim(this);
        };
        p.clear = function () {
            this.lblText.text = "";
            this.parent.removeChild(this);
        };
        TipText.cacheDict = {};
        return TipText;
    }(eui.Component));
    system.TipText = TipText;
    egret.registerClass(TipText,'system.TipText');
})(system || (system = {}));
