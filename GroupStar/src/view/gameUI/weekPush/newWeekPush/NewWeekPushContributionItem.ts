module newWeekPush {
	/**
	 *
	 * @author 
	 *
	 */
	export class NewWeekPushContributionItem extends eui.Component {
        public  rect_joinIn:eui.Rect;
        private img_icon:eui.Image;
        private img_iconUp:eui.Image; //图像上面的圆圈
        private img_number:eui.Image;//第几名的图标；
        private lable_rankNumber:eui.Label;//第几名
        private lable_groupName:eui.Label;//群名字；
        private lable_groupContribution:eui.Label;
        private lable_btnJoinIn:eui.Label;
        private group_openid:string;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/weekPush/newWeekPush/NewWeekPushContributionItemSkin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_rankNumber.fontFamily = "Heiti SC";
                this.lable_groupName.fontFamily = "Heiti SC";
                this.lable_groupContribution.fontFamily = "Heiti SC";
                this.lable_btnJoinIn.fontFamily = "Heiti SC";
            }
            this.rect_joinIn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                system.GroupJoin.join(this.group_openid);
                },this);
        }
        
        public setData(obj:Object,index:number):void{
            if(index%2 != 0){
                this.rect_joinIn.fillColor = 0xe8f7fc;
            }else{
                this.rect_joinIn.fillColor = 0xffffff;
            }
            this.img_iconUp.source = "wp_no" + index;
            if(index <= 4){
                this.img_number.source = "fistpag_" + index;
            }else{
                this.img_number.source = "fistpag_4";
            }
            this.lable_rankNumber.text = index+"";
            this.lable_groupName.text = window["hexToDec"](obj["group_name"]);
            this.lable_groupContribution.text = "贡献: " + window["hexToDec"](obj["contribution"]);
            RES.getResByUrl(obj["group_face"],this.addStarIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.group_openid = obj["group_openid"]
        }
        
        public addStarIcon(source:egret.Texture):void{
            this.img_icon.texture = source;
        }
	}
}
