var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskOpenUI = (function (_super) {
        __extends(TaskOpenUI, _super);
        function TaskOpenUI() {
            _super.call(this);
            this.tid = "";
            this.url = "";
            this.skinName = "src/view/gameUI/task/taskoepn/TaskOpenUISkin.exml";
        }
        var d = __define,c=TaskOpenUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
            }
            this.hideg1();
            this.hideg2();
            this.scroll1.height = this.stage.stageHeight;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGo_tap, this);
            this.btnUpload.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upload_tap, this);
        };
        p.disg1 = function () {
            this.group2.addChild(this.group2_1);
        };
        p.disg2 = function () {
            this.group2.addChild(this.group2_2);
        };
        p.hideg1 = function () {
            if (this.group2_1.parent)
                this.group2_1.parent.removeChild(this.group2_1);
        };
        p.hideg2 = function () {
            if (this.group2_2.parent)
                this.group2_2.parent.removeChild(this.group2_2);
        };
        p.upload_tap = function () {
            var self = this;
            selectImage(this.selectedHandler, this, 250);
        };
        p.selectedHandler = function (thisRef, imgURL, file, smallURL) {
            thisRef.startx();
            RES.getResByUrl(imgURL, thisRef.compFunc, thisRef, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(smallURL, thisRef.compFunc1, thisRef, RES.ResourceItem.TYPE_IMAGE);
        };
        p.compFunc = function (texture) {
            var self = this;
            var base64str = texture.toDataURL("image/jpeg"); //使用默认texture尺寸
            this.largeImg = base64str;
            this.socketsend();
        };
        p.compFunc1 = function (texture) {
            var self = this;
            var base64str = texture.toDataURL("image/jpeg"); //使用默认texture尺寸
            this.smallImg = base64str;
            this.socketsend();
        };
        p.socketsend = function () {
            var self = this;
            if (this.obj["info"]["need_pic_feedback"] == 0) {
                console.log('fasong');
                socketio.IoConnect.getInstance().upload(4, { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, open_task_id: self.tid, imgData: {} }, function (obj) {
                    if (obj["st"] == 1) {
                        self.hideg1();
                        self.disg2();
                    }
                    else {
                    }
                    self.groupTip.visible = false;
                    self.endtx();
                }, this);
            }
            else {
                if (this.largeImg && this.smallImg) {
                    socketio.IoConnect.getInstance().upload(4, { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, open_task_id: self.tid, imgData: { smallImg: self.smallImg, largeImg: self.largeImg } }, function (obj) {
                        console.log('socketcall:', obj);
                        if (obj["st"] == 1) {
                            self.hideg1();
                            self.disg2();
                        }
                        else {
                        }
                        self.groupTip.visible = false;
                        self.endtx();
                    }, this);
                }
            }
        };
        p.btnGo_tap = function () {
            var self = this;
            if (!this.obj["isFinish"]) {
                this.socketsend();
            }
            if (this.url.indexOf("http") == -1) {
                window.location.href = "http://" + this.url;
            }
            else {
                window.location.href = "" + this.url;
            }
        };
        p.setData = function (obj) {
            this.obj = obj;
            console.log(obj["type"]);
            switch (obj["type"]) {
                case 1:
                    this.tid = obj["info"]["open_task_id"];
                    this.lbl1.text = window["hexToDec"](obj["info"]["title"]);
                    if (obj["info"]["content"]) {
                        this.groupData.addChildAt(this.group0, 1);
                        this.lbl3.text = window["hexToDec"](obj["info"]["content"]);
                    }
                    else if (obj["info"]["task_pic"].length > 0) {
                        this.groupData.addChildAt(this.group0, 1);
                    }
                    else {
                        if (this.group0.parent) {
                            this.group0.parent.removeChild(this.group0);
                        }
                    }
                    this.lbl7.text = "已完成(" + obj["userArray"].length + "/" + obj["info"]["member_num"] + ")";
                    this.url = obj["info"]["link"];
                    if (!this.obj["isFinish"]) {
                        if (this.obj["info"]["need_pic_feedback"] == 0) {
                            this.hideg1();
                            this.hideg2();
                        }
                        else {
                            this.disg1();
                            this.hideg2();
                        }
                    }
                    else {
                        this.hideg1();
                        this.disg2();
                    }
                    var arr2 = obj["info"]["task_pic"];
                    if (arr2) {
                        for (var i = 0; i < arr2.length; i++) {
                            var item1 = new module.BaseEuiImage();
                            this.groupTaskImg.addChild(item1);
                            item1.data = arr2[i];
                            item1.loadPic(arr2[i]["smallImg"]);
                            item1.width = 156;
                            item1.height = 250;
                            item1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.item1_tap, this);
                        }
                    }
                    var arr1 = obj["flowerArray"];
                    if (arr1) {
                        if (arr1.length > 0) {
                            this.group1.visible = true;
                            for (var i = 0; i < arr1.length; i++) {
                                var item = task.TaskHallofFame.produce();
                                this.groupHeadFlower.addChild(item);
                            }
                            for (var i = arr1.length - 1; i >= 0; i--) {
                                var item = this.groupHeadFlower.getElementAt(i);
                                item.setData(arr1[i]);
                            }
                        }
                        else {
                            this.group1.visible = false;
                        }
                    }
                    var arr = obj["userArray"];
                    if (arr) {
                        for (var i = 0; i < arr.length; i++) {
                            var item = task.TaskHallofFame.produce();
                            this.groupHeadGroup.addChild(item);
                        }
                        for (var i = arr.length - 1; i >= 0; i--) {
                            var item = this.groupHeadGroup.getElementAt(i);
                            item.setData(arr[i]);
                        }
                    }
                    this.group1.y = this.lbl3.y + this.lbl3.textHeight + 50;
                    if (obj["pic"]) {
                        RES.getResByUrl(obj["pic"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
                    }
                    else {
                        this.group2.y = this.group1.y + 110 + 30;
                    }
                    this.group3.y = this.group2.y + 213 + 25;
                    break;
                case 2:
                    this.tid = obj["extension_task_id"];
                    this.lbl1.text = window["hexToDec"](obj["title"]);
                    if (this.group1.parent) {
                        this.group1.parent.removeChild(this.group1);
                    }
                    if (this.group2.parent) {
                        this.group2.parent.removeChild(this.group2);
                    }
                    if (this.group3.parent) {
                        this.group3.parent.removeChild(this.group3);
                    }
                    var arr2 = obj["task_pic"];
                    if (arr2) {
                        for (var i = 0; i < arr2.length; i++) {
                            var item1 = new module.BaseEuiImage();
                            this.groupTaskImg.addChild(item1);
                            item1.data = arr2[i];
                            item1.loadPic(arr2[i]["smallImg"]);
                            item1.width = 156;
                            item1.height = 250;
                            item1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.item1_tap, this);
                        }
                    }
                    break;
            }
        };
        p.item1_tap = function (e) {
            var item = e.currentTarget;
            this.disLarge(item.data["largeImg"]);
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
        p.load_end = function (s) {
            //		    this.taskImg.source=s;
        };
        p.clear = function () {
            this.lbl1.text = "";
            this.lbl3.text = "";
            this.smallImg = "";
            this.largeImg = "";
            //            this.group2_1.visible = false;
            //            this.group2_2.visible = true;
            this.hideg1();
            this.hideg2();
            //            this.lbl5.text = "";
            //            this.taskImg.source=null;
            this.groupData.addChildAt(this.group1, 2);
            this.groupData.addChildAt(this.group2, 3);
            this.groupData.addChildAt(this.group3, 4);
            while (this.groupTaskImg.numElements > 0) {
                var item1 = this.groupTaskImg.getElementAt(this.groupTaskImg.numElements - 1);
                if (item1.parent)
                    item1.parent.removeChild(item1);
            }
            while (this.groupHeadGroup.numElements > 0) {
                var item = this.groupHeadGroup.getElementAt(this.groupHeadGroup.numElements - 1);
                task.TaskHallofFame.reclaim(item);
                if (item.parent)
                    item.parent.removeChild(item);
            }
            while (this.groupHeadFlower.numElements > 0) {
                var item = this.groupHeadFlower.getElementAt(this.groupHeadFlower.numElements - 1);
                task.TaskHallofFame.reclaim(item);
                if (item.parent)
                    item.parent.removeChild(item);
            }
        };
        p.close = function () {
            GameApp.Manager.viewManager.taskManager.taskOpenManager.hide();
            GameApp.Manager.controllerManager.taskController.show();
        };
        return TaskOpenUI;
    }(eui.Component));
    task.TaskOpenUI = TaskOpenUI;
    egret.registerClass(TaskOpenUI,'task.TaskOpenUI');
})(task || (task = {}));
