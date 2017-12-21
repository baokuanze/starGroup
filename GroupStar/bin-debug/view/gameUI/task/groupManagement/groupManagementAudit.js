var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var groupManagementAudit = (function (_super) {
        __extends(groupManagementAudit, _super);
        function groupManagementAudit() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementAuditSkin.exml";
        }
        var d = __define,c=groupManagementAudit,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_taskWarn.fontFamily = "Heiti SC";
            }
            this.scor1.height = this.stage.stageHeight - 127 - 245;
            this.groupBottom.y = this.stage.stageHeight - 127 - 245;
            this.btn_taskWarn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.taskWarm, this);
            //            this.scor1.height = this.stage.stageHeight - 127- this.scor1.y;
        };
        p.setData = function (obj, allNumber) {
            console.log(obj["list"]);
            var number = obj["member_num"];
            for (var i = 0; i < obj["list"].length; i++) {
                var item = obj["list"][i];
                var auditItem = groupManagement.GroupManagementAuditItem.produce(); //创建每一项审计
                this.group_audit.addChild(auditItem);
                auditItem.setData(item, allNumber, 2);
                console.log(item, "对象");
            }
        };
        p.taskWarm = function (e) {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/inviteGroupFriendsForTask", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                system.Share.share(obj, function (n) {
                    if (n == 1)
                        system.TipText.produce().open("发送成功");
                });
            }, true, this);
        };
        return groupManagementAudit;
    }(eui.Component));
    groupManagement.groupManagementAudit = groupManagementAudit;
    egret.registerClass(groupManagementAudit,'groupManagement.groupManagementAudit');
})(groupManagement || (groupManagement = {}));
