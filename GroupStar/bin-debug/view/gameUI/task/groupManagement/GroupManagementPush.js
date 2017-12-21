var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagementPush = (function (_super) {
        __extends(GroupManagementPush, _super);
        function GroupManagementPush() {
            _super.call(this);
            this.imgDataArr = [];
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementPushSkin.exml";
        }
        var d = __define,c=GroupManagementPush,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_taskTitle.fontFamily = "Heiti SC";
                this.lable_taskDirections.fontFamily = "Heiti SC";
                this.lable_taskLink.fontFamily = "Heiti SC";
                this.lable_taskScreenshot.fontFamily = "Heiti SC";
                this.lable_push.fontFamily = "Heiti SC";
                this.text_title.fontFamily = "Heiti SC";
                this.text_taskDirections.fontFamily = "Heiti SC";
                this.text_taskLink.fontFamily = "Heiti SC";
                this.lable_warmTitle.fontFamily = "Heiti SC";
                this.lable_warmLink.fontFamily = "Heiti SC";
            }
            this.btn_push.addEventListener(egret.TouchEvent.TOUCH_TAP, this.push, this);
            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateImageStarte, this);
            this.img_open.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateImageStarte1, this);
            this.text_title.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.text_title.text = "如:部落签到") {
                    this.text_title.text = "";
                }
            }, this);
            this.text_taskDirections.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.text_taskDirections.text = "如何做任务的说明和指引") {
                    this.text_taskDirections.text = "";
                }
            }, this);
            this.text_taskLink.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (this.text_taskLink.text = "请输入任务链接") {
                    this.text_taskLink.text = "";
                }
            }, this);
        };
        p.updateImageStarte = function (e) {
            this.img_close.visible = false;
            this.img_open.visible = true;
            this.isCutPc = 1;
        };
        p.updateImageStarte1 = function (e) {
            this.img_open.visible = false;
            this.img_close.visible = true;
            this.isCutPc = 0;
        };
        p.setData = function (str) {
            this.totalCunt = str;
            this.isCutPc = 0; //默认不截图
            this.text_title.text = "如:部落签到";
            this.text_taskDirections.text = "如何做任务的说明和指引";
            this.text_taskLink.text = "请输入任务链接";
            var item = new groupManagement.GroupManagerPushImage();
            item.index = 0;
            item.x = 0;
            item.y = 0;
            this.group_addToImg.addChild(item);
        };
        p.push = function (e) {
            var self = this;
            this.imgDataArr = [];
            if ((this.text_title.text == "") || (this.text_title.text == "如:部落签到")) {
                this.lable_warmTitle.visible = true;
                return;
            }
            else {
                this.lable_warmTitle.visible = false;
            }
            if ((this.text_taskLink.text == "") || (this.text_taskLink.text == "请输入任务链接")) {
                this.lable_warmLink.visible = true;
                return;
            }
            else {
                this.lable_warmLink.visible = false;
            }
            this.title = window["decToHex"](this.text_title.text);
            var conte;
            if (this.text_taskDirections.text == "如何做任务的说明和指引" || this.text_taskDirections.text == "") {
                this.content = "";
            }
            else {
                this.content = window["decToHex"](this.text_taskDirections.text);
            }
            this.link = this.text_taskLink.text;
            this.need_pic_feedback = this.isCutPc;
            var num = this.group_addToImg.numElements;
            console.log(num, "数量");
            for (var i = 0; i < num; i++) {
                var it = this.group_addToImg.getElementAt(i);
                if (it.index == 1 || it.index == 2 || it.index == 3) {
                    console.log(it, "发送到后端的值");
                    this.imgDataArr.push({
                        index: i,
                        smallImg: it.addSmallImg ? it.addSmallImg : "",
                        largeImg: it.addImage ? it.addImage : ""
                    });
                }
            }
            var push = {
                title: this.title,
                content: this.content,
                link: this.link,
                need_pic_feedback: this.need_pic_feedback,
                imgData: this.imgDataArr
            };
            GameApp.Manager.viewManager.maskStage(.4, true); //加loading遮照
            socketio.IoConnect.getInstance().upload(3, push, function (data) {
                if (data["st"] == 1) {
                    console.log("发布成功111", data["data"]);
                    GameApp.Manager.viewManager.groupManager.hostManager.objArr.push(data["data"]); //将对象放入数组中后面要用
                    var auditItem = groupManagement.GroupManagementAuditItem.produce(); //添加每一项审计
                    GameApp.Manager.viewManager.groupManager.hostManager.groupManagementAudit.group_audit.addChild(auditItem);
                    auditItem.setData(data["data"], self.totalCunt, 1);
                    var managerItem = groupManagement.GroupManagementItem.produce(); //添加管理一箱
                    GameApp.Manager.viewManager.groupManager.hostManager.groupManagement.group_addManagement.addChild(managerItem);
                    managerItem.setData(data["data"]["title"], 0, data["data"]);
                    //改变文字
                    self.text_title.text = "如:部落签到";
                    self.text_taskDirections.text = "如何做任务的说明和指引";
                    self.text_taskLink.text = "请输入任务链接";
                    while (self.group_addToImg.numElements > 0) {
                        self.group_addToImg.removeChildren();
                    }
                    var item = new groupManagement.GroupManagerPushImage();
                    item.index = 0;
                    item.x = 0;
                    item.y = 0;
                    this.group_addToImg.addChild(item);
                    aler.AlertPanel1.getInstance().show('温馨提示', '发布成功', "确定", function () {
                        GameApp.Manager.viewManager.clearMask(); //清楚遮照
                    }, this); //弹框提示
                }
                else {
                    console.log("发布失败");
                    aler.AlertPanel1.getInstance().show('温馨提示', '发布失败', "确定", function () {
                        GameApp.Manager.viewManager.clearMask(); //清楚遮照
                    }, this); //弹框提示
                }
            }, this);
        };
        return GroupManagementPush;
    }(eui.Component));
    groupManagement.GroupManagementPush = GroupManagementPush;
    egret.registerClass(GroupManagementPush,'groupManagement.GroupManagementPush');
})(groupManagement || (groupManagement = {}));
