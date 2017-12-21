module groupXuan {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupXuan extends eui.Component{
        private lable_title:eui.Label;
        private img_join:eui.Image;
        private lable_groupName:eui.Label;
        private img_groupIcon:eui.Image;
        private group_openid:string;
        private timer:egret.Timer;
        public endTime:number;
        private rect_join:eui.Rect;
    	public constructor() {
		    super();
            this.skinName = "src/view/gameUI/rankGroupContribution/groupXuan/GroupXuanSkin.exml";
    	}
    	
        public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lable_title.fontFamily = "Heiti SC";
                this.lable_groupName.fontFamily = "Heiti SC";
            }
            this.rect_join.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                system.GroupJoin.join(this.group_openid);
                },this);
    	}
    	
    	public setData(obj:Object):void{
            this.lable_title.text = window["hexToDec"](obj["message"]);
            this.lable_groupName.text = window["hexToDec"](obj["group_name"]);
            RES.getResByUrl(obj["group_face"],this.addGroupIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.group_openid = obj["group_openid"];
    	}
//        public onTimeUpdate():void{
//            var time = new Date().getTime();
//            if(time >= this.endTime){
//                this.dispatchEventWith('click',false,this);
//            }
//        }
    	
        public addGroupIcon(source:egret.Texture):void{
            this.img_groupIcon.texture = source;
        }
	}
}
