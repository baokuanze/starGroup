module rankStar {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankStarItem extends eui.Component{
        private static cacheDict: Object = {}; 
        //private rankValueGroup:eui.Group;
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): RankStarItem {
            if(RankStarItem.cacheDict[mtype] == null) {
                RankStarItem.cacheDict[mtype] = [];
            }
            var dict: RankStarItem[] = RankStarItem.cacheDict[mtype];
            var theFighter: RankStarItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new RankStarItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: RankStarItem,mtype: string = "1"): void {
            if(RankStarItem.cacheDict[mtype] == null) {
                RankStarItem.cacheDict[mtype] = [];
            }
            var dict: RankStarItem[] = RankStarItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        private bid:string="";
        private lblName:eui.Label;
//        private bmpIcon: module.BaseCircleImage;
       // private txtRank:eui.BitmapLabel;
        private iconGroup:eui.Group;
        private hot:eui.Label;
        private img_head:eui.Image;
        private img_icon1:eui.Image;
        private img_icon2:eui.Image;
        private img_icon3:eui.Image;
        private btnHead:eui.Rect;
        private btnicon1:eui.Rect;
        private btnicon2:eui.Rect;
        private btnicon3:eui.Rect;
        private group_openid1:string="0";
        private group_openid2: string = "0";
        private group_openid3: string = "0";
        private uid1:number=0;
        private uid2: number=0;
        private uid3: number=0;
        private lable_rankNumber:eui.Label;
       // private lv:eui.Label;
		public constructor() {
    		super();
            this.skinName="src/view/gameUI/rankStar/RankStarItemSkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblName.fontFamily = "Heiti SC";
                this.hot.fontFamily = "Heiti SC";
            }
            this.btnHead.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                //相应明星访客页面
                GameApp.Manager.dataManager.entenVisiter = 2;
                socketio.IoConnect.getInstance().disconnect();//断开连接
                GameApp.Manager.controllerManager.start(this.bid);
//                GameApp.Manager.controllerManager.rankStarController.hide();
            },this);
            this.btnicon1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openUserPanel1,this);
            this.btnicon2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openUserPanel2,this);
            this.btnicon3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openUserPanel3,this);
		}
        private openUserPanel1(e: egret.Event): void {
//            var icon: module.BaseCircleImage = e.currentTarget;
            if(this.uid1>0)
                userPanel.UserPanel.getInstance().open(this.uid1,this.bid,this.group_openid1);
            e.stopPropagation();
        }
        private openUserPanel2(e: egret.Event): void {
//            var icon: module.BaseCircleImage = e.currentTarget;
            if(this.uid2 > 0)
                userPanel.UserPanel.getInstance().open(this.uid2,this.bid,this.group_openid2);
            e.stopPropagation();
        }
        private openUserPanel3(e: egret.Event): void {
//            var icon: module.BaseCircleImage = e.currentTarget;
            if(this.uid3 > 0)
                userPanel.UserPanel.getInstance().open(this.uid3,this.bid,this.group_openid3);
            e.stopPropagation();
        }
		public setData(data:Object):void{
    		//console.log(data,"榜单")
    		var self:RankStarItem=this;
             this.bid=data["bid"];
//             this.group_openid = data["group_openid"];
            //var img = new eui.Image(data['bust_img']);
            //this.iconGroup.addChild(img);
            //明星名字等级
            this.lblName.text = window["hexToDec"](data['name']);
            this.hot.text = data['hot'];
           // this.lv.text = 'LV'+data['star_level'];
            //榜单用户
            for(var i: number = 0;i < data["protector"].length;i++){
                this.userRank(data['protector'][i],i);
            }
            //this.rankValueGroup.addChild(img);
            //明星头像
//            this.bmpIcon.setData(data["head_img"],168,0,0,2);
            RES.getResByUrl(data["head_img"],this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
//            RES.getResByUrl(data['bust_img'],function(source: egret.Texture){
//                self.bmpIcon.source=source;
//            },this,RES.ResourceItem.TYPE_IMAGE);
            
            
		    //rank值显示
    		this.rankValueUI(data['rank']);
		}
        private load_end(s:egret.Texture):void{
            this.img_head.source=s;
        }
		public userRank(obj:Object,i:number):void{
    		var self:RankStarItem=this;
    		switch(i){
    		    case 0:
    		        this.uid1=obj["user_id"];
                    this.group_openid1 = obj["group_openid"];
                    RES.getResByUrl(obj["user_pic"],function(s:egret.Texture){
                        self.img_icon1.source=s;
                        },this,RES.ResourceItem.TYPE_IMAGE);
    		    break;
                case 1: 
                    this.uid2 = obj["user_id"];
                    this.group_openid2 = obj["group_openid"];
                    RES.getResByUrl(obj["user_pic"],function(s: egret.Texture) {
                        self.img_icon2.source = s;
                    },this,RES.ResourceItem.TYPE_IMAGE);
                break;
                case 2: 
                    this.uid3 = obj["user_id"];
                    this.group_openid3 = obj["group_openid"];
                    RES.getResByUrl(obj["user_pic"],function(s: egret.Texture) {
                        self.img_icon3.source = s;
                    },this,RES.ResourceItem.TYPE_IMAGE);
                break;
    		}
            
//            var icon:module.BaseCircleImage=new module.BaseCircleImage();
//            icon.setData(obj["user_pic"],62,0,0,2);
//            this.addChild(icon);
//		    icon.data={user_id:obj["user_id"]};
            //点击排行头像进入相应用户信息页
            
		}
		private openUserPanel(e:egret.Event):void{
    		var icon:module.BaseCircleImage=e.currentTarget;
            userPanel.UserPanel.getInstance().open(icon.data["user_id"],this.bid,"0");
		}
		public rankValueUI(value:number):void{
    		this.lable_rankNumber.text = value + "";
    		if(value<100){
    		    this.lable_rankNumber.size = 36;
    		}else if(value>=100){
                this.lable_rankNumber.size = 30;  
		    }else if(value >= 1000){
		        this.lable_rankNumber.size = 26;
		    }
		}

		public clear():void{
    		this.img_icon1.source=null;
            this.img_icon2.source = null;
            this.img_icon3.source = null;
            this.img_head.source=null;
            this.uid1=0;
            this.uid2=0;
            this.uid3=0;
		}
	}
}
