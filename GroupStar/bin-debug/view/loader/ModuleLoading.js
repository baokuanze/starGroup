var view;
(function (view) {
    var loader;
    (function (loader) {
        /**
         *
         * @author
         *
         */
        var ModuleLoading = (function (_super) {
            __extends(ModuleLoading, _super);
            function ModuleLoading() {
                _super.call(this);
                this.skinName = "src/view/loader/ModuleLoadingSkin.exml";
            }
            var d = __define,c=ModuleLoading,p=c.prototype;
            p.show = function () {
                //		    egret.Tween.get(this.bmpIcon,{loop:true}).to({rotation:360},1000);
            };
            p.clear = function () {
                //		    egret.Tween.removeTweens(this.bmpIcon);
            };
            return ModuleLoading;
        }(eui.Component));
        loader.ModuleLoading = ModuleLoading;
        egret.registerClass(ModuleLoading,'view.loader.ModuleLoading');
    })(loader = view.loader || (view.loader = {}));
})(view || (view = {}));
