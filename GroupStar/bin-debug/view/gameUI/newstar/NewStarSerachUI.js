var newstar;
(function (newstar) {
    /**
     *
     * @author
     *
     */
    var NewStarSerachUI = (function (_super) {
        __extends(NewStarSerachUI, _super);
        function NewStarSerachUI() {
            _super.call(this);
            this.skinName = "src/view/gameUI/newstar/NewStarSerachUISkin.exml";
        }
        var d = __define,c=NewStarSerachUI,p=c.prototype;
        p.childrenCreated = function () {
            var self = this;
            this.scroll1.height = this.stage.stageHeight - 290 - 50;
            if (Tools.getInstance().isIphone()) {
                this.lbl0.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lblStarName.fontFamily = "Heiti SC";
            }
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
                if (self.lblStarName.text == "请输入明星姓名或组合全称") {
                    self.lblStarName.text = "";
                    self.lblStarName.textColor = 0x14b8f6;
                }
            }, this);
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_OUT, function () {
                if (self.lblStarName.text == "" || self.lblStarName.text == "请输入明星姓名或组合全称") {
                    self.lblStarName.text = "请输入明星姓名或组合全称";
                    self.lblStarName.textColor = 0xbcd5df;
                }
                else {
                    self.serach(self.lblStarName.text);
                }
            }, this);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.newStarController.hideSerach();
                GameApp.Manager.controllerManager.newStarController.show();
            }, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.newStarController.hideSerach();
                GameApp.Manager.viewManager.starPageManager.show();
            }, this);
        };
        p.serach = function (_name) {
            var self = this;
            if (_name) {
                var name = window["decToHex"](_name);
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/searchStar", { user_id: GameApp.Manager.dataManager.uid, name: name, sign: sign }, function (obj) {
                    self.clearData();
                    if (obj["st"] == 1) {
                        this.setData(obj);
                    }
                    else {
                        self.groupTip.visible = true;
                        self.lbl1.text = "很遗憾,暂无“" + self.lblStarName.text + "”";
                    }
                }, true, this);
            }
        };
        p.setData = function (obj) {
            var list = obj["stars_list"];
            if (list.length > 0) {
                this.groupTip.visible = false;
                for (var i in list) {
                    var item = new starPage.StarPageItem();
                    this.groupData.addChild(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headTap, this);
                }
                for (var j = list.length - 1; j >= 0; j--) {
                    var item = this.groupData.getElementAt(j);
                    item.setData(list[j]);
                }
            }
            else {
                this.groupTip.visible = true;
                this.lbl1.text = "很遗憾,暂无“" + this.lblStarName.text + "”";
            }
        };
        p.headTap = function (e) {
            var item = e.currentTarget;
            GameApp.Manager.dataManager.bid = item.bid;
            console.log("选择:" + item.bid);
            GameApp.Manager.dataManager.topEnter = 2; //入驻界面不能有排名
            GameApp.Manager.controllerManager.newStarController.hideSerach();
            GameApp.Manager.controllerManager.start();
        };
        p.clearData = function () {
            while (this.groupData.numElements > 0) {
                var item = this.groupData.getElementAt(this.groupData.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        };
        p.clear = function () {
            this.lblStarName.text = "请输入明星姓名或组合全称";
            this.lblStarName.textColor = 0xbcd5df;
            this.clearData();
            this.groupTip.visible = false;
        };
        p.close = function () {
            GameApp.Manager.controllerManager.newStarController.hideSerach();
            GameApp.Manager.viewManager.starPageManager.show();
        };
        return NewStarSerachUI;
    }(eui.Component));
    newstar.NewStarSerachUI = NewStarSerachUI;
    egret.registerClass(NewStarSerachUI,'newstar.NewStarSerachUI');
})(newstar || (newstar = {}));
