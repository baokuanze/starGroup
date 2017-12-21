module userPanel {
	/**
	 *
	 * @author 
	 *
	 */
	export class UserPaiseIcon extends eui.Component {
        private img_paiseIcon:eui.Image;
        private static cacheDict: Object = {};
        
        public static produce(mtype: string = "1",index: number = 0): UserPaiseIcon {
            if(UserPaiseIcon.cacheDict[mtype] == null) {
                UserPaiseIcon.cacheDict[mtype] = [];
            }
            var dict: UserPaiseIcon[] = UserPaiseIcon.cacheDict[mtype];
            var theFighter: UserPaiseIcon;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new UserPaiseIcon();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: UserPaiseIcon,mtype: string = "1"): void {
            if(UserPaiseIcon.cacheDict[mtype] == null) {
                UserPaiseIcon.cacheDict[mtype] = [];
            }
            var dict: UserPaiseIcon[] = UserPaiseIcon.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/userPanel/UserPaiseIconSkin.exml"
		}
		public setData(pic:string):void{
            RES.getResByUrl(pic,this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
		}
		
        public load_personIcon(source:egret.Texture):void{
            this.img_paiseIcon.texture = source;
        }
        
        public clear():void{
            this.img_paiseIcon.texture = null;
        }
	}
}
