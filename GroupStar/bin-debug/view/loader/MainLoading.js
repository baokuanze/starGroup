var view;
(function (view) {
    var loader;
    (function (loader) {
        /**
         *
         * @author
         *
         */
        var MainLoading = (function (_super) {
            __extends(MainLoading, _super);
            function MainLoading() {
                _super.call(this);
                this.skinName = "src/view/loader/MainLoadingSkin.exml"; //ztc.view.loader.mainLoadingSkin; 
            }
            var d = __define,c=MainLoading,p=c.prototype;
            p.childrenCreated = function () {
                if (Tools.getInstance().isIphone()) {
                    this.lblText.fontFamily = "Heiti SC";
                }
                //            this.bmpG.anchorX = 0.5;
                //            this.bmpG.anchorY = 0.5;
            };
            p.error = function (str) {
                this.lblText.text = "" + str;
            };
            p.setProgress = function (current, total) {
                //            if(this.progress)
                //            this.progress.value = (current / total) * 100;
                //            if(this.bmpG) {
                //                this.bmpG.x = (current / total) * 444;
                //            }
                //            if(this.lblText)
                this.lblText.text = "" + parseInt(current / total * 100 + "") + "%";
            };
            p.setLoadingName = function (str) {
                //            this.lblDesc.text = str;
            };
            p.resetProgress = function () {
                //            if(this.progress)
                //            this.progress.value = 0;
                //            if(this.bmpG)
                //                this.bmpG.x = 0;
            };
            p.start = function () {
                //            this.setTx();
            };
            p.clear = function () {
            };
            p.end = function () {
                //            egret.Tween.removeTweens(this.bmpG);
            };
            p.setTx = function () {
                //            egret.Tween.get(this.bmpG,{ loop: true }).to({ rotation: 360 },500);
            };
            return MainLoading;
        }(eui.Component));
        loader.MainLoading = MainLoading;
        egret.registerClass(MainLoading,'view.loader.MainLoading');
    })(loader = view.loader || (view.loader = {}));
})(view || (view = {}));
