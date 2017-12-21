module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
    export class CommentStyle extends eui.Component{
        private rect_bg:eui.Rect;
        private lb_userName:eui.Label;
        private lb_pushTime:eui.Label;
        private lb_priseNumber:eui.Label;
        private lb_common:eui.Label;
        private rect_line:eui.Rect;
        private img_paiseIcon:eui.Image;
        private img_priseAn:eui.Image;
        private img_priseLigh:eui.Image;
        private comment_id:string;
        private btn_prise:eui.Rect;
        private isPush:boolean = true;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/buyTicketActive/CommentStyleSkin.exml"
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lb_userName.fontFamily = "Heiti SC";
                this.lb_pushTime.fontFamily = "Heiti SC";
                this.lb_priseNumber.fontFamily = "Heiti SC";
                this.lb_common.fontFamily = "Heiti SC";
            }
            this.btn_prise.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var self: CommentStyle = this;
                if(self.isPush){
                    self.isPush = false;
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + self.comment_id + "" + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/praiseHaiquanComment",{ "user_id": GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,"comment_id": self.comment_id,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            if(obj['data']["valid"]) {
                                self.img_priseAn.visible = false;
                                self.img_priseLigh.visible = true;
                                self.lb_priseNumber.text = parseInt(self.lb_priseNumber.text) + 1 + "";
                            } else {
                                system.TipText.produce().open('今日已点赞');
                            }
                            if(obj['data']["add_lucky_star"]) {
                                GameApp.Manager.dataManager.lucystar += obj['data']["add_lucky_star"];
                                if(obj['data']["add_lucky_star"] > 0) {
                                    system.TipText.produce().open('钻石+3');
                                }
                            }
                            self.isPush = true;
                        }
                    },true,this)  
                }
                   
            },this);
		}
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): CommentStyle {
            if(CommentStyle.cacheDict[mtype] == null) {
                CommentStyle.cacheDict[mtype] = [];
            }
            var dict: CommentStyle[] = CommentStyle.cacheDict[mtype];
            var theFighter: CommentStyle;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new CommentStyle();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: CommentStyle,mtype: string = "1"): void {
            if(CommentStyle.cacheDict[mtype] == null) {
                CommentStyle.cacheDict[mtype] = [];
            }
            var dict: CommentStyle[] = CommentStyle.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        
        public setData(data:Object){
            this.lb_userName.text = window["hexToDec"](data["user_name"]);
            this.lb_pushTime.text = Tools.getInstance().getMonth(data['time']);
            this.lb_priseNumber.text = data['praised_num'];
            this.lb_common.text = data['comment'];
            RES.getResByUrl(data['user_pic'],this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.rect_line.y = this.lb_common.y+ this.lb_common.height+30;
            this.comment_id = data['comment_id'];
        }
        public setData1(text:string){
            var time = new Date().getTime();
            this.lb_userName.text = GameApp.Manager.dataManager.user_name;
            this.lb_pushTime.text = Tools.getInstance().getMonth(time);
            this.lb_priseNumber.text = "0";
            this.lb_common.text = text;
            this.rect_line.y = this.lb_common.y + this.lb_common.height + 20;
            this.img_paiseIcon.source = GameApp.Manager.dataManager.user_pic
        }
        
        public load_personIcon(source:egret.Texture){
            this.img_paiseIcon.texture = source;
        }
        
        public clear(){
            this.lb_userName.text="";
            this.lb_pushTime.text = "";
            this.lb_common.text = "";
            this.img_paiseIcon.source = "";
            this.img_priseAn.visible = true;
            this.img_priseLigh.visible = false;
            this.isPush = true;
        }
        
	}
}
