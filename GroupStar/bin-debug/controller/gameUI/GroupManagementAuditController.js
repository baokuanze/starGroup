var groupManagementAudit;
(function (groupManagementAudit) {
    /**
     *
     * @author
     *
     */
    var GroupManagementAuditController = (function () {
        function GroupManagementAuditController() {
        }
        var d = __define,c=GroupManagementAuditController,p=c.prototype;
        p.show = function (str, str1) {
            GameApp.Manager.viewManager.groupManagerAudit.show(str, str1);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.groupManagerAudit.hide();
        };
        return GroupManagementAuditController;
    }());
    groupManagementAudit.GroupManagementAuditController = GroupManagementAuditController;
    egret.registerClass(GroupManagementAuditController,'groupManagementAudit.GroupManagementAuditController');
})(groupManagementAudit || (groupManagementAudit = {}));
