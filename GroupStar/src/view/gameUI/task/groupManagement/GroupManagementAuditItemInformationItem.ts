module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagementAuditItemInformationItem extends eui.Component {
        private lable_name:eui.Label;
        private lable_count:eui.Label;
        public lable_getCount:eui.Label;
        public lable_getRedFlower:eui.Label;
        private btn_rewordRedFlower:eui.Image;
        private img_icon:eui.Image ; //人物头像
        private img_cutPc:eui.Image;//截图;
        private open_id:string;
        public target_id:string
        private largeImg:string;
        private objValue:Object;
        
        
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): GroupManagementAuditItemInformationItem {
            if(GroupManagementAuditItemInformationItem.cacheDict[mtype] == null) {
                GroupManagementAuditItemInformationItem.cacheDict[mtype] = [];
            }
            var dict: GroupManagementAuditItemInformationItem[] = GroupManagementAuditItemInformationItem.cacheDict[mtype];
            var theFighter: GroupManagementAuditItemInformationItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new GroupManagementAuditItemInformationItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: GroupManagementAuditItemInformationItem,mtype: string = "1"): void {
            if(GroupManagementAuditItemInformationItem.cacheDict[mtype] == null) {
                GroupManagementAuditItemInformationItem.cacheDict[mtype] = [];
            }
            var dict: GroupManagementAuditItemInformationItem[] = GroupManagementAuditItemInformationItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
    	public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagementAuditItemInformationItemSkin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_name.fontFamily = "Heiti SC";
                this.lable_count.fontFamily = "Heiti SC";
                this.lable_getCount.fontFamily = "Heiti SC";
                this.lable_getRedFlower.fontFamily = "Heiti SC";
            }
            this.img_cutPc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickImg,this);
            this.btn_rewordRedFlower.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rewordRedFlower,this);
            this.img_cutPc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.small_click,this);
        }
        
        public setData(obj:Object,open_id:string):void{
            this.open_id = open_id;
            this.objValue = obj;
            this.largeImg = obj["user_upload_pic"]["largeImg"];
            this.target_id = obj["user_id"];
            console.log(open_id,this.target_id,"==========")
            console.log(obj,"888888888888888888888888888");    
            this.lable_count.text = "累计完成" +  window["hexToDec"](obj["finish_num"]) + "次";
            this.lable_getCount.text = "获得" + window["hexToDec"](obj["red_flower_num"]) + "次";
            this.lable_name.text = window["hexToDec"](obj["user_name"]);
            
            if(obj["can_send_flower"] == false){
                this.lable_getRedFlower.text = "已奖励";
            }
            if(obj["can_send_flower"] == true){
                this.lable_getRedFlower.text = "奖励小红花";
            }
          
            RES.getResByUrl(obj["user_pic"],this.PersonIcon,this,RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["user_upload_pic"]["smallImg"],this.bitIcon,this,RES.ResourceItem.TYPE_IMAGE);  //大图
        }
        
        public addFlower():void{
            var num = parseInt(this.objValue["red_flower_num"]) + 1;
            var str = num + "";
            this.lable_getCount.text = "获得" + window["hexToDec"](str) + "次";
            console.log(num,str,"次数");
        
        }
        private small_click(e:Event):void{
            GameApp.Manager.viewManager.groupManagerAudit.groupManagerAuditInfor.disLarge(this.largeImg);
            e.stopPropagation();
        }
        public PersonIcon(source:egret.Texture):void{
            this.img_icon.texture = source;
        }
        
        public bitIcon(source: egret.Texture): void {
            this.img_cutPc.texture = source;
        }
        
        public clickImg(e:egret.Event):void{
        
        }
        
        public rewordRedFlower(e:egret.Event):void{
            var self: GroupManagementAuditItemInformationItem = this
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid+"" + this.target_id + GameApp.Manager.dataManager.group_openid + this.open_id + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/rewardRedFlower",{user_id:GameApp.Manager.dataManager.uid,target_user_id:this.target_id,group_openid:GameApp.Manager.dataManager.group_openid,open_task_id: this.open_id,sign:sign },function(obj: Object) {
                if(obj["st"] == 1) {
                    console.log("获得小红花");
                    self.addFlower();
                    self.lable_getRedFlower.text = "已奖励"
                }
            },true,this);
        }
        
        public clear():void{
            console.log("回收");
            this.lable_name.text = "";
            this.lable_count.text = "";
            this.lable_getCount.text = "";
            this.lable_getRedFlower.text = "";
            this.img_icon.texture = null;
            this.img_cutPc.texture = null;
        }
	}
}
