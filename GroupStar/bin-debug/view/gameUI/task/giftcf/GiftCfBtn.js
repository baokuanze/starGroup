var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var GiftCfBtn = (function (_super) {
        __extends(GiftCfBtn, _super);
        function GiftCfBtn(type) {
            _super.call(this);
            this.type = 0;
            this.skinName = "src/view/gameUI/task/giftcf/GiftCfBtnSkin.exml";
            this.type = type;
        }
        var d = __define,c=GiftCfBtn,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
            }
            switch (this.type) {
                case 1:
                    this.lblNum.text = "1";
                    this.bmpBack.fillColor = 0x4AD486;
                    break;
                case 2:
                    this.lblNum.text = "59";
                    this.bmpBack.fillColor = 0x3ABEC0;
                    break;
                case 3:
                    this.lblNum.text = "99";
                    this.bmpBack.fillColor = 0xFFA350;
                    break;
                case 4:
                    this.lblNum.text = "999";
                    this.bmpBack.fillColor = 0xF08166;
                    break;
            }
        };
        return GiftCfBtn;
    }(eui.Component));
    task.GiftCfBtn = GiftCfBtn;
    egret.registerClass(GiftCfBtn,'task.GiftCfBtn');
})(task || (task = {}));
