var controller;
(function (controller) {
    var util;
    (function (util) {
        /**
         *
         * @author
         *
         */
        var BaseURLLoader = (function (_super) {
            __extends(BaseURLLoader, _super);
            function BaseURLLoader() {
                _super.call(this);
                this.ismask = true;
                this.dataFormat = egret.URLLoaderDataFormat.TEXT;
            }
            var d = __define,c=BaseURLLoader,p=c.prototype;
            //        public doPost(url: string,data: string,callBack: Function,zyy?: any): void {
            //            this.yu = zyy;
            //            this.callback = callBack;
            //            this.addEventListener(egret.Event.COMPLETE,this.load_COMPLETE,this);
            //            var request: egret.URLRequest = new egret.URLRequest(url);
            //            request.method = egret.URLRequestMethod.POST;
            //            request.data = new egret.URLVariables(data);
            //            this.load(request);
            //        }
            p.load_COMPLETE = function (event) {
                //            if(!this.ismask) return;
                GameApp.Manager.viewManager.removeLoading();
                //var loader: egret.URLLoader = <egret.URLLoader> event.target;
                this.removeEventListener(egret.Event.COMPLETE, this.load_COMPLETE, this);
                var data = this.data;
                var obj = JSON.parse(data.toString());
                this.yu ? this.callback.call(this.yu, obj) : this.callback(obj);
                this.callback = null;
                this.yu = null;
            };
            p.sendJson = function (url, data, callBack, isPost, scope, ismask) {
                if (isPost === void 0) { isPost = true; }
                if (ismask === void 0) { ismask = true; }
                this.ismask = ismask;
                if (ismask)
                    GameApp.Manager.viewManager.createLoading();
                this.yu = scope;
                this.callback = callBack;
                var _data = "";
                if (data) {
                    for (var key in data) {
                        _data += key + "=" + data[key] + "&";
                    }
                    if (_data.length > 0)
                        _data = _data.substring(0, _data.length - 1);
                }
                this.addEventListener(egret.Event.COMPLETE, this.load_COMPLETE, this);
                var request = new egret.URLRequest(url);
                //            request.method = isPost ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
                request.method = egret.URLRequestMethod.GET;
                request.data = new egret.URLVariables(_data);
                this.load(request);
                //            var request = new egret.HttpRequest();
                //            request.responseType = egret.HttpResponseType.TEXT;
                //            request.open(GameApp.Manager.dataManager.IP + "/mainPage",egret.HttpMethod.POST);
                //            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                //            request.send(params);
                //            request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
                //            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
                //            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
            };
            p.sendJsonp = function (url, para, data, callBack, scope) {
                this.yu = scope;
                this.callback = callBack;
                var _data = "";
                if (data) {
                    for (var key in data) {
                        _data += key + "=" + data[key] + "&";
                    }
                    if (_data.length > 0)
                        _data = "&" + _data.substring(0, _data.length - 1);
                }
                var req = new egret.URLRequest(url + "?" + para + "=");
                req.method = egret.URLRequestMethod.POST;
                this._request = req;
                JsonpReq.process(this, _data);
                this.addEventListener(egret.Event.COMPLETE, this.load_COMPLETE1, this);
                //            this.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
                //            this.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
            };
            p.load_COMPLETE1 = function (event) {
                event.stopPropagation();
                console.log("返回jsonp");
                this.removeEventListener(egret.Event.COMPLETE, this.load_COMPLETE1, this);
                var data = this.data;
                console.log("返  54回jsonp:" + data["st"]);
                this.yu ? this.callback.call(this.yu, data) : this.callback(data);
                this.yu = null;
                this.callback = null;
            };
            p.onPostProgress = function (event) {
                console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            };
            p.onGetIOError = function (event) {
                console.log("get error : " + event);
            };
            return BaseURLLoader;
        }(egret.URLLoader));
        util.BaseURLLoader = BaseURLLoader;
        egret.registerClass(BaseURLLoader,'controller.util.BaseURLLoader');
    })(util = controller.util || (controller.util = {}));
})(controller || (controller = {}));
