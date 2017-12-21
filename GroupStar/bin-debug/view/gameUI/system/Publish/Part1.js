var Publish;
(function (Publish) {
    /**
     *
     * @author
     *
     */
    var Part1 = (function (_super) {
        __extends(Part1, _super);
        function Part1() {
            _super.call(this);
            this.skinName = 'src/view/gameUI/system/Publish/part1Skin.exml';
        }
        var d = __define,c=Part1,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb0.fontFamily = "Heiti SC";
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
                this.lb4.fontFamily = "Heiti SC";
                this.lb5.fontFamily = "Heiti SC";
                this.lb6.fontFamily = "Heiti SC";
                this.lb7.fontFamily = "Heiti SC";
                this.lb8.fontFamily = "Heiti SC";
                this.lb10.fontFamily = "Heiti SC";
                this.lb12.fontFamily = "Heiti SC";
                this.lb13.fontFamily = "Heiti SC";
            }
        };
        return Part1;
    }(eui.Component));
    Publish.Part1 = Part1;
    egret.registerClass(Part1,'Publish.Part1');
})(Publish || (Publish = {}));
