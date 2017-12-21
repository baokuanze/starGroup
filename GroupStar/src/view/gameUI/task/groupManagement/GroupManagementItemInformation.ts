module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
    export class GroupManagementItemInformation extends eui.Component {
        private lable_taskTitle: eui.Label;
        private lable_taskDirections: eui.Label;
        private lable_taskLink: eui.Label;
        private lable_taskScreenshot: eui.Label;
        private text_title: eui.EditableText; //标题输入
        private text_taskDirections: eui.EditableText; //说明
        private text_taskLink: eui.EditableText;//链接
        private img_close: eui.Image;//关
        private img_open: eui.Image;//开
        private lable_delete: eui.Label;
        private lable_sava: eui.Label;
        private btn_save: eui.Rect;
        private btn_delete: eui.Rect;
        private imgData: string;//图片
        private title: string; //标题
        private content: string; //内容
        private link: string;//链接
        private need_pic_feedback: number;//是否需要截图
        public open_task_id: string;

        private isCutPc: number; //是佛截图
        private lable_warmTitle: eui.Label;
        private lable_warmLink: eui.Label;
        private itemIndex: string;
        public group_addToImg1: eui.Group;//图片
        private obj_value:Object;
        private imgDataArr: Array<Object> = [  //所有有图片

        ]



        public constructor() {
            super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementItemInformationSkin.exml";
        }

        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_taskTitle.fontFamily = "Heiti SC";
                this.lable_taskDirections.fontFamily = "Heiti SC";
                this.lable_taskLink.fontFamily = "Heiti SC";
                this.lable_taskScreenshot.fontFamily = "Heiti SC";

                this.lable_delete.fontFamily = "Heiti SC";
                this.lable_sava.fontFamily = "Heiti SC";
                this.lable_warmTitle.fontFamily = "Heiti SC";
                this.lable_warmLink.fontFamily = "Heiti SC";
            }
            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updateImageStarte,this);
            this.img_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updateImageStarte1,this)
            this.btn_save.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sava,this);
            this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.delete,this);
            this.text_title.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                if(this.text_title.text = "如:部落签到") {
                    this.text_title.text = "";
                }
            },this);
            this.text_taskDirections.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                if(this.text_taskDirections.text = "如何做任务的说明和指引") {
                    this.text_taskDirections.text = "";
                }
            },this);
            this.text_taskLink.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                if(this.text_taskLink.text = "请输入任务链接") {
                    this.text_taskLink.text = "";
                }
            },this);
        }

        public setData(obj: Object,index: string): void {
            
            this.itemIndex = index;    //点击哪项的open_id
            this.isCutPc = 0;           //默认不截图
            this.text_title.text = window["hexToDec"](obj["title"]);
            this.text_taskDirections.text = window["hexToDec"](obj["content"]);
            this.text_taskLink.text = window["hexToDec"](obj["link"]);
            this.open_task_id = obj["open_task_id"];
            this.title = this.text_title.text;
            this.content = this.text_taskDirections.text;
            this.link = this.text_taskLink.text;
            console.log(obj,this.open_task_id,"管理界面的每个Id","==========","------------------------")
                
            console.log(this.group_addToImg1.numElements,"数组中元素");
            this.obj_value = obj;
            while(this.group_addToImg1.numElements>0){
                this.group_addToImg1.removeChildren();
            }
            
            //根据长度创建图片；
            var num = obj["task_pic"].length;
            console.log(obj["task_pic"],"888888888888888888888888888888");
            console.log(num,"长度");
            
            if(num == 0){
                var it = new groupManagement.GroupManagerPushImage1();
                this.group_addToImg1.addChild(it);
                it.index = 0;
            }else{
                //如果小于num是多添加一项 要修改
                for(var i: number = 0;i < num;i++) {
                    var it = new groupManagement.GroupManagerPushImage1();
                    this.group_addToImg1.addChild(it);
                    it.index = 1;
                    it.setImage(obj["task_pic"][i]["largeImg"]);
                }
                
                if(num < 4) {
                    var it = new groupManagement.GroupManagerPushImage1();
                    this.group_addToImg1.addChild(it);
                    it.index = 0;
                }
            }
        }

        private selectedHandler(thisRef: any,imgURL: string,file: Blob): void {
            RES.getResByUrl(imgURL,thisRef.compFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
        }

        private compFunc(texture: egret.Texture): void {
            var self: GroupManagementItemInformation = this;
            var base64str = texture.toDataURL("image/jpeg");//使用默认texture尺寸
            this.imgData = base64str;
        }

        public updateImageStarte(e: egret.Event): void {
            this.img_close.visible = false;
            this.img_open.visible = true;
            this.isCutPc = 1
        }

        public updateImageStarte1(e: egret.Event): void {
            this.img_open.visible = false;
            this.img_close.visible = true;
            this.isCutPc = 0;
        }

        public sava(e: egret.Event): void {   // 保存修改
            this.imgDataArr = [];
            var self: GroupManagementItemInformation = this;
            if((this.text_title.text == "") || (this.text_title.text == "如:部落签到")) {
                this.lable_warmTitle.visible = true;
                return;
            } else {
                this.lable_warmTitle.visible = false;
            }

            if((this.text_taskLink.text == "") || (this.text_taskLink.text == "请输入任务链接")) {
                this.lable_warmLink.visible = true;
                return;
            } else {
                this.lable_warmLink.visible = false;
            }

            this.title = window["decToHex"](this.text_title.text);
            this.content = window["decToHex"](this.text_taskDirections.text);
            this.link = this.text_taskLink.text;
            this.need_pic_feedback = this.isCutPc;
            var imgData = this.imgData ? this.imgData : "";
            var open_task_id = this.open_task_id ? this.open_task_id : "";
            var num = this.group_addToImg1.numElements;
            //var c =document.getElementById("my")
            
            for(var i:number = 0;i<num;i++ ){
                var it: groupManagement.GroupManagerPushImage = <groupManagement.GroupManagerPushImage>this.group_addToImg1.getElementAt(i);
                if(it.index == 2 || it.index == 3){
                    this.imgDataArr.push({
                        index: i,
                        smallImg: it.addImage ? it.addImage : "",
                        largeImg: it.addSmallImg ? it.addSmallImg : ""
                        });
                }
            }
           var num = this.group_addToImg1.numElements;
            var push = {
                title: this.title,
                content: this.content,
                link: this.link,
                need_pic_feedback: this.need_pic_feedback,
                imgData: this.imgDataArr,
                open_task_id: open_task_id
            }
            GameApp.Manager.viewManager.maskStage(.4,true);//加loading遮照
            
            socketio.IoConnect.getInstance().upload(3,push,function(data: Object) {  //发送数据到服务端
                console.log(data,"-----------");
                if(data["st"] == 1) {
                    var obj = data["data"]["task_pic"];
                    var n = obj.length;
                    console.log("发送成功",obj,n);
                    var update = setTimeout(function() {
                        var isSave: boolean = false; var n: number;
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.removeChildren();
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manager.visible = true;
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.visible = false;

                        var num = GameApp.Manager.viewManager.groupManager.hostManager.groupManagement.group_addManagement.numElements;
                        var num2 = GameApp.Manager.viewManager.groupManager.hostManager.objArr.length;
                        //屏幕修改
                        for(var j: number = 0;j < num;j++) {
                            var it: groupManagement.GroupManagementItem = <groupManagement.GroupManagementItem>GameApp.Manager.viewManager.groupManager.hostManager.groupManagement.group_addManagement.getElementAt(j);
                            if(it["gMI_open_task_id"] == self.itemIndex) {
                                it["lable_managementTitle"].text = self.text_title.text;
                                var item1: groupManagement.GroupManagementAuditItem = <groupManagement.GroupManagementAuditItem>GameApp.Manager.viewManager.groupManager.hostManager.groupManagementAudit.group_audit.getElementAt(j);
                                item1.lable_auditTitle.text = self.text_title.text;
                            }
                        }

                        //数组修改
                        for(var j: number = 0;j < num2;j++) {
                            var it1 = GameApp.Manager.viewManager.groupManager.hostManager.objArr[j];
                            
                            if(it1["open_task_id"] == self.itemIndex) {
                                console.log(it1,"数组中每一项");  //没有图片这儿
                                isSave = true;
                                n = j;
                            }
                        }
                        if(isSave) {
                            GameApp.Manager.viewManager.groupManager.hostManager.objArr[n]["title"] = window["decToHex"](self.text_title.text)
                            GameApp.Manager.viewManager.groupManager.hostManager.objArr[n]["content"] = window["decToHex"](self.text_taskDirections.text);
                            GameApp.Manager.viewManager.groupManager.hostManager.objArr[n]["link"] = window["decToHex"](self.text_taskLink.text);
                            GameApp.Manager.viewManager.groupManager.hostManager.objArr[n]["need_pic_feedback"] = self.isCutPc;
                            GameApp.Manager.viewManager.groupManager.hostManager.objArr[n]["task_pic"] = [];
                            //图片保存
                            for(var i: number = 0;i < data["data"]["task_pic"].length ; i++){
                                    GameApp.Manager.viewManager.groupManager.hostManager.objArr[n]["task_pic"].push(
                                        data["data"]["task_pic"][i]
                                    )
                             }
                            }
                        },300);
                        aler.AlertPanel1.getInstance().show('温馨提示','发布成功',"确定",function() {
                            GameApp.Manager.viewManager.clearMask();//清楚遮照
                        },this);//弹框提示
                        
                    } else {
                        console.log("发布失败");
                        aler.AlertPanel1.getInstance().show('温馨提示','发布失败',"确定",function() {
                            GameApp.Manager.viewManager.clearMask();//清楚遮照
                        },this);//弹框提示
                    }
                },this);
        }
     

        public delete(e: egret.Event): void {
            var isDelete: boolean = false; var n: number;
            var isDelete2: boolean = false; var n2: number;
            var self: GroupManagementItemInformation = this;
            var open_task_id = this.open_task_id ? this.open_task_id : "";

            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + open_task_id + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/removeCustomOpenTask",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,open_task_id: open_task_id,sign: sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    var num = GameApp.Manager.viewManager.groupManager.hostManager.objArr.length;
                    var update = setTimeout(function() {
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.removeChildren();
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manageInfo.visible = false;
                        var number = GameApp.Manager.viewManager.groupManager.hostManager.groupManagementAudit.group_audit.numElements;
                        for(var j: number = 0;j < number;j++) {
                            var it: groupManagement.GroupManagementItem = <groupManagement.GroupManagementItem>GameApp.Manager.viewManager.groupManager.hostManager.groupManagement.group_addManagement.getElementAt(j);
                            console.log(it["gMI_open_task_id"],"删除的id",self.itemIndex);
                            if(it["gMI_open_task_id"] == self.itemIndex) {
                                isDelete2 = true;
                                n2 = j;
                            }
                        }
                        if(isDelete2) {
                            GameApp.Manager.viewManager.groupManager.hostManager.groupManagementAudit.group_audit.removeChildAt(n2);
                            GameApp.Manager.viewManager.groupManager.hostManager.groupManagement.group_addManagement.removeChildAt(n2);
                        }
                        GameApp.Manager.viewManager.groupManager.hostManager.group_manager.visible = true;
                    },300);

                    for(var j: number = 0;j < num;j++) { //数组删除
                        var it1 = GameApp.Manager.viewManager.groupManager.hostManager.objArr[j];
                        if(it1["open_task_id"] == self.itemIndex) {
                            isDelete = true;
                            n = j;
                        }
                    }
                    if(isDelete) {
                        GameApp.Manager.viewManager.groupManager.hostManager.objArr.splice(n,1);
                    }
                }
            },true,this);
        }
    }
}
