var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagementAuditItemInformationItem = (function (_super) {
        __extends(GroupManagementAuditItemInformationItem, _super);
        function GroupManagementAuditItemInformationItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementAuditItemInformationItemSkin.exml";
        }
        var d = __define,c=GroupManagementAuditItemInformationItem,p=c.prototype;
        /**生產*/
        GroupManagementAuditItemInformationItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (GroupManagementAuditItemInformationItem.cacheDict[mtype] == null) {
                GroupManagementAuditItemInformationItem.cacheDict[mtype] = [];
            }
            var dict = GroupManagementAuditItemInformationItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new GroupManagementAuditItemInformationItem();
            }
            return theFighter;
        };
        /**回收*/
        GroupManagementAuditItemInformationItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (GroupManagementAuditItemInformationItem.cacheDict[mtype] == null) {
                GroupManagementAuditItemInformationItem.cacheDict[mtype] = [];
            }
            var dict = GroupManagementAuditItemInformationItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_name.fontFamily = "Heiti SC";
                this.lable_count.fontFamily = "Heiti SC";
                this.lable_getCount.fontFamily = "Heiti SC";
                this.lable_getRedFlower.fontFamily = "Heiti SC";
            }
            this.img_cutPc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImg, this);
            this.btn_rewordRedFlower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rewordRedFlower, this);
            this.img_cutPc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.small_click, this);
        };
        p.setData = function (obj, open_id) {
            this.open_id = open_id;
            this.objValue = obj;
            this.largeImg = obj["user_upload_pic"]["largeImg"];
            this.target_id = obj["user_id"];
            console.log(open_id, this.target_id, "==========");
            console.log(obj, "888888888888888888888888888");
            this.lable_count.text = "累计完成" + window["hexToDec"](obj["finish_num"]) + "次";
            this.lable_getCount.text = "获得" + window["hexToDec"](obj["red_flower_num"]) + "次";
            this.lable_name.text = window["hexToDec"](obj["user_name"]);
            if (obj["can_send_flower"] == false) {
                this.lable_getRedFlower.text = "已奖励";
            }
            if (obj["can_send_flower"] == true) {
                this.lable_getRedFlower.text = "奖励小红花";
            }
            RES.getResByUrl(obj["user_pic"], this.PersonIcon, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["user_upload_pic"]["smallImg"], this.bitIcon, this, RES.ResourceItem.TYPE_IMAGE); //大图
        };
        p.addFlower = function () {
            var num = parseInt(this.objValue["red_flower_num"]) + 1;
            var str = num + "";
            this.lable_getCount.text = "获得" + window["hexToDec"](str) + "次";
            console.log(num, str, "次数");
        };
        p.small_click = function (e) {
            GameApp.Manager.viewManager.groupManagerAudit.groupManagerAuditInfor.disLarge(this.largeImg);
            e.stopPropagation();
        };
        p.PersonIcon = function (source) {
            this.img_icon.texture = source;
        };
        p.bitIcon = function (source) {
            this.img_cutPc.texture = source;
        };
        p.clickImg = function (e) {
        };
        p.rewordRedFlower = function (e) {
            var self = this;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + this.target_id + GameApp.Manager.dataManager.group_openid + this.open_id + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/rewardRedFlower", { user_id: GameApp.Manager.dataManager.uid, target_user_id: this.target_id, group_openid: GameApp.Manager.dataManager.group_openid, open_task_id: this.open_id, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    console.log("获得小红花");
                    self.addFlower();
                    self.lable_getRedFlower.text = "已奖励";
                }
            }, true, this);
        };
        p.clear = function () {
            console.log("回收");
            this.lable_name.text = "";
            this.lable_count.text = "";
            this.lable_getCount.text = "";
            this.lable_getRedFlower.text = "";
            this.img_icon.texture = null;
            this.img_cutPc.texture = null;
        };
        GroupManagementAuditItemInformationItem.cacheDict = {};
        return GroupManagementAuditItemInformationItem;
    }(eui.Component));
    groupManagement.GroupManagementAuditItemInformationItem = GroupManagementAuditItemInformationItem;
    egret.registerClass(GroupManagementAuditItemInformationItem,'groupManagement.GroupManagementAuditItemInformationItem');
})(groupManagement || (groupManagement = {}));
