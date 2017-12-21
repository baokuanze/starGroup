var headLines;
(function (headLines) {
    /**
     *
     * @author
     *
     */
    var HeadLines = (function (_super) {
        __extends(HeadLines, _super);
        function HeadLines() {
            _super.call(this);
            this.isUpdateRank = false;
            this.arr = [];
            this.disNum = 3;
            this.skinName = "src/view/gameUI/headlines/HeadLinesSkin.exml";
        }
        var d = __define,c=HeadLines,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_starNews.fontFamily = "Heiti SC";
                this.lable_addNews.fontFamily = "Heiti SC";
                this.lable_taskTitle.fontFamily = "Heiti SC";
                this.lable_taskDirections.fontFamily = "Heiti SC";
                this.text_title.fontFamily = "Heiti SC";
                this.text_taskDirections.fontFamily = "Heiti SC";
                this.lable_warmTitle.fontFamily = "Heiti SC";
                this.lable_guizhe.fontFamily = "Heiti SC";
            }
            this.scor1.height = this.stage.stageHeight;
            this.img_btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comeToMainGame, this);
            this.rect_btnLookMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectWeekTime, this);
            this.img_btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addStarNews, this);
            this.text_taskDirections.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            }, this);
            this.btn_push.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addNews, this);
            //            this.scor1.addEventListener(eui.UIEvent.CHANGE,this.change,this);
        };
        p.deletweeTime = function (e) {
            console.log("scrol----");
            this.scor1.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.deletweeTime, this);
            this.img_lookMore.scaleY = 1;
            var item = this.group_data.getElementAt(0);
            item.rect_button.fillColor = 0xffffff;
            item.rect_button.strokeColor = 0xffffff;
            var num = this.group_data.numElements;
            for (var i = num - 1; i > 0; i--) {
                var ite = this.group_data.getElementAt(i);
                mySelfStar.MySelfHeadLinesItem.reclaim(ite);
                if (ite.parent) {
                    ite.parent.removeChild(ite);
                }
            }
        };
        p.addNews = function (e) {
            var self = this;
            if ((this.text_taskDirections.text == "")) {
                this.lable_warmTitle.visible = true;
                return;
            }
            GameApp.Manager.viewManager.maskStage(.4, true); //加loading遮照
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + window["decToHex"](this.text_title.text) + this.text_taskDirections.text + "&");
            GameApp.Manager.viewManager.maskStage(.4, true); //加loading遮照
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/userHeadlineSuggest", {
                "user_id": GameApp.Manager.dataManager.uid,
                "bid": GameApp.Manager.dataManager.bid,
                "group_openid": GameApp.Manager.dataManager.group_openid,
                "title": window["decToHex"](this.text_title.text), "link": this.text_taskDirections.text, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    self.text_taskDirections.text = "";
                    aler.AlertPanel1.getInstance().show('温馨提示', '提交成功', "确定", function () {
                        GameApp.Manager.viewManager.clearMask(); //清楚遮照
                    }, this); //弹框提示
                }
                else {
                    aler.AlertPanel1.getInstance().show('温馨提示', '提交失败', "确定", function () {
                        GameApp.Manager.viewManager.clearMask(); //清楚遮照
                    }, this); //弹框提示
                }
            }, true, this);
        };
        p.addStarNews = function (e) {
            this.type = 2;
            this.grou_task.visible = true;
            this.lable_taskTitle.textFlow = (new egret.HtmlTextParser).parser("请在下方输入由“" + "<font color= #0000ff>" + GameApp.Manager.dataManager.star_name + "</font>" + "”主演的电影、电视剧或歌曲名称，审核通过后，作品将进入新番列表，建议粉丝推荐爱豆的近期作品（2个月内新作）。");
        };
        p.selectWeekTime = function (e) {
            var self = this;
            console.log(HeadLines.timeArr.length, HeadLines.timeCd, "length,cd");
            if (this.img_lookMore.scaleY == 1) {
                this.img_lookMore.scaleY = -1;
                this.scor1.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.deletweeTime, this);
                for (var i = 0; i < HeadLines.timeArr.length; i++) {
                    if (HeadLines.timeArr[i] == HeadLines.timeCd) {
                        var item = this.group_data.getElementAt(0);
                        item.rect_button.fillColor = 0xEBEBEB;
                        console.log("相同的");
                    }
                    else {
                        console.log("不相同");
                        var data_weekTime = mySelfStar.MySelfHeadLinesItem.produce();
                        this.group_data.addChildAt(data_weekTime, 1 + i);
                        data_weekTime.rect_button.strokeColor = 0xEBEBEB;
                        data_weekTime.addEventListener("click", this.clickWeekTime, this);
                        if (HeadLines.timeArr[i] == HeadLines.toDayTime) {
                            data_weekTime.setData(HeadLines.timeArr[i], 1);
                        }
                        else {
                            data_weekTime.setData(HeadLines.timeArr[i], 2);
                        }
                    }
                }
            }
            else {
                this.scor1.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.deletweeTime, this);
                this.img_lookMore.scaleY = 1;
                var item = this.group_data.getElementAt(0);
                item.rect_button.fillColor = 0xffffff;
                item.rect_button.strokeColor = 0xffffff;
                var num = self.group_data.numElements;
                for (var i = num - 1; i > 0; i--) {
                    var ite = this.group_data.getElementAt(i);
                    mySelfStar.MySelfHeadLinesItem.reclaim(ite);
                    if (ite.parent) {
                        ite.parent.removeChild(ite);
                    }
                }
            }
        };
        p.setData = function (obj, comeType, dis, weekTime) {
            //            this.rect_button.visible = false;
            this.type = comeType; //用来记录从哪来的
            this.obj = obj;
            var self = this;
            if (dis == 1) {
                //                console.log("1");
                this.obj = obj;
                var self = this;
                var data_weekTime = mySelfStar.MySelfHeadLinesItem.produce();
                this.group_data.addChild(data_weekTime);
                data_weekTime.setData(obj["currentTs"], 1);
                data_weekTime.rect_button.fillColor = 0xffffff;
                data_weekTime.rect_button.strokeColor = 0xffffff;
                data_weekTime.addEventListener("click", this.clickWeekTime, this);
                HeadLines.timeCd = obj["currentTs"];
                HeadLines.toDayTime = obj["currentTs"];
                HeadLines.ts = obj["currentTs"];
                if (HeadLines.isAdd) {
                    HeadLines.isAdd = false;
                    obj["historyTs"].push(obj["currentTs"]);
                    for (var i = 0; i < obj["historyTs"].length; i++) {
                        var ti = obj["historyTs"][i];
                        HeadLines.timeArr.push(ti);
                    }
                }
                if (obj["headline"].length == 0) {
                    this.lable_starNews.visible = true;
                }
                else {
                    this.lable_starNews.visible = false;
                    for (var i = 0; i < obj["headline"].length; i++) {
                        var it = obj["headline"][i];
                        var headItem = headLines.HeadLinesItem.produce();
                        headItem.x = 0;
                        headItem.y = i * headItem.height;
                        this.group_itemData.addChild(headItem);
                        // this.arr.push(headItem);
                        headItem.setData(it, i + 1); //当前对象 和下标传过去
                        headItem.addEventListener('votesUPItem', this.votesUPItem, this);
                        headItem.rect_btnDing.touchEnabled = true;
                        headItem.btn_ding.visible = true;
                    }
                }
            }
            else if (dis == 2) {
                //                console.log("2");
                //                if(HeadLines.isAdd2){
                //                    HeadLines.isAdd2 = false;
                var data_weekTime = mySelfStar.MySelfHeadLinesItem.produce();
                this.group_data.addChild(data_weekTime);
                data_weekTime.setData(weekTime, 2);
                data_weekTime.rect_button.strokeColor = 0xffffff;
                data_weekTime.rect_button.fillColor = 0xffffff;
                data_weekTime.addEventListener("click", this.clickWeekTime, this);
                //                }
                HeadLines.timeCd = weekTime;
                for (var i = 0; i < obj["data"].length; i++) {
                    var it = obj["data"][i];
                    var headItem = headLines.HeadLinesItem.produce();
                    headItem.x = 0;
                    headItem.y = i * headItem.height;
                    this.group_itemData.addChild(headItem);
                    headItem.setData(it, i + 1);
                    headItem.rect_btnDing.touchEnabled = false;
                    headItem.btn_ding.visible = false;
                    headItem.addEventListener('votesUPItem', this.votesUPItem, this);
                }
            }
        };
        //        public change(): void {
        //            if(this.scor1.viewport && this.arr.length > 0) {
        //                var last: headLines.HeadLinesItem = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
        //                var next: headLines.HeadLinesItem = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
        //                if(this.index < this.arr.length / this.disNum - 1) {
        //                    if(this.scor1.viewport.scrollV >= next.y - (this.scor1.height)) {
        //                        this.index++;
        //                        this.dis();
        //                        console.log(this.index,"index");
        //                    }
        //                }
        //                if(this.index > 0) {
        //                    if(this.scor1.viewport.scrollV < last.y) {
        //                        this.index--;
        //                        console.log(this.index,"index");
        //                        this.dis();
        //                    }
        //                }
        //            }
        //        }
        //        
        //        private dis(): void {
        //            var min: number = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
        //            var max: number = (this.index + 1) * this.disNum;
        //            for(var i: number = 0;i < this.arr.length;i++) {
        //                var item: headLines.HeadLinesItem = this.arr[i];
        //                if(i < max) {
        //                    this.group_itemData.addChild(item);
        //                }
        //                else {
        //                    if(item.parent) {
        //                        item.parent.removeChild(item);
        //                    }
        //                }
        //            }
        //        }
        p.clickWeekTime = function (e) {
            var self = this;
            var item = e.data;
            self.img_lookMore.scaleY = 1;
            HeadLines.ts = item.time ? item.time : HeadLines.toDayTime;
            //            console.log("HeadLines.ts",HeadLines.ts)
            if (item.time == headLines.HeadLines.timeCd) {
                //                console.log("是自己的时间")
                item.rect_button.fillColor = 0xffffff;
                item.rect_button.strokeColor = 0xffffff;
                var num = self.group_data.numElements;
                for (var i = num - 1; i > 0; i--) {
                    var ite = this.group_data.getElementAt(i);
                    mySelfStar.MySelfHeadLinesItem.reclaim(ite);
                    if (ite.parent) {
                        ite.parent.removeChild(ite);
                    }
                }
            }
            else {
                GameApp.Manager.controllerManager.headLinesController.hide();
                if (item.time == headLines.HeadLines.toDayTime) {
                    //                    console.log("目前时间");
                    GameApp.Manager.controllerManager.headLinesController.show(1, item.time, 1);
                }
                else {
                    //                    console.log("往期时间");
                    GameApp.Manager.controllerManager.headLinesController.show(2, item.time, 1);
                }
                while (this.group_data.numElements > 0) {
                    var ite = this.group_data.getElementAt(this.group_data.numElements - 1);
                    mySelfStar.MySelfHeadLinesItem.reclaim(ite);
                    if (ite.parent) {
                        ite.parent.removeChild(ite);
                    }
                }
            }
        };
        p.votesUPItem = function (e) {
            var n = 0;
            var self = this;
            var item = e.data;
            var tip = system.TipText1.produce("1");
            tip.x = item.lable_count.x + 68;
            tip.y = item.lable_count.y - 25;
            tip.setData("+1", 34, 0xFF7101);
            tip.bold = true;
            item.addChild(tip);
            egret.Tween.get(tip).wait(300).to({ y: tip.y - 50, alpha: 0 }, 500).call(function () {
                system.TipText1.reclaim(tip);
                if (tip.parent) {
                    tip.parent.removeChild(tip);
                }
            }, this);
            for (var i = 0; i < this.group_itemData.numElements; i++) {
                var it = this.group_itemData.getElementAt(i);
                if (item == it)
                    break;
                if (item.obj["votes"] > it.obj["votes"]) {
                    //                    self.scor1.enabled = false;
                    var text = it.lable_Bitrank.text;
                    it.lable_Bitrank.text = item.lable_Bitrank.text;
                    item.lable_Bitrank.text = text;
                    var icon = it.img_rank.source;
                    it.img_rank.source = item.img_rank.source;
                    item.img_rank.source = icon;
                    var y = it.y;
                    it.y = item.y;
                    item.y = y;
                    //                    var chazhi = this.scor1.viewport.scrollV - y;
                    //                    egret.Tween.get(it).to({ y: item.y },500).call(function() { egret.Tween.removeTweens(it)});
                    //                    egret.Tween.get(item).to({ y: y },500).call(function() { 
                    //                        self.scor1.enabled = true;
                    //                        egret.Tween.removeTweens(item)}
                    //                        );
                    item.parent.swapChildren(item, it);
                    break;
                }
            }
        };
        d(p, "factor"
            ,function () {
                return 0;
            }
            ,function (n) {
                //            console.log(n,"n");
                this.scor1.viewport.scrollV -= 5;
            }
        );
        p.comeToMainGame = function (e) {
            if (this.type == 1) {
                this.scor1.viewport.scrollV = 0;
                GameApp.Manager.controllerManager.headLinesController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else if (this.type == 2) {
                this.type = 1;
                this.grou_task.visible = false;
                this.lable_warmTitle.visible = false;
                this.text_taskDirections.text = "";
            }
            else if (this.type == 3) {
                this.scor1.viewport.scrollV = 0;
                GameApp.Manager.controllerManager.headLinesController.hide();
            }
        };
        p.clear = function () {
            this.grou_task.visible = false;
            this.arr = [];
            while (this.group_itemData.numElements > 0) {
                var item = this.group_itemData.getElementAt(this.group_itemData.numElements - 1);
                headLines.HeadLinesItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            //            var timeItem:mySelfStar.MySelfHeadLinesItem = <mySelfStar.MySelfHeadLinesItem>this.group_data.getElementAt(0);
            //            if(timeItem.time == this.obj["currentTs"]){
            //                this.num = 1 //本期
            //            }else{
            //                this.num = 2//往期
            //                this.timeCd = timeItem.time;
            //            }
            //            
            this.deleteTimeItem();
        };
        p.deleteTimeItem = function () {
            this.img_lookMore.scaleY = 1;
            while (this.group_data.numElements > 0) {
                var item = this.group_data.getElementAt(this.group_data.numElements - 1);
                mySelfStar.MySelfHeadLinesItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            //            var num = this.group_data.numElements;
            //            console.log(num,"num");
            //            for(var i: number = num - 1;i > 0;i--) {
            //                var ite: mySelfStar.MySelfHeadLinesItem = <mySelfStar.MySelfHeadLinesItem>this.group_data.getElementAt(i);
            //                mySelfStar.MySelfHeadLinesItem.reclaim(ite);
            //                if(ite.parent) {
            //                    ite.parent.removeChild(ite);
            //                }
            //            }
        };
        HeadLines.timeArr = [];
        HeadLines.isAdd = true;
        return HeadLines;
    }(eui.Component));
    headLines.HeadLines = HeadLines;
    egret.registerClass(HeadLines,'headLines.HeadLines');
})(headLines || (headLines = {}));
