var starPage;
(function (starPage) {
    /**
     *
     * @author
     *
     */
    var StarPageItem = (function (_super) {
        __extends(StarPageItem, _super);
        function StarPageItem() {
            _super.call(this);
            this.bid = "";
            this.skinName = "src/view/gameUI/starPage/StarPageItemSkin.exml";
            this.bmpIocn = new module.BaseCircleImage();
        }
        var d = __define,c=StarPageItem,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblNum.fontFamily = "Heiti SC";
                this.lblrz.fontFamily = "Heiti SC";
            }
            this.addChild(this.bmpIocn);
            this.bmpIocn.x = (225 - 143) * 0.5;
            this.bmpIocn.y = 32;
            this.bmpIocn.touchEnabled = false;
            //this.btnInit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.init_tap,this);
            //this.bmpIocn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.headTap,this);
            //            this.btnInit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.init_tap,this);
            //            this.bmpIocn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.headTap,this);
        };
        p.init_tap = function () {
            //GameApp.Manager.dataManager.bid=this.bid;
            //console.log("选择:" + this.bid);
            // GameApp.Manager.viewManager.starPageManager.hide();
            //GameApp.Manager.controllerManager.start();
            GameApp.Manager.dataManager.bid = this.bid;
            this.getUrlAttribute('is_owner');
            GameApp.Manager.viewManager.maskStage(.4);
            if (GameApp.Manager.dataManager.is_owner) {
                aler.AlertPanel.getInstance().show('温馨提示', '本群只有一次选择机会，确认入驻？', '取消', '确认', function (t) {
                    if (t == 'ok') {
                        GameApp.Manager.viewManager.gameMainManager.joinStar(function () {
                            GameApp.Manager.dataManager.topEnter = 2;
                            GameApp.Manager.viewManager.starPageManager.hide();
                            GameApp.Manager.controllerManager.start();
                        });
                    }
                    GameApp.Manager.viewManager.clearMask();
                });
            }
            else {
                aler.AlertPanel.getInstance().show('温馨提示', '只有群主才能入住哦，赶快呼唤群主吧', '取消', '确认', function (t) {
                    if (t == 'ok') {
                        GameApp.Manager.viewManager.gameMainManager.joinStar(function () {
                            //GameApp.Manager.viewManager.starPageManager.hide();
                            //GameApp.Manager.controllerManager.start();
                        });
                    }
                    GameApp.Manager.viewManager.clearMask();
                });
            }
        };
        p.getUrlAttribute = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context;
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            context == null || context == "" || context == "undefined" ? context = "" : context;
            context == '1' ? GameApp.Manager.dataManager.is_owner = true : GameApp.Manager.dataManager.is_owner = false;
        };
        p.setData = function (obj) {
            if (obj["recommend"]) {
                this.rect.fillColor = 0xdef5fb;
            }
            else {
                this.rect.fillColor = 0xF4F4F4;
            }
            this.bmpIocn.setData(obj["head_img"], 143);
            this.lblName.text = window["hexToDec"](obj["name"]);
            this.lblNum.text = obj["group_num"] + "个群已入驻";
            this.bid = obj["bid"];
        };
        return StarPageItem;
    }(eui.Component));
    starPage.StarPageItem = StarPageItem;
    egret.registerClass(StarPageItem,'starPage.StarPageItem');
})(starPage || (starPage = {}));
