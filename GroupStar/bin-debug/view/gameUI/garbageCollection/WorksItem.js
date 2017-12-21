var garbageCollection;
(function (garbageCollection) {
    /**
     *
     * @author
     *
     */
    var WorksItem = (function (_super) {
        __extends(WorksItem, _super);
        function WorksItem() {
            _super.call(this);
            this.colorArr = [0x565865, 0x37565, 0x87c49b, 0x199be6, 0xf58ebd, 0xf76864, 0xf5b316];
            this.skinName = "src/view/gameUI/garbageCollection/WorksItemSkin.exml";
        }
        var d = __define,c=WorksItem,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_titleName.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (name, index) {
            this.lable_titleName.text = name;
            this.lable_titleName.textColor = this.colorArr[index];
            if (Tools.getInstance().isIphone() && (!window["isChina"](name))) {
                var length = name.length;
                var width1 = this.lable_titleName.width;
                var width = width1 + length * 2.5;
                this.rect_bg.width = width;
            }
            else {
                var width = this.lable_titleName.width;
                this.rect_bg.width = width + 25;
            }
            this.rect_bg.strokeColor = this.colorArr[index];
        };
        p.clear = function () {
        };
        return WorksItem;
    }(eui.Component));
    garbageCollection.WorksItem = WorksItem;
    egret.registerClass(WorksItem,'garbageCollection.WorksItem');
})(garbageCollection || (garbageCollection = {}));
