module newWeekPush {
	/**
	 *
	 * @author 
	 *
	 */
	export class NewWeekPushHonor extends eui.Component {
        private lable_topName:eui.Label;
        private lable_topCount:eui.Label;
        private img_starIcon:eui.Image;
        private lable_Team:eui.Label;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/weekPush/newWeekPush/NewWeekPushHonorSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_topName.fontFamily = "Heiti SC";
                this.lable_topCount.fontFamily = "Heiti SC";
                this.lable_Team.fontFamily = "Heiti SC";
            }
        }
        
        public setData(obj:Object,str:string):void{
            console.log(obj,"obj")
            if(str =="sign_best"){
                this.lable_topName.text = "人气签到群";
            }
            if(str == "mass_best"){
                this.lable_topName.text = "铁杆集结群";
            }
            if(str == "crowdfunding_best") {
                this.lable_topName.text = "主力众筹群";
            }
            this.lable_topCount.text = window["hexToDec"](obj["honor_info"][str]["num"]) + "次";
            RES.getResByUrl(obj["honor_info"][str]["group_face"],this.addGroupIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.lable_Team.text = this.getStringLen(window["hexToDec"](obj["honor_info"][str]["group_name"]));
        }
        
        public getStringLen(str): string {
            var len = 0;
            var newStr = '';
            for(var i = 0;i < str.length;i++) {
                var length = str.charCodeAt(i);
                if(length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
                if(len < 16) {
                    newStr += str[i];
                } else {
                    newStr += '...';
                    return newStr;
                }
            }
            return newStr;
        }
        
        public addGroupIcon(source:egret.Texture):void{
            this.img_starIcon.texture = source;
        }
	}
}
