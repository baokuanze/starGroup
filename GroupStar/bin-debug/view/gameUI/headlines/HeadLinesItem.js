var headLines;
(function (headLines) {
    /**
     *
     * @author
     *
     */
    var HeadLinesItem = (function (_super) {
        __extends(HeadLinesItem, _super);
        function HeadLinesItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/headlines/HeadLinesItemSkin.exml";
        }
        var d = __define,c=HeadLinesItem,p=c.prototype;
        HeadLinesItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (HeadLinesItem.cacheDict[mtype] == null) {
                HeadLinesItem.cacheDict[mtype] = [];
            }
            var dict = HeadLinesItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new HeadLinesItem();
            }
            return theFighter;
        };
        /**回收*/
        HeadLinesItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (HeadLinesItem.cacheDict[mtype] == null) {
                HeadLinesItem.cacheDict[mtype] = [];
            }
            var dict = HeadLinesItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_title.fontFamily = "Heiti SC";
                this.lable_count.fontFamily = "Heiti SC";
            }
            this.rect_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comeToItemInfo, this);
            this.rect_btnDing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchUp, this);
            //            this.img_icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goToThemSelf,this)
        };
        p.goToThemSelf = function (e) {
            socketio.IoConnect.getInstance().disconnect(); //断开连接
            GameApp.Manager.controllerManager.start(this.bid);
            GameApp.Manager.controllerManager.headLinesController.hide();
        };
        p.setData = function (obj, i) {
            var self = this;
            this.bid = obj["bid"];
            this.obj = obj;
            this.headline_id = obj["headline_id"];
            this.star_name = window["hexToDec"](obj["star_name"]);
            RES.getResByUrl(obj["poster"], this.addStarImg, this);
            RES.getResByUrl(obj["head_img"], this.addIcoImg, this);
            this.lable_type.text = window["hexToDec"](obj["type"]);
            if (this.lable_type.text == "单曲" || this.lable_type.text == "专辑" || this.lable_type.text == "歌曲") {
                this.img_typeIcon.source = "hl_music";
            }
            else if (this.lable_type.text == "电影") {
                this.img_typeIcon.source = "hl_movie";
            }
            else if (this.lable_type.text == "电视剧") {
                this.img_typeIcon.source = "hl_tv";
            }
            if (i == 1) {
                this.img_rank.source = "n1";
            }
            else if (i == 2) {
                this.img_rank.source = "n2";
            }
            else if (i == 3) {
                this.img_rank.source = "n3";
            }
            else {
                this.lable_Bitrank.text = "n" + i;
            }
            var str = window["hexToDec"](obj["title"]);
            if (str.length >= 13) {
                var cutDownTitle = str.substring(0, 13);
                this.lable_title.text = cutDownTitle + "...";
            }
            else {
                this.lable_title.text = str;
            }
            this.lable_count.text = "票数 " + obj['votes'];
            if (obj["star_array"] && obj["star_array"].length > 0) {
                for (var i = 0; i < obj["star_array"].length; i++) {
                    var icon = mySelfStar.StarIcon.produce();
                    this.group_starIcon.addChild(icon);
                    icon.setData(obj["star_array"][i], 68, 68, 68, 68);
                }
            }
        };
        p.addStarImg = function (source) {
            this.img_pic.texture = source;
        };
        p.addIcoImg = function (source) {
            this.img_icon.texture = source;
        };
        p.touchUp = function (e) {
            var self = this;
            if (GameApp.Manager.dataManager.lucystar >= 10) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "" + this.headline_id + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/headLineVote", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, "group_openid": GameApp.Manager.dataManager.group_openid, "headline_id": this.headline_id, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.obj["votes"] = self.obj["votes"] + 1;
                        self.lable_count.text = "票数 " + self.obj["votes"];
                        GameApp.Manager.dataManager.lucystar = obj["data"]["lucky_star"];
                        flower.FlowerUI.getInstance().setLucky();
                        self.dispatchEventWith('votesUPItem', false, this);
                    }
                }, true, this);
            }
            else {
                aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                    if (data == "ok") {
                        GameApp.Manager.controllerManager.headLinesController.hide();
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide, 0);
                    }
                }, this);
            }
        };
        p.comeToItemInfo = function (e) {
            //            GameApp.Manager.viewManager.headLinesManager.headLines.scor1.viewport.scrollV = 0;
            GameApp.Manager.controllerManager.headLinesController.hide();
            GameApp.Manager.controllerManager.headLineItemInforController.show(this.headline_id + "", this.star_name, headLines.HeadLines.ts);
        };
        p.clear = function () {
            this.lable_title.text = "";
            this.lable_count.text = "";
            this.img_icon.source = null;
            this.img_rank.source = null;
            this.img_pic.source = null;
            this.img_pic.texture = null;
            this.lable_Bitrank.text = "";
            while (this.group_starIcon.numElements > 0) {
                var item = this.group_starIcon.getElementAt(this.group_starIcon.numElements - 1);
                mySelfStar.StarIcon.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        };
        HeadLinesItem.cacheDict = {};
        return HeadLinesItem;
    }(eui.Component));
    headLines.HeadLinesItem = HeadLinesItem;
    egret.registerClass(HeadLinesItem,'headLines.HeadLinesItem');
})(headLines || (headLines = {}));
