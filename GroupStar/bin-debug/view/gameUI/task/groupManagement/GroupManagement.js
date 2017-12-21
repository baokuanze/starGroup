var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagement = (function (_super) {
        __extends(GroupManagement, _super);
        function GroupManagement() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementSkin.exml";
        }
        var d = __define,c=GroupManagement,p=c.prototype;
        p.childrenCreated = function () {
            this.scroll2.height = this.stage.stageHeight - 245;
        };
        p.setData = function (obj) {
            for (var i = 0; i < obj["list"].length; i++) {
                var item = obj["list"][i];
                var managerItem = groupManagement.GroupManagementItem.produce(); //每一小项
                this.group_addManagement.addChild(managerItem);
                managerItem.setData(item["title"], i, item);
            }
        };
        return GroupManagement;
    }(eui.Component));
    groupManagement.GroupManagement = GroupManagement;
    egret.registerClass(GroupManagement,'groupManagement.GroupManagement');
})(groupManagement || (groupManagement = {}));
