module data {
	/**
	 *
	 * @author 
	 *
	 */
    export class DataManager {
        public static bb:string="0.2.2.1";
        public visitor:number=0;//0:正常 1:访客
        public group_openid: string = "E1EF9D8420F0FCFDA2FECDC165D3D5F6";
        public wts:string="";
        public mts:string = "";
        public bid: string;
        public bid_save:string;
        public uid: number = 11;
        public star_name:string="";
        public user_name:string="";
        public user_pic:string="";
        public back_img:string="";
        public head_img:string="";
        public starRankShare:string=null;
        public inviteGroupFriends:string=null;
        public inviteGroupFriendsForMass: string = null;
        public inviteGroupFriendsForCrowdfunding: string = null;
        public shareUserStarWorksUserId:string = null;
        
        private obj: Object;
        public appId: string;
        public group_level:number=0;
        public group_exp:number=0;
        public group_need_exp:number=0;
        public is_owner:boolean=false; //默认不是群主
        public level: number = 0;//明星等级
        public hot:number=0;//明星热度
        public img_arr: Object;
       
        public need_exp: number = 0
        public exp: number = 0;
        public nowImg: string;
        public shadow_img: string;
        public lucystar: number = 0;
        //        public flower_cd: number = 0;//剩余免费花 1:有 0:木有
        public egg_cd: number = 0;//是否可以砸蛋 
        //        public flower_time: number = 0;//记录获取倒计时的时间
        public egg_time: number = 0;//记录获取倒计时的时间
        public user_level: number = 0;//人的等级
        public user_title: string;//人的称号
        public user_now: number = 0;//当前经验
        public user_total: number = 0;//总经验
        public heart_num: number = 0;
        public gift_cd: number = 0;//千纸鹤cd
        public gift_time: number = 0;//记录
//        public isFollower:number; //0不显示1显示；
        
        public sign_x: number = document.body.clientWidth / 750 * 670;
        public sign_y: number = document.body.clientWidth / 750 * 90;
        public sc: number = document.body.clientWidth / 750;
        public appid: string;
        public appkey: string;
//        public IP:string="http://210.51.190.141:3001"
              public IP: string = "http://sf.xintiao100.com";//线上
        public Port: string = "80";
        public topEnter:number = 1;//用来区别第一次进来时，现今榜单；
        public entenVisiter:number = 0;
        public monthly_ts:number;//用来显示月榜动态显示；
        public resetState:number = 0;//用来区别更改入驻；
        public reset: number = 0;
        public isFollower:number = 0;  //30钻
        public time_limited_activity_free:boolean;
        public shareTimeLimitedActivity:''//大转盘分享;
        public buluo:number = 0;
        public haiquan:number=0;//海泉明星演唱会
//        public showHaiQuan:boolean = true;
        
        public static RES: Object = {
            "star": {
                "starimg": egret.Texture
            }
        };
        public static userMSG: Object = {
            1: { name: "纸鹤达人",desc: "累计送出n只纸鹤" },
            2: { name: "缔约心钻",desc: "累计消费n个钻石" },
            3: { name: "礼物连击",desc: "助威连击达到n" }
        };
        public static userStarPoint: Object = {
            1: [{ x: 51,y: 120 }],
            2: [{ x: 39,y: 120 },{ x: 70,y: 120 }],
            3: [{ x: 51,y: 120 },{ x: 22,y: 120 },{ x: 81,y: 120 }],
            4: [{ x: 12,y: 120 },{ x: 38,y: 120 },{ x: 67,y: 120 },{ x: 92,y: 120 }],
            5: [{ x: 51,y: 120 },{ x: 22,y: 120 },{ x: 81,y: 120 },{ x: 5,y: 120 },{ x: 101,y: 120 }]
        }
        public static getGiftName(giftId:number):string{
            var ret:string="";
            switch(giftId){
                case 1:ret =  "千纸鹤";break;
                case 2: ret = "荧光棒"; break;
                case 3: ret = "玫瑰"; break;
                case 4: ret = "皇冠"; break;
                case 5: ret = "守护天使"; break;
                case 6: ret = "真爱红包"; break;
                case 11: ret = "助威"; break;
            }
            return ret;
        }
        public static getGroupNameByLevel(level:number):string{
            var ret:string="";
            switch(Math.ceil(level / 9)){
                case 1:ret="星粉团"+this.getGroupLevelByLevel(level)+"";break;
                case 2: ret = "超粉团" + this.getGroupLevelByLevel(level) + ""; break;
                case 3: ret = "天字团" + this.getGroupLevelByLevel(level) + ""; break;
            }
            return ret;
        }
        public static getGroupLevelByLevel(level:number):number{
            var a2: number = 0;
            a2 = level % 9 == 0 ? 9 : level % 9;
            return a2;
        }
        public static getGroupColorByLevel(level: number): number {//获取亲密度称号颜色
            var n: number = Math.ceil(level/9);
            var ret: number = 0x2dd600;
            switch(n) {
                case 1: ret = 0x2dd600; break;
                case 2: ret = 0x2aa8f8; break;
                case 3: ret = 0xf8741f; break;
            }
            return ret;
        }
        public static getintimateIcon(intimate_lv: number):string{
            return "p_barrage_icon"+Math.ceil(intimate_lv/9)+"";
        }
        public static getintimateLevel(intimate_lv: number): number {
            var a2:number=0;
            a2 = intimate_lv % 9 == 0 ? 9 : intimate_lv % 9;
            return a2;
        }
        public static getintimateColor(intimate_lv: number): number {//获取亲密度称号颜色
            var ret: number = 0xCD3700;
            switch(intimate_lv) {
                case 1: ret = 0xCDBA96; break;
                case 2: ret = 0xCDB38B; break;
                case 3: ret = 0xB9D3EE; break;
                case 4: ret = 0xBFEFFF; break;
                case 5: ret = 0xBC8F8F; break;
                case 6: ret = 0xCD6839; break;
                case 7: ret = 0xCD6889; break;
                case 8: ret = 0xCD3700; break;
            }
            return ret;
        }
        public static getintimateName(intimate_lv: number):string{//获取亲密度名称
            var ret: string = "路人";
            switch(intimate_lv) {
                case 1: ret = "路人"; break;
                case 2: ret = "偶遇"; break;
                case 3: ret = "在意"; break;
                case 4: ret = "动心"; break;
                case 5: ret = "倾心"; break;
                case 6: ret = "爱慕"; break;
                case 7: ret = "钟爱"; break;
                case 8: ret = "挚爱"; break;
            }
            return ret;
        }
        public constructor() {

        }
        public get Obj() {
            return this.obj;
        }
        public set Obj(obj: Object) {
            this.obj = obj;
        }
    }
}
