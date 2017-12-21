var controller;
(function (controller) {
    var loader;
    (function (loader) {
        /**
         *
         * @author
         *
         */
        var LoaderManager = (function () {
            function LoaderManager() {
                this.loadindex = 0;
                this._progress = null;
                this._complete = null;
                this.autoRemoveView = false;
            }
            var d = __define,c=LoaderManager,p=c.prototype;
            /**
            * 最初的静默加载
            */
            p.preloading = function (callback, scope) {
                this.scope = scope;
                this.startLoading(["proload"], null, callback);
            };
            /**
            * 游戏主加载
            */
            p.mainLoading = function (groupNames, callback, scope) {
                this.scope = scope;
                var int = 0;
                for (var i = 0; i < groupNames.length; i++) {
                    RES.loadGroup(groupNames[i], i);
                    if (!RES.isGroupLoaded(groupNames[i])) {
                        int++;
                    }
                }
                console.log(int, 'init');
                if (int > 0) {
                    GameApp.Manager.viewManager.loading.show();
                    this.autoRemoveView = true;
                    this.startLoading(groupNames, function (event) {
                        console.log(event, 'RES.ResourceEvent)');
                        GameApp.Manager.viewManager.loading.setProgress(event);
                    }, function () {
                        callback.call(scope);
                    });
                }
                else {
                    callback.call(scope);
                }
            };
            /**
            *游戏分步加载
            **/
            p.moduleLoading = function (groupNames, callback, scope) {
                this.loadindex = 0;
                this.scope = scope;
                this._complete = callback;
                this.loadingGroups = groupNames;
                this.autoRemoveView = true;
                var int = 0;
                for (var i = 0; i < this.loadingGroups.length; i++) {
                    RES.loadGroup(this.loadingGroups[i], i);
                    if (!RES.isGroupLoaded(this.loadingGroups[i])) {
                        int++;
                    }
                }
                if (int == 0) {
                    if (this._complete)
                        this._complete.call(this.scope ? this.scope : this, event);
                    return;
                }
                GameApp.Manager.viewManager.loading.showModule();
                this._progress = function (event) {
                    GameApp.Manager.viewManager.loading.setProgress(event);
                };
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                for (var i = 0; i < this.loadingGroups.length; i++) {
                    RES.loadGroup(this.loadingGroups[i], i);
                }
            };
            /**开始加载明星资源**/
            p.starLoading = function (starurl, nexturl) {
                //            controller.loader.LoadStar.getInstance().load(starurl,nexturl);
            };
            /**
            * 开始加载资源
            */
            p.startLoading = function (groupNames, onProgress, onComplete) {
                this.loadindex = 0;
                this.loadingGroups = groupNames;
                this._progress = onProgress;
                this._complete = onComplete;
                //初始化Resource资源加载库
                this.onConfigComplete(null);
                //            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
                //            RES.loadConfig("resource/resource.json","resource/");
            };
            p.loadRes = function (onComplete) {
                this._complete = onComplete;
                this.onc(null);
                //            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onc,this);
                //            RES.loadConfig("resource/resource.json","resource/");
            };
            p.onc = function (event) {
                //            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onc,this);
                if (this._complete)
                    this._complete.call(this.scope ? this.scope : this, event);
            };
            /**
            * 配置文件加载完成,开始预加载preload资源组。
            */
            p.onConfigComplete = function (event) {
                //            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                for (var i = 0; i < this.loadingGroups.length; i++) {
                    RES.loadGroup(this.loadingGroups[i], this.loadingGroups.length - i);
                }
                //            GameApp.Manager.viewManager.loading.start();
                //            GameApp.Manager.viewManager.loading.setLoadingTip(this.loadingGroups[this.loadindex]);
            };
            /**
            * preload资源组加载完成
            */
            p.onResourceLoadComplete = function (event) {
                if (event.groupName == this.loadingGroups[this.loadingGroups.length - 1]) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                    if (this.autoRemoveView) {
                        GameApp.Manager.viewManager.loading.removeM();
                    }
                    if (this._complete)
                        this._complete.call(this.scope ? this.scope : this, event);
                }
                else {
                    this.loadindex++;
                }
            };
            /**
            * 资源组加载出错
            */
            p.onResourceLoadError = function (event) {
                console.warn("Group:" + event.groupName + " has failed to load");
                //忽略加载失败的项目
                this.onResourceLoadComplete(event);
            };
            /**
            * preload资源组加载进度
            */
            p.onResourceProgress = function (event) {
                if (this._progress)
                    this._progress(event);
            };
            d(p, "AutoRemoveView",undefined
                ,function (autoRemoveView) {
                    this.autoRemoveView = autoRemoveView;
                }
            );
            p.endLoader = function () {
                //            if(this.autoRemoveView) {
                if (GameApp.Manager.viewManager.loading) {
                    GameApp.Manager.viewManager.loading.resetPropress();
                    GameApp.Manager.viewManager.loading.end();
                    GameApp.Manager.viewManager.loading.remove();
                }
                //            }
            };
            p.errorLoader = function (str) {
                if (GameApp.Manager.viewManager.loading) {
                    GameApp.Manager.viewManager.loading.error(str);
                }
            };
            return LoaderManager;
        }());
        loader.LoaderManager = LoaderManager;
        egret.registerClass(LoaderManager,'controller.loader.LoaderManager');
    })(loader = controller.loader || (controller.loader = {}));
})(controller || (controller = {}));
