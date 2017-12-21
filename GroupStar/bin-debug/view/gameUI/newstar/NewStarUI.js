var newstar;
(function (newstar) {
    /**
     *
     * @author
     *
     */
    var NewStarUI = (function (_super) {
        __extends(NewStarUI, _super);
        function NewStarUI() {
            _super.call(this);
            this.arrBoxItem = [];
            this.base64str = "";
            this.skinName = "src/view/gameUI/newstar/NewStarUISkin.exml";
        }
        var d = __define,c=NewStarUI,p=c.prototype;
        p.childrenCreated = function () {
            var self = this;
            this.scroll1.height = egret.MainContext.instance.stage.stageHeight;
            this.bmpStar.mask = this.maskStar;
            if (Tools.getInstance().isIphone()) {
                this.lbl0.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lbl11.fontFamily = "Heiti SC";
                this.lbl12.fontFamily = "Heiti SC";
                this.lbl13.fontFamily = "Heiti SC";
                this.lbl14.fontFamily = "Heiti SC";
                this.lblStarName.fontFamily = "Heiti SC";
                this.lblStarDesc.fontFamily = "Heiti SC";
            }
            for (var i = 0; i < 6; i++) {
                var item = new newstar.NewStarCheckBoxItem();
                this.groupData.addChild(item);
                switch (i) {
                    case 0:
                        item.setData("歌手", i + 1);
                        break;
                    case 1:
                        item.setData("演员", i + 1);
                        break;
                    case 2:
                        item.setData("主持", i + 1);
                        break;
                    case 3:
                        item.setData("主播", i + 1);
                        break;
                    case 4:
                        item.setData("网红", i + 1);
                        break;
                    case 5:
                        item.setData("其他", i + 1);
                        break;
                }
                this.arrBoxItem.push(item);
            }
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
                if (self.lblStarName.text == "请输入明星姓名或组合全称") {
                    self.lblStarName.text = "";
                    self.lblStarName.textColor = 0x14b8f6;
                }
            }, this);
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_OUT, function () {
                if (self.lblStarName.text == "") {
                    self.lblStarName.text = "请输入明星姓名或组合全称";
                    self.lblStarName.textColor = 0xbcd5df;
                }
            }, this);
            this.lblStarDesc.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
                if (self.lblStarDesc.text == "如代表作等") {
                    self.lblStarDesc.text = "";
                    self.lblStarDesc.textColor = 0x14b8f6;
                }
            }, this);
            this.lblStarDesc.addEventListener(egret.FocusEvent.FOCUS_OUT, function () {
                if (self.lblStarDesc.text == "") {
                    self.lblStarDesc.text = "如代表作等";
                    self.lblStarDesc.textColor = 0xbcd5df;
                }
            }, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add_tap, this);
            this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ok_tap, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        p.add_tap = function () {
            if (this.base64str == "") {
                if (isWeixin())
                    selectImageWX(this.selectedHandler, this);
                else
                    selectImage(this.selectedHandler, this, 0);
            }
        };
        p.ok_tap = function () {
            if (this.lblStarName.text == "请输入明星姓名或组合全称") {
                this.lbl11.visible = true;
                return;
            }
            if (this.lblStarDesc.text == "如代表作等") {
                this.lbl12.visible = true;
                return;
            }
            var arr = [];
            for (var i in this.arrBoxItem) {
                var item = this.arrBoxItem[i];
                if (item.isSelect) {
                    arr.push(item.key);
                }
            }
            if (arr.length == 0) {
                this.lbl13.visible = true;
                return;
            }
            var name = window["decToHex"](this.lblStarName.text);
            var desc = window["decToHex"](this.lblStarDesc.text);
            this.groupTip.visible = true;
            this.lbl14.visible = true;
            //            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid   + JSON.stringify(arr)+ "&");
            //            Util.sendJson1(GameApp.Manager.dataManager.IP + "/userCreateNewStar",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,name: name,desc: desc,type: JSON.stringify(arr),sign: sign,imgData:this.base64str },function(obj: Object) {
            //                if(obj["st"] == 1) {
            //                    aler.AlertPanel1.getInstance().show("","提交成功","确定",function(){
            //                        this.groupTip.visible = false;
            //                        this.close();
            //                    },this);
            //                }else{
            //                    aler.AlertPanel1.getInstance().show("","提交失败","确定",function(){
            //                        this.groupTip.visible=false;
            //                    },this);
            //                }
            //                this.lbl14.visible = false;
            //            },true,this); 
            socketio.IoConnect.getInstance().upload(1, { user_id: GameApp.Manager.dataManager.uid, group_openid: GameApp.Manager.dataManager.group_openid, name: name, desc: desc, type: JSON.stringify(arr), imgData: this.base64str }, function (obj) {
                console.log('提交over', obj);
                if (obj["st"] == 1) {
                    aler.AlertPanel1.getInstance().show("", "提交成功", "确定", function () {
                        this.groupTip.visible = false;
                        this.close();
                    }, this);
                }
                else {
                    aler.AlertPanel1.getInstance().show("", "提交失败", "确定", function () {
                        this.groupTip.visible = false;
                    }, this);
                }
                this.lbl14.visible = false;
            }, this);
        };
        p.selectedHandler = function (thisRef, imgURL, file) {
            //alert("img selected"+imgURL);
            RES.getResByUrl(imgURL, thisRef.compFunc, thisRef, RES.ResourceItem.TYPE_IMAGE);
            //            getImageData(file,thisRef.bytesHandler,thisRef);
        };
        p.bytesHandler = function (thisRef, imgBytes) {
            console.log("大图数据:" + imgBytes);
        };
        p.compFunc = function (texture) {
            this.bmpStar.source = texture;
            //            this.bmpStar.anchorOffsetX=texture.textureWidth/2;
            this.bmpStar.scaleX = this.bmpStar.scaleY = 200 / texture.textureWidth;
            //            this.maskStar.scaleX = this.maskStar.scaleY=  200 / texture.textureWidth;
            //            this.btnAdd.scaleX = this.btnAdd.scaleY= 200 / texture.textureWidth;
            //            this.groupBottom.y = this.bmpStar.y+200/texture.textureWidth+40;
            this.base64str = texture.toDataURL("image/jpeg"); //使用默认texture尺寸
            console.log('选择了:', this.base64str);
            this.rectStarBack.visible = true;
        };
        p.clear = function () {
            this.lblStarName.textColor = 0xbcd5df;
            this.lblStarDesc.textColor = 0xbcd5df;
            this.lblStarName.text = "请输入明星姓名或组合全称";
            this.lblStarDesc.text = "如代表作等";
            this.lbl11.visible = false;
            this.lbl12.visible = false;
            this.lbl13.visible = false;
            for (var i in this.arrBoxItem) {
                var item = this.arrBoxItem[i];
                if (item.isSelect) {
                    item.tap();
                }
            }
            this.base64str = "";
            this.bmpStar.source = null;
            this.rectStarBack.visible = false;
            this.groupTip.visible = false;
            this.lbl14.visible = true;
            //            this.groupBottom.y=1195;
            //            this.btnAdd.scaleX=this.btnAdd.scaleY=1;
            //            this.maskStar.scaleX = this.btnAdd.scaleY=1;
        };
        p.close = function () {
            GameApp.Manager.controllerManager.newStarController.hide();
            GameApp.Manager.viewManager.starPageManager.show();
        };
        return NewStarUI;
    }(eui.Component));
    newstar.NewStarUI = NewStarUI;
    egret.registerClass(NewStarUI,'newstar.NewStarUI');
})(newstar || (newstar = {}));
