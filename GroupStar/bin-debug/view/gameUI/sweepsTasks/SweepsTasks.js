var sweepsTasks;
(function (sweepsTasks) {
    /**
     *
     * @author
     *
     */
    var SweepsTasks = (function (_super) {
        __extends(SweepsTasks, _super);
        function SweepsTasks() {
            _super.call(this);
            this.isRotate = true;
            this.turnplate = 8;
            this.skinName = 'src/view/gameUI/sweepsTasks/SweepsTasksSkin.exml';
        }
        var d = __define,c=SweepsTasks,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
                this.lb4.fontFamily = "Heiti SC";
                this.lb5.fontFamily = "Heiti SC";
                this.lb6.fontFamily = "Heiti SC";
            }
            this.img_sweeps.anchorOffsetX = this.img_sweeps.width / 2;
            this.img_sweeps.anchorOffsetY = this.img_sweeps.height / 2;
            this.btn_arrow.anchorOffsetX = this.btn_arrow.width / 2;
            this.btn_arrow.anchorOffsetY = this.btn_arrow.height / 2;
            this.group_resultBg.anchorOffsetX = this.group_resultBg.width / 2;
            this.group_resultBg.anchorOffsetY = this.group_resultBg.height / 2;
            this.img_sweeps.x = (this.stage.stageWidth - this.img_sweeps.width) / 2 + this.img_sweeps.anchorOffsetX;
            this.img_sweeps.y = (this.stage.stageHeight - this.img_sweeps.height) / 2 + this.img_sweeps.anchorOffsetY;
            this.btn_arrow.x = (this.stage.stageWidth - this.btn_arrow.width) / 2 + this.btn_arrow.anchorOffsetX;
            this.btn_arrow.y = (this.stage.stageHeight - this.btn_arrow.height) / 2 + this.btn_arrow.anchorOffsetY - 31;
            this.group_resultBg.x = (this.stage.stageWidth - this.group_resultBg.width) / 2 + this.group_resultBg.anchorOffsetX;
            this.group_resultBg.y = (this.stage.stageHeight - this.group_resultBg.height) / 2 + this.group_resultBg.anchorOffsetY;
            this.group_share.y = this.stage.stageHeight - 150;
            this.btn_arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.runRotate, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.rect_btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sure, this);
            this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/shareTimeLimitedActivity", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, count: this.iconCount, sign: sign }, function (obj) {
                    system.Share.share(obj, function (n) {
                        if (n == 1)
                            system.TipText.produce().open("发送成功");
                    });
                }, true, this);
            }, this);
        };
        p.runRotate = function (e) {
            var self = this;
            if (self.isRotate) {
                var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/joinTimeLimitedActivity", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, sign: sign }, function (obj) {
                    self.isRotate = false;
                    if (obj['st'] == 1) {
                        if (obj['data']['use_free'] || obj['data']['lucky_star_enough']) {
                            var angles = self.changeId(obj['data']['reward_id'])['tempId'] * (360 / self.turnplate) - (360 / (self.turnplate * 2));
                            if (angles <= 270) {
                                angles = 270 - angles - 22.5;
                            }
                            else {
                                angles = 360 - angles + 270 - 22.5;
                            }
                            if (obj['data']['result']['lucky_star']) {
                                GameApp.Manager.dataManager.lucystar = obj['data']['result']['lucky_star'];
                            }
                            if (obj['data']['result']['hot']) {
                                GameApp.Manager.dataManager.hot = obj['data']['result']['hot'];
                            }
                            GameApp.Manager.dataManager.time_limited_activity_free = false;
                            egret.Tween.get(self.img_sweeps).to({ rotation: angles + 3600 }, 5000, egret.Ease.sineInOut).wait(400).call(function () {
                                egret.Tween.removeTweens(self.img_sweeps);
                                if (self.changeId(obj['data']['reward_id'])['tempId'] == 3) {
                                    self.img_result_top.visible = false;
                                }
                                else {
                                    self.img_result_top.visible = true;
                                }
                                self.group_result.visible = true;
                                self.group_free.visible = false;
                                self.group_diamond.visible = true;
                                self.lb4.text = self.changeId(obj['data']['reward_id'])['title'];
                                self.lb5.text = self.changeId(obj['data']['reward_id'])['QQ'];
                            }, this);
                        }
                        else if (!obj['data']['lucky_star_enough']) {
                            self.isRotate = true;
                            aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                                if (data == "ok") {
                                    GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.sweepsTasksController.hide, 0);
                                }
                            }, this);
                        }
                    }
                    else if (obj['st'] == -1) {
                        self.isRotate = true;
                        aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                            if (data == "ok") {
                                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.sweepsTasksController.hide, 0);
                            }
                        }, this);
                    }
                }, true, self);
            }
        };
        p.changeId = function (id) {
            var tempId;
            var title;
            var QQ;
            switch (id) {
                case 1:
                    tempId = 3;
                    title = '很遗憾未中奖，再接再厉哦！';
                    QQ = '';
                    break;
                case 2:
                    tempId = 8;
                    title = '恭喜，您为明星贡献了5热度！';
                    QQ = '';
                    break;
                case 3:
                    tempId = 4;
                    title = '恭喜，您获得了5钻石！';
                    QQ = '';
                    break;
                case 4:
                    tempId = 7;
                    title = '恭喜，您获得了10钻石！';
                    QQ = '';
                    break;
                case 5:
                    tempId = 2;
                    title = '恭喜，您为明星贡献了20热度！';
                    QQ = '';
                    break;
                case 6:
                    tempId = 5;
                    title = '恭喜，您为明星贡献了50热度！';
                    QQ = '';
                    break;
                case 7:
                    tempId = 1;
                    title = '恭喜，您获得了50钻石！';
                    QQ = '';
                    break;
                case 8:
                    tempId = 6;
                    title = '恭喜，您获得了珍贵的粉丝团周边1个，请与粉丝团客服联系兑奖。';
                    QQ = '客服:3409474914';
                    break;
            }
            return {
                tempId: tempId,
                title: title,
                QQ: QQ
            };
        };
        p.close = function (e) {
            this.isRotate = true;
            GameApp.Manager.controllerManager.sweepsTasksController.hide();
            GameApp.Manager.controllerManager.gameMainController.show();
        };
        p.sure = function (e) {
            this.group_result.visible = false;
            this.img_result_top.visible = false;
            this.isRotate = true;
            this.lb4.text = '';
            this.lb5.text = '';
        };
        p.setData = function () {
            if (GameApp.Manager.dataManager.time_limited_activity_free) {
                this.group_free.visible = true;
                this.group_diamond.visible = false;
            }
            else {
                this.group_diamond.visible = true;
                this.group_free.visible = false;
            }
        };
        p.clear = function () {
            this.group_free.visible = false;
            this.group_diamond.visible = false;
            this.img_sweeps.rotation = 0;
            egret.Tween.removeTweens(this.img_sweeps);
        };
        return SweepsTasks;
    }(eui.Component));
    sweepsTasks.SweepsTasks = SweepsTasks;
    egret.registerClass(SweepsTasks,'sweepsTasks.SweepsTasks');
})(sweepsTasks || (sweepsTasks = {}));
