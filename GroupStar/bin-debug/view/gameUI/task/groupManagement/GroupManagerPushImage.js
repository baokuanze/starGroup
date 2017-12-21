var groupManagement;
(function (groupManagement) {
    /**
     *
     * @author
     *
     */
    var GroupManagerPushImage = (function (_super) {
        __extends(GroupManagerPushImage, _super);
        function GroupManagerPushImage() {
            _super.call(this);
            this.index = 0;
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagerPushImageSkin.exml";
        }
        var d = __define,c=GroupManagerPushImage,p=c.prototype;
        p.childrenCreated = function () {
            this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changerImagePic, this);
        };
        p.changerImagePic = function (e) {
            selectImage(this.selectedHandler, this, 250); //读取大图
        };
        p.setImage = function (str) {
            RES.getResByUrl(str, this.setPic, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.setPic = function (source) {
            this.btn_add.texture = source;
            this.btn_add.width = 133;
            this.btn_add.height = 133;
        };
        p.selectedHandler = function (thisRef, imgURL, file, smallUrl) {
            RES.getResByUrl(imgURL, thisRef.compFunc, thisRef, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(smallUrl, thisRef.compFunc1, thisRef, RES.ResourceItem.TYPE_IMAGE);
        };
        p.compFunc = function (texture) {
            //首先创建的为0，点击为0时修改为
            var base64str = texture.toDataURL("image/jpeg"); //使用默认texture尺寸
            this.addImage = base64str;
            if (this.index == 1) {
                RES.getResByUrl(base64str, this.changePic1, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (this.index == 2) {
                RES.getResByUrl(base64str, this.changePic3, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (this.index == 3) {
                RES.getResByUrl(base64str, this.changePic1, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (GameApp.Manager.viewManager.groupManager.hostManager.groupManagementPush.group_addToImg.numElements > 4) {
                return;
            }
            else {
                if (this.index == 0) {
                    console.log("添加一项");
                    RES.getResByUrl(base64str, this.changePic2, this, RES.ResourceItem.TYPE_IMAGE); //边创建边修改
                    var addImgitem = new groupManagement.GroupManagerPushImage();
                    GameApp.Manager.viewManager.groupManager.hostManager.groupManagementPush.group_addToImg.addChild(addImgitem);
                    addImgitem.index = 0;
                }
            }
        };
        p.compFunc1 = function (texture) {
            var base64str = texture.toDataURL("image/jpeg"); //使用默认texture尺寸
            this.addSmallImg = base64str;
        };
        p.changePic1 = function (source) {
            this.btn_add.texture = null;
            this.btn_add.texture = source;
            this.btn_add.width = 133;
            this.btn_add.height = 133;
            this.index = 2; //修改
        };
        p.changePic3 = function (source) {
            this.btn_add.texture = null;
            this.btn_add.texture = source;
            this.btn_add.width = 133;
            this.btn_add.height = 133;
            this.index = 2;
        };
        p.changePic2 = function (source) {
            this.btn_add.texture = null;
            this.btn_add.texture = source;
            this.btn_add.width = 133;
            this.btn_add.height = 133;
            this.index = 3;
        };
        return GroupManagerPushImage;
    }(eui.Component));
    groupManagement.GroupManagerPushImage = GroupManagerPushImage;
    egret.registerClass(GroupManagerPushImage,'groupManagement.GroupManagerPushImage');
})(groupManagement || (groupManagement = {}));
