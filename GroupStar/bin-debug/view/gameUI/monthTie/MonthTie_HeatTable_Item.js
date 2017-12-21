var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTie_HeatTable_Item = (function (_super) {
        __extends(MonthTie_HeatTable_Item, _super);
        function MonthTie_HeatTable_Item() {
            _super.call(this);
            this.skinName = "src/view/gameUI/monthTie/MonthTie_HeatTable_ItemSkin.exml";
        }
        var d = __define,c=MonthTie_HeatTable_Item,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_rankImgNumber.fontFamily = "Heiti SC";
                this.lable_heat.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (obj, str) {
            var randIcon = str % 2;
            if (randIcon == 0) {
                this.img_itemBgWhite.visible = false;
                this.img_itemBgGray.visible = true;
            }
            else {
                this.img_itemBgWhite.visible = true;
                this.img_itemBgGray.visible = false;
            }
            this.lable_rankImgNumber.text = str + "";
            this.lable_starName.text = window["hexToDec"](obj["name"]);
            this.lable_heat.text = "热度：" + window["hexToDec"](obj["month_hot"]);
            RES.getResByUrl(obj["head_img"], this.load_Icon, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_Icon = function (source) {
            this.img_starIcon.texture = source;
            this.img_starIcon.width = 94;
            this.img_starIcon.height = 94;
        };
        return MonthTie_HeatTable_Item;
    }(eui.Component));
    monthTie.MonthTie_HeatTable_Item = MonthTie_HeatTable_Item;
    egret.registerClass(MonthTie_HeatTable_Item,'monthTie.MonthTie_HeatTable_Item');
})(monthTie || (monthTie = {}));
