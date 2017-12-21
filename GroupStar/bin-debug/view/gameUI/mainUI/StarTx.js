var mainUI;
(function (mainUI) {
    /**
     *
     * @author
     *
     */
    var StarTx = (function (_super) {
        __extends(StarTx, _super);
        function StarTx() {
            _super.call(this);
            //            this.skinName = "src/view/gameUI/mainUI/startxSkin.exml";
            this.bmpBack = new eui.Image("p_startx");
            this.bmpIcon = new module.BaseCircleImage();
            this.bmpIcon.x = 117 / 2;
            this.bmpIcon.y = 117 / 2;
            this.addChild(this.bmpBack);
            this.addChild(this.bmpIcon);
            this.bmpBack.anchorOffsetX = 117 / 2;
            this.bmpBack.anchorOffsetY = 117 / 2;
            this.bmpBack.x = 117 / 2;
            this.bmpBack.y = 117 / 2;
            this.anchorOffsetX = 117 / 2;
            this.anchorOffsetY = 117 / 2;
            this.touchEnabled = false;
            this.touchChildren = false;
        }
        var d = __define,c=StarTx,p=c.prototype;
        /**生產*/
        StarTx.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (StarTx.cacheDict[mtype] == null) {
                StarTx.cacheDict[mtype] = [];
            }
            var dict = StarTx.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new StarTx();
            }
            return theFighter;
        };
        /**回收*/
        StarTx.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (StarTx.cacheDict[mtype] == null) {
                StarTx.cacheDict[mtype] = [];
            }
            var dict = StarTx.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.setData = function (pic) {
            this.alpha = .2;
            this.scaleX = this.scaleY = .3;
            this.bmpBack.rotation = Math.random() * 360;
            this.bmpIcon.setData(pic, 55, .5, .5);
            egret.Tween.get(this).to({ alpha: .8, scaleX: 1, scaleY: 1 }, 800).to({ alpha: 0 }, 400).call(function () {
                StarTx.reclaim(this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }, this);
        };
        p.clear = function () {
            this.bmpIcon.clear();
            this.bmpBack.rotation = 0;
        };
        StarTx.cacheDict = {};
        return StarTx;
    }(eui.Group));
    mainUI.StarTx = StarTx;
    egret.registerClass(StarTx,'mainUI.StarTx');
})(mainUI || (mainUI = {}));
