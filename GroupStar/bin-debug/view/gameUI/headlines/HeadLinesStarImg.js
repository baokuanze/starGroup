var headLines;
(function (headLines) {
    /**
     *
     * @author
     *
     */
    var HeadLinesStarImg = (function (_super) {
        __extends(HeadLinesStarImg, _super);
        function HeadLinesStarImg() {
            _super.call(this);
            this.skinName = "src/view/gameUI/headlines/HeadLinesStarImgSkin.exml";
        }
        var d = __define,c=HeadLinesStarImg,p=c.prototype;
        p.setData = function (str) {
            RES.getResByUrl(str, this.setImg, this);
        };
        p.setImg = function (source) {
            var wid = source["textureWidth"];
            var hig = source["textureHeight"];
            var bit = 698 / wid;
            this.img_pic.width = 698;
            this.img_pic.height = hig * bit;
            this.img_pic.texture = source;
        };
        return HeadLinesStarImg;
    }(eui.Component));
    headLines.HeadLinesStarImg = HeadLinesStarImg;
    egret.registerClass(HeadLinesStarImg,'headLines.HeadLinesStarImg');
})(headLines || (headLines = {}));
