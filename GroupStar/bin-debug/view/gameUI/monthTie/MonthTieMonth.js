var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTieMonth = (function (_super) {
        __extends(MonthTieMonth, _super);
        function MonthTieMonth() {
            _super.call(this);
            this.skinName = "src/view/gameUI/monthTie/MonthTieMonthSkin.exml";
        }
        var d = __define,c=MonthTieMonth,p=c.prototype;
        /**生產*/
        MonthTieMonth.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (MonthTieMonth.cacheDict[mtype] == null) {
                MonthTieMonth.cacheDict[mtype] = [];
            }
            var dict = MonthTieMonth.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new MonthTieMonth();
            }
            return theFighter;
        };
        /**回收*/
        MonthTieMonth.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (MonthTieMonth.cacheDict[mtype] == null) {
                MonthTieMonth.cacheDict[mtype] = [];
            }
            var dict = MonthTieMonth.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_YearAndMonth.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (str, index, mtsNumber) {
            this.lable_YearAndMonth.text = str;
            this.img_imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOtherImg, this);
            this.index = index;
            this.mts = mtsNumber;
        };
        p.clear = function () {
        };
        p.touchOtherImg = function (e) {
            GameApp.Manager.viewManager.monthTieManager.monthTie.isChange = true;
            if (this.index == 0) {
                var num = GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.numElements;
                for (var i = num - 1; i > 0; i--) {
                    var iteme = GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.getElementAt(i);
                    monthTie.MonthTieMonth.reclaim(iteme);
                    if (iteme.parent) {
                        iteme.parent.removeChild(iteme);
                    }
                }
                GameApp.Manager.viewManager.monthTieManager.monthTie.img_buttonImg.y = 315;
                GameApp.Manager.viewManager.monthTieManager.monthTie.btn_drop.scaleY = 1;
                return;
            }
            var num = GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.numElements;
            for (var i = num - 1; i >= 0; i--) {
                var iteme = GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.getElementAt(i);
                monthTie.MonthTieMonth.reclaim(iteme);
                if (iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
            GameApp.Manager.viewManager.monthTieManager.monthTie.img_buttonImg.y = 315;
            GameApp.Manager.viewManager.monthTieManager.monthTie.btn_drop.scaleY = 1;
            GameApp.Manager.controllerManager.monthTieController.hide();
            GameApp.Manager.controllerManager.monthTieController.show(this.mts, "main");
            var monthTiemonth = monthTie.MonthTieMonth.produce();
            GameApp.Manager.viewManager.monthTieManager.monthTie.group_month.addChildAt(monthTiemonth, 0);
            monthTiemonth.setData(this.lable_YearAndMonth.text, 0, GameApp.Manager.viewManager.monthTieManager.monthTie.allObj["ts_list"][this.index]);
        };
        MonthTieMonth.cacheDict = {};
        return MonthTieMonth;
    }(eui.Component));
    monthTie.MonthTieMonth = MonthTieMonth;
    egret.registerClass(MonthTieMonth,'monthTie.MonthTieMonth');
})(monthTie || (monthTie = {}));
