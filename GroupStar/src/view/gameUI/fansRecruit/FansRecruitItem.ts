module fansRecruit {
	/**
	 *
	 * @author 
	 *
	 */
    export class FansRecruitItem extends eui.Component{
        public obj:Object;
        private container:eui.Group;
        private namet:eui.Label;
//        private level:eui.Label;
        private pnum:eui.Label;
        private gonggao:eui.Label;
        private position:eui.Label;
        private groupData:eui.Group;
        private iconNow: task.TaskIcon;
        private bmpIcon:eui.Image;
        private btnJoin:eui.Image;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/fansRecruit/FansRecruitItemSkin.exml";
            this.iconNow=new task.TaskIcon();
		}
        public childrenCreated(): void {
            this.groupData.addChild(this.iconNow);
            if(Tools.getInstance().isIphone()) {
                this.namet.fontFamily = "Heiti SC";
//                this.level.fontFamily = "Heiti SC";
                this.pnum.fontFamily = "Heiti SC";
                this.gonggao.fontFamily = "Heiti SC";
                this.position.fontFamily = "Heiti SC";
                this.btnJoin.visible = false;
            }
        }
        public setData(obj:Object):void{
           this.obj=obj;
            this.getHead(obj['group_face']);
            this.namet.text = window["hexToDec"](obj['group_name']);
            this.pnum.text = obj['member_num']+'人';
//            this.level.text = 'LV'+obj['level'];
            this.gonggao.text = '群公告:'+window["hexToDec"](obj['notice']);
            this.position.text = window["hexToDec"](obj['poi_name']);
            var len: number = 0;
            this.iconNow.setText(obj["level"]);
//            for(var i = 0;i < this.namet.text.length;i++) {
//                var length = this.namet.text.charCodeAt(i);
//                if(length >= 0 && length <= 128) {
//                    len += 1;
//                }
//                else {
//                    len += 2;
//                }
//            }
//            this.level.x = this.namet.x + len * 18 + 10;
        }
        private getHead(url:string):void{
            var self = this;
            //头像mask
//            var msk = new egret.Shape();
//            msk.graphics.clear();
//            msk.graphics.beginFill(0xff0000);
//            msk.graphics.drawRoundRect(20,23,135,135,23,23);
//            msk.graphics.endFill();
            //头像
            RES.getResByUrl(url,function(source: egret.Texture) {
                self.bmpIcon.source=source;
//                var img = new eui.Image(url);
//                img.width = img.height = 135;
//                img.x = 20; img.y = 23;
//                img.mask = msk;
//                self.container.addChild(img);
//                self.container.addChild(msk);
            },this,RES.ResourceItem.TYPE_IMAGE);
        }
	}
}
