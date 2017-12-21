var data;
(function (data) {
    /**
     *
     * @author
     *
     */
    var DataManager = (function () {
        function DataManager() {
            this.visitor = 0; //0:正常 1:访客
            this.group_openid = "E1EF9D8420F0FCFDA2FECDC165D3D5F6";
            this.wts = "";
            this.mts = "";
            this.uid = 11;
            this.star_name = "";
            this.user_name = "";
            this.user_pic = "";
            this.back_img = "";
            this.head_img = "";
            this.starRankShare = null;
            this.inviteGroupFriends = null;
            this.inviteGroupFriendsForMass = null;
            this.inviteGroupFriendsForCrowdfunding = null;
            this.shareUserStarWorksUserId = null;
            this.group_level = 0;
            this.group_exp = 0;
            this.group_need_exp = 0;
            this.is_owner = false; //默认不是群主
            this.level = 0; //明星等级
            this.hot = 0; //明星热度
            this.need_exp = 0;
            this.exp = 0;
            this.lucystar = 0;
            //        public flower_cd: number = 0;//剩余免费花 1:有 0:木有
            this.egg_cd = 0; //是否可以砸蛋 
            //        public flower_time: number = 0;//记录获取倒计时的时间
            this.egg_time = 0; //记录获取倒计时的时间
            this.user_level = 0; //人的等级
            this.user_now = 0; //当前经验
            this.user_total = 0; //总经验
            this.heart_num = 0;
            this.gift_cd = 0; //千纸鹤cd
            this.gift_time = 0; //记录
            //        public isFollower:number; //0不显示1显示；
            this.sign_x = document.body.clientWidth / 750 * 670;
            this.sign_y = document.body.clientWidth / 750 * 90;
            this.sc = document.body.clientWidth / 750;
            //        public IP:string="http://210.51.190.141:3001"
            this.IP = "http://sf.xintiao100.com"; //线上
            this.Port = "80";
            this.topEnter = 1; //用来区别第一次进来时，现今榜单；
            this.entenVisiter = 0;
            this.resetState = 0; //用来区别更改入驻；
            this.reset = 0;
            this.isFollower = 0; //30钻
            this.buluo = 0;
            this.haiquan = 0; //海泉明星演唱会
        }
        var d = __define,c=DataManager,p=c.prototype;
        DataManager.getGiftName = function (giftId) {
            var ret = "";
            switch (giftId) {
                case 1:
                    ret = "千纸鹤";
                    break;
                case 2:
                    ret = "荧光棒";
                    break;
                case 3:
                    ret = "玫瑰";
                    break;
                case 4:
                    ret = "皇冠";
                    break;
                case 5:
                    ret = "守护天使";
                    break;
                case 6:
                    ret = "真爱红包";
                    break;
                case 11:
                    ret = "助威";
                    break;
            }
            return ret;
        };
        DataManager.getGroupNameByLevel = function (level) {
            var ret = "";
            switch (Math.ceil(level / 9)) {
                case 1:
                    ret = "星粉团" + this.getGroupLevelByLevel(level) + "";
                    break;
                case 2:
                    ret = "超粉团" + this.getGroupLevelByLevel(level) + "";
                    break;
                case 3:
                    ret = "天字团" + this.getGroupLevelByLevel(level) + "";
                    break;
            }
            return ret;
        };
        DataManager.getGroupLevelByLevel = function (level) {
            var a2 = 0;
            a2 = level % 9 == 0 ? 9 : level % 9;
            return a2;
        };
        DataManager.getGroupColorByLevel = function (level) {
            var n = Math.ceil(level / 9);
            var ret = 0x2dd600;
            switch (n) {
                case 1:
                    ret = 0x2dd600;
                    break;
                case 2:
                    ret = 0x2aa8f8;
                    break;
                case 3:
                    ret = 0xf8741f;
                    break;
            }
            return ret;
        };
        DataManager.getintimateIcon = function (intimate_lv) {
            return "p_barrage_icon" + Math.ceil(intimate_lv / 9) + "";
        };
        DataManager.getintimateLevel = function (intimate_lv) {
            var a2 = 0;
            a2 = intimate_lv % 9 == 0 ? 9 : intimate_lv % 9;
            return a2;
        };
        DataManager.getintimateColor = function (intimate_lv) {
            var ret = 0xCD3700;
            switch (intimate_lv) {
                case 1:
                    ret = 0xCDBA96;
                    break;
                case 2:
                    ret = 0xCDB38B;
                    break;
                case 3:
                    ret = 0xB9D3EE;
                    break;
                case 4:
                    ret = 0xBFEFFF;
                    break;
                case 5:
                    ret = 0xBC8F8F;
                    break;
                case 6:
                    ret = 0xCD6839;
                    break;
                case 7:
                    ret = 0xCD6889;
                    break;
                case 8:
                    ret = 0xCD3700;
                    break;
            }
            return ret;
        };
        DataManager.getintimateName = function (intimate_lv) {
            var ret = "路人";
            switch (intimate_lv) {
                case 1:
                    ret = "路人";
                    break;
                case 2:
                    ret = "偶遇";
                    break;
                case 3:
                    ret = "在意";
                    break;
                case 4:
                    ret = "动心";
                    break;
                case 5:
                    ret = "倾心";
                    break;
                case 6:
                    ret = "爱慕";
                    break;
                case 7:
                    ret = "钟爱";
                    break;
                case 8:
                    ret = "挚爱";
                    break;
            }
            return ret;
        };
        d(p, "Obj"
            ,function () {
                return this.obj;
            }
            ,function (obj) {
                this.obj = obj;
            }
        );
        DataManager.bb = "0.2.2.1";
        //        public showHaiQuan:boolean = true;
        DataManager.RES = {
            "star": {
                "starimg": egret.Texture
            }
        };
        DataManager.userMSG = {
            1: { name: "纸鹤达人", desc: "累计送出n只纸鹤" },
            2: { name: "缔约心钻", desc: "累计消费n个钻石" },
            3: { name: "礼物连击", desc: "助威连击达到n" }
        };
        DataManager.userStarPoint = {
            1: [{ x: 51, y: 120 }],
            2: [{ x: 39, y: 120 }, { x: 70, y: 120 }],
            3: [{ x: 51, y: 120 }, { x: 22, y: 120 }, { x: 81, y: 120 }],
            4: [{ x: 12, y: 120 }, { x: 38, y: 120 }, { x: 67, y: 120 }, { x: 92, y: 120 }],
            5: [{ x: 51, y: 120 }, { x: 22, y: 120 }, { x: 81, y: 120 }, { x: 5, y: 120 }, { x: 101, y: 120 }]
        };
        return DataManager;
    }());
    data.DataManager = DataManager;
    egret.registerClass(DataManager,'data.DataManager');
})(data || (data = {}));
