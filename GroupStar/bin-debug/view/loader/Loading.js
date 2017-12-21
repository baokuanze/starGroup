var view;
(function (view) {
    var loader;
    (function (loader) {
        /**
        *
        * @author
        *
        */
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading(viewManager) {
                _super.call(this, viewManager);
                this.tips = {
                    "main": "正在加载游戏资源...",
                    //            "wj":"正在加载武将资源包...",
                    "public": "正在加载公共资源包...",
                };
                //            this.skinMap = {
                //                "1": view.loader.MainLoading
                //            };
            }
            var d = __define,c=Loading,p=c.prototype;
            p.setStep = function () {
                this.type = "step";
                //            this.loadingUI.skinName = ztc.view.loader.StepLoadingSkin;
            };
            p.show = function () {
                if (!this.loadingUI) {
                    this.loadingUI = new loader.MainLoading();
                }
                this.BottomUIStage.addChild(this.loadingUI);
                //this.setLoadingTip("正在加载游戏资源...");
            };
            p.error = function (str) {
                this.loadingUI.error(str);
            };
            p.showModule = function () {
                if (!this.moduleLoading) {
                    this.moduleLoading = new loader.ModuleLoading();
                }
                this.moduleLoading.show();
                this.UIStage.addChild(this.moduleLoading);
            };
            p.remove = function () {
                if (this.loadingUI && this.loadingUI.parent)
                    this.BottomUIStage.removeChild(this.loadingUI);
                if (this.moduleLoading && this.moduleLoading.parent) {
                    this.moduleLoading.clear();
                    this.moduleLoading.parent.removeChild(this.moduleLoading);
                }
            };
            p.removeM = function () {
                if (this.moduleLoading && this.moduleLoading.parent) {
                    this.moduleLoading.clear();
                    this.moduleLoading.parent.removeChild(this.moduleLoading);
                }
            };
            p.setLoadingTip = function (g) {
                if (!this.loadingUI || this.type == "step")
                    return;
                var tip = this.tips[g];
                if (tip) {
                    this.loadingUI.setLoadingName(tip);
                }
                else {
                    this.loadingUI.setLoadingName("正在加载游戏资源...");
                }
            };
            p.setProgress = function (event) {
                console.log(event, '2222');
                if (!this.loadingUI)
                    return;
                this.loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
            };
            p.start = function () {
                if (this.type != "step") {
                    if (this.loadingUI)
                        this.loadingUI.start();
                }
            };
            p.end = function () {
                if (this.type != "step") {
                    if (this.loadingUI)
                        this.loadingUI.end();
                }
            };
            p.resetPropress = function () {
                //            this.loadingUI.resetProgress();
            };
            return Loading;
        }(common.BaseView));
        loader.Loading = Loading;
        egret.registerClass(Loading,'view.loader.Loading');
    })(loader = view.loader || (view.loader = {}));
})(view || (view = {}));
