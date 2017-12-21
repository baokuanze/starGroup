var signIn;
(function (signIn) {
    /**
     *
     * @author
     *
     */
    var SignInManager = (function (_super) {
        __extends(SignInManager, _super);
        function SignInManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=SignInManager,p=c.prototype;
        p.show = function (type) {
            this.type = type;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.signIn) {
                this.signIn = new task.SignIn();
            }
            var n = this.signIn.group_signPersonIcon.numElements;
            console.log(n, "n");
            while (this.signIn.group_signPersonIcon.numElements > 0) {
                var iteme = this.signIn.group_signPersonIcon.getElementAt(this.signIn.group_signPersonIcon.numElements - 1);
                task.SignPersonIcon.reclaim(iteme);
                if (iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
            this.BottomUIStage.addChild(this.signIn);
            this.signIn.type = this.type;
            this.signIn.setData(SignInManager.updataObj);
            if (SignInManager.updataObj["isSigned"] == true) {
                this.diaNumber = this.signIn.diaNumber ? this.signIn.diaNumber : SignInManager.updataObj["award"];
                this.expNumber = this.signIn.expNumber ? this.signIn.expNumber : SignInManager.updataObj["signInfo"]["each_sign_group_exp"];
                this.signIn.updatePOsAndStay(this.diaNumber, this.expNumber);
            }
            if (SignInManager.updataObj["isSigned"] == false) {
                socketio.IoConnect.getInstance().sendMessage(10, {}, function (data) {
                    console.log(data, "签到返回数据");
                    if (data["st"] == 1) {
                        self.signIn.signOK(data["data"]);
                        SignInManager.updataObj["isSigned"] = true;
                    }
                }, this);
            }
        };
        SignInManager.init = function (obj) {
            this.updataObj = obj;
            console.log(obj, "---------初始化");
        };
        SignInManager.setData = function (obj) {
            if (obj["type"] != 6) {
                return;
            }
            var self = this;
            var add = false;
            console.log(obj, "--------跟新的值");
            if (!GameApp.Manager.viewManager.sign.signIn) {
                console.log("不在的情况");
            }
            else {
                GameApp.Manager.viewManager.sign.signIn.setUpdateValue(obj);
                console.log("在的情况");
            }
            if (obj["group_openid"] != GameApp.Manager.dataManager.group_openid) {
            }
            else {
                this.updataObj["signedUserArray"].push({
                    user_pic: obj["user_pic"],
                    user_id: obj["user_id"] ? obj["user_id"] : obj["uid"]
                });
                if (obj["isSignedLongest"]) {
                    signIn.SignInManager.updataObj["signedLongest"]["user_id"] = obj["user_id"] ? obj["user_id"] : obj["uid"];
                    signIn.SignInManager.updataObj["signedLongest"]["num"] = obj["userSignedNum"];
                    signIn.SignInManager.updataObj["signedLongest"]["user_pic"] = obj["user_pic"];
                    signIn.SignInManager.updataObj["signedLongest"]["user_name"] = obj["user_name"];
                }
                if (obj["isTodaySignedCrit"]) {
                    signIn.SignInManager.updataObj["signedCrit"]["user_id"] = obj["user_id"] ? obj["user_id"] : obj["uid"];
                    signIn.SignInManager.updataObj["signedCrit"]["user_pic"] = obj["user_pic"];
                    signIn.SignInManager.updataObj["signedCrit"]["user_name"] = obj["user_name"];
                }
                if (obj["isTodaySignedFrist"]) {
                    signIn.SignInManager.updataObj["signedFirst"]["user_id"] = obj["user_id"] ? obj["user_id"] : obj["uid"];
                    signIn.SignInManager.updataObj["signedFirst"]["user_pic"] = obj["user_pic"];
                    signIn.SignInManager.updataObj["signedFirst"]["user_name"] = obj["user_name"];
                }
            }
        };
        p.hide = function () {
            if (this.signIn.parent) {
                this.BottomUIStage.removeChild(this.signIn);
                this.signIn.clear();
            }
        };
        p.loading = function () {
            var self = this;
            //            GameApp.Manager.controllerManager.loader.moduleLoading(["public"],this.load_end,this);
            this.initUI();
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return SignInManager;
    }(common.BaseView));
    signIn.SignInManager = SignInManager;
    egret.registerClass(SignInManager,'signIn.SignInManager');
})(signIn || (signIn = {}));
