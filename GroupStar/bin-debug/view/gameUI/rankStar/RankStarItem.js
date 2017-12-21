var rankStar;
(function (rankStar) {
    /**
     *
     * @author
     *
     */
    var RankStarItem = (function (_super) {
        __extends(RankStarItem, _super);
        // private lv:eui.Label;
        function RankStarItem() {
            _super.call(this);
            this.bid = "";
            this.group_openid1 = "0";
            this.group_openid2 = "0";
            this.group_openid3 = "0";
            this.uid1 = 0;
            this.uid2 = 0;
            this.uid3 = 0;
            this.skinName = "src/view/gameUI/rankStar/RankStarItemSkin.exml";
        }
        var d = __define,c=RankStarItem,p=c.prototype;
        //private rankValueGroup:eui.Group;
        /**生產*/
        RankStarItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (RankStarItem.cacheDict[mtype] == null) {
                RankStarItem.cacheDict[mtype] = [];
            }
            var dict = RankStarItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new RankStarItem();
            }
            return theFighter;
        };
        /**回收*/
        RankStarItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (RankStarItem.cacheDict[mtype] == null) {
                RankStarItem.cacheDict[mtype] = [];
            }
            var dict = RankStarItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.hot.fontFamily = "Heiti SC";
            }
            this.btnHead.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //相应明星访客页面
                GameApp.Manager.dataManager.entenVisiter = 2;
                socketio.IoConnect.getInstance().disconnect(); //断开连接
                GameApp.Manager.controllerManager.start(this.bid);
                //                GameApp.Manager.controllerManager.rankStarController.hide();
            }, this);
            this.btnicon1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserPanel1, this);
            this.btnicon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserPanel2, this);
            this.btnicon3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openUserPanel3, this);
        };
        p.openUserPanel1 = function (e) {
            //            var icon: module.BaseCircleImage = e.currentTarget;
            if (this.uid1 > 0)
                userPanel.UserPanel.getInstance().open(this.uid1, this.bid, this.group_openid1);
            e.stopPropagation();
        };
        p.openUserPanel2 = function (e) {
            //            var icon: module.BaseCircleImage = e.currentTarget;
            if (this.uid2 > 0)
                userPanel.UserPanel.getInstance().open(this.uid2, this.bid, this.group_openid2);
            e.stopPropagation();
        };
        p.openUserPanel3 = function (e) {
            //            var icon: module.BaseCircleImage = e.currentTarget;
            if (this.uid3 > 0)
                userPanel.UserPanel.getInstance().open(this.uid3, this.bid, this.group_openid3);
            e.stopPropagation();
        };
        p.setData = function (data) {
            //console.log(data,"榜单")
            var self = this;
            this.bid = data["bid"];
            //             this.group_openid = data["group_openid"];
            //var img = new eui.Image(data['bust_img']);
            //this.iconGroup.addChild(img);
            //明星名字等级
            this.lblName.text = window["hexToDec"](data['name']);
            this.hot.text = data['hot'];
            // this.lv.text = 'LV'+data['star_level'];
            //榜单用户
            for (var i = 0; i < data["protector"].length; i++) {
                this.userRank(data['protector'][i], i);
            }
            //this.rankValueGroup.addChild(img);
            //明星头像
            //            this.bmpIcon.setData(data["head_img"],168,0,0,2);
            RES.getResByUrl(data["head_img"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            //            RES.getResByUrl(data['bust_img'],function(source: egret.Texture){
            //                self.bmpIcon.source=source;
            //            },this,RES.ResourceItem.TYPE_IMAGE);
            //rank值显示
            this.rankValueUI(data['rank']);
        };
        p.load_end = function (s) {
            this.img_head.source = s;
        };
        p.userRank = function (obj, i) {
            var self = this;
            switch (i) {
                case 0:
                    this.uid1 = obj["user_id"];
                    this.group_openid1 = obj["group_openid"];
                    RES.getResByUrl(obj["user_pic"], function (s) {
                        self.img_icon1.source = s;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    break;
                case 1:
                    this.uid2 = obj["user_id"];
                    this.group_openid2 = obj["group_openid"];
                    RES.getResByUrl(obj["user_pic"], function (s) {
                        self.img_icon2.source = s;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    break;
                case 2:
                    this.uid3 = obj["user_id"];
                    this.group_openid3 = obj["group_openid"];
                    RES.getResByUrl(obj["user_pic"], function (s) {
                        self.img_icon3.source = s;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                    break;
            }
            //            var icon:module.BaseCircleImage=new module.BaseCircleImage();
            //            icon.setData(obj["user_pic"],62,0,0,2);
            //            this.addChild(icon);
            //		    icon.data={user_id:obj["user_id"]};
            //点击排行头像进入相应用户信息页
        };
        p.openUserPanel = function (e) {
            var icon = e.currentTarget;
            userPanel.UserPanel.getInstance().open(icon.data["user_id"], this.bid, "0");
        };
        p.rankValueUI = function (value) {
            this.lable_rankNumber.text = value + "";
            if (value < 100) {
                this.lable_rankNumber.size = 36;
            }
            else if (value >= 100) {
                this.lable_rankNumber.size = 30;
            }
            else if (value >= 1000) {
                this.lable_rankNumber.size = 26;
            }
        };
        p.clear = function () {
            this.img_icon1.source = null;
            this.img_icon2.source = null;
            this.img_icon3.source = null;
            this.img_head.source = null;
            this.uid1 = 0;
            this.uid2 = 0;
            this.uid3 = 0;
        };
        RankStarItem.cacheDict = {};
        return RankStarItem;
    }(eui.Component));
    rankStar.RankStarItem = RankStarItem;
    egret.registerClass(RankStarItem,'rankStar.RankStarItem');
})(rankStar || (rankStar = {}));
