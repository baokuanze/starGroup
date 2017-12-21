var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagementAuditItemInformation = (function (_super) {
        __extends(GroupManagementAuditItemInformation, _super);
        function GroupManagementAuditItemInformation() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/groupManagement/groupManagementAuditItemInformationSkin.exml";
        }
        var d = __define,c=GroupManagementAuditItemInformation,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_itemTitle.fontFamily = "Heiti SC";
                this.lable_yj.fontFamily = "Heiti SC";
            }
            this.scro2.height = this.stage.stageHeight - 127 - 245;
            this.groupButton.y = this.stage.stageHeight - 127;
            this.btn_reward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reward, this);
            this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comeToGroupManagerScreen, this);
        };
        p.setData = function (obj, _open_id, title) {
            //console.log("审计详情页",obj,obj["data"]);
            this.clear();
            this.lable_itemTitle.text = window["hexToDec"](title);
            this.open_id = _open_id;
            var len = obj["data"].length;
            if (len == 0) {
                this.rect_henggang.visible = false;
                this.btn_reward.visible = false;
                this.lable_yj.visible = false;
                this.lable_ZW.visible = true;
            }
            else {
                this.lable_ZW.visible = false;
                this.btn_reward.visible = true;
                this.lable_yj.visible = true;
                this.rect_henggang.visible = true;
            }
            console.log(len, "长度");
            for (var i = 0; i < len; i++) {
                var it = groupManagement.GroupManagementAuditItemInformationItem.produce();
                this.group_itemInformation.addChild(it);
                it.setData(obj["data"][i], _open_id);
            }
        };
        p.disLarge = function (url) {
            console.log(url);
            RES.getResByUrl(url, this.loadlarge_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.startx();
        };
        p.loadlarge_end = function (source) {
            this.bmpLarge.source = source;
            this.groupLarge.visible = true;
            this.endtx();
            this.groupTip.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addLargeLis, this);
        };
        p.addLargeLis = function () {
            this.groupLarge.visible = false;
            this.bmpLarge.source = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addLargeLis, this);
        };
        p.startx = function () {
            this.groupTip.visible = true;
            this.bmpTX.visible = true;
            //            this.scroll1.height=1492;
            egret.Tween.get(this.bmpTX, { loop: true }).to({ rotation: 360 }, 1000);
        };
        p.endtx = function () {
            this.bmpTX.visible = false;
            egret.Tween.removeTweens(this.bmpTX);
        };
        p.reward = function (e) {
            system.TipText.produce().open("所有粉丝都已奖励");
            var self = this;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + this.open_id + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/rewardRedFlowerAll", { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, open_task_id: this.open_id, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    var num = self.group_itemInformation.numElements;
                    for (var i = 0; i < num; i++) {
                        var it = self.group_itemInformation.getElementAt(i);
                        for (var j = 0; j < obj["data"].length; j++) {
                            var it1_id = obj["data"][j]["user_id"];
                            console.log(it1_id, it.target_id, "id");
                            if (it.target_id == it1_id) {
                                it.lable_getCount.text = "获得" + window["hexToDec"](obj["data"][j]["red_flower_num"]) + "次";
                                it.lable_getRedFlower.text = "已奖励";
                            }
                        }
                    }
                }
            }, true, this);
        };
        p.comeToGroupManagerScreen = function () {
            GameApp.Manager.controllerManager.groupManagerAuditController.hide();
            GameApp.Manager.controllerManager.groupManagerController.show("管理任务");
        };
        p.clear = function () {
            console.log("删除——————————————————————————");
            while (this.group_itemInformation.numElements > 0) {
                var it4 = this.group_itemInformation.getElementAt(this.group_itemInformation.numElements - 1);
                groupManagement.GroupManagementAuditItemInformationItem.reclaim(it4);
                if (it4.parent) {
                    it4.parent.removeChild(it4);
                }
            }
        };
        return GroupManagementAuditItemInformation;
    }(eui.Component));
    groupManagement.GroupManagementAuditItemInformation = GroupManagementAuditItemInformation;
    egret.registerClass(GroupManagementAuditItemInformation,'groupManagement.GroupManagementAuditItemInformation');
})(groupManagement || (groupManagement = {}));
