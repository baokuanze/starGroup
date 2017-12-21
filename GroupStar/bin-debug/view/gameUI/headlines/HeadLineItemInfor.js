var headLines;
(function (headLines) {
    /**
     *
     * @author
     *
     */
    var HeadLineItemInfor = (function (_super) {
        __extends(HeadLineItemInfor, _super);
        function HeadLineItemInfor() {
            _super.call(this);
            this.skinName = "src/view/gameUI/headlines/HeadLineItemInforSkin.exml";
        }
        var d = __define,c=HeadLineItemInfor,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_whoWorks.fontFamily = "Heiti SC";
                this.lable_titleInfo.fontFamily = "Heiti SC";
                this.lable_count.fontFamily = "Heiti SC";
                this.lable_threeRank.fontFamily = "Heiti SC";
                this.lable_type.fontFamily = "Heiti SC";
            }
            this.scro1.height = this.stage.stageHeight - 105;
            this.group_buttom.y = this.stage.stageHeight - this.group_buttom.height;
            this.btn_ding.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchUp, this);
            this.img_btnComeToItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comeToItem, this);
        };
        p.touchUp = function (e) {
            var tip = system.TipText1.produce("1");
            tip.x = this.lable_count.x + 68;
            tip.y = this.lable_count.y - 25;
            tip.setData("+1", 34, 0xFF7101);
            tip.bold = true;
            this.group_buttom.addChild(tip);
            egret.Tween.get(tip).wait(300).to({ y: tip.y - 50, alpha: 0 }, 500).call(function () {
                system.TipText1.reclaim(tip);
                if (tip.parent) {
                    tip.parent.removeChild(tip);
                }
            }, this);
            var self = this;
            if (GameApp.Manager.dataManager.lucystar >= 10) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "" + this.headline_id + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/headLineVote", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, "group_openid": GameApp.Manager.dataManager.group_openid, "headline_id": this.headline_id, sign: sign }, function (obj) {
                    if (obj["st"] == 1) {
                        self.obj["votes"] = self.obj["votes"] + 1;
                        self.lable_count.text = "票数 " + self.obj["votes"];
                        GameApp.Manager.dataManager.lucystar = obj["data"]["lucky_star"];
                        flower.FlowerUI.getInstance().setLucky();
                    }
                }, true, this);
            }
            else {
                aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                    if (data == "ok") {
                        GameApp.Manager.controllerManager.headLineItemInforController.hide();
                        GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.gameMainController.hide, 0);
                    }
                }, this);
            }
        };
        // 50
        p.setData = function (obj, name, ts) {
            this.headline_id = obj["headline_id"];
            this.bid = obj["bid"];
            this.obj = obj;
            this.ts = ts;
            if (this.ts != headLines.HeadLines.toDayTime) {
                this.btn_ding.touchEnabled = false;
                this.img_ding.visible = false;
            }
            else {
                this.btn_ding.touchEnabled = true;
                this.img_ding.visible = true;
            }
            this.lable_whoWorks.text = name + "的作品";
            this.lable_titleInfo.text = window["hexToDec"](obj["title"]);
            //           this.group_imgAndTitle.y = this.group_lableGroup.y + this.group_lableGroup.height + 65;
            console.log(this.group_imgAndTitle.height, "height");
            for (var i = 0; i < obj["content"].length; i++) {
                var it = obj["content"][i];
                if (it["type"] == 0) {
                    var tit = new eui.Label();
                    this.group_imgAndTitle.addChild(tit);
                    tit.text = window["hexToDec"](it["content"]);
                    tit.textColor = 0x000000;
                    tit.size = 36;
                    tit.lineSpacing = 23;
                    tit.maxWidth = 690;
                    if (Tools.getInstance().isIphone()) {
                        tit.fontFamily = "Heiti SC";
                    }
                    var tit1 = new eui.Label();
                    this.group_imgAndTitle.addChild(tit1);
                    tit1.text = " ";
                    tit1.size = 20;
                    tit1.lineSpacing = 23;
                    tit1.maxWidth = 690;
                    if (Tools.getInstance().isIphone()) {
                        tit1.fontFamily = "Heiti SC";
                    }
                }
                else {
                    if (it["type"] == 1) {
                        var headImg = new headLines.HeadLinesStarImg();
                        headImg.setData(it["content"]);
                        this.group_imgAndTitle.addChild(headImg);
                        var tit1 = new eui.Label();
                        this.group_imgAndTitle.addChild(tit1);
                        tit1.text = " ";
                        tit1.size = 20;
                        tit1.lineSpacing = 23;
                        tit1.maxWidth = 690;
                        if (Tools.getInstance().isIphone()) {
                            tit1.fontFamily = "Heiti SC";
                        }
                    }
                }
            }
            //           cha = (698 - (len * 132)) / (len + 1);
            //           item.x = cha + (i) * 132 + i * cha;
            ////                    item.y = 0;
            //           var cha1: number;
            for (var t = 0; t < 3; t++) {
                var it2 = mySelfStar.MyselfHeadLines.produce();
                this.group_threePic.addChild(it2);
            }
            if (obj["userArray"] && obj["userArray"].length > 0) {
                this.group_threePic.visible = true;
                var len = obj["userArray"].length;
                for (var j = 0; j < len; j++) {
                    var itm = this.group_threePic.getElementAt(j);
                    itm.setData(obj["userArray"][j]);
                }
            }
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
            this.lable_count.text = "票数 " + obj['votes'];
        };
        p.comeToItem = function (e) {
            //           this.type = GameApp.Manager.viewManager.headLinesManager.headLines.num;
            //           this. = headLines.HeadLines.timeCd ? headLines.HeadLines.timeCd : 0;
            if (this.ts == headLines.HeadLines.toDayTime) {
                GameApp.Manager.controllerManager.headLineItemInforController.hide();
                GameApp.Manager.controllerManager.headLinesController.show(1, this.ts, 1);
            }
            else {
                GameApp.Manager.controllerManager.headLineItemInforController.hide();
                GameApp.Manager.controllerManager.headLinesController.show(2, this.ts, 1);
            }
        };
        p.clear = function () {
            this.scro1.viewport.scrollV = 0;
            this.lable_titleInfo.text = "";
            this.lable_count.text = "";
            this.lable_type.text = "";
            while (this.group_imgAndTitle.numElements > 0) {
                var ite = this.group_imgAndTitle.getElementAt(this.group_imgAndTitle.numElements - 1);
                if (ite.parent) {
                    ite.parent.removeChild(ite);
                }
            }
            while (this.group_threePic.numElements > 0) {
                var it = this.group_threePic.getElementAt(this.group_threePic.numElements - 1);
                mySelfStar.MyselfHeadLines.reclaim(it);
                if (it.parent) {
                    it.parent.removeChild(it);
                }
            }
        };
        return HeadLineItemInfor;
    }(eui.Component));
    headLines.HeadLineItemInfor = HeadLineItemInfor;
    egret.registerClass(HeadLineItemInfor,'headLines.HeadLineItemInfor');
})(headLines || (headLines = {}));
