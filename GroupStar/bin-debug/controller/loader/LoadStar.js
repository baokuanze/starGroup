var controller;
(function (controller) {
    var loader;
    (function (loader) {
        /**
         *
         * @author
         *
         */
        var LoadStar = (function () {
            function LoadStar() {
                this.reload = true;
                this.loadNum = 0;
                this.loadTotal = 2;
            }
            var d = __define,c=LoadStar,p=c.prototype;
            LoadStar.getInstance = function () {
                if (!this._intance) {
                    this._intance = new LoadStar();
                }
                return this._intance;
            };
            p.load = function (starurl, nexturl, fun, scope) {
                this.starurl = starurl;
                this.nexturl = nexturl;
                this.fun = fun;
                this.scope = scope;
                this.startLoad();
            };
            p.getImg = function (starurl, nexturl, ui) {
                if (this.starurl != starurl && starurl) {
                    this.starurl = starurl;
                    this.nexturl = nexturl;
                    RES.getResByUrl(this.starurl, function (source) {
                        ui.source = source;
                        controller.loader.LoadStar.RES["star"]["starimg"] = source;
                        RES.getResByUrl(starurl, this.onCompFun1, this);
                    }, this);
                }
                else {
                    if (!ui.source) {
                        ui.source = controller.loader.LoadStar.RES["star"]["starimg"];
                    }
                }
            };
            p.getNext = function (starurl, nexturl, ui) {
                if (this.starurl != starurl && starurl) {
                    this.starurl = starurl;
                    this.nexturl = nexturl;
                    RES.getResByUrl(this.nexturl, function (source) {
                        ui.source = source;
                        controller.loader.LoadStar.RES["star"]["nextimg"] = source;
                        RES.getResByUrl(starurl, this.onCompFun2, this);
                    }, this);
                }
                else {
                    if (!ui.source) {
                        ui.source = controller.loader.LoadStar.RES["star"]["nextimg"];
                    }
                }
            };
            p.startLoad = function () {
                //            GameApp.Manager.viewManager.createLoadingImg();
                RES.getResByUrl(this.starurl, this.onCompFun, this);
            };
            p.onCompFun = function (source) {
                controller.loader.LoadStar.RES["star"]["starimg"] = source;
                RES.getResByUrl(this.nexturl, this.onCompFun1, this);
                this.fun.call(this.scope, source);
            };
            p.onCompFun1 = function (source) {
                controller.loader.LoadStar.RES["star"]["nextimg"] = source;
                //            GameApp.Manager.viewManager.removeLoadingimg();
                this.reload = false;
            };
            p.onCompFun2 = function (source) {
                controller.loader.LoadStar.RES["star"]["starimg"] = source;
            };
            LoadStar.RES = {
                "star": {
                    "starimg": egret.Texture,
                    "nextimg": egret.Texture
                }
            };
            return LoadStar;
        }());
        loader.LoadStar = LoadStar;
        egret.registerClass(LoadStar,'controller.loader.LoadStar');
    })(loader = controller.loader || (controller.loader = {}));
})(controller || (controller = {}));
