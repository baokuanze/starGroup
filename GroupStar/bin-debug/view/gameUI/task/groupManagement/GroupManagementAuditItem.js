var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagementAuditItem = (function (_super) {
        __extends(GroupManagementAuditItem, _super);
        function GroupManagementAuditItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementAuditItemSkin.exml";
        }
        var d = __define,c=GroupManagementAuditItem,p=c.prototype;
        /**生產*/
        GroupManagementAuditItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (GroupManagementAuditItem.cacheDict[mtype] == null) {
                GroupManagementAuditItem.cacheDict[mtype] = [];
            }
            var dict = GroupManagementAuditItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new GroupManagementAuditItem();
            }
            return theFighter;
        };
        /**回收*/
        GroupManagementAuditItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (GroupManagementAuditItem.cacheDict[mtype] == null) {
                GroupManagementAuditItem.cacheDict[mtype] = [];
            }
            var dict = GroupManagementAuditItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_auditTitle.fontFamily = "Heiti SC";
                this.lable_auditInformation.fontFamily = "Heiti SC";
            }
            this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToNextScreen, this);
        };
        p.setData = function (obj, str, n) {
            this.lable_auditTitle.text = window["hexToDec"](obj["title"]);
            this.title = obj["title"];
            var count;
            if (n == 1) {
                count = 0;
            }
            else {
                count = obj["count"];
            }
            this.lable_auditInformation.text = "今日完成情况" + "(" + count + "/" + str + ")";
            this.open_task_Id = obj["open_task_id"];
        };
        p.goToNextScreen = function (e) {
            //进入详情页；
            GameApp.Manager.controllerManager.groupManagerAuditController.show(this.open_task_Id, this.title);
            GameApp.Manager.controllerManager.groupManagerController.hide();
        };
        p.clear = function () {
        };
        GroupManagementAuditItem.cacheDict = {};
        return GroupManagementAuditItem;
    }(eui.Component));
    groupManagement.GroupManagementAuditItem = GroupManagementAuditItem;
    egret.registerClass(GroupManagementAuditItem,'groupManagement.GroupManagementAuditItem');
})(groupManagement || (groupManagement = {}));
