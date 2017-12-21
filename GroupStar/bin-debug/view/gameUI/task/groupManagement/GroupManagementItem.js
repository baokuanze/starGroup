var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagementItem = (function (_super) {
        __extends(GroupManagementItem, _super);
        function GroupManagementItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementItemSkin.exml";
        }
        var d = __define,c=GroupManagementItem,p=c.prototype;
        /**生產*/
        GroupManagementItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (GroupManagementItem.cacheDict[mtype] == null) {
                GroupManagementItem.cacheDict[mtype] = [];
            }
            var dict = GroupManagementItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new GroupManagementItem();
            }
            return theFighter;
        };
        /**回收*/
        GroupManagementItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (GroupManagementItem.cacheDict[mtype] == null) {
                GroupManagementItem.cacheDict[mtype] = [];
            }
            var dict = GroupManagementItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_managementTitle.fontFamily = "Heiti SC";
            }
            this.btn_nextScreen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextScreen, this);
            //this.groupManagementItenInfor = new 
        };
        p.setData = function (str, index, obj) {
            this.managementObj = GameApp.Manager.viewManager.groupManager.hostManager.allObj;
            this.lable_managementTitle.text = window["hexToDec"](str);
            //this.itemIndex = index;
            this.gMI_open_task_id = obj["open_task_id"];
            //console.log(obj,obj["open_task_id"],"哪一项",this.gMI_open_task_id);
        };
        p.nextScreen = function (e) {
            var self = this;
            console.log(self.gMI_open_task_id, "===========");
            GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.visible = true;
            GameApp.Manager.viewManager.groupManager.hostManager.group_manager.visible = false;
            var num = GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation.group_addToImg1.numElements;
            for (var i = 0; i < num; i++) {
                var it = GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation.group_addToImg1.getElementAt(i);
            }
            var number1 = GameApp.Manager.viewManager.groupManager.hostManager.objArr.length;
            for (var j = 0; j < number1; j++) {
                var it2 = GameApp.Manager.viewManager.groupManager.hostManager.objArr[j];
                console.log(it2["open_task_id"]);
                if (self.gMI_open_task_id == it2["open_task_id"]) {
                    console.log("下一页");
                    GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation.setData(it2, self.gMI_open_task_id);
                    GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.addChild(GameApp.Manager.viewManager.groupManager.hostManager.groupManagementItemInformation);
                }
            }
        };
        p.clear = function () {
        };
        //private groupManagementItenInfor = groupManagement.GroupManagementItemInformation;
        GroupManagementItem.cacheDict = {};
        return GroupManagementItem;
    }(eui.Component));
    groupManagement.GroupManagementItem = GroupManagementItem;
    egret.registerClass(GroupManagementItem,'groupManagement.GroupManagementItem');
})(groupManagement || (groupManagement = {}));
