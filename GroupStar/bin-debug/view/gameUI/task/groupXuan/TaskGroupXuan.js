var groupXuan;
(function (groupXuan) {
    /**
     *
     * @author
     *
     */
    var TaskGroupXuan = (function (_super) {
        __extends(TaskGroupXuan, _super);
        function TaskGroupXuan() {
            _super.call(this);
            this.isBuy = false;
            this.skinName = "src/view/gameUI/task/groupXuan/TaskGroupXuanSkin.exml";
        }
        var d = __define,c=TaskGroupXuan,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_call.fontFamily = "Heiti SC";
                this.Edit_xuanGroupDes.fontFamily = "Heiti SC";
                this.lable_xuanGroupTitle.fontFamily = "Heiti SC";
                this.lable_pushXuanGroup.fontFamily = "Heiti SC";
            }
            var self = this;
            this.rect_pushXuanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (self.Edit_xuanGroupDes.text == "" || self.Edit_xuanGroupDes.text == "限制长度30字以内") {
                    system.TipText.produce().open("宣群口号不能为空", 1000, 800);
                }
                else {
                    if (GameApp.Manager.dataManager.lucystar >= 50) {
                        socketio.IoConnect.getInstance().sendMessage(data.PomeloData.getAndReceiveAnnounceGroup, { message: window["decToHex"](self.Edit_xuanGroupDes.text) }, function (data) {
                            console.log(data, "data");
                            if (data['st'] == 1) {
                                self.isBuy = true;
                                GameApp.Manager.dataManager.lucystar = data["data"]["lucky_star"];
                                console.log(data["data"]["lucky_star"], GameApp.Manager.dataManager.lucystar, "data");
                                system.TipText.produce().open("宣群成功，请到群排行查看", 1000, 800);
                            }
                            else if ((data["st"] == -1) && (data["msg"]["code"] == 2)) {
                                system.TipText.produce().open("3小时之内不能重复宣群", 1000, 800);
                            }
                            else if ((data["st"] == -1) && (data["msg"]["code"] == 1)) {
                                system.TipText.produce().open("钻石不够，请购买钻石", 1000, 800);
                            }
                            else if ((data["st"] == -1) && (data["msg"]["code"] == 0)) {
                                system.TipText.produce().open("宣群失败", 1000, 800);
                            }
                        }, this);
                    }
                    else {
                        aler.AlertPanel.getInstance().show("温馨提示", "钻石不足", "取消", "充值", function (data) {
                            if (data == "ok") {
                                self.close();
                                GameApp.Manager.controllerManager.payController.show(GameApp.Manager.controllerManager.taskController.hide, 0);
                            }
                        }, this);
                    }
                }
            }, this);
            this.Edit_xuanGroupDes.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.Edit_xuanGroupDes.text = "";
            }, this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                self.close();
            }, this);
        };
        TaskGroupXuan.init = function (obj) {
            TaskGroupXuan.obj = obj;
        };
        p.setData = function () {
            if (!this.isBuy) {
                if (TaskGroupXuan.obj["self"] && TaskGroupXuan.obj["self"]["message"]) {
                    GameApp.Manager.viewManager.taskManager.taskUI.xuanGrop.Edit_xuanGroupDes.text = window["hexToDec"](TaskGroupXuan.obj["self"]["message"]);
                }
                else {
                    GameApp.Manager.viewManager.taskManager.taskUI.xuanGrop.Edit_xuanGroupDes.text = "限制长度30字以内";
                }
            }
            else {
            }
        };
        p.close = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return TaskGroupXuan;
    }(eui.Component));
    groupXuan.TaskGroupXuan = TaskGroupXuan;
    egret.registerClass(TaskGroupXuan,'groupXuan.TaskGroupXuan');
})(groupXuan || (groupXuan = {}));
