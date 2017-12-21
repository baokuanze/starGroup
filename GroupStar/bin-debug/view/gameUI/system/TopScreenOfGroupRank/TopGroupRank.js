var TopScreenOfGroupRank;
(function (TopScreenOfGroupRank) {
    /**
     *
     * @author
     *
     */
    var TopGroupRank = (function (_super) {
        __extends(TopGroupRank, _super);
        function TopGroupRank() {
            _super.call(this);
            this.scHeight = 0;
            this.arr = [];
            this.disNum = 10;
            this.skinName = "src/view/gameUI/system/TopScreenOfGroupRank/TopGroupRankSkin.exml";
        }
        var d = __define,c=TopGroupRank,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_focusTitlt.fontFamily = "Heiti SC";
                this.lable_workTitle.fontFamily = "Heiti SC";
                this.lable_myStar.fontFamily = "Heiti SC";
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_hot.fontFamily = "Heiti SC";
                this.lable_RankStar.fontFamily = "Heiti SC";
                this.lable_go.fontFamily = "Heiti SC";
                this.lable_focusTitlt0.fontFamily = "Heiti SC";
                this.lable_workTitle0.fontFamily = "Heiti SC";
            }
            this.scro1.height = this.stage.stageHeight;
            this.scro1.addEventListener(eui.UIEvent.CHANGE, this.change, this);
            this.group_comeToMyStar.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.topGroupRankController.hide();
            }, this);
            this.group_top.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                GameApp.Manager.controllerManager.headLinesController.show(1, 0, 3);
                GameApp.Manager.controllerManager.topGroupRankController.hide();
            }, this);
        };
        p.setData = function (obj) {
            RES.getResByUrl(obj["headlineData"]["poster"], this.setHeadLine, this, RES.ResourceItem.TYPE_IMAGE);
            this.lable_workTitle.text = window["hexToDec"](obj["headlineData"]["title"]);
            this.lable_workTitle0.text = window["hexToDec"](obj["headlineData"]["title"]);
            console.log(this.group_top.height, "heigth");
            RES.getResByUrl(obj["selfStarData"]["head_img"], this.setIconImg, this, RES.ResourceItem.TYPE_IMAGE);
            this.lable_starName.text = window["hexToDec"](obj["selfStarData"]["star_name"]);
            this.lable_hot.text = window["hexToDec"](obj["selfStarData"]["hot"]);
            this.index = 0;
            if (obj["selfStarData"]["rank"] == 1) {
                this.img_rankIMg.source = "fistpag_1";
            }
            else if (obj["selfStarData"]["rank"] == 2) {
                this.img_rankIMg.source = "fistpag_2";
            }
            else if (obj["selfStarData"]["rank"] == 3) {
                this.img_rankIMg.source = "fistpag_3";
            }
            else {
                this.img_rankIMg.source = "fistpag_4";
            }
            if (obj["selfStarData"]["rank"] >= 10) {
                this.lable_rankNumber.size = 24;
            }
            this.lable_rankNumber.text = obj["selfStarData"]["rank"] + "";
            this.scHeight = this.group_top.height + this.group_comeToMyStar.height;
            for (var i = 0; i < obj["starRankData"].length; i++) {
                var it = obj["starRankData"][i];
                var toprank = TopScreenOfGroupRank.TopRank.produce();
                toprank.x = 0;
                toprank.y = i * toprank.height;
                this.group_GroupRank.addChild(toprank);
                this.arr.push(toprank);
            }
            var len = obj["starRankData"].length;
            for (var j = obj["starRankData"].length - 1; j >= 0; j--) {
                var item = this.group_GroupRank.getElementAt(j);
                item.setData(obj["starRankData"][j], j + 1);
            }
            this.dis();
        };
        p.change = function () {
            if (this.scro1.viewport && this.arr.length > 0) {
                var last = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
                if (this.index < this.arr.length / this.disNum - 1) {
                    if (this.scro1.viewport.scrollV >= next.y - 752) {
                        this.index++;
                        this.dis();
                    }
                }
                if (this.index > 0) {
                    if (this.scro1.viewport.scrollV < last.y + 752) {
                        this.index--;
                        this.dis();
                    }
                }
            }
        };
        p.dis = function () {
            var min = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
            var max = (this.index + 1) * this.disNum;
            for (var i = 0; i < this.arr.length; i++) {
                var item = this.arr[i];
                if (i < max) {
                    this.group_GroupRank.addChild(item);
                }
                else {
                    if (item.parent) {
                        item.parent.removeChild(item);
                    }
                }
            }
        };
        p.setHeadLine = function (source) {
            this.img_focus.texture = source;
            this.img_focus.width = 750;
            var bite = 750 / source["textureWidth"];
            this.img_focus.height = source["textureHeight"] * bite;
        };
        p.setIconImg = function (source) {
            this.img_icon.texture = source;
        };
        p.clear = function () {
            this.img_focus.source = null;
            this.img_focus.texture = null;
            this.img_icon.source = null;
            this.scro1.viewport.scrollV = 0;
            this.img_rankIMg.source = null;
            this.arr = [];
            while (this.group_GroupRank.numElements > 0) {
                var item = this.group_GroupRank.getElementAt(this.group_GroupRank.numElements - 1);
                TopScreenOfGroupRank.TopRank.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
        };
        return TopGroupRank;
    }(eui.Component));
    TopScreenOfGroupRank.TopGroupRank = TopGroupRank;
    egret.registerClass(TopGroupRank,'TopScreenOfGroupRank.TopGroupRank');
})(TopScreenOfGroupRank || (TopScreenOfGroupRank = {}));
