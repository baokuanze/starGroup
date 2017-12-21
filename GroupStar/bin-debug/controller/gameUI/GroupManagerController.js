var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagerController = (function () {
        function GroupManagerController() {
        }
        var d = __define,c=GroupManagerController,p=c.prototype;
        p.show = function (str) {
            GameApp.Manager.viewManager.groupManager.show(str);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.groupManager.hide();
        };
        return GroupManagerController;
    }());
    groupManagement.GroupManagerController = GroupManagerController;
    egret.registerClass(GroupManagerController,'groupManagement.GroupManagerController');
})(groupManagement || (groupManagement = {}));
