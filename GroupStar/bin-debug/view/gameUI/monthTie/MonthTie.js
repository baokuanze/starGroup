var monthTie;
(function (monthTie) {
    /**
     *
     * @author
     *
     */
    var MonthTie = (function (_super) {
        __extends(MonthTie, _super);
        function MonthTie() {
            _super.call(this);
            this.bo = false;
            this.arrHeatStarObj = [];
            this.arrHeatTableItem = [];
            this.arrFansObj = [];
            this.arrFansTableItem = [];
            this.arrStarObj = [];
            this.arrStarTableItem = [];
            this.isChange = false;
            this.skinName = "src/view/gameUI/monthTie/MonthTieSkin.exml";
        }
        var d = __define,c=MonthTie,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_star.fontFamily = "Heiti SC";
                this.lable_fans.fontFamily = "Heiti SC";
                this.lable_heart.fontFamily = "Heiti SC";
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_starName1.fontFamily = "Heiti SC";
                this.lable_starName2.fontFamily = "Heiti SC";
                this.lable_HeatNumberOne.fontFamily = "Heiti SC";
                this.lable_HeatNumberTwo.fontFamily = "Heiti SC";
                this.lable_HeatNumberThree.fontFamily = "Heiti SC";
                this.lable_qunName.fontFamily = "Heiti SC";
                this.lable_qunName1.fontFamily = "Heiti SC";
                this.lable_qunName2.fontFamily = "Heiti SC";
                this.lable_Name.fontFamily = "Heiti SC";
                this.lable_Name1.fontFamily = "Heiti SC";
                this.lable_Name2.fontFamily = "Heiti SC";
                this.lable_starClubIconOne.fontFamily = "Heiti SC";
                this.lable_starClubIconOne1.fontFamily = "Heiti SC";
                this.lable_starClubIconOne2.fontFamily = "Heiti SC";
                this.lable_starClubIconOneName.fontFamily = "Heiti SC";
                this.lable_starClubIconOneName1.fontFamily = "Heiti SC";
                this.lable_starClubIconOneName2.fontFamily = "Heiti SC";
                this.lable_Qi.fontFamily = "Heiti SC";
            }
            this.scroll2.height = this.stage.stageHeight;
            this.lable_star.touchEnabled = false;
            this.lable_fans.touchEnabled = false;
            this.lable_heart.touchEnabled = false;
            this.img_heatGray.addEventListener(egret.TouchEvent.TOUCH_TAP, this.heatRanking, this);
            this.img_fansClubGray.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fansRanking, this);
            this.img_starClubGray.addEventListener(egret.TouchEvent.TOUCH_TAP, this.starRanking, this);
            this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            this.btn_fanghui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btn_heatDrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addHeatItem, this); //最热下拉按钮
            this.btn_dropFans.addEventListener(egret.TouchEvent.TOUCH_TAP, this.adddDropFans, this); //分团下拉按钮
            this.btn_starDrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addStarDrop, this); // 名人堂按钮
            this.btn_drop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateMonthTie, this);
        };
        p.setData = function (obj, mts) {
            this.mts = mts;
            this.bo = true;
            this.bo = true;
            var data = new Date();
            data.setTime(parseInt(mts));
            this.lable_Qi.text = Tools.getInstance().getTime3(data);
            this.btn_drop.scaleY = 1;
            this.img_buttonImg.y = 315;
            //显示日期；
            if (!this.isChange) {
                var monthTiemonth = monthTie.MonthTieMonth.produce();
                this.group_month.addChildAt(monthTiemonth, 0);
                var len = obj["ts_list"].length;
                var dataObj = obj["ts_list"][len - 1] - 12 * 3600 * 1000;
                var dat2 = new Date();
                dat2.setTime(dataObj);
                monthTiemonth.setData(Tools.getInstance().getTime4(dat2, len), 0, obj["ts_list"][len]);
            }
            this.allObj = obj;
            this.arrHeatStarObj = obj["top_star"];
            this.arrFansObj = obj["top_group"];
            this.arrStarObj = obj["top_user"];
            this.lable_starName.text = window["hexToDec"](obj["top_star"][0]["name"]);
            this.lable_starName1.text = window["hexToDec"](obj["top_star"][1]["name"]);
            this.lable_starName2.text = window["hexToDec"](obj["top_star"][2]["name"]);
            this.lable_HeatNumberOne.text = "热度：" + window["hexToDec"](obj["top_star"][0]["month_hot"]);
            this.lable_HeatNumberTwo.text = "热度：" + window["hexToDec"](obj["top_star"][1]["month_hot"]);
            this.lable_HeatNumberThree.text = "热度：" + window["hexToDec"](obj["top_star"][2]["month_hot"]);
            RES.getResByUrl(obj["top_star"][0]["head_img"], this.load_end0, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["top_star"][1]["head_img"], this.load_end1, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["top_star"][2]["head_img"], this.load_end2, this, RES.ResourceItem.TYPE_IMAGE);
            for (var i = 0; i < 7; i++) {
                this.heatTableItem = new monthTie.MonthTie_HeatTable_Item;
                this.heatTableItem.x = 0;
                this.heatTableItem.y = i * 130;
                this.heatTableItem.setData(obj["top_star"][i + 3], i + 4);
                this.group_heatTable.addChild(this.heatTableItem);
                this.arrHeatTableItem.push(this.heatTableItem); //后面要用
            }
            this.lable_qunName.text = window["hexToDec"](obj["top_group"][0]["group_name"]);
            this.lable_qunName1.text = window["hexToDec"](obj["top_group"][1]["group_name"]);
            this.lable_qunName2.text = window["hexToDec"](obj["top_group"][2]["group_name"]);
            this.lable_Name.text = window["hexToDec"](obj["top_group"][0]["star_name"]);
            this.lable_Name1.text = window["hexToDec"](obj["top_group"][1]["star_name"]);
            this.lable_Name2.text = window["hexToDec"](obj["top_group"][2]["star_name"]);
            RES.getResByUrl(obj["top_group"][0]["group_face"], this.load_endfans1, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["top_group"][1]["group_face"], this.load_endfans2, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["top_group"][2]["group_face"], this.load_endfans3, this, RES.ResourceItem.TYPE_IMAGE);
            for (var i = 0; i < 7; i++) {
                this.FansTableItem = new monthTie.MonthTie_FansTable_Item;
                this.FansTableItem.x = 0;
                this.FansTableItem.y = i * 130;
                this.FansTableItem.setData(obj["top_group"][i + 3], i + 4);
                this.group_fansTable.addChild(this.FansTableItem);
                this.arrFansTableItem.push(this.FansTableItem);
            }
            this.lable_starClubIconOne.text = window["hexToDec"](obj["top_user"][0]["user_name"]);
            this.lable_starClubIconOne1.text = window["hexToDec"](obj["top_user"][1]["user_name"]);
            this.lable_starClubIconOne2.text = window["hexToDec"](obj["top_user"][2]["user_name"]);
            this.lable_starClubIconOneName.text = window["hexToDec"](obj["top_user"][0]["group_name"]);
            this.lable_starClubIconOneName1.text = window["hexToDec"](obj["top_user"][1]["group_name"]);
            this.lable_starClubIconOneName2.text = window["hexToDec"](obj["top_user"][2]["group_name"]);
            RES.getResByUrl(obj["top_user"][0]["user_pic"], this.load_endstar1, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["top_user"][1]["user_pic"], this.load_endstar2, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["top_user"][2]["user_pic"], this.load_endstar3, this, RES.ResourceItem.TYPE_IMAGE);
            for (var i = 0; i < 7; i++) {
                this.StarTableItem = new monthTie.MonthTie_StarTable_Item;
                this.StarTableItem.x = 0;
                this.StarTableItem.y = i * 130;
                this.StarTableItem.setData(obj["top_user"][i + 3], i + 4);
                this.group_starTable.addChild(this.StarTableItem);
                this.arrStarTableItem.push(this.StarTableItem);
            }
            RES.getResByUrl(obj["top_img"], this.load_topImg, this, RES.ResourceItem.TYPE_IMAGE);
            this.img_heatDrop.touchEnabled = false;
            this.img_fansDrop.touchEnabled = false;
            this.img_starDrop.touchEnabled = false;
            RES.getResByUrl(obj["bottom_img"], this.load_buttonImg, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.share = function (c) {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starMonthlyRankShare", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                system.Share.share(obj, function (n) {
                    if (n == 1)
                        system.TipText.produce().open("发送成功");
                });
            }, true, this);
        };
        p.addHeatItem = function (add) {
            var chazhi = this.arrHeatStarObj.length - (this.arrHeatTableItem.length + 3);
            var temp = parseInt(chazhi / 10 + "");
            var arrHeatTableItemObjY = this.arrHeatTableItem[this.arrHeatTableItem.length - 1]["y"] + 130;
            var arrHeatTableLength = this.arrHeatTableItem.length + 3;
            if (temp > 0) {
                for (var i = 0; i < 10; i++) {
                    this.heatTableItem = new monthTie.MonthTie_HeatTable_Item;
                    this.heatTableItem.x = 0;
                    this.heatTableItem.y = arrHeatTableItemObjY + i * 130;
                    this.heatTableItem.setData(this.allObj["top_star"][arrHeatTableLength + i], arrHeatTableLength + (i + 1));
                    this.group_heatTable.addChild(this.heatTableItem);
                    this.arrHeatTableItem.push(this.heatTableItem);
                }
                this.group_heatDown.y += 1300;
                this.group_monthBing.y += 1300;
            }
            if (temp <= 0) {
                if (this.img_heatDrop.scaleY == -1) {
                    this.img_heatDrop.scaleY = 1;
                    this.deletHeatRanking();
                }
                for (var i = 0; i < chazhi; i++) {
                    this.heatTableItem = new monthTie.MonthTie_HeatTable_Item;
                    this.heatTableItem.x = 0;
                    this.heatTableItem.y = arrHeatTableItemObjY + i * 130;
                    this.heatTableItem.setData(this.allObj["top_star"][arrHeatTableLength + i], arrHeatTableLength + (i + 1));
                    this.group_heatTable.addChild(this.heatTableItem);
                    this.arrHeatTableItem.push(this.heatTableItem);
                }
                this.group_heatDown.y += 130 * (chazhi);
                this.group_monthBing.y += 130 * (chazhi);
            }
            if (this.arrHeatStarObj.length == (this.arrHeatTableItem.length + 3)) {
                this.img_heatDrop.scaleY = -1;
            }
        };
        p.adddDropFans = function (add) {
            var chazhiFans = this.arrFansObj.length - (this.arrFansTableItem.length + 3);
            var temp = chazhiFans / 10;
            var arrFansTableItemObjY = this.arrFansTableItem[this.arrFansTableItem.length - 1]["y"] + 130;
            var arrFansTableLength = this.arrFansTableItem.length + 3;
            if (parseInt(temp + "") > 0) {
                for (var i = 0; i < 10; i++) {
                    this.FansTableItem = new monthTie.MonthTie_FansTable_Item;
                    this.FansTableItem.x = 0;
                    this.FansTableItem.y = arrFansTableItemObjY + i * 130;
                    this.FansTableItem.setData(this.allObj["top_group"][arrFansTableLength + i], arrFansTableLength + (i + 1));
                    this.group_fansTable.addChild(this.FansTableItem);
                    this.arrFansTableItem.push(this.FansTableItem);
                }
                this.group_fansDown.y += 1300;
                this.group_monthBing.y += 1300;
            }
            if (parseInt(temp + "") <= 0) {
                for (var i = 0; i < chazhiFans; i++) {
                    this.FansTableItem = new monthTie.MonthTie_FansTable_Item;
                    this.FansTableItem.x = 0;
                    this.FansTableItem.y = arrFansTableItemObjY + i * 130;
                    this.FansTableItem.setData(this.allObj["top_group"][arrFansTableLength + i], arrFansTableLength + (i + 1));
                    this.group_fansTable.addChild(this.FansTableItem);
                    this.arrFansTableItem.push(this.FansTableItem);
                }
                this.group_fansDown.y += 130 * (chazhiFans);
                this.group_monthBing.y += 130 * (chazhiFans);
                if (this.img_fansDrop.scaleY == -1) {
                    this.img_fansDrop.scaleY = 1;
                    this.deletFansTable();
                }
            }
            if (this.arrFansObj.length == (this.arrFansTableItem.length + 3)) {
                this.img_fansDrop.scaleY = -1;
            }
        };
        p.addStarDrop = function (add) {
            var chazhiStar = this.arrStarObj.length - (this.arrStarTableItem.length + 3);
            var temp = chazhiStar / 10;
            var arrFansTableItemObjY = this.arrStarTableItem[this.arrStarTableItem.length - 1]["y"] + 130; //获取最后一项
            var arrFansTableLength = this.arrStarTableItem.length + 3; //获取第11条
            if (parseInt(temp + "") > 0) {
                for (var i = 0; i < 10; i++) {
                    this.StarTableItem = new monthTie.MonthTie_StarTable_Item;
                    this.StarTableItem.x = 0;
                    this.StarTableItem.y = arrFansTableItemObjY + i * 130;
                    this.StarTableItem.setData(this.allObj["top_user"][arrFansTableLength + i], arrFansTableLength + (i + 1));
                    this.group_starTable.addChild(this.StarTableItem);
                    this.arrStarTableItem.push(this.StarTableItem);
                }
                this.group_starDown.y += 1300;
                this.group_monthBing.y += 1300;
            }
            if (parseInt(temp + "") <= 0) {
                if (this.img_starDrop.scaleY == -1) {
                    this.img_heatDrop.scaleY = 1;
                    this.deletStarRanking();
                }
                for (var i = 0; i < chazhiStar; i++) {
                    this.StarTableItem = new monthTie.MonthTie_StarTable_Item;
                    this.StarTableItem.x = 0;
                    this.StarTableItem.y = arrFansTableItemObjY + i * 130;
                    this.StarTableItem.setData(this.allObj["top_user"][arrFansTableLength + i], arrFansTableLength + (i + 1));
                    this.group_starTable.addChild(this.StarTableItem);
                    this.arrStarTableItem.push(this.StarTableItem);
                }
                this.group_starDown.y += 130 * (chazhiStar);
                this.group_monthBing.y += 130 * (chazhiStar);
            }
            if (this.arrStarObj.length == (this.arrStarTableItem.length + 3)) {
                this.img_starDrop.scaleY = -1;
            }
        };
        p.load_end0 = function (source) {
            this.img_starIconOne.texture = source;
            this.img_starIconOne.width = 234;
            this.img_starIconOne.height = 234;
        };
        p.load_end1 = function (source) {
            this.img_starIconTwo.texture = source;
            this.img_starIconTwo.width = 184;
            this.img_starIconTwo.height = 184;
        };
        p.load_end2 = function (source) {
            this.img_starIconThree.texture = source;
            this.img_starIconThree.width = 184;
            this.img_starIconThree.height = 184;
        };
        p.load_endfans1 = function (source) {
            this.img_fansIconOne.texture = source;
            this.img_fansIconOne.width = 135;
            this.img_fansIconOne.height = 135;
        };
        p.load_endfans2 = function (source) {
            this.img_fansIconTwo.texture = source;
            this.img_fansIconTwo.width = 113;
            this.img_fansIconTwo.height = 113;
        };
        p.load_endfans3 = function (source) {
            this.img_fansIconThree.texture = source;
            this.img_fansIconThree.width = 113;
            this.img_fansIconThree.height = 113;
        };
        p.load_endstar1 = function (source) {
            this.img_starOne.texture = source;
            this.img_starOne.width = 240;
            this.img_starOne.height = 240;
        };
        p.load_endstar2 = function (source) {
            this.img_starTwo.texture = source;
            this.img_starTwo.width = 198;
            this.img_starTwo.height = 198;
        };
        p.load_endstar3 = function (source) {
            this.img_starThree.texture = source;
            this.img_starThree.width = 196;
            this.img_starThree.height = 196;
        };
        p.load_topImg = function (source) {
            this.img_starIcon.texture = source;
        };
        p.load_buttonImg = function (source) {
            this.img_buttonImg.texture = source;
        };
        p.heatPos = function () {
            this.group_heatDown.y = 2122;
            this.group_monthBing.y = 2940;
        };
        p.fansPos = function () {
            this.group_fansDown.y = 1794;
            this.group_monthBing.y = 2600;
        };
        p.starPos = function () {
            this.group_starDown.y = 2101;
            this.group_monthBing.y = 2940;
        };
        p.deletHeatRanking = function () {
            this.img_heatDrop.scaleY = 1;
            for (var i = this.arrHeatTableItem.length - 1; i >= 7; i--) {
                var obj = this.arrHeatTableItem[i];
                this.group_heatTable.removeChild(obj);
                this.arrHeatTableItem.splice(i, 1);
            }
            this.heatPos();
            this.scroll2.viewport.scrollV = 0;
        };
        p.deletFansTable = function () {
            this.img_fansDrop.scaleY = 1;
            for (var i = this.arrFansTableItem.length - 1; i >= 7; i--) {
                var obj = this.arrFansTableItem[i];
                this.group_fansTable.removeChild(obj);
                this.arrFansTableItem.splice(i, 1);
            }
            this.fansPos();
            this.scroll2.viewport.scrollV = 0;
        };
        p.deletStarRanking = function () {
            this.img_starDrop.scaleY = 1;
            for (var i = this.arrStarTableItem.length - 1; i >= 7; i--) {
                var obj = this.arrStarTableItem[i];
                this.group_starTable.removeChild(obj);
                this.arrStarTableItem.splice(i, 1);
            }
            this.starPos();
            this.scroll2.viewport.scrollV = 0;
        };
        p.updateMonthTie = function (e) {
            if (this.btn_drop.scaleY == -1) {
                this.btn_drop.scaleY = 1;
                var num = this.group_month.numElements;
                for (var i = num - 1; i > 0; i--) {
                    var iteme = this.group_month.getElementAt(i);
                    monthTie.MonthTieMonth.reclaim(iteme);
                    if (iteme.parent) {
                        iteme.parent.removeChild(iteme);
                    }
                }
                this.img_buttonImg.y = 315;
            }
            else {
                this.btn_drop.scaleY = -1;
                for (var i = 0; i < this.allObj["ts_list"].length; i++) {
                    if (this.allObj["ts_list"][i] == this.mts) {
                    }
                    else {
                        var monthTiemonth = monthTie.MonthTieMonth.produce();
                        this.group_month.addChildAt(monthTiemonth, 1 + i);
                        var dataObj = this.allObj["ts_list"][i] - 12 * 3600 * 1000;
                        var dat2 = new Date();
                        dat2.setTime(dataObj);
                        var text = Tools.getInstance().getTime4(dat2, i + 1);
                        monthTiemonth.setData(text, i + 1, this.allObj["ts_list"][i]);
                    }
                }
                this.img_buttonImg.y = this.img_buttonImg.y + (this.allObj["ts_list"].length - 1) * 70 + (this.allObj["ts_list"].length - 1) * 4;
            }
        };
        p.heatRanking = function (h) {
            this.img_heatOrange.visible = true;
            this.img_fansClubOrange.visible = false;
            this.img_fansClubGray.visible = true;
            this.img_starClubOrange.visible = false;
            this.img_starClubGray.visible = true;
            this.group_heatStarRanking.visible = true;
            this.group_fansClubRanking.visible = false;
            this.group_starClubRanking.visible = false;
            this.deletHeatRanking();
        };
        p.fansRanking = function (f) {
            this.img_heatOrange.visible = false;
            this.img_heatGray.visible = true;
            this.img_fansClubGray.visible = false;
            this.img_fansClubOrange.visible = true;
            this.img_starClubOrange.visible = false;
            this.img_starClubGray.visible = true;
            this.group_fansClubRanking.visible = true;
            this.group_heatStarRanking.visible = false;
            this.group_starClubRanking.visible = false;
            this.deletFansTable();
        };
        p.starRanking = function (s) {
            this.img_starClubGray.visible = false;
            this.img_starClubOrange.visible = true;
            this.img_heatOrange.visible = false;
            this.img_heatGray.visible = true;
            this.img_fansClubOrange.visible = false;
            this.img_fansClubGray.visible = true;
            this.group_starClubRanking.visible = true;
            this.group_heatStarRanking.visible = false;
            this.group_fansClubRanking.visible = false;
            this.deletStarRanking();
        };
        p.clear = function () {
            for (var i = this.arrHeatTableItem.length - 1; i >= 0; i--) {
                this.group_heatTable.removeChildAt(i);
            }
            for (var i = this.arrFansTableItem.length - 1; i >= 0; i--) {
                this.group_fansTable.removeChildAt(i);
            }
            for (var i = this.arrStarTableItem.length - 1; i >= 0; i--) {
                this.group_starTable.removeChildAt(i);
            }
            this.arrHeatStarObj = [];
            this.arrHeatTableItem = [];
            this.arrFansObj = [];
            this.arrFansTableItem = [];
            this.arrStarObj = [];
            this.arrStarTableItem = [];
            while (this.group_month.numElements > 0) {
                var iteme = this.group_month.getElementAt(this.group_month.numElements - 1);
                monthTie.MonthTieMonth.reclaim(iteme);
                if (iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
            this.heatRanking(null);
            this.deletFansTable();
            this.deletStarRanking();
        };
        p.close = function (e) {
            this.scroll2.viewport.scrollV = 0;
            this.isChange = false;
            if (this.type == "main") {
                GameApp.Manager.controllerManager.monthTieController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else {
                GameApp.Manager.controllerManager.monthTieController.hide();
                GameApp.Manager.controllerManager.start();
            }
        };
        return MonthTie;
    }(eui.Component));
    monthTie.MonthTie = MonthTie;
    egret.registerClass(MonthTie,'monthTie.MonthTie');
})(monthTie || (monthTie = {}));
