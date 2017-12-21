var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTie_FansTable_Item = (function (_super) {
        __extends(MonthTie_FansTable_Item, _super);
        function MonthTie_FansTable_Item() {
            _super.call(this);
            this.skinName = "src/view/gameUI/monthTie/MonthTie_FansTable_ItemSkin.exml";
        }
        var d = __define,c=MonthTie_FansTable_Item,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_fansNumber.fontFamily = "Heiti SC";
                this.lable_fansClubName.fontFamily = "Heiti SC";
                this.lable_fansName.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (obj, str) {
            var randIcon = str % 2;
            if (randIcon == 0) {
                this.img_whiteBg.visible = false;
                this.img_grayBg.visible = true;
            }
            else {
                this.img_whiteBg.visible = true;
                this.img_grayBg.visible = false;
            }
            this.lable_fansNumber.text = str + "";
            this.lable_fansClubName.text = window["hexToDec"](obj["group_name"]);
            this.lable_fansName.text = window["hexToDec"](obj["star_name"]);
            RES.getResByUrl(obj["group_face"], this.load_Icon, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_Icon = function (source) {
            this.img_starIcon.texture = source;
            this.img_starIcon.width = 72;
            this.img_starIcon.height = 72;
        };
        return MonthTie_FansTable_Item;
    }(eui.Component));
    monthTie.MonthTie_FansTable_Item = MonthTie_FansTable_Item;
    egret.registerClass(MonthTie_FansTable_Item,'monthTie.MonthTie_FansTable_Item');
})(monthTie || (monthTie = {}));
