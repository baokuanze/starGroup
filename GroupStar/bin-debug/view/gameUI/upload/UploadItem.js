var upload;
(function (upload) {
    /**
     *
     * @author
     *
     */
    var UploadItem = (function (_super) {
        __extends(UploadItem, _super);
        function UploadItem() {
            _super.call(this);
            this.votes = 0;
            this.uid = -1;
            this.skinName = "src/view/gameUI/upload/UploadItemSkin.exml";
            this.bmpIcon = new module.BaseCircleImage();
        }
        var d = __define,c=UploadItem,p=c.prototype;
        /**生產*/
        UploadItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (UploadItem.cacheDict[mtype] == null) {
                UploadItem.cacheDict[mtype] = [];
            }
            var dict = UploadItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new UploadItem();
            }
            return theFighter;
        };
        /**回收*/
        UploadItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (UploadItem.cacheDict[mtype] == null) {
                UploadItem.cacheDict[mtype] = [];
            }
            var dict = UploadItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.lblHot.fontFamily = "Heiti SC";
            }
            this.bmpIcon.x = 15;
            this.bmpIcon.y = 279;
            this.addChild(this.bmpIcon);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.send_tap, this);
            this.bmpBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.viewManager.uploadManager.uploadUI.disLarge(this.obj["img"], this.obj["upload_user_pic"], window["hexToDec"](this.obj["upload_user_name"]), window["hexToDec"](this.obj["upload_group_name"]));
            }, this);
        };
        p.send_tap = function () {
            if (GameApp.Manager.dataManager.lucystar > 0) {
                var ep = this.localToGlobal(this.lblHot.x, this.lblHot.y);
                GameApp.Manager.viewManager.uploadManager.uploadUI._tx = ep.x + 50;
                GameApp.Manager.viewManager.uploadManager.uploadUI._ty = ep.y;
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + this.uid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starImagesVote", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, id: this.uid, sign: sign }, function (obj) {
                    this.starImagesVoteCall(obj);
                }, true, this);
            }
            else {
                aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                    if (data == "ok") {
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.uploadController.hide, 0);
                    }
                }, this);
            }
        };
        p.starImagesVoteCall = function (data) {
            switch (data["st"]) {
                case 1:
                    this.lblHot.text = data["votes"];
                    this.votes = data["votes"];
                    this.obj["votes"] = this.votes;
                    GameApp.Manager.dataManager.lucystar = data["lucky_star"];
                    flower.FlowerUI.getInstance().setLucky();
                    GameApp.Manager.viewManager.uploadManager.uploadUI.startip();
                    egret.Tween.get(this).wait(1000).call(function () {
                        GameApp.Manager.viewManager.uploadManager.uploadUI.item_send(this.parent.getChildIndex(this), data["votes"]);
                    }, this);
                    break;
                case -1:
                    aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                        if (data == "ok") {
                            GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.uploadController.hide, 0);
                        }
                    }, this);
                    break;
            }
        };
        p.setObj = function (obj) {
            this.obj = obj;
        };
        p.setData = function (obj) {
            this.obj = obj;
            this.uid = obj["id"];
            this.lblName.text = Tools.getInstance().getStringLen(window["hexToDec"](obj["upload_user_name"]), 11);
            this.lblHot.text = obj["votes"];
            this.votes = obj["votes"];
            RES.getResByUrl(obj["thumbnail_img"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.bmpIcon.setData(obj["upload_user_pic"], 26, 0, 0, 1);
        };
        p.load_end = function (source) {
            this.bmpBack.texture = source;
            if (source.textureWidth / source.textureHeight > 221 / 355) {
                this.bmpBack.scaleX = this.bmpBack.scaleY = 221 / source.textureWidth;
            }
            else {
                this.bmpBack.scaleX = this.bmpBack.scaleY = 355 / source.textureHeight;
            }
        };
        p.clear = function () {
            this.obj = null;
            this.uid = -1;
            this.lblName.text = "";
            this.lblHot.text = "";
            this.bmpBack.source = null;
            this.bmpIcon.clear();
        };
        UploadItem.cacheDict = {};
        return UploadItem;
    }(eui.Component));
    upload.UploadItem = UploadItem;
    egret.registerClass(UploadItem,'upload.UploadItem');
})(upload || (upload = {}));
