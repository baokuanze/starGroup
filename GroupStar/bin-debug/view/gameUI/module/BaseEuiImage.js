var module;
(function (module) {
    /**
     *
     * @author
     *
     */
    var BaseEuiImage = (function (_super) {
        __extends(BaseEuiImage, _super);
        function BaseEuiImage(source) {
            _super.call(this, source);
            this.anX = 0;
            this.anY = 0;
            this.isAnX = false;
            this.isLoad = false;
        }
        var d = __define,c=BaseEuiImage,p=c.prototype;
        p.loadPic = function (url, anX, anY, fun, scope) {
            //            console.log("正常-----------------------------------");
            this.url = url;
            this.anX = anX;
            this.anY = anY;
            if (anX > 0 || anY > 0) {
                this.isAnX = true;
            }
            this.fun = fun;
            this.scope = scope;
            if (this.url) {
                this.isLoad = true;
                RES.getResByUrl(this.url, this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        p.load_end = function (source) {
            this.texture = source;
            if (this.fun) {
                //                console.log("函数存在");
                this.fun.call(this.scope);
            }
            if (this.isAnX) {
                this.anchorOffsetX = source._sourceWidth * this.anX;
                this.anchorOffsetY = source._sourceHeight * this.anY;
            }
        };
        return BaseEuiImage;
    }(eui.Image));
    module.BaseEuiImage = BaseEuiImage;
    egret.registerClass(BaseEuiImage,'module.BaseEuiImage');
})(module || (module = {}));
