var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTie_StarTable_Item = (function (_super) {
        __extends(MonthTie_StarTable_Item, _super);
        function MonthTie_StarTable_Item() {
            _super.call(this);
            this.skinName = "src/view/gameUI/monthTie/MonthIie_StarTable_ItemSkin.exml";
        }
        var d = __define,c=MonthTie_StarTable_Item,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_starNumber.fontFamily = "Heiti SC";
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_ClubName.fontFamily = "Heiti SC";
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
            this.lable_starNumber.text = str + "";
            this.lable_starName.text = window["hexToDec"](obj["user_name"]);
            this.lable_ClubName.text = window["hexToDec"](obj["group_name"]);
            ;
            RES.getResByUrl(obj["user_pic"], this.load_Icon, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_Icon = function (source) {
            this.img_starIcon.texture = source;
            this.img_starIcon.width = 77;
            this.img_starIcon.height = 77;
        };
        return MonthTie_StarTable_Item;
    }(eui.Component));
    monthTie.MonthTie_StarTable_Item = MonthTie_StarTable_Item;
    egret.registerClass(MonthTie_StarTable_Item,'monthTie.MonthTie_StarTable_Item');
})(monthTie || (monthTie = {}));
