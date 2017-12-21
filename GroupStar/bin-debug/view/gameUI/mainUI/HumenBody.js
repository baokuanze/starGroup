var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var HumenBody = (function (_super) {
        __extends(HumenBody, _super);
        function HumenBody() {
            _super.call(this);
            this.uid = 0;
            this.isLoad = false;
            this.level = 0;
            this.star_index = 0;
            this._sc = 1;
            this.humen = new eui.Image();
            this.addChild(this.humen);
            this.touchEnabled = true;
            this.scaleX = this.scaleY = GameApp.sc;
            //            var sp:egret.Shape=Tools.getInstance().getCricleMask(-2,-2,5,this);
            //            this.anchorX = .5; this.anchorY = 1;
        }
        var d = __define,c=HumenBody,p=c.prototype;
        /**生產*/
        HumenBody.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (HumenBody.cacheDict[mtype] == null) {
                HumenBody.cacheDict[mtype] = [];
            }
            var dict = HumenBody.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new HumenBody();
            }
            return theFighter;
        };
        /**回收*/
        HumenBody.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (HumenBody.cacheDict[mtype] == null) {
                HumenBody.cacheDict[mtype] = [];
            }
            var dict = HumenBody.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.setScale = function (sc) {
            this._sc = sc;
        };
        d(p, "sc"
            ,function () {
                return this._sc;
            }
            ,function (sc) {
                this._sc = sc;
                this.humen.scaleX = sc;
                this.humen.scaleY = sc;
            }
        );
        p.setData = function (url, level) {
            this.setImg(url);
            this.level = level;
        };
        p.resetData = function (obj) {
            this.isLoad = true;
            this.url = obj["path"];
            this.uid = obj["id"];
        };
        p.setImg = function (url) {
            if (this.url != url)
                this.isLoad = true;
            this.url = url;
        };
        p.load = function () {
            if (this.isLoad) {
                this.isLoad = false;
                RES.getResByUrl(this.url, this.load_end, this);
            }
        };
        p.load_end = function (source) {
            this.humen.source = source;
            this.humen.anchorOffsetX = source._sourceWidth * .5;
            this.humen.anchorOffsetY = source._sourceHeight * 1;
            this.y = source._sourceHeight;
            //            GameApp.Manager.viewManager.gameMainManager.humenUI.anchorOffsetY = source._sourceHeight * 1;
        };
        p.clear = function () {
            this.humen.source = null;
            this.isLoad = true;
            this.url = "";
            this._sc = 0;
        };
        HumenBody.cacheDict = {};
        return HumenBody;
    }(eui.Group));
    mainUI.HumenBody = HumenBody;
    egret.registerClass(HumenBody,'mainUI.HumenBody');
})(mainUI || (mainUI = {}));
